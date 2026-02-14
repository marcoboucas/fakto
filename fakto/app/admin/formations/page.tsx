"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { AdminFormation, AdminFormationStats } from "@/types/formations";
import { AdminFormationsTable } from "@/components/admin/admin-formations-table";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Download, Plus, Search, Filter } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useDebouncedCallback } from "use-debounce";

// Force dynamic rendering for this page
export const dynamic = 'force-dynamic';

function FormationsStats({ stats = null }: { stats?: AdminFormationStats | null } = {}) {
  if (!stats) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i}>
            <CardContent className="pt-6">
              <Skeleton className="h-4 w-24 mb-2" />
              <Skeleton className="h-8 w-16" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <Card>
        <CardContent className="pt-6">
          <div className="text-sm text-muted-foreground mb-2">Total formations</div>
          <div className="text-3xl font-bold">{stats.total}</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="pt-6">
          <div className="text-sm text-muted-foreground mb-2">Publiées</div>
          <div className="text-3xl font-bold text-green-600">{stats.published}</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="pt-6">
          <div className="text-sm text-muted-foreground mb-2">Brouillons</div>
          <div className="text-3xl font-bold text-orange-600">{stats.drafts}</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="pt-6">
          <div className="text-sm text-muted-foreground mb-2">Sur-mesure</div>
          <div className="text-3xl font-bold text-purple-600">{stats.custom}</div>
        </CardContent>
      </Card>
    </div>
  );
}

function FormationsData({ filters }: { filters?: { search?: string; type?: string; status?: string; modality?: string } }) {
  // TODO: Fetch formations based on filters
  const formations: AdminFormation[] = [];
  const loading = false;
  if (loading) {
    return (
      <div className="rounded-lg border bg-card p-6">
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      </div>
    );
  }
  return <AdminFormationsTable formations={formations} />;
}

function StatsLoading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      {[1, 2, 3, 4].map((i) => (
        <Card key={i}>
          <CardContent className="pt-6">
            <Skeleton className="h-4 w-24 mb-2" />
            <Skeleton className="h-8 w-16" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function TableLoading() {
  return (
    <div className="rounded-lg border bg-card p-6">
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <Skeleton key={i} className="h-16 w-full" />
        ))}
      </div>
    </div>
  );
}

function FormationsFilters() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value && value !== `all-${key}s`) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="bg-card rounded-lg border p-4 mb-6">
      <div className="flex gap-4 items-center">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher une formation..."
            className="pl-9"
            onChange={(e) => handleSearch(e.target.value)}
            defaultValue={searchParams.get("search") || ""}
          />
        </div>
        <Select
          defaultValue={searchParams.get("type") || "all-types"}
          onValueChange={(value) => handleFilterChange("type", value)}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Tous les types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-types">Tous les types</SelectItem>
            <SelectItem value="Catalogue">Catalogue</SelectItem>
            <SelectItem value="Sur-mesure">Sur-mesure</SelectItem>
          </SelectContent>
        </Select>
        <Select
          defaultValue={searchParams.get("modality") || "all-modalities"}
          onValueChange={(value) => handleFilterChange("modality", value)}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Toutes modalités" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-modalities">Toutes modalités</SelectItem>
            <SelectItem value="E-learning">E-learning</SelectItem>
            <SelectItem value="Présentiel">Présentiel</SelectItem>
            <SelectItem value="Distanciel">Distanciel</SelectItem>
          </SelectContent>
        </Select>
        <Select
          defaultValue={searchParams.get("status") || "all-status"}
          onValueChange={(value) => handleFilterChange("status", value)}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Tous les statuts" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-status">Tous les statuts</SelectItem>
            <SelectItem value="Publié">Publié</SelectItem>
            <SelectItem value="Brouillon">Brouillon</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="ghost" size="icon" onClick={() => replace(pathname)}>
          <Filter className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

function AdminFormationsPageContent() {
  const searchParams = useSearchParams();
  const filters = {
    search: searchParams.get("search") || undefined,
    type: searchParams.get("type") || undefined,
    status: searchParams.get("status") || undefined,
    modality: searchParams.get("modality") || undefined,
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Formations</h1>
        <div className="flex gap-3">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Exporter
          </Button>
          <Link href="/admin/formations/new">
            <Button className="bg-green-600 hover:bg-green-700">
              <Plus className="h-4 w-4 mr-2" />
              Créer une formation
            </Button>
          </Link>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-8 mb-6 border-b">
        <button className="pb-4 px-4 font-medium border-b-2 border-primary">
          Formations
        </button>
        <button className="pb-4 px-4 font-medium text-muted-foreground hover:text-foreground">
          Gestion des QCM
        </button>
      </div>

      {/* Stats */}
      <Suspense fallback={<StatsLoading />}>
        <FormationsStats />
      </Suspense>

      {/* Filters */}
      <FormationsFilters />

      {/* Table */}
      <Suspense fallback={<TableLoading />} key={JSON.stringify(filters)}>
        <FormationsData filters={filters} />
      </Suspense>
    </div>
  );
}

export default function AdminFormationsPage() {
  return (
    <Suspense fallback={<div className="p-8">Loading...</div>}>
      <AdminFormationsPageContent />
    </Suspense>
  );
}
