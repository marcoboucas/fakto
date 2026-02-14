import { prisma } from "@/lib/prisma";
import {
  AdminFormation,
  AdminFormationStats,
  AdminFormationDetail,
  AdminFormationInput,
  CourseInput,
  QcmInput,
  EvaluationInput,
  Course,
  Qcm,
  Evaluation,
} from "@/types/formations";

// ========================================
// Formation CRUD
// ========================================

export async function getAdminFormations(filters: {
  search?: string;
  type?: string;
  status?: string;
  modality?: string;
} = {}): Promise<AdminFormation[]> {
  const { search, type, status, modality } = filters;
  const where: Record<string, unknown> = {};

  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { description: { contains: search, mode: "insensitive" } },
    ];
  }

  if (type && type !== "all-types") {
    where.type = type;
  }

  if (status && status !== "all-status") {
    where.status = status;
  }

  if (modality && modality !== "all-modalities") {
    where.modalities = {
      has: modality,
    };
  }

  const formations = await prisma.formation.findMany({
    where,
    select: {
      id: true,
      name: true,
      subtitle: true,
      type: true,
      modalities: true,
      status: true,
      description: true,
      image: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  return formations.map((f: typeof formations[0]) => ({
    id: f.id,
    name: f.name,
    subtitle: f.subtitle || undefined,
    type: f.type as "Catalogue" | "Sur-mesure",
    modalities: f.modalities as ("E-learning" | "Présentiel" | "Distanciel")[],
    status: f.status as "Publié" | "Brouillon",
    description: f.description || undefined,
    image: f.image || undefined,
    createdAt: f.createdAt.toISOString(),
    updatedAt: f.updatedAt.toISOString(),
    lastModified: f.updatedAt.toLocaleDateString("fr-FR"),
  }));
}

export async function getAdminFormationById(
  id: string
): Promise<AdminFormationDetail | null> {
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

  if (!formation) return null;

  // Merge and sort all workflow elements by order
  const workflow: (Course | Qcm | Evaluation)[] = [
    ...formation.courses.map((c) => ({
      ...c,
      type: "course" as const,
    })),
    ...formation.qcms.map((q) => ({
      ...q,
      type: "qcm" as const,
      questions: q.questions.map((question) => ({
        ...question,
        answers: question.answers,
      })),
    })),
    ...formation.evaluations.map((e) => ({
      ...e,
      type: "evaluation" as const,
      documents: e.documents,
      questions: e.questions.map((question) => ({
        ...question,
        answers: question.answers,
      })),
    })),
  ].sort((a, b) => a.order - b.order);

  return {
    id: formation.id,
    name: formation.name,
    subtitle: formation.subtitle || undefined,
    type: formation.type as "Catalogue" | "Sur-mesure",
    modalities: formation.modalities as ("E-learning" | "Présentiel" | "Distanciel")[],
    status: formation.status as "Publié" | "Brouillon",
    description: formation.description || undefined,
    image: formation.image || undefined,
    createdAt: formation.createdAt.toISOString(),
    updatedAt: formation.updatedAt.toISOString(),
    objectives: formation.objectives.map((o) => o.text),
    content: formation.content.map((c) => c.text),
    workflow,
  };
}

export async function createFormation(
  data: AdminFormationInput
): Promise<AdminFormation> {
  const formation = await prisma.formation.create({
    data: {
      name: data.name,
      subtitle: data.subtitle,
      type: data.type,
      modalities: data.modalities,
      status: data.status,
      description: data.description,
      image: data.image,
      objectives: data.objectives
        ? {
            create: data.objectives.map((text, index) => ({
              text,
              order: index,
            })),
          }
        : undefined,
      content: data.content
        ? {
            create: data.content.map((text, index) => ({
              text,
              order: index,
            })),
          }
        : undefined,
    },
  });

  return {
    id: formation.id,
    name: formation.name,
    subtitle: formation.subtitle || undefined,
    type: formation.type as "Catalogue" | "Sur-mesure",
    modalities: formation.modalities as ("E-learning" | "Présentiel" | "Distanciel")[],
    status: formation.status as "Publié" | "Brouillon",
    description: formation.description || undefined,
    image: formation.image || undefined,
    createdAt: formation.createdAt.toISOString(),
    updatedAt: formation.updatedAt.toISOString(),
    lastModified: formation.updatedAt.toLocaleDateString("fr-FR"),
  };
}

export async function updateFormation(
  id: string,
  data: Partial<AdminFormationInput>
): Promise<AdminFormation> {
  const formation = await prisma.formation.update({
    where: { id },
    data: {
      name: data.name,
      subtitle: data.subtitle,
      type: data.type,
      modalities: data.modalities,
      status: data.status,
      description: data.description,
      image: data.image,
    },
  });

  return {
    id: formation.id,
    name: formation.name,
    subtitle: formation.subtitle || undefined,
    type: formation.type as "Catalogue" | "Sur-mesure",
    modalities: formation.modalities as ("E-learning" | "Présentiel" | "Distanciel")[],
    status: formation.status as "Publié" | "Brouillon",
    description: formation.description || undefined,
    image: formation.image || undefined,
    createdAt: formation.createdAt.toISOString(),
    updatedAt: formation.updatedAt.toISOString(),
    lastModified: formation.updatedAt.toLocaleDateString("fr-FR"),
  };
}

export async function deleteFormation(id: string): Promise<void> {
  await prisma.formation.delete({
    where: { id },
  });
}

export async function getAdminFormationStats(): Promise<AdminFormationStats> {
  const [total, published, drafts, custom] = await Promise.all([
    prisma.formation.count(),
    prisma.formation.count({ where: { status: "Publié" } }),
    prisma.formation.count({ where: { status: "Brouillon" } }),
    prisma.formation.count({ where: { type: "Sur-mesure" } }),
  ]);

  return {
    total,
    published,
    drafts,
    custom,
  };
}

// ========================================
// Course CRUD
// ========================================

export async function createCourse(
  formationId: string,
  data: CourseInput
): Promise<Course> {
  const course = await prisma.course.create({
    data: {
      ...data,
      formationId,
    },
  });

  return {
    ...course,
    type: "course",
  };
}

export async function updateCourse(
  id: string,
  data: Partial<CourseInput>
): Promise<Course> {
  const course = await prisma.course.update({
    where: { id },
    data,
  });

  return {
    ...course,
    type: "course",
  };
}

export async function deleteCourse(id: string): Promise<void> {
  await prisma.course.delete({
    where: { id },
  });
}

// ========================================
// QCM CRUD
// ========================================

export async function createQcm(
  formationId: string,
  data: QcmInput
): Promise<Qcm> {
  const qcm = await prisma.qcm.create({
    data: {
      title: data.title,
      description: data.description,
      duration: data.duration,
      order: data.order,
      formationId,
      questions: {
        create: data.questions.map((q) => ({
          text: q.text,
          order: q.order,
          answers: {
            create: q.answers.map((a) => ({
              text: a.text,
              isCorrect: a.isCorrect,
              detailedResponse: a.detailedResponse,
            })),
          },
        })),
      },
    },
    include: {
      questions: {
        include: {
          answers: true,
        },
        orderBy: { order: "asc" },
      },
    },
  });

  return {
    ...qcm,
    type: "qcm",
    questions: qcm.questions.map((q) => ({
      ...q,
      answers: q.answers,
    })),
  };
}

export async function updateQcm(
  id: string,
  data: Partial<Omit<QcmInput, "questions">>
): Promise<Qcm> {
  const qcm = await prisma.qcm.update({
    where: { id },
    data: {
      title: data.title,
      description: data.description,
      duration: data.duration,
      order: data.order,
    },
    include: {
      questions: {
        include: {
          answers: true,
        },
        orderBy: { order: "asc" },
      },
    },
  });

  return {
    ...qcm,
    type: "qcm",
    questions: qcm.questions.map((q) => ({
      ...q,
      answers: q.answers,
    })),
  };
}

export async function deleteQcm(id: string): Promise<void> {
  await prisma.qcm.delete({
    where: { id },
  });
}

// ========================================
// Evaluation CRUD
// ========================================

export async function createEvaluation(
  formationId: string,
  data: EvaluationInput
): Promise<Evaluation> {
  const evaluation = await prisma.evaluation.create({
    data: {
      title: data.title,
      description: data.description,
      detailedDescription: data.detailedDescription,
      duration: data.duration,
      order: data.order,
      formationId,
      documents: {
        create: data.documents.map((d) => ({
          title: d.title,
          url: d.url,
          order: d.order,
        })),
      },
      questions: {
        create: data.questions.map((q) => ({
          text: q.text,
          order: q.order,
          answers: {
            create: q.answers.map((a) => ({
              text: a.text,
              isCorrect: a.isCorrect,
              detailedResponse: a.detailedResponse,
            })),
          },
        })),
      },
    },
    include: {
      documents: { orderBy: { order: "asc" } },
      questions: {
        include: {
          answers: true,
        },
        orderBy: { order: "asc" },
      },
    },
  });

  return {
    ...evaluation,
    type: "evaluation",
    documents: evaluation.documents,
    questions: evaluation.questions.map((q) => ({
      ...q,
      answers: q.answers,
    })),
  };
}

export async function updateEvaluation(
  id: string,
  data: Partial<Omit<EvaluationInput, "documents" | "questions">>
): Promise<Evaluation> {
  const evaluation = await prisma.evaluation.update({
    where: { id },
    data: {
      title: data.title,
      description: data.description,
      detailedDescription: data.detailedDescription,
      duration: data.duration,
      order: data.order,
    },
    include: {
      documents: { orderBy: { order: "asc" } },
      questions: {
        include: {
          answers: true,
        },
        orderBy: { order: "asc" },
      },
    },
  });

  return {
    ...evaluation,
    type: "evaluation",
    documents: evaluation.documents,
    questions: evaluation.questions.map((q) => ({
      ...q,
      answers: q.answers,
    })),
  };
}

export async function deleteEvaluation(id: string): Promise<void> {
  await prisma.evaluation.delete({
    where: { id },
  });
}
