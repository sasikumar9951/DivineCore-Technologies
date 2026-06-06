import { NextRequest, NextResponse } from "next/server";
import { get } from "@vercel/blob";

const ADMIN_PASSCODE = process.env.ADMIN_PASSCODE || "DivineCoreAdmin2026";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const fileUrl = searchParams.get("url");
  const passcode = searchParams.get("passcode") || req.headers.get("x-admin-passcode");

  if (passcode !== ADMIN_PASSCODE) {
    return new Response("Unauthorized access.", { status: 401 });
  }

  if (!fileUrl) {
    return new Response("Missing file URL.", { status: 400 });
  }

  try {
    if (fileUrl.startsWith("/uploads/")) {
      // Local development fallback redirect
      return NextResponse.redirect(new URL(fileUrl, req.url));
    }

    // Fetch private Vercel Blob file stream using SDK
    const result = await get(fileUrl, { access: "private" });

    if (!result) {
      return new Response("File not found.", { status: 404 });
    }

    if (result.statusCode === 304 || result.stream === null) {
      return new Response(null, { status: 304 });
    }

    const filename = fileUrl.split("/").pop() || "resume.pdf";

    const headers = new Headers();
    headers.set("Content-Type", result.blob.contentType || "application/pdf");
    headers.set("Content-Disposition", `inline; filename="${filename}"`);

    return new Response(result.stream, { headers });
  } catch (error: any) {
    console.error("Resume download error:", error);
    return new Response(`Error retrieving file: ${error.message || String(error)}`, { status: 500 });
  }
}

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
