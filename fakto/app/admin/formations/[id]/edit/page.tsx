import { getAdminFormationById } from "@/lib/api/admin-formations";
import { FormationEditor } from "@/components/admin/formation-editor";
import { notFound } from "next/navigation";

export default async function EditFormationPage({ params }: { params: { id: string } }) {
  const formation = await getAdminFormationById(params.id);
  
  if (!formation) {
    notFound();
  }

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Modifier la formation</h1>
        <p className="text-muted-foreground mt-2">
          Modifiez les informations et le workflow de la formation
        </p>
      </div>
      
      <FormationEditor formation={formation} />
    </div>
  );
}
