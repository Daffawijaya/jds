"use server";

import { createClient } from "@/lib/supabase-server";
import { createAdminClient } from "@/lib/supabase-admin";
import { revalidatePath } from "next/cache";
import { APPLICATION_STATUS_OPTIONS, EDUCATION_LEVEL_OPTIONS, ROLE_ENGAGEMENT_OPTIONS, WORK_ARRANGEMENT_OPTIONS } from "@/lib/career-options";

// =============================================================
// SERVICES
// =============================================================
export async function getServices() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return data;
}

export async function getService(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw error;
  return data;
}

export async function createService(formData: FormData) {
  const supabase = await createClient();
  const features = JSON.parse((formData.get("features") as string) || "[]");
  const deliverables = JSON.parse((formData.get("deliverables") as string) || "[]");

  const { error } = await supabase.from("services").insert({
    slug: formData.get("slug") as string,
    title: formData.get("title") as string,
    category: formData.get("category") as string,
    short_desc: formData.get("short_desc") as string,
    full_desc: formData.get("full_desc") as string,
    icon_name: formData.get("icon_name") as string,
    image_url: formData.get("image_url") as string,
    features,
    deliverables,
    sort_order: Number(formData.get("sort_order")) || 0,
    is_active: formData.get("is_active") === "true",
  });

  if (error) throw error;
  revalidatePath("/admin/services");
}

export async function updateService(id: string, formData: FormData) {
  const supabase = await createClient();
  const features = JSON.parse((formData.get("features") as string) || "[]");
  const deliverables = JSON.parse((formData.get("deliverables") as string) || "[]");

  const { error } = await supabase
    .from("services")
    .update({
      slug: formData.get("slug") as string,
      title: formData.get("title") as string,
      category: formData.get("category") as string,
      short_desc: formData.get("short_desc") as string,
      full_desc: formData.get("full_desc") as string,
      icon_name: formData.get("icon_name") as string,
      image_url: formData.get("image_url") as string,
      features,
      deliverables,
      sort_order: Number(formData.get("sort_order")) || 0,
      is_active: formData.get("is_active") === "true",
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) throw error;
  revalidatePath("/admin/services");
}

export async function deleteService(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("services").delete().eq("id", id);
  if (error) throw error;
  revalidatePath("/admin/services");
}

// =============================================================
// PROJECTS
// =============================================================
export async function getProjects() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return data;
}

export async function getProject(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw error;
  return data;
}

export async function createProject(formData: FormData) {
  const supabase = await createClient();
  const scope = JSON.parse((formData.get("scope") as string) || "[]");
  const tags = JSON.parse((formData.get("tags") as string) || "[]");

  const { error } = await supabase.from("projects").insert({
    slug: formData.get("slug") as string,
    title: formData.get("title") as string,
    client: formData.get("client") as string,
    category: formData.get("category") as string,
    year: formData.get("year") as string,
    short_desc: formData.get("short_desc") as string,
    full_desc: formData.get("full_desc") as string,
    scope,
    tags,
    highlight_badge: formData.get("highlight_badge") as string,
    image_url: formData.get("image_url") as string,
    sort_order: Number(formData.get("sort_order")) || 0,
    is_active: formData.get("is_active") === "true",
  });

  if (error) throw error;
  revalidatePath("/admin/projects");
}

export async function updateProject(id: string, formData: FormData) {
  const supabase = await createClient();
  const scope = JSON.parse((formData.get("scope") as string) || "[]");
  const tags = JSON.parse((formData.get("tags") as string) || "[]");

  const { error } = await supabase
    .from("projects")
    .update({
      slug: formData.get("slug") as string,
      title: formData.get("title") as string,
      client: formData.get("client") as string,
      category: formData.get("category") as string,
      year: formData.get("year") as string,
      short_desc: formData.get("short_desc") as string,
      full_desc: formData.get("full_desc") as string,
      scope,
      tags,
      highlight_badge: formData.get("highlight_badge") as string,
      image_url: formData.get("image_url") as string,
      sort_order: Number(formData.get("sort_order")) || 0,
      is_active: formData.get("is_active") === "true",
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) throw error;
  revalidatePath("/admin/projects");
}

export async function deleteProject(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("projects").delete().eq("id", id);
  if (error) throw error;
  revalidatePath("/admin/projects");
}

// =============================================================
// TESTIMONIALS
// =============================================================
export async function getTestimonials() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return data;
}

export async function createTestimonial(formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase.from("testimonials").insert({
    name: formData.get("name") as string,
    role: formData.get("role") as string,
    title: formData.get("title") as string,
    quote: formData.get("quote") as string,
    image_url: formData.get("image_url") as string,
    sort_order: Number(formData.get("sort_order")) || 0,
    is_active: formData.get("is_active") === "true",
  });
  if (error) throw error;
  revalidatePath("/admin/testimonials");
}

export async function updateTestimonial(id: string, formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("testimonials")
    .update({
      name: formData.get("name") as string,
      role: formData.get("role") as string,
      title: formData.get("title") as string,
      quote: formData.get("quote") as string,
      image_url: formData.get("image_url") as string,
      sort_order: Number(formData.get("sort_order")) || 0,
      is_active: formData.get("is_active") === "true",
    })
    .eq("id", id);
  if (error) throw error;
  revalidatePath("/admin/testimonials");
}

export async function deleteTestimonial(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("testimonials").delete().eq("id", id);
  if (error) throw error;
  revalidatePath("/admin/testimonials");
}

// =============================================================
// CAREER ROLES
// =============================================================
function slugifyCareerRole(title: string) {
  const slug = title
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " dan ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  if (!slug) throw new Error("Judul posisi tidak dapat digunakan untuk membuat slug.");
  return slug;
}

async function createUniqueCareerRoleSlug(
  supabase: Awaited<ReturnType<typeof createClient>>,
  title: string,
  excludedId?: string,
) {
  const baseSlug = slugifyCareerRole(title);
  let query = supabase.from("career_roles").select("id, slug").like("slug", `${baseSlug}%`);
  if (excludedId) query = query.neq("id", excludedId);
  const { data, error } = await query;
  if (error) throw error;

  const existingSlugs = new Set((data ?? []).map((role) => role.slug));
  if (!existingSlugs.has(baseSlug)) return baseSlug;
  let suffix = 2;
  while (existingSlugs.has(`${baseSlug}-${suffix}`)) suffix += 1;
  return `${baseSlug}-${suffix}`;
}

function parseCareerRoleForm(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  if (!title) throw new Error("Judul posisi wajib diisi.");

  const educationInput = JSON.parse(String(formData.get("education_levels") ?? "[]")) as unknown;
  const educationLevels = EDUCATION_LEVEL_OPTIONS.filter((level) => Array.isArray(educationInput) && educationInput.includes(level));
  if (educationLevels.length === 0) throw new Error("Pilih minimal satu jenjang pendidikan.");

  const status = String(formData.get("application_status") ?? "");
  if (!APPLICATION_STATUS_OPTIONS.some((option) => option.value === status)) throw new Error("Status pendaftaran tidak valid.");

  const location = String(formData.get("location") ?? "");
  if (!WORK_ARRANGEMENT_OPTIONS.some((option) => option.value === location)) throw new Error("Lokasi kerja tidak valid.");

  const engagement = String(formData.get("engagement") ?? "");
  if (!ROLE_ENGAGEMENT_OPTIONS.some((option) => option.value === engagement)) throw new Error("Skema keterlibatan tidak valid.");

  const openDate = status === "open" ? String(formData.get("application_open_date") ?? "") : null;
  const closeDate = status === "open" ? String(formData.get("application_close_date") ?? "") : null;
  if (status === "open" && (!openDate || !closeDate || openDate > closeDate)) {
    throw new Error("Periode pendaftaran tidak valid.");
  }

  const qualificationsInput = JSON.parse(String(formData.get("qualifications") ?? "[]")) as unknown;
  const qualifications = Array.isArray(qualificationsInput)
    ? qualificationsInput.filter((item): item is string => typeof item === "string" && Boolean(item.trim())).map((item) => item.trim())
    : [];

  return {
    title,
    group_name: String(formData.get("group_name") ?? ""),
    group_label: String(formData.get("group_label") ?? ""),
    education_levels: educationLevels,
    majors: String(formData.get("majors") ?? "").trim(),
    location,
    engagement,
    summary: String(formData.get("summary") ?? "").trim(),
    qualifications,
    sort_order: Number(formData.get("sort_order")) || 0,
    application_status: status,
    application_open_date: openDate,
    application_close_date: closeDate,
    is_active: formData.get("is_active") === "true",
  };
}

export async function getCareerRoles() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("career_roles")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return data;
}

export async function createCareerRole(formData: FormData) {
  const supabase = await createClient();
  const role = parseCareerRoleForm(formData);
  const slug = await createUniqueCareerRoleSlug(supabase, role.title);

  const { error } = await supabase.from("career_roles").insert({
    ...role,
    slug,
  });
  if (error) throw error;
  revalidatePath("/admin/career-roles");
  revalidatePath("/career");
}

export async function updateCareerRole(id: string, formData: FormData) {
  const supabase = await createClient();
  const role = parseCareerRoleForm(formData);
  const slug = await createUniqueCareerRoleSlug(supabase, role.title, id);

  const { error } = await supabase
    .from("career_roles")
    .update({
      ...role,
      slug,
    })
    .eq("id", id);
  if (error) throw error;
  revalidatePath("/admin/career-roles");
  revalidatePath("/career");
}

export async function deleteCareerRole(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("career_roles").delete().eq("id", id);
  if (error) throw error;
  revalidatePath("/admin/career-roles");
  revalidatePath("/career");
}

// =============================================================
// FAQS
// =============================================================
export async function getFaqs(page?: string) {
  const supabase = await createClient();
  let query = supabase.from("faqs").select("*").order("sort_order", { ascending: true });
  if (page) query = query.eq("page", page);
  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function createFaq(formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase.from("faqs").insert({
    page: formData.get("page") as string,
    question: formData.get("question") as string,
    answer: formData.get("answer") as string,
    sort_order: Number(formData.get("sort_order")) || 0,
    is_active: formData.get("is_active") === "true",
  });
  if (error) throw error;
  revalidatePath("/admin/faqs");
}

export async function updateFaq(id: string, formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("faqs")
    .update({
      page: formData.get("page") as string,
      question: formData.get("question") as string,
      answer: formData.get("answer") as string,
      sort_order: Number(formData.get("sort_order")) || 0,
      is_active: formData.get("is_active") === "true",
    })
    .eq("id", id);
  if (error) throw error;
  revalidatePath("/admin/faqs");
}

export async function deleteFaq(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("faqs").delete().eq("id", id);
  if (error) throw error;
  revalidatePath("/admin/faqs");
}

// =============================================================
// SUBMISSIONS (read only)
// =============================================================
export async function getSubmissions() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("contact_submissions")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
}

export async function markSubmissionRead(id: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("contact_submissions")
    .update({ is_read: true })
    .eq("id", id);
  if (error) throw error;
  revalidatePath("/admin/submissions");
}

export async function deleteSubmission(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("contact_submissions").delete().eq("id", id);
  if (error) throw error;
  revalidatePath("/admin/submissions");
}

// =============================================================
// APPLICATIONS (read only)
// =============================================================
export async function getApplications() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("career_applications")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
}

export async function getApplication(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("career_applications")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw error;
  return data;
}

export async function markApplicationRead(id: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("career_applications")
    .update({ is_read: true })
    .eq("id", id);
  if (error) throw error;
  revalidatePath("/admin/applications");
}

export async function deleteApplication(id: string) {
  const supabase = await createClient();
  const { data: application, error: applicationError } = await supabase
    .from("career_applications")
    .select("photo_path, resume_path, diploma_path, transcript_path")
    .eq("id", id)
    .single();
  if (applicationError) throw applicationError;

  const documentPaths = [application.photo_path, application.resume_path, application.diploma_path, application.transcript_path]
    .filter((path): path is string => Boolean(path));
  if (documentPaths.length > 0) {
    const admin = createAdminClient();
    const { error: storageError } = await admin.storage.from("career-applications").remove(documentPaths);
    if (storageError) throw storageError;
  }

  const { error } = await supabase.from("career_applications").delete().eq("id", id);
  if (error) throw error;
  revalidatePath("/admin/applications");
}

// =============================================================
// COMPANY INFO
// =============================================================
export async function getCompanyInfo() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("company_info")
    .select("*")
    .eq("key", "main")
    .single();
  if (error) throw error;
  return data;
}

export async function updateCompanyInfo(formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("company_info")
    .update({
      official_name: formData.get("official_name") as string,
      short_name: formData.get("short_name") as string,
      positioning: formData.get("positioning") as string,
      tagline: formData.get("tagline") as string,
      overview: formData.get("overview") as string,
      address: formData.get("address") as string,
      village: formData.get("village") as string,
      district: formData.get("district") as string,
      regency: formData.get("regency") as string,
      province: formData.get("province") as string,
      country: formData.get("country") as string,
      phone: formData.get("phone") as string,
      whatsapp: formData.get("whatsapp") as string,
      whatsapp_url: formData.get("whatsapp_url") as string,
      email: formData.get("email") as string,
      instagram: formData.get("instagram") as string,
      instagram_url: formData.get("instagram_url") as string,
      updated_at: new Date().toISOString(),
    })
    .eq("key", "main");
  if (error) throw error;
  revalidatePath("/admin/company-info");
}

// =============================================================
// CORE VALUES
// =============================================================
export async function getCoreValues() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("core_values")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return data;
}

export async function createCoreValue(formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase.from("core_values").insert({
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    icon_name: formData.get("icon_name") as string,
    sort_order: Number(formData.get("sort_order")) || 0,
    is_active: formData.get("is_active") === "true",
  });
  if (error) throw error;
  revalidatePath("/admin/core-values");
}

export async function updateCoreValue(id: string, formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("core_values")
    .update({
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      icon_name: formData.get("icon_name") as string,
      sort_order: Number(formData.get("sort_order")) || 0,
      is_active: formData.get("is_active") === "true",
    })
    .eq("id", id);
  if (error) throw error;
  revalidatePath("/admin/core-values");
}

export async function deleteCoreValue(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("core_values").delete().eq("id", id);
  if (error) throw error;
  revalidatePath("/admin/core-values");
}

// =============================================================
// ABOUT CARDS
// =============================================================
export async function getAboutCards() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("about_cards")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return data;
}

export async function createAboutCard(formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase.from("about_cards").insert({
    label: formData.get("label") as string,
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    image_url: formData.get("image_url") as string,
    button_label: formData.get("button_label") as string,
    button_href: formData.get("button_href") as string,
    sort_order: Number(formData.get("sort_order")) || 0,
    is_active: formData.get("is_active") === "true",
  });
  if (error) throw error;
  revalidatePath("/admin/about-cards");
}

export async function updateAboutCard(id: string, formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("about_cards")
    .update({
      label: formData.get("label") as string,
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      image_url: formData.get("image_url") as string,
      button_label: formData.get("button_label") as string,
      button_href: formData.get("button_href") as string,
      sort_order: Number(formData.get("sort_order")) || 0,
      is_active: formData.get("is_active") === "true",
    })
    .eq("id", id);
  if (error) throw error;
  revalidatePath("/admin/about-cards");
}

export async function deleteAboutCard(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("about_cards").delete().eq("id", id);
  if (error) throw error;
  revalidatePath("/admin/about-cards");
}

// =============================================================
// IMAGE UPLOAD
// =============================================================
export async function uploadImage(file: File, path: string) {
  const supabase = await createClient();
  const { error } = await supabase.storage.from("images").upload(path, file, {
    upsert: true,
  });
  if (error) throw error;

  const { data: urlData } = supabase.storage.from("images").getPublicUrl(path);
  return urlData.publicUrl;
}
