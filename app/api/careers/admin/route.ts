import { NextRequest, NextResponse } from "next/server";
import { getApplications, updateApplicationStatus } from "@/lib/db";

const ADMIN_PASSCODE = process.env.ADMIN_PASSCODE || "DivineCoreAdmin2026";

function isAuthorized(req: NextRequest): boolean {
  const passcode = req.headers.get("x-admin-passcode");
  return passcode === ADMIN_PASSCODE;
}

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
  }

  try {
    const applications = await getApplications();
    // Sort applications by applied date descending
    const sorted = [...applications].sort(
      (a, b) => new Date(b.appliedAt).getTime() - new Date(a.appliedAt).getTime()
    );
    return NextResponse.json(sorted);
  } catch (error) {
    console.error("Admin GET error:", error);
    return NextResponse.json({ error: "Failed to load application data." }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
  }

  try {
    const { id, status } = await req.json();

    if (!id || !status) {
      return NextResponse.json({ error: "Required fields (id, status) are missing." }, { status: 400 });
    }

    const updated = await updateApplicationStatus(id, status);
    if (!updated) {
      return NextResponse.json({ error: "Application record not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true, application: updated });
  } catch (error) {
    console.error("Admin PUT error:", error);
    return NextResponse.json({ error: "Failed to update status." }, { status: 500 });
  }
}

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
