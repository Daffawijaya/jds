import { ReactNode } from "react";
import { createClient } from "@/lib/supabase-server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Toaster } from "@/components/ui/sonner";

const sidebarLinks = [
  { label: "Dashboard", href: "/admin" },
  { label: "Services", href: "/admin/services" },
  { label: "Projects", href: "/admin/projects" },
  { label: "Testimonials", href: "/admin/testimonials" },
  { label: "Career Roles", href: "/admin/career-roles" },
  { label: "FAQs", href: "/admin/faqs" },
  { label: "Submissions", href: "/admin/submissions" },
  { label: "Applications", href: "/admin/applications" },
  { label: "Company Info", href: "/admin/company-info" },
  { label: "Core Values", href: "/admin/core-values" },
  { label: "About Cards", href: "/admin/about-cards" },
];

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/admin/login");

  const { data: profile } = await supabase
    .from("company_info")
    .select("short_name")
    .eq("key", "main")
    .single();

  return (
    <div className="flex h-screen bg-zinc-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-zinc-200 flex flex-col">
        <div className="p-6 border-b border-zinc-200">
          <Link href="/admin" className="text-lg font-bold text-zinc-900">
            {profile?.short_name || "JDS"} Admin
          </Link>
          <p className="text-xs text-zinc-500 mt-1">{user.email}</p>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {sidebarLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block px-3 py-2 text-sm font-medium text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 rounded-lg transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-zinc-200">
          <form action="/api/auth/signout" method="post">
            <button
              type="submit"
              className="w-full px-3 py-2 text-sm font-medium text-zinc-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors text-left"
            >
              Logout
            </button>
          </form>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">{children}</div>
        <Toaster />
      </main>
    </div>
  );
}
