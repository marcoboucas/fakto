import { NextRequest, NextResponse } from "next/server";
import { getAdminFormations } from "@/lib/api/admin-formations";

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const filters = {
      search: searchParams.get("search") || undefined,
      type: searchParams.get("type") || undefined,
      status: searchParams.get("status") || undefined,
      modality: searchParams.get("modality") || undefined,
    };

    const formations = await getAdminFormations(filters);
    return NextResponse.json(formations);
  } catch (error) {
    console.error("Error fetching formations:", error);
    return NextResponse.json(
      { error: "Failed to fetch formations" },
      { status: 500 }
    );
  }
}
