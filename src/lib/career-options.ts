export const ROLE_ENGAGEMENT_OPTIONS = [
  { value: "full_time", label: "Penuh waktu" },
  { value: "part_time", label: "Paruh waktu" },
  { value: "contract", label: "Kontrak" },
  { value: "project_based", label: "Berbasis proyek" },
  { value: "freelance", label: "Freelance" },
  { value: "internship", label: "Magang" },
] as const;

export const WORK_ARRANGEMENT_OPTIONS = [
  { value: "on_site", label: "WFO / On-site" },
  { value: "hybrid", label: "Hybrid" },
  { value: "remote", label: "Remote" },
  { value: "field", label: "Lapangan / Lokasi proyek" },
  { value: "flexible", label: "Fleksibel / Menyesuaikan proyek" },
] as const;

export const APPLICATION_STATUS_OPTIONS = [
  { value: "open", label: "Open" },
  { value: "closed", label: "Closed" },
] as const;

export const EDUCATION_LEVEL_OPTIONS = [
  "SMA/SMK/Sederajat",
  "D1",
  "D2",
  "D3",
  "D4",
  "S1",
  "S2",
  "S3",
] as const;

export type RoleEngagement = (typeof ROLE_ENGAGEMENT_OPTIONS)[number]["value"];
export type WorkArrangement = (typeof WORK_ARRANGEMENT_OPTIONS)[number]["value"];
export type ApplicationStatus = (typeof APPLICATION_STATUS_OPTIONS)[number]["value"];
export type ApplicationSource = "talent_pool" | "position";
export type ApplicationEngagement = RoleEngagement | "talent_pool";
export type EducationLevel = (typeof EDUCATION_LEVEL_OPTIONS)[number];
export type ApplicationWindowState = "open" | "scheduled" | "expired" | "closed";

export function getRoleEngagementLabel(value: string | null | undefined) {
  if (value === "talent_pool") return "Talent Pool";
  return ROLE_ENGAGEMENT_OPTIONS.find((option) => option.value === value)?.label ?? value ?? "-";
}

export function getWorkArrangementLabel(value: string | null | undefined) {
  return WORK_ARRANGEMENT_OPTIONS.find((option) => option.value === value)?.label ?? value ?? "-";
}

export function getApplicationSourceLabel(value: string | null | undefined) {
  return value === "position" ? "Posisi spesifik" : "Talent Pool";
}

export function getCurrentCareerDate(now = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Makassar",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);
  const value = (type: Intl.DateTimeFormatPartTypes) => parts.find((part) => part.type === type)?.value ?? "";
  return `${value("year")}-${value("month")}-${value("day")}`;
}

export function getApplicationWindowState(
  status: string | null | undefined,
  openDate: string | null | undefined,
  closeDate: string | null | undefined,
  currentDate = getCurrentCareerDate(),
): ApplicationWindowState {
  if (status !== "open" || !openDate || !closeDate) return "closed";
  if (currentDate < openDate) return "scheduled";
  if (currentDate > closeDate) return "expired";
  return "open";
}

export function formatCareerDate(value: string | null | undefined) {
  if (!value) return "-";
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}T00:00:00Z`));
}

export function formatApplicationPeriod(openDate: string | null | undefined, closeDate: string | null | undefined) {
  if (!openDate || !closeDate) return "-";
  return `${formatCareerDate(openDate)} – ${formatCareerDate(closeDate)}`;
}
