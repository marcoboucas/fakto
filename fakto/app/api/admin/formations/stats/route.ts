import { NextResponse } from "next/server";
import { getAdminFormationStats } from "@/lib/api/admin-formations";

export async function GET() {
  try {
    const stats = await getAdminFormationStats();
    return NextResponse.json(stats);
  } catch (error) {
    console.error("Error fetching formation stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch formation stats" },
      { status: 500 }
    );
  }
}
