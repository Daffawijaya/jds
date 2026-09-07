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

export type RoleEngagement = (typeof ROLE_ENGAGEMENT_OPTIONS)[number]["value"];
export type WorkArrangement = (typeof WORK_ARRANGEMENT_OPTIONS)[number]["value"];
export type ApplicationStatus = (typeof APPLICATION_STATUS_OPTIONS)[number]["value"];
export type ApplicationSource = "talent_pool" | "position";
export type ApplicationEngagement = RoleEngagement | "talent_pool";

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

