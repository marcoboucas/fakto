import { Suspense } from "react";
import { getFormations } from "@/lib/api/formations";
import { FormationsList } from "@/components/formations/formations-list";
import { FormationsLoading } from "@/components/formations/formations-loading";

// Force dynamic rendering for this page
export const dynamic = 'force-dynamic';

async function FormationsData() {
  const formations = await getFormations();
  return <FormationsList formations={formations} />;
}

export default function FormationsPage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Formations</h1>
        <p className="text-muted-foreground">
          Gérez vos formations et suivez votre progression
        </p>
      </div>

      <Suspense fallback={<FormationsLoading />}>
        <FormationsData />
      </Suspense>
    </div>
  );
}
