import { FormationEditor } from "@/components/admin/formation-editor";

export default function NewFormationPage() {
  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Créer une formation</h1>
        <p className="text-muted-foreground mt-2">
          Créez une nouvelle formation et ajoutez des cours, QCMs et évaluations
        </p>
      </div>
      
      <FormationEditor />
    </div>
  );
}
