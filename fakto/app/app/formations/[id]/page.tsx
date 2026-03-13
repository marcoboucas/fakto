import { Suspense } from "react";
import { getFormationById } from "@/lib/api/formation-detail";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FormationTimeline } from "@/components/formations/formation-timeline";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

async function FormationDetailContent({ id }: { id: string }) {
  const formation = await getFormationById(id);

  if (!formation) {
    notFound();
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <Link href="/app/formations">
          <Button variant="ghost" size="sm" className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour aux formations
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">{formation.title}</h1>
      </div>

      {/* Objectives and Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Objectifs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                {formation.description}
              </p>
              <p className="text-sm">
                Cette formation express a pour objectif de fournir une compréhension claire et opérationnelle des obligations de lutte contre le blanchiment de capitaux et le financement du terrorisme (LCB-FT) applicables aux acteurs de l&apos;assurance. En 1 heure, les participants sauront identifier les risques, appliquer les obligations de vigilance et sécuriser leurs pratiques pour répondre aux attentes des régulateurs.
              </p>
              <p className="text-sm font-medium">
                À l&apos;issue de la formation, le participant sera capable de mettre en œuvre les compétences suivantes :
              </p>
              <ul className="space-y-2">
                {formation.objectives.map((objective, index) => (
                  <li key={index} className="text-sm flex gap-2">
                    <span className="font-semibold shrink-0">{index + 1}.</span>
                    <span>{objective}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contenu</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                {formation.description}
              </p>
              <p className="text-sm">
                La formation couvre les fondamentaux de la LCB-FT adaptés au secteur assurantiel : typologie des risques, mesures de vigilance, analyse des opérations, détection des signaux d&apos;alerte, obligations de déclaration et de gel des avoirs. Elle inclut également les attentes des autorités lors des contrôles et propose des exemples concrets de situations à risque.
              </p>
              <ul className="space-y-3">
                {formation.content.map((item, index) => (
                  <li key={index} className="text-sm">
                    <span className="font-semibold">• </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Course Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Le parcours de Formations</CardTitle>
        </CardHeader>
        <CardContent className="py-8">
          <FormationTimeline steps={formation.steps} />
          
          <div className="flex justify-center mt-8">
            <Button size="lg" className="bg-green-600 hover:bg-green-700">
              Commencer le parcours
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function FormationDetailLoading() {
  return (
    <div className="space-y-8">
      <div>
        <Skeleton className="h-10 w-48 mb-4" />
        <Skeleton className="h-10 w-2/3" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Skeleton className="h-96" />
        <Skeleton className="h-96" />
      </div>
      <Skeleton className="h-64" />
    </div>
  );
}

export default async function FormationDetailPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;
  
  return (
    <div className="p-8">
      <Suspense fallback={<FormationDetailLoading />}>
        <FormationDetailContent id={id} />
      </Suspense>
    </div>
  );
}
