"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Reorder } from "framer-motion";
import { GripVertical, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { deleteSortableAdminItem, reorderSortableAdminItems, type SortableAdminEntity } from "@/app/admin/actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";

type CellValue = string | number | boolean | null;

export interface SortableAdminRow {
  id: string;
  sort_order: number;
  [key: string]: CellValue;
}

export interface SortableAdminColumn {
  key: string;
  label: string;
  type?: "text" | "badge" | "status";
  className?: string;
}

interface SortableAdminTableProps {
  entity: SortableAdminEntity;
  rows: SortableAdminRow[];
  columns: SortableAdminColumn[];
  editPath: string;
  emptyMessage: string;
}

function renderCell(value: CellValue, type: SortableAdminColumn["type"]) {
  if (type === "status") {
    const active = Boolean(value);
    return <Badge variant={active ? "default" : "secondary"}>{active ? "Active" : "Inactive"}</Badge>;
  }
  if (type === "badge") return <Badge variant="outline">{String(value ?? "-")}</Badge>;
  return String(value ?? "-");
}

export function SortableAdminTable({ entity, rows, columns, editPath, emptyMessage }: SortableAdminTableProps) {
  const [items, setItems] = useState(rows);
  const latestItems = useRef(rows);
  const savedItems = useRef(rows);

  function handleReorder(nextItems: SortableAdminRow[]) {
    latestItems.current = nextItems;
    setItems(nextItems);
  }

  async function saveOrder() {
    const nextItems = latestItems.current;
    if (nextItems.every((item, index) => item.id === savedItems.current[index]?.id)) return;

    try {
      await reorderSortableAdminItems(entity, nextItems.map((item) => item.id));
      savedItems.current = nextItems;
      toast.success("Urutan berhasil disimpan");
    } catch (error) {
      latestItems.current = savedItems.current;
      setItems(savedItems.current);
      toast.error(error instanceof Error ? error.message : "Urutan gagal disimpan");
    }
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-zinc-200 bg-white">
      <Table>
        <TableHeader><TableRow>
          <TableHead className="w-12"><span className="sr-only">Urutan</span></TableHead>
          {columns.map((column) => <TableHead key={column.key} className={column.className}>{column.label}</TableHead>)}
          <TableHead className="sticky right-0 z-10 w-[112px] border-l bg-white text-center shadow-[-8px_0_12px_-12px_rgba(0,0,0,0.35)]">Aksi</TableHead>
        </TableRow></TableHeader>
        <Reorder.Group as="tbody" axis="y" values={items} onReorder={handleReorder} className="[&_tr:last-child]:border-0">
          {items.map((item) => (
            <Reorder.Item
              as="tr"
              key={item.id}
              value={item}
              onDragEnd={saveOrder}
              whileDrag={{ scale: 1.01, boxShadow: "0 12px 30px rgba(0,0,0,0.12)", zIndex: 20 }}
              transition={{ type: "spring", stiffness: 500, damping: 38 }}
              className="group relative border-b bg-white transition-colors hover:bg-muted/50"
            >
              <TableCell className="w-12 cursor-grab touch-none text-zinc-400 active:cursor-grabbing">
                <GripVertical className="h-5 w-5" aria-hidden="true" />
                <span className="sr-only">Tekan dan geser untuk mengubah urutan</span>
              </TableCell>
              {columns.map((column, index) => (
                <TableCell key={column.key} className={cn(index === 0 && "font-medium", column.className)}>
                  {renderCell(item[column.key], column.type)}
                </TableCell>
              ))}
              <TableCell className="sticky right-0 z-10 border-l bg-white shadow-[-8px_0_12px_-12px_rgba(0,0,0,0.35)] group-hover:bg-muted">
                <div className="flex justify-center gap-1">
                  <Link href={`${editPath}/${item.id}/edit`} aria-label="Edit" title="Edit"><Button variant="ghost" size="icon"><Pencil className="h-4 w-4" /></Button></Link>
                  <form action={() => deleteSortableAdminItem(entity, item.id)}><Button variant="ghost" size="icon" type="submit" aria-label="Hapus" title="Hapus"><Trash2 className="h-4 w-4 text-red-500" /></Button></form>
                </div>
              </TableCell>
            </Reorder.Item>
          ))}
          {items.length === 0 && <TableRow><TableCell colSpan={columns.length + 2} className="py-8 text-center text-zinc-500">{emptyMessage}</TableCell></TableRow>}
        </Reorder.Group>
      </Table>
    </div>
  );
}
