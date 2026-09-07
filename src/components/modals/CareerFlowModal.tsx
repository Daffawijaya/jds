"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check, CornerDownLeft, FileText, Loader2, Send, Upload, X } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetTitle } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  ROLE_ENGAGEMENT_OPTIONS,
  WORK_ARRANGEMENT_OPTIONS,
  getRoleEngagementLabel,
  getWorkArrangementLabel,
  type ApplicationStatus,
  type RoleEngagement,
  type WorkArrangement,
} from "@/lib/career-options";

export type CareerRole = {
  id: string;
  title: string;
  group: "technology" | "creative" | "program";
  groupLabel: string;
  education: string;
  majors: string;
  location: WorkArrangement;
  engagement: RoleEngagement;
  summary: string;
  qualifications: string[];
  applicationStatus: ApplicationStatus;
};

export type CareerFlowRequest = {
  initialView: "detail" | "apply";
  role: CareerRole | null;
  jobTitle: string;
  roleSlug?: string;
};

type CareerFlowModalProps = {
  request: CareerFlowRequest | null;
  onClose: () => void;
};

const steps = [
  { eyebrow: "Posisi & kontak", title: "Mari mulai dari informasi utama Anda." },
  { eyebrow: "Pendidikan", title: "Ceritakan pendidikan terakhir Anda." },
  { eyebrow: "Pengalaman", title: "Bagikan profil profesional Anda." },
  { eyebrow: "Dokumen", title: "Lengkapi dokumen pendukung." },
];

const educationLevels = ["SMA/SMK/Sederajat", "D1", "D2", "D3", "D4", "S1", "S2", "S3"];

function educationOptionsFor(roleEducation?: string): string[] {
  if (!roleEducation) return educationLevels;
  const tokens = roleEducation.toUpperCase().split(/[,/]/).map((t) => t.trim()).filter(Boolean);
  const matched = educationLevels.filter((level) =>
    level.toUpperCase().split("/").some((part) => tokens.some((t) => t === part || t.split(/\s+/).includes(part)))
  );
  return matched.length > 0 ? matched : educationLevels;
}

const inputClassName = "h-14 rounded-lg border border-zinc-300 bg-white px-4 text-base shadow-none transition-colors focus-visible:border-[#3b63fb] focus-visible:ring-1 focus-visible:ring-[#3b63fb]";
const selectClassName = "h-14 w-full rounded-lg border border-zinc-300 bg-white px-4 text-base outline-none transition-colors focus:border-[#3b63fb] focus:ring-1 focus:ring-[#3b63fb]";
const fileClassName = "h-auto min-h-14 cursor-pointer rounded-lg border border-zinc-300 px-3 py-2 file:mr-3 file:rounded-sm file:border-0 file:bg-zinc-950 file:px-3 file:py-2 file:text-xs file:font-bold file:text-white";

export function CareerFlowModal({ request, onClose }: CareerFlowModalProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);
  const successHeadingRef = useRef<HTMLHeadingElement>(null);
  const closeTimer = useRef<number | null>(null);
  const [showApplication, setShowApplication] = useState(false);
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState<"next" | "back">("next");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [displayRequest, setDisplayRequest] = useState<CareerFlowRequest | null>(request);

  if (request && request !== displayRequest) setDisplayRequest(request);

  const view = displayRequest?.initialView === "apply" || showApplication ? "apply" : "detail";

  useEffect(() => {
    if (!request || view !== "apply") return;
    if (isSubmitted) {
      requestAnimationFrame(() => successHeadingRef.current?.focus({ preventScroll: true }));
      return;
    }
    if (scrollAreaRef.current) scrollAreaRef.current.scrollTop = 0;
    formRef.current
      ?.querySelector<HTMLHeadingElement>(`[data-career-step="${step}"] h2`)
      ?.focus({ preventScroll: true });
  }, [request, view, step, isSubmitted]);

  useEffect(() => {
    return () => {
      if (closeTimer.current !== null) window.clearTimeout(closeTimer.current);
    };
  }, []);

  useEffect(() => {
    if (request && closeTimer.current !== null) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, [request]);

  const closeFlow = () => {
    if (isSubmitting) return;
    onClose();
    if (closeTimer.current !== null) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => {
      formRef.current?.reset();
      setShowApplication(false);
      setStep(0);
      setDirection("next");
      setIsSubmitted(false);
      setErrorMessage("");
      setDisplayRequest(null);
      closeTimer.current = null;
    }, 300);
  };

  const startApplication = () => {
    if (displayRequest?.role?.applicationStatus !== "open") return;
    setDirection("next");
    setStep(0);
    setShowApplication(true);
  };

  const validateStep = (stepIndex: number) => {
    const panel = formRef.current?.querySelector<HTMLElement>(`[data-career-step="${stepIndex}"]`);
    const fields = panel?.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>("input, select, textarea");
    if (!fields) return true;

    for (const field of fields) {
      if (!field.checkValidity()) {
        field.reportValidity();
        field.focus({ preventScroll: false });
        return false;
      }
    }
    return true;
  };

  const goNext = () => {
    if (!validateStep(step)) return;
    setDirection("next");
    setStep((current) => Math.min(current + 1, steps.length - 1));
  };

  const goBack = () => {
    if (step > 0) {
      setDirection("back");
      setStep((current) => current - 1);
      return;
    }
    if (request?.role) setShowApplication(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (step < steps.length - 1) {
      goNext();
      return;
    }
    if (!validateStep(step)) return;

    setIsSubmitting(true);
    setErrorMessage("");
    try {
      const response = await fetch("/api/career-applications", {
        method: "POST",
        body: new FormData(event.currentTarget),
      });
      const result = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(result.error || "Pendaftaran gagal dikirim.");
      setIsSubmitted(true);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Pendaftaran gagal dikirim.");
      requestAnimationFrame(() => errorRef.current?.focus());
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFormKeyDown = (event: React.KeyboardEvent<HTMLFormElement>) => {
    if (event.key === "Enter" && step < steps.length - 1 && event.target instanceof HTMLElement && event.target.tagName !== "TEXTAREA") {
      event.preventDefault();
      goNext();
    }
  };

  const progress = isSubmitted ? 100 : ((step + 1) / steps.length) * 100;
  const showBack = view === "apply" && (step > 0 || !!displayRequest?.role);
  const availableEducation = educationOptionsFor(displayRequest?.role?.education);
  const isTalentPoolApplication = !displayRequest?.role;

  return (
    <Sheet open={request !== null} onOpenChange={(open) => !open && closeFlow()}>
      <SheetContent
        side="bottom"
        showCloseButton={false}
        overlayClassName="bg-black/40 duration-300 supports-backdrop-filter:backdrop-blur-[15px]"
        className="h-[100dvh] max-h-[100dvh] gap-0 overflow-hidden border-0 bg-transparent p-0 text-[#202124] shadow-none duration-300 ease-out data-[side=bottom]:h-[100dvh] data-[side=bottom]:border-t-0 data-[side=bottom]:data-ending-style:translate-y-[150px] data-[side=bottom]:data-starting-style:translate-y-[150px]"
      >
        <SheetTitle className="sr-only">
          {view === "detail" ? `Detail posisi ${displayRequest?.jobTitle ?? ""}` : "Formulir pendaftaran kandidat"}
        </SheetTitle>
        <SheetDescription className="sr-only">
          {view === "detail" ? "Informasi lengkap posisi dan kualifikasi." : `Langkah ${step + 1} dari ${steps.length}.`}
        </SheetDescription>

        {displayRequest ? (
          <>
        <div className="relative z-20 shrink-0 bg-transparent">
        <header onClick={closeFlow} className="flex h-12 shrink-0 cursor-pointer items-center justify-between px-3 sm:h-14 sm:px-5">
          <div className="min-w-24" />
          <p className="absolute left-1/2 -translate-x-1/2 text-xs font-bold uppercase tracking-[0.16em] text-zinc-500">
            {!isSubmitted && view === "apply" ? `${step + 1} / ${steps.length}` : ""}
          </p>
          <button type="button" onClick={(e) => { e.stopPropagation(); closeFlow(); }} disabled={isSubmitting} className="relative z-20 flex h-8 w-8 items-center justify-center rounded-full border border-black/20 bg-white/20 text-black transition-colors hover:bg-white/30 disabled:cursor-not-allowed disabled:opacity-50" aria-label="Tutup">
            <X className="h-4 w-4" />
          </button>
        </header>

        <div className="h-0.5 shrink-0 bg-white" />
        <div className="h-2.5 shrink-0 bg-zinc-200 relative" role={view === "apply" ? "progressbar" : undefined} aria-label="Progres pendaftaran" aria-valuemin={view === "apply" ? 1 : undefined} aria-valuemax={view === "apply" ? steps.length : undefined} aria-valuenow={view === "apply" ? (isSubmitted ? steps.length : step + 1) : undefined}>
          {view === "apply" && <div className="h-full bg-[#3b63fb] transition-[width] duration-500 ease-out" style={{ width: `${progress}%` }} />}
        </div>
        </div>

        {view === "detail" && displayRequest?.role ? (
          <RoleDetail role={displayRequest.role} onApply={startApplication} />
        ) : (
          <form key={displayRequest?.roleSlug ?? "talent-pool"} ref={formRef} onSubmit={handleSubmit} onKeyDown={handleFormKeyDown} className="min-h-0 flex-1 overflow-hidden">
            <input type="hidden" name="role_slug" value={displayRequest?.roleSlug ?? ""} />
            <input type="hidden" name="position" value={displayRequest?.jobTitle ?? "Tenaga Ahli / Professional Talent JDS"} />
            {isTalentPoolApplication && <input type="hidden" name="engagement_scheme" value="talent_pool" />}
            <input className="hidden" tabIndex={-1} autoComplete="off" name="website" aria-hidden="true" />

            {isSubmitted ? (
              <SuccessState jobTitle={displayRequest?.jobTitle || "Talent Pool JDS"} onClose={closeFlow} headingRef={successHeadingRef} />
            ) : (
              <div ref={scrollAreaRef} className="h-full overflow-y-auto overscroll-contain scroll-pb-32 bg-white">
                <div className="mx-auto flex min-h-full w-full max-w-[680px] items-center px-6 py-10 sm:px-8 sm:py-14 lg:py-16">
                  <div className="w-full">
                    {errorMessage && (
                      <div ref={errorRef} tabIndex={-1} role="alert" className="mb-8 border-l-4 border-red-500 bg-red-50 px-4 py-3 text-sm text-red-700 outline-none">
                        {errorMessage}
                      </div>
                    )}

                    <div data-career-step="0" hidden={step !== 0} className={step === 0 ? stepAnimation(direction) : undefined}>
                      <StepHeading step={0} />
                      <div className="mt-8 space-y-6">
                        <ReadonlyChoice
                          label={isTalentPoolApplication ? "Skema pendaftaran" : "Posisi yang dipilih"}
                          value={isTalentPoolApplication ? "Talent Pool" : displayRequest?.jobTitle || "Posisi JDS"}
                        />
                        <div className="grid gap-5 sm:grid-cols-2">
                          {!isTalentPoolApplication && (
                            <SelectField id="career-engagement" name="engagement_scheme" label="Skema yang diminati" required defaultValue={displayRequest?.role?.engagement ?? ""}>
                              <option value="" disabled>Pilih skema</option>
                              {ROLE_ENGAGEMENT_OPTIONS.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                            </SelectField>
                          )}
                          <SelectField
                            id="career-work-arrangement"
                            name="work_arrangement"
                            label="Preferensi cara kerja"
                            required
                            defaultValue={isTalentPoolApplication ? "" : displayRequest?.role?.location ?? ""}
                          >
                            <option value="" disabled>Pilih cara kerja</option>
                            {WORK_ARRANGEMENT_OPTIONS.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                          </SelectField>
                        </div>
                        <div className="grid gap-5 sm:grid-cols-2">
                          <Field id="career-name" name="name" label="Nama lengkap" required autoComplete="name" placeholder="Sesuai identitas" />
                          <Field id="career-email" name="email" label="Email" required type="email" autoComplete="email" placeholder="nama@email.com" />
                          <Field id="career-phone" name="phone" label="WhatsApp / telepon" required type="tel" inputMode="tel" autoComplete="tel" placeholder="08xxxxxxxxxx" />
                          <Field id="career-domicile" name="domicile" label="Domisili saat ini" required autoComplete="address-level2" placeholder="Kota/Kabupaten, Provinsi" />
                        </div>
                      </div>
                      <StepActions onNext={goNext} onBack={goBack} showBack={showBack} />
                    </div>

                    <div data-career-step="1" hidden={step !== 1} className={step === 1 ? stepAnimation(direction) : undefined}>
                      <StepHeading step={1} />
                      <div className="mt-8 grid gap-5 sm:grid-cols-2">
                        <SelectField id="career-education" name="education_level" label="Jenjang pendidikan" required defaultValue="">
                          <option value="" disabled>Pilih jenjang</option>
                          {availableEducation.map((level) => <option key={level}>{level}</option>)}
                        </SelectField>
                        <Field id="career-major" name="major" label="Jurusan" required placeholder="Contoh: Teknik Informatika" />
                        <Field id="career-institution" name="institution" label="Sekolah / perguruan tinggi" required placeholder="Nama institusi" />
                        <Field id="career-graduation" name="graduation_year" label="Tahun lulus" required type="number" min="1950" max={new Date().getFullYear() + 1} placeholder="2025" />
                      </div>
                      <StepActions onNext={goNext} onBack={goBack} showBack={showBack} />
                    </div>

                    <div data-career-step="2" hidden={step !== 2} className={step === 2 ? stepAnimation(direction) : undefined}>
                      <StepHeading step={2} />
                      <div className="mt-8 space-y-6">
                        <div className="grid gap-5 sm:grid-cols-2">
                          <Field id="career-experience" name="experience_years" label="Lama pengalaman (tahun)" required type="number" min="0" max="60" step="0.5" placeholder="0 untuk fresh graduate" />
                          <SelectField id="career-availability" name="availability" label="Ketersediaan mulai" required defaultValue="">
                            <option value="" disabled>Pilih ketersediaan</option><option>Segera</option><option>Dalam 2 minggu</option><option>Dalam 1 bulan</option><option>Lebih dari 1 bulan</option>
                          </SelectField>
                          <Field id="career-latest-position" name="latest_position" label="Posisi terakhir" placeholder="Contoh: Frontend Developer" />
                          <Field id="career-company" name="latest_company" label="Perusahaan / organisasi terakhir" placeholder="Nama perusahaan" />
                        </div>
                        <TextAreaField id="career-skills" name="skills" label="Keahlian utama" required placeholder="Keterampilan, tools, sertifikasi, atau kompetensi yang relevan" />
                        <div className="grid gap-5 sm:grid-cols-2">
                          <Field id="career-linkedin" name="linkedin_url" label="LinkedIn" type="url" placeholder="https://linkedin.com/in/..." />
                          <Field id="career-portfolio" name="portfolio_url" label="Portofolio / GitHub" type="url" placeholder="https://..." />
                          <div className="sm:col-span-2"><Field id="career-salary" name="expected_salary" label="Ekspektasi kompensasi" placeholder="Contoh: Rp7.000.000/bulan atau dapat dinegosiasikan" /></div>
                        </div>
                      </div>
                      <StepActions onNext={goNext} onBack={goBack} showBack={showBack} />
                    </div>

                    <div data-career-step="3" hidden={step !== 3} className={step === 3 ? stepAnimation(direction) : undefined}>
                      <StepHeading step={3} />
                      <p className="mt-3 text-sm leading-6 text-zinc-500">Dokumen disimpan privat dan hanya dapat diakses administrator JDS.</p>
                      <div className="mt-8 space-y-6">
                        <div className="grid gap-5 sm:grid-cols-2">
                          <FileField id="career-photo" name="photo" label="Pasfoto" required accept="image/jpeg,image/png,image/webp" hint="JPG, PNG, atau WebP · maks. 2 MB" icon="upload" />
                          <FileField id="career-resume" name="resume" label="CV / Resume" required accept="application/pdf,.pdf" hint="PDF · maks. 5 MB" />
                          <FileField id="career-diploma" name="diploma" label="Ijazah terakhir" required accept="application/pdf,.pdf" hint="PDF · maks. 5 MB" />
                          <FileField id="career-transcript" name="transcript" label="Transkrip nilai" accept="application/pdf,.pdf" hint="Opsional · PDF maks. 5 MB" />
                        </div>
                        <TextAreaField id="career-notes" name="notes" label="Motivasi / catatan tambahan" placeholder="Alasan Anda tertarik dan hal penting lain yang perlu kami ketahui" />
                        <label className="flex items-start gap-3 border border-zinc-200 bg-zinc-50 p-4 text-sm leading-6 text-zinc-600">
                          <input type="checkbox" name="consent" value="true" required className="mt-1 h-4 w-4 shrink-0 accent-[#3b63fb]" />
                          <span>Saya menyatakan data yang dikirim benar dan menyetujui JDS memproses data pribadi serta dokumen ini untuk keperluan rekrutmen. *</span>
                        </label>
                      </div>
                      <StepActions submit isSubmitting={isSubmitting} onBack={goBack} showBack={showBack} />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </form>
        )}
          </>
        ) : (
          <div className="h-full bg-white" />
        )}
      </SheetContent>
    </Sheet>
  );
}

function RoleDetail({ role, onApply }: { role: CareerRole; onApply: () => void }) {
  return (
    <div data-career-detail-scroll className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain bg-white lg:overflow-hidden">
      <div className="mx-auto w-full max-w-[1180px] px-6 sm:px-10 lg:h-full lg:px-14">
        <div className="grid w-full gap-10 py-8 lg:h-full lg:min-h-0 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:py-0">
          <section
            data-career-detail-column="summary"
            aria-label="Ringkasan posisi"
            className="lg:min-h-0 lg:overflow-y-auto lg:overscroll-y-contain"
          >
            <div className="lg:flex lg:min-h-full lg:items-center lg:py-8">
              <div className="w-full">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-black/50">{role.groupLabel} · Posisi JDS</p>
                <h2 className="mt-5 max-w-3xl text-4xl font-normal leading-[1.1] tracking-[-0.025em] text-zinc-950 sm:text-5xl">{role.title}</h2>
                <p
                  aria-label={`Status pendaftaran: ${role.applicationStatus === "open" ? "Open" : "Closed"}`}
                  className={`mt-6 inline-flex border px-4 py-2 text-sm font-bold ${role.applicationStatus === "open" ? "border-blue-200 bg-blue-50 text-[#274dea]" : "border-zinc-300 bg-zinc-100 text-zinc-600"}`}
                >
                  {role.applicationStatus === "open" ? "Open" : "Closed"}
                </p>
                <div className="mt-9 flex flex-wrap gap-3 border-t border-zinc-200 pt-7">
                  {role.applicationStatus === "open" ? (
                    <button type="button" onClick={onApply} className="inline-flex items-center gap-2 rounded-full bg-[#3b63fb] px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-[#274dea]">
                      Lamar posisi
                    </button>
                  ) : (
                    <p className="text-sm leading-6 text-zinc-500">Saat ini kami belum menerima lamaran untuk posisi ini. Silakan pantau halaman Karir JDS untuk pembukaan berikutnya.</p>
                  )}
                </div>
              </div>
            </div>
          </section>

          <section
            data-career-detail-column="requirements"
            aria-label="Detail dan kualifikasi posisi"
            className="lg:min-h-0 lg:overflow-y-auto lg:overscroll-y-contain"
          >
            <div className="lg:flex lg:min-h-full lg:items-center lg:py-8">
              <div className="w-full space-y-10">
                <dl className="divide-y divide-zinc-200 border-y border-zinc-200">
                  <DetailRow label="Jenjang pendidikan" value={role.education} />
                  <DetailRow label="Jurusan" value={role.majors} />
                  <DetailRow label="Lokasi" value={getWorkArrangementLabel(role.location)} />
                  <DetailRow label="Skema keterlibatan" value={getRoleEngagementLabel(role.engagement)} />
                </dl>
                <div>
                  <p className="text-lg leading-8 text-zinc-600">{role.summary}</p>
                  <h3 className="mt-6 text-xl font-bold text-zinc-950">Kualifikasi utama</h3>
                  <ul className="mt-6 space-y-4">
                    {role.qualifications.map((qualification) => (
                      <li key={qualification} className="flex gap-4 text-base leading-7 text-zinc-600">
                        <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-zinc-600"><Check className="h-3.5 w-3.5" /></span>
                        <span>{qualification}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return <div className="grid gap-2 py-5 sm:grid-cols-[180px_1fr] sm:gap-8"><dt className="text-sm font-bold text-zinc-900">{label}</dt><dd className="text-sm leading-6 text-zinc-600">{value}</dd></div>;
}

function SuccessState({ jobTitle, onClose, headingRef }: { jobTitle: string; onClose: () => void; headingRef: React.RefObject<HTMLHeadingElement | null> }) {
  return (
    <div role="status" aria-live="polite" aria-atomic="true" className="h-full overflow-y-auto overscroll-contain bg-white">
      <div className="mx-auto flex min-h-full w-full max-w-[680px] items-center px-6 py-10 sm:px-8 sm:py-14 lg:py-16">
        <div className="w-full career-step-next">
          <h2 ref={headingRef} tabIndex={-1} className="max-w-3xl text-2xl font-normal leading-[1.3] tracking-[-0.025em] text-zinc-950 outline-none sm:text-3xl">Terima kasih, profil Anda sudah kami terima.</h2>
          <p className="mt-5 max-w-3xl text-base leading-7 text-zinc-600">Tim JDS akan meninjau pendaftaran untuk <strong>{jobTitle}</strong> dan menghubungi Anda apabila kualifikasi sesuai.</p>
          <div className="mt-10 flex items-center justify-end border-t border-zinc-200 pt-5">
            <button type="button" onClick={onClose} className="inline-flex items-center gap-2 rounded-full bg-[#3b63fb] px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-[#274dea]">Selesai</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function stepAnimation(direction: "next" | "back") {
  return direction === "next" ? "career-step-next" : "career-step-back";
}

function StepHeading({ step }: { step: number }) {
  return (
  <div>
    <h2 tabIndex={-1} className="max-w-3xl text-2xl font-normal leading-[1.3] tracking-[-0.025em] text-zinc-950 outline-none sm:text-3xl">{steps[step].title}</h2>
  </div>
  );
}

function StepActions({ onNext, onBack, showBack = false, submit = false, isSubmitting = false }: { onNext?: () => void; onBack?: () => void; showBack?: boolean; submit?: boolean; isSubmitting?: boolean }) {
  return (
    <div className="mt-10 flex items-center justify-end gap-6 border-t border-zinc-200 pt-5">
      {showBack && (
        <>
          <button type="button" onClick={onBack} className="inline-flex items-center gap-1.5 text-sm text-zinc-500 transition-colors hover:text-zinc-900">
            Sebelumnya
            <CornerDownLeft className="h-4 w-4" />
          </button>
          <span className="text-sm text-zinc-500">atau</span>
        </>
      )}
      <button type={submit ? "submit" : "button"} onClick={submit ? undefined : onNext} disabled={isSubmitting} className="inline-flex items-center gap-2 rounded-full bg-[#3b63fb] px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-[#274dea] disabled:cursor-not-allowed disabled:opacity-60">
        {submit ? (isSubmitting ? "Mengirim..." : "Kirim pendaftaran") : "Berikutnya"}
        {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : submit ? <Send className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
      </button>
    </div>
  );
}

function ReadonlyChoice({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-l-2 border-[#3b63fb] bg-blue-50 px-4 py-3">
      <p className="text-xs font-bold uppercase tracking-[0.12em] text-zinc-500">{label}</p>
      <p className="mt-1 text-base font-bold text-[#274dea]">{value}</p>
    </div>
  );
}

function FieldLabel({ htmlFor, children, required }: { htmlFor: string; children: React.ReactNode; required?: boolean }) {
  return <label htmlFor={htmlFor} className="block text-sm font-bold text-zinc-800">{children}{required && <span className="ml-1 text-[#3b63fb]">*</span>}</label>;
}

type FieldProps = React.ComponentProps<typeof Input> & { label: string };
function Field({ label, id, required, ...props }: FieldProps) {
  return <div className="space-y-2"><FieldLabel htmlFor={String(id)} required={required}>{label}</FieldLabel><Input id={id} required={required} {...props} className={inputClassName} /></div>;
}

type SelectFieldProps = React.SelectHTMLAttributes<HTMLSelectElement> & { id: string; label: string };
function SelectField({ id, label, required, children, ...props }: SelectFieldProps) {
  return <div className="space-y-2"><FieldLabel htmlFor={id} required={required}>{label}</FieldLabel><select id={id} required={required} {...props} className={selectClassName}>{children}</select></div>;
}

function TextAreaField({ id, name, label, placeholder, required }: { id: string; name: string; label: string; placeholder: string; required?: boolean }) {
  return <div className="space-y-2"><FieldLabel htmlFor={id} required={required}>{label}</FieldLabel><Textarea id={id} name={name} required={required} rows={4} placeholder={placeholder} className="resize-none rounded-lg border border-zinc-300 px-4 py-3 text-base shadow-none focus-visible:border-[#3b63fb] focus-visible:ring-1 focus-visible:ring-[#3b63fb]" /></div>;
}

function FileField({ id, name, label, accept, hint, required, icon }: { id: string; name: string; label: string; accept: string; hint: string; required?: boolean; icon?: "upload" }) {
  const Icon = icon ? Upload : FileText;
  return <div className="space-y-2"><label htmlFor={id} className="flex items-center gap-2 text-sm font-bold text-zinc-800"><Icon className="h-4 w-4" />{label}{required && <span className="text-[#3b63fb]">*</span>}</label><Input id={id} name={name} required={required} type="file" accept={accept} className={fileClassName} /><p className="text-xs text-zinc-500">{hint}</p></div>;
}
