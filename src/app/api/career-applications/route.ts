import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-admin";

const MAX_PHOTO_SIZE = 2 * 1024 * 1024;
const MAX_DOCUMENT_SIZE = 5 * 1024 * 1024;
const MAX_REQUEST_SIZE = 20 * 1024 * 1024;

type UploadDescriptor = { contentType: string; extension: string };

function text(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function optionalText(formData: FormData, key: string) {
  return text(formData, key) || null;
}

function file(formData: FormData, key: string) {
  const value = formData.get(key);
  return value instanceof File && value.size > 0 ? value : null;
}

async function detectFileType(upload: File, kind: "photo" | "pdf"): Promise<UploadDescriptor | null> {
  const bytes = new Uint8Array(await upload.slice(0, 12).arrayBuffer());
  if (kind === "pdf") {
    const isPdf = bytes.length >= 5 && bytes[0] === 0x25 && bytes[1] === 0x50 && bytes[2] === 0x44 && bytes[3] === 0x46 && bytes[4] === 0x2d;
    return isPdf ? { contentType: "application/pdf", extension: "pdf" } : null;
  }

  if (bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) {
    return { contentType: "image/jpeg", extension: "jpg" };
  }
  if (bytes.length >= 8 && [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a].every((byte, index) => bytes[index] === byte)) {
    return { contentType: "image/png", extension: "png" };
  }
  const isWebp = bytes.length >= 12 && String.fromCharCode(...bytes.slice(0, 4)) === "RIFF" && String.fromCharCode(...bytes.slice(8, 12)) === "WEBP";
  return isWebp ? { contentType: "image/webp", extension: "webp" } : null;
}

async function validateFile(upload: File | null, label: string, kind: "photo" | "pdf", maxSize: number) {
  if (!upload) return { error: `${label} wajib diunggah.` };
  if (upload.size > maxSize) return { error: `${label} melebihi batas ukuran.` };
  const descriptor = await detectFileType(upload, kind);
  if (!descriptor) return { error: `Isi file ${label.toLowerCase()} tidak sesuai format yang didukung.` };
  return { descriptor };
}

function validOptionalUrl(value: string | null) {
  if (!value) return true;
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

async function requestFingerprint(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const source = `${forwardedFor || request.headers.get("x-real-ip") || "unknown"}|${request.headers.get("user-agent") || "unknown"}`;
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(source));
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

export async function POST(request: Request) {
  try {
    const contentLength = Number(request.headers.get("content-length") || 0);
    if (contentLength > MAX_REQUEST_SIZE) {
      return NextResponse.json({ error: "Ukuran total pendaftaran melebihi batas 20 MB." }, { status: 413 });
    }

    const supabase = createAdminClient();
    const fingerprint = await requestFingerprint(request);
    const { data: allowed, error: rateLimitError } = await supabase.rpc("check_career_application_rate_limit", {
      p_key: fingerprint,
      p_limit: 6,
      p_window_seconds: 600,
    });
    if (rateLimitError) {
      return NextResponse.json({ error: "Layanan pendaftaran sementara tidak tersedia." }, { status: 503 });
    }
    if (!allowed) {
      return NextResponse.json({ error: "Terlalu banyak percobaan. Silakan coba kembali dalam 10 menit." }, { status: 429 });
    }

    const formData = await request.formData();

    // Honeypot for basic bot protection.
    if (text(formData, "website")) {
      return NextResponse.json({ success: true });
    }

    const requiredFields: Array<[string, string]> = [
      ["name", "Nama lengkap"],
      ["email", "Email"],
      ["phone", "Nomor telepon"],
      ["position", "Posisi"],
      ["domicile", "Domisili"],
      ["education_level", "Pendidikan terakhir"],
      ["institution", "Nama institusi"],
      ["major", "Jurusan"],
      ["graduation_year", "Tahun lulus"],
      ["experience_years", "Lama pengalaman"],
      ["skills", "Keahlian utama"],
      ["availability", "Ketersediaan mulai"],
    ];

    for (const [key, label] of requiredFields) {
      if (!text(formData, key)) {
        return NextResponse.json({ error: `${label} wajib diisi.` }, { status: 400 });
      }
    }

    const email = text(formData, "email");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Format email tidak valid." }, { status: 400 });
    }

    if (text(formData, "consent") !== "true") {
      return NextResponse.json({ error: "Persetujuan penggunaan data wajib diberikan." }, { status: 400 });
    }

    const graduationYear = Number(text(formData, "graduation_year"));
    const experienceYears = Number(text(formData, "experience_years"));
    const currentYear = new Date().getFullYear();
    if (!Number.isInteger(graduationYear) || graduationYear < 1950 || graduationYear > currentYear + 1) {
      return NextResponse.json({ error: "Tahun lulus tidak valid." }, { status: 400 });
    }
    if (!Number.isFinite(experienceYears) || experienceYears < 0 || experienceYears > 60) {
      return NextResponse.json({ error: "Lama pengalaman tidak valid." }, { status: 400 });
    }

    const photo = file(formData, "photo");
    const resume = file(formData, "resume");
    const diploma = file(formData, "diploma");
    const transcript = file(formData, "transcript");

    const photoValidation = await validateFile(photo, "Pasfoto", "photo", MAX_PHOTO_SIZE);
    const resumeValidation = await validateFile(resume, "CV", "pdf", MAX_DOCUMENT_SIZE);
    const diplomaValidation = await validateFile(diploma, "Ijazah", "pdf", MAX_DOCUMENT_SIZE);
    const transcriptValidation = transcript ? await validateFile(transcript, "Transkrip nilai", "pdf", MAX_DOCUMENT_SIZE) : null;
    const fileError = photoValidation.error || resumeValidation.error || diplomaValidation.error || transcriptValidation?.error;
    if (fileError) {
      return NextResponse.json({ error: fileError }, { status: 400 });
    }

    const linkedinUrl = optionalText(formData, "linkedin_url");
    const portfolioUrl = optionalText(formData, "portfolio_url");
    if (!validOptionalUrl(linkedinUrl) || !validOptionalUrl(portfolioUrl)) {
      return NextResponse.json({ error: "Tautan LinkedIn atau portofolio harus menggunakan alamat http/https yang valid." }, { status: 400 });
    }

    const roleSlug = optionalText(formData, "role_slug");
    let roleId: string | null = null;
    let position = text(formData, "position");

    if (roleSlug) {
      const { data: role, error: roleError } = await supabase
        .from("career_roles")
        .select("id, title, is_active, is_open")
        .eq("slug", roleSlug)
        .maybeSingle();

      if (roleError || !role || !role.is_active) {
        return NextResponse.json({ error: "Posisi tidak ditemukan atau sudah tidak dipublikasikan." }, { status: 404 });
      }
      if (!role.is_open) {
        return NextResponse.json({ error: "Pendaftaran untuk posisi ini sudah ditutup." }, { status: 409 });
      }

      roleId = role.id;
      position = role.title;
    }

    const applicationId = crypto.randomUUID();
    const uploadedPaths: string[] = [];

    const upload = async (uploadFile: File, kind: string, descriptor: UploadDescriptor) => {
      const path = `${applicationId}/${kind}.${descriptor.extension}`;
      const { error } = await supabase.storage
        .from("career-applications")
        .upload(path, uploadFile, { contentType: descriptor.contentType, upsert: false });
      if (error) throw error;
      uploadedPaths.push(path);
      return path;
    };

    try {
      const photoPath = await upload(photo!, "photo", photoValidation.descriptor!);
      const resumePath = await upload(resume!, "cv", resumeValidation.descriptor!);
      const diplomaPath = await upload(diploma!, "diploma", diplomaValidation.descriptor!);
      const transcriptPath = transcript ? await upload(transcript, "transcript", transcriptValidation!.descriptor!) : null;

      const { error: insertError } = await supabase.from("career_applications").insert({
        id: applicationId,
        role_id: roleId,
        name: text(formData, "name"),
        email,
        phone: text(formData, "phone"),
        position,
        expertise: position,
        domicile: text(formData, "domicile"),
        education_level: text(formData, "education_level"),
        institution: text(formData, "institution"),
        major: text(formData, "major"),
        graduation_year: graduationYear,
        experience_years: experienceYears,
        latest_company: optionalText(formData, "latest_company"),
        latest_position: optionalText(formData, "latest_position"),
        skills: text(formData, "skills"),
        linkedin_url: linkedinUrl,
        portfolio_url: portfolioUrl,
        availability: text(formData, "availability"),
        expected_salary: optionalText(formData, "expected_salary"),
        notes: optionalText(formData, "notes"),
        photo_path: photoPath,
        resume_path: resumePath,
        diploma_path: diplomaPath,
        transcript_path: transcriptPath,
        consent_at: new Date().toISOString(),
      });

      if (insertError) throw insertError;
    } catch (error) {
      if (uploadedPaths.length > 0) {
        await supabase.storage.from("career-applications").remove(uploadedPaths);
      }
      throw error;
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Pendaftaran gagal diproses.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
