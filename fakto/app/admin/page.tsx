import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  BookOpen, 
  Settings,
  BarChart3,
  TrendingUp,
  FileText
} from "lucide-react";

export default function AdminPage() {
  const currentDate = new Date().toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long"
  });

  return (
    <div className="p-8">
          {/* Greeting */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Tableau de bord admin</h1>
            <p className="text-muted-foreground">{currentDate}</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Utilisateurs actifs</p>
                    <CardTitle className="text-3xl font-bold">1,234</CardTitle>
                    <div className="flex items-center gap-1 text-xs text-green-600 mt-2">
                      <TrendingUp className="h-3 w-3" />
                      <span>+12% ce mois</span>
                    </div>
                  </div>
                  <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Formations</p>
                    <CardTitle className="text-3xl font-bold">45</CardTitle>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-2">
                      <span>3 en cours de création</span>
                    </div>
                  </div>
                  <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                    <BookOpen className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                </div>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Taux de complétion</p>
                    <CardTitle className="text-3xl font-bold">68%</CardTitle>
                    <div className="flex items-center gap-1 text-xs text-green-600 mt-2">
                      <TrendingUp className="h-3 w-3" />
                      <span>+5% vs mois dernier</span>
                    </div>
                  </div>
                  <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                    <BarChart3 className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                </div>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Compétences validées</p>
                    <CardTitle className="text-3xl font-bold">892</CardTitle>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-2">
                      <span>Ce mois</span>
                    </div>
                  </div>
                  <div className="p-2 bg-amber-100 dark:bg-amber-900 rounded-lg">
                    <FileText className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                  </div>
                </div>
              </CardHeader>
            </Card>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Recent Users */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Utilisateurs récents</CardTitle>
                    <CardDescription>Dernières inscriptions</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">Voir tout</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=User${i}`}
                          alt={`User ${i}`}
                          className="w-10 h-10 rounded-full"
                        />
                        <div>
                          <p className="font-medium text-sm">Utilisateur {i}</p>
                          <p className="text-xs text-muted-foreground">user{i}@example.com</p>
                        </div>
                      </div>
                      <Badge variant="secondary">Nouveau</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Popular Formations */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Formations populaires</CardTitle>
                    <CardDescription>Les plus suivies ce mois</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">Voir tout</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { title: "Courtage en assurance", users: 156, completion: 78 },
                    { title: "Gestion de projet", users: 142, completion: 82 },
                    { title: "Marketing digital", users: 128, completion: 65 },
                    { title: "Communication client", users: 115, completion: 71 },
                    { title: "Réglementation", users: 98, completion: 88 }
                  ].map((formation, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{formation.title}</p>
                        <p className="text-xs text-muted-foreground">{formation.users} utilisateurs</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{formation.completion}%</p>
                        <div className="w-20 h-1.5 bg-muted rounded-full overflow-hidden mt-1">
                          <div 
                            className="h-full bg-primary" 
                            style={{ width: `${formation.completion}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Actions rapides */}
          <Card>
            <CardHeader>
              <CardTitle>Actions rapides</CardTitle>
              <CardDescription>Gérer votre plateforme</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button variant="outline" className="h-auto py-6 flex flex-col gap-2">
                  <Users className="h-6 w-6" />
                  <span>Gérer utilisateurs</span>
                </Button>
                <Button variant="outline" className="h-auto py-6 flex flex-col gap-2">
                  <BookOpen className="h-6 w-6" />
                  <span>Créer formation</span>
                </Button>
                <Button variant="outline" className="h-auto py-6 flex flex-col gap-2">
                  <BarChart3 className="h-6 w-6" />
                  <span>Voir rapports</span>
                </Button>
                <Button variant="outline" className="h-auto py-6 flex flex-col gap-2">
                  <Settings className="h-6 w-6" />
                  <span>Paramètres</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
  );
}
