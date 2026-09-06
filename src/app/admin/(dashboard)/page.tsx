import { createClient } from "@/lib/supabase-server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default async function AdminDashboard() {
  const supabase = await createClient();

  const [
    services,
    projects,
    testimonials,
    careerRoles,
    faqs,
    submissions,
    applications,
  ] = await Promise.all([
    supabase.from("services").select("id", { count: "exact", head: true }),
    supabase.from("projects").select("id", { count: "exact", head: true }),
    supabase.from("testimonials").select("id", { count: "exact", head: true }),
    supabase.from("career_roles").select("id", { count: "exact", head: true }),
    supabase.from("faqs").select("id", { count: "exact", head: true }),
    supabase.from("contact_submissions").select("id", { count: "exact", head: true }),
    supabase.from("career_applications").select("id", { count: "exact", head: true }),
  ]);

  const stats = [
    { label: "Services", count: services.count ?? 0, href: "/admin/services" },
    { label: "Projects", count: projects.count ?? 0, href: "/admin/projects" },
    { label: "Testimonials", count: testimonials.count ?? 0, href: "/admin/testimonials" },
    { label: "Career Roles", count: careerRoles.count ?? 0, href: "/admin/career-roles" },
    { label: "FAQs", count: faqs.count ?? 0, href: "/admin/faqs" },
    { label: "Submissions", count: submissions.count ?? 0, href: "/admin/submissions", alert: (submissions.count ?? 0) > 0 },
    { label: "Applications", count: applications.count ?? 0, href: "/admin/applications", alert: (applications.count ?? 0) > 0 },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-zinc-900 mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-zinc-500">
                  {stat.label}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-zinc-900">
                  {stat.count}
                  {stat.alert && (
                    <span className="ml-2 inline-block w-2 h-2 bg-red-500 rounded-full" />
                  )}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
