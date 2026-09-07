"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Reorder } from "framer-motion";
import { GripVertical, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { deleteCareerRole, reorderCareerRoles } from "../actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatApplicationPeriod, getApplicationWindowState } from "@/lib/career-options";

interface CareerRoleRow {
  id: string;
  title: string;
  group_label: string;
  application_status: string | null;
  application_open_date: string | null;
  application_close_date: string | null;
  is_active: boolean;
}

export function CareerRolesTable({ roles }: { roles: CareerRoleRow[] }) {
  const [items, setItems] = useState(roles);
  const latestItems = useRef(roles);
  const savedItems = useRef(roles);

  function handleReorder(nextItems: CareerRoleRow[]) {
    latestItems.current = nextItems;
    setItems(nextItems);
  }

  async function saveOrder() {
    const nextItems = latestItems.current;
    if (nextItems.every((item, index) => item.id === savedItems.current[index]?.id)) return;

    try {
      await reorderCareerRoles(nextItems.map((item, index) => ({ id: item.id, sortOrder: index + 1 })));
      savedItems.current = nextItems;
      toast.success("Urutan posisi tersimpan");
    } catch (error) {
      latestItems.current = savedItems.current;
      setItems(savedItems.current);
      toast.error(error instanceof Error ? error.message : "Urutan posisi gagal disimpan");
    }
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-zinc-200 bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12"><span className="sr-only">Urutan</span></TableHead>
            <TableHead>Posisi</TableHead><TableHead>Kategori</TableHead><TableHead>Status pendaftaran</TableHead><TableHead>Periode</TableHead><TableHead>Publikasi</TableHead><TableHead className="sticky right-0 z-10 w-[112px] border-l bg-white text-center shadow-[-8px_0_12px_-12px_rgba(0,0,0,0.35)]">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <Reorder.Group as="tbody" axis="y" values={items} onReorder={handleReorder} className="[&_tr:last-child]:border-0">
          {items.map((role) => {
            const isOpen = getApplicationWindowState(role.application_status, role.application_open_date, role.application_close_date) === "open";

            return (
              <Reorder.Item
                as="tr"
                key={role.id}
                value={role}
                onDragEnd={saveOrder}
                whileDrag={{ scale: 1.01, boxShadow: "0 12px 30px rgba(0,0,0,0.12)", zIndex: 20 }}
                transition={{ type: "spring", stiffness: 500, damping: 38 }}
                className="group relative border-b bg-white transition-colors hover:bg-muted/50 data-[dragging=true]:cursor-grabbing"
              >
                <TableCell className="w-12 cursor-grab touch-none text-zinc-400 active:cursor-grabbing">
                  <GripVertical className="h-5 w-5" aria-hidden="true" />
                  <span className="sr-only">Tekan dan geser untuk mengubah urutan {role.title}</span>
                </TableCell>
                <TableCell className="font-medium">{role.title}</TableCell>
                <TableCell><Badge variant="outline">{role.group_label}</Badge></TableCell>
                <TableCell><Badge variant={isOpen ? "default" : "secondary"}>{isOpen ? "Open" : "Closed"}</Badge></TableCell>
                <TableCell>{formatApplicationPeriod(role.application_open_date, role.application_close_date)}</TableCell>
                <TableCell><Badge variant={role.is_active ? "default" : "secondary"}>{role.is_active ? "Tampil" : "Disembunyikan"}</Badge></TableCell>
                <TableCell className="sticky right-0 z-10 border-l bg-white shadow-[-8px_0_12px_-12px_rgba(0,0,0,0.35)] group-hover:bg-muted">
                  <div className="flex justify-center gap-1">
                    <Link href={`/admin/career-roles/${role.id}/edit`} aria-label={`Edit ${role.title}`} title="Edit posisi"><Button variant="ghost" size="icon"><Pencil className="h-4 w-4" /></Button></Link>
                    <form action={() => deleteCareerRole(role.id)}><Button variant="ghost" size="icon" type="submit" aria-label={`Hapus ${role.title}`} title="Hapus posisi"><Trash2 className="h-4 w-4 text-red-500" /></Button></form>
                  </div>
                </TableCell>
              </Reorder.Item>
            );
          })}
          {items.length === 0 && <TableRow><TableCell colSpan={7} className="py-8 text-center text-zinc-500">Belum ada data</TableCell></TableRow>}
        </Reorder.Group>
      </Table>
    </div>
  );
}
