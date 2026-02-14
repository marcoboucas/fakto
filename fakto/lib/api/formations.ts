import { Formation } from "@/types/formations";
import { prisma } from "@/lib/prisma";

export async function getFormations(): Promise<Formation[]> {
  const formations = await prisma.formation.findMany({
    where: {
      status: "Publié",
    },
    select: {
      id: true,
      name: true,
      subtitle: true,
      type: true,
      modalities: true,
      status: true,
      description: true,
      image: true,
      progress: true,
      lastViewed: true,
      elementsCount: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return formations.map((f) => ({
    id: f.id,
    name: f.name,
    title: f.name, // Alias for backward compatibility
    subtitle: f.subtitle || undefined,
    type: f.type as "Catalogue" | "Sur-mesure",
    modalities: f.modalities as ("E-learning" | "Présentiel" | "Distanciel")[],
    status: f.status as "Publié" | "Brouillon",
    description: f.description || undefined,
    image: f.image || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop",
    userStatus: (f.progress === 100 ? "completed" : f.progress > 0 ? "in-progress" : "not-started") as "not-started" | "in-progress" | "completed",
    progress: f.progress,
    lastViewed: f.lastViewed ? "Aujourd'hui" : undefined,
    elementsCount: f.elementsCount || undefined,
    createdAt: f.createdAt.toISOString(),
    updatedAt: f.updatedAt.toISOString(),
  }));
}
