import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Server Component, ignore
          }
        },
      },
    }
  );
}

// Public data fetching (no auth required)
export async function getCompanyInfo() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("company_info")
    .select("*")
    .eq("key", "main")
    .single();
  return data;
}

export async function getServices() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("services")
    .select("*")
    .eq("is_active", true)
    .order("sort_order");
  return data ?? [];
}

export async function getProjects() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("projects")
    .select("*")
    .eq("is_active", true)
    .order("sort_order");
  return data ?? [];
}

export async function getLatestProjects(limit = 3) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("projects")
    .select("id, slug, title, client, category, year, image_url, created_at")
    .eq("is_active", true)
    .order("created_at", { ascending: false })
    .order("sort_order", { ascending: false })
    .limit(limit);
  return data ?? [];
}

export async function getTestimonials() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("testimonials")
    .select("*")
    .eq("is_active", true)
    .order("sort_order");
  return data ?? [];
}

export async function getCareerRoles() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("career_roles")
    .select("*")
    .eq("is_active", true)
    .order("sort_order");
  return data ?? [];
}

export async function getCoreValues() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("core_values")
    .select("*")
    .eq("is_active", true)
    .order("sort_order");
  return data ?? [];
}

export async function getAboutCards() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("about_cards")
    .select("*")
    .eq("is_active", true)
    .order("sort_order");
  return data ?? [];
}

export async function getFaqs(page: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("faqs")
    .select("*")
    .eq("is_active", true)
    .eq("page", page)
    .order("sort_order");
  return data ?? [];
}
