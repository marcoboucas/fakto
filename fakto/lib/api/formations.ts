import { Formation } from "@/components/formations/formation-card";

export async function getFormations(): Promise<Formation[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100));

  // Mock data
  return [
    {
      id: "1",
      title: "How to Create a Course in iSpring LMS",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop",
      status: "in-progress",
      progress: 20,
      lastViewed: "Dernier visualisé",
    },
    {
      id: "2",
      title: "How to Get Started With iSpring LMS",
      image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&h=300&fit=crop",
      status: "not-started",
      progress: 0,
      elementsCount: 1,
    },
    {
      id: "3",
      title: "Créer son cabinet de courtage en assurance : Tout savoir en 4h",
      image: "https://images.unsplash.com/photo-1551836022-4c4c79ecde51?w=400&h=300&fit=crop",
      status: "completed",
      progress: 100,
    },
    {
      id: "4",
      title: "Marketing Digital pour Entrepreneurs",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
      status: "in-progress",
      progress: 65,
      lastViewed: "Dernier visualisé",
    },
    {
      id: "5",
      title: "Gestion de Projet Agile",
      image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=400&h=300&fit=crop",
      status: "not-started",
      progress: 0,
      elementsCount: 8,
    },
    {
      id: "6",
      title: "Communication et Leadership",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
      status: "completed",
      progress: 100,
    },
  ];
}
