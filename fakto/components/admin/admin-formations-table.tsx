"use client";

import Link from "next/link";
import { AdminFormation } from "@/types/formations";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface AdminFormationsTableProps {
  formations: AdminFormation[];
}

export function AdminFormationsTable({ formations }: AdminFormationsTableProps) {
  const getModalityColor = (modality: string) => {
    switch (modality) {
      case "E-learning":
        return "bg-blue-100 text-blue-700 hover:bg-blue-100";
      case "Présentiel":
        return "bg-orange-100 text-orange-700 hover:bg-orange-100";
      case "Distanciel":
        return "bg-purple-100 text-purple-700 hover:bg-purple-100";
      default:
        return "bg-gray-100 text-gray-700 hover:bg-gray-100";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Publié":
        return "bg-green-100 text-green-700 hover:bg-green-100";
      case "Brouillon":
        return "bg-orange-100 text-orange-700 hover:bg-orange-100";
      default:
        return "bg-gray-100 text-gray-700 hover:bg-gray-100";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Sur-mesure":
        return "bg-purple-100 text-purple-700 hover:bg-purple-100";
      case "Catalogue":
        return "bg-gray-100 text-gray-700 hover:bg-gray-100";
      default:
        return "bg-gray-100 text-gray-700 hover:bg-gray-100";
    }
  };

  return (
    <div className="rounded-lg border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nom</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Modalités</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead>Dernière modification</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {formations.map((formation) => (
            <TableRow key={formation.id}>
              <TableCell>
                <div>
                  <div className="font-medium">{formation.name}</div>
                  {formation.subtitle && (
                    <div className="text-sm text-muted-foreground">
                      {formation.subtitle}
                    </div>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="secondary" className={getTypeColor(formation.type)}>
                  {formation.type}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex gap-1 flex-wrap">
                  {formation.modalities.map((modality, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className={getModalityColor(modality)}
                    >
                      {modality}
                    </Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="secondary" className={getStatusColor(formation.status)}>
                  {formation.status}
                </Badge>
              </TableCell>
              <TableCell className="text-muted-foreground">
                {formation.lastModified}
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      Actions
                      <MoreHorizontal className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <Link href={`/admin/formations/${formation.id}/edit`}>
                      <DropdownMenuItem>Modifier</DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem>Dupliquer</DropdownMenuItem>
                    <Link href={`/app/formations/${formation.id}`}>
                      <DropdownMenuItem>Voir les détails</DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem className="text-destructive">
                      Supprimer
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
