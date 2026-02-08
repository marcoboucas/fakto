import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";

export default function AppPage() {
  const currentDate = new Date().toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long"
  });

  return (
    <div className="p-8">
          {/* Greeting */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Bonjour, Clarisse</h1>
            <p className="text-muted-foreground">{currentDate}</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Formation en cours</p>
                    <CardTitle className="text-3xl font-bold">4/15</CardTitle>
                  </div>
                  <div className="p-2 bg-muted rounded-lg">
                    <BookOpen className="h-5 w-5" />
                  </div>
                </div>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Compétences validées</p>
                    <CardTitle className="text-3xl font-bold">2</CardTitle>
                  </div>
                </div>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Objectif du mois</p>
                    <CardTitle className="text-3xl font-bold">12h</CardTitle>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </div>

          {/* Tabs */}
          <div className="flex gap-8 mb-6 border-b">
            <button className="pb-4 border-b-2 border-primary font-medium">
              Formation
            </button>
            <button className="pb-4 text-muted-foreground hover:text-foreground">
              Compétences
            </button>
            <button className="pb-4 text-muted-foreground hover:text-foreground">
              Ressources
            </button>
          </div>

          {/* Formations en cours */}
          <section className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                Formations en cours
                <span className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs">
                  1
                </span>
              </h2>
            </div>

            <Card>
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <img
                    src="https://images.unsplash.com/photo-1551836022-4c4c79ecde51?w=200&h=200&fit=crop"
                    alt="Formation"
                    className="w-24 h-24 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <Badge variant="outline" className="mb-2">
                      Assignée
                    </Badge>
                    <h3 className="font-semibold mb-2">
                      Créer son cabinet de courtage en assurance : Tout savoir en 4h
                    </h3>
                    <Button variant="secondary" size="sm">
                      Continuer la formation
                    </Button>
                  </div>
                  <div className="text-right">
                    <Badge variant="secondary">En cours (20% vue)</Badge>
                    <div className="mt-2 w-32 h-1 bg-muted rounded-full overflow-hidden">
                      <div className="h-full w-[20%] bg-primary"></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Formations terminées */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Formations terminées</h2>
            </div>

            <Card>
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <img
                    src="https://images.unsplash.com/photo-1551836022-4c4c79ecde51?w=200&h=200&fit=crop"
                    alt="Formation"
                    className="w-24 h-24 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <Badge variant="outline" className="mb-2">
                      Assignée
                    </Badge>
                    <h3 className="font-semibold mb-2">
                      Créer son cabinet de courtage en assurance : Tout savoir en 4h
                    </h3>
                    <Button variant="secondary" size="sm">
                      Télécharger les documents
                    </Button>
                  </div>
                  <div className="text-right">
                    <Badge className="bg-green-500 text-white">Terminées (100%)</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
  );
}
