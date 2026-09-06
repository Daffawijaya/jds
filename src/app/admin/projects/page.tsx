import { getProjects, deleteProject } from "../actions";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { Plus, Pencil, Trash2 } from "lucide-react";

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-zinc-900">Projects</h1>
        <Link href="/admin/projects/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Tambah Project
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-lg border border-zinc-200">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Year</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[100px]">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((project) => (
              <TableRow key={project.id}>
                <TableCell className="font-medium">{project.title}</TableCell>
                <TableCell>{project.client}</TableCell>
                <TableCell>{project.year}</TableCell>
                <TableCell>
                  <Badge variant={project.is_active ? "default" : "secondary"}>
                    {project.is_active ? "Active" : "Inactive"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Link href={`/admin/projects/${project.id}/edit`}>
                      <Button variant="ghost" size="icon">
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </Link>
                    <form
                      action={async () => {
                        "use server";
                        await deleteProject(project.id);
                      }}
                    >
                      <Button variant="ghost" size="icon" type="submit">
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </form>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {projects.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-zinc-500 py-8">
                  Belum ada data project
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
