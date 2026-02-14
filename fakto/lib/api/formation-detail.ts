import { FormationDetail, FormationStep } from "@/types/formations";
import { prisma } from "@/lib/prisma";

export async function getFormationById(id: string): Promise<FormationDetail | null> {
  const formation = await prisma.formation.findUnique({
    where: { id },
    include: {
      objectives: { orderBy: { order: "asc" } },
      content: { orderBy: { order: "asc" } },
      courses: { orderBy: { order: "asc" } },
      qcms: {
        include: {
          questions: {
            include: {
              answers: true,
            },
            orderBy: { order: "asc" },
          },
        },
        orderBy: { order: "asc" },
      },
      evaluations: {
        include: {
          documents: { orderBy: { order: "asc" } },
          questions: {
            include: {
              answers: true,
            },
            orderBy: { order: "asc" },
          },
        },
        orderBy: { order: "asc" },
      },
    },
  });

  if (!formation) {
    return null;
  }

  // Merge all workflow elements into steps
  const steps: FormationStep[] = [
    ...formation.courses.map((c) => ({
      id: c.id,
      title: c.title,
      description: c.description,
      duration: c.duration,
      type: "course" as const,
      status: "locked" as const, // TODO: Add user progress tracking
      order: c.order,
    })),
    ...formation.qcms.map((q) => ({
      id: q.id,
      title: q.title,
      description: q.description,
      duration: q.duration,
      type: "qcm" as const,
      status: "locked" as const, // TODO: Add user progress tracking
      order: q.order,
    })),
    ...formation.evaluations.map((e) => ({
      id: e.id,
      title: e.title,
      description: e.description,
      duration: e.duration,
      type: "evaluation" as const,
      status: "locked" as const, // TODO: Add user progress tracking
      order: e.order,
    })),
  ].sort((a, b) => a.order - b.order);

  // Set first step as current if no progress
  if (steps.length > 0 && formation.progress === 0) {
    steps[0].status = "current";
  }

  return {
    id: formation.id,
    name: formation.name,
    title: formation.name,
    subtitle: formation.subtitle || undefined,
    type: formation.type as "Catalogue" | "Sur-mesure",
    modalities: formation.modalities as ("E-learning" | "Présentiel" | "Distanciel")[],
    status: formation.status as "Publié" | "Brouillon",
    description: formation.description || "",
    image: formation.image || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop",
    userStatus: (formation.progress === 100 ? "completed" : formation.progress > 0 ? "in-progress" : "not-started") as "not-started" | "in-progress" | "completed",
    progress: formation.progress,
    lastViewed: formation.lastViewed ? "Aujourd'hui" : undefined,
    elementsCount: steps.length,
    createdAt: formation.createdAt.toISOString(),
    updatedAt: formation.updatedAt.toISOString(),
    objectives: formation.objectives.map((o) => o.text),
    content: formation.content.map((c) => c.text),
    steps,
  };
}
