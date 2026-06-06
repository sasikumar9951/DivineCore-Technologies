import { NextRequest, NextResponse } from "next/server";
import { saveApplication } from "@/lib/db";
import { sendConfirmationEmail } from "@/lib/email";
import { put } from "@vercel/blob";
import fs from "fs";
import path from "path";

// Check if we are running on Vercel (Cloud environment configured)
const isVercel = 
  typeof process.env.BLOB_READ_WRITE_TOKEN !== "undefined" || 
  typeof process.env.DATABASE_URL !== "undefined" || 
  typeof process.env.VERCEL !== "undefined";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    
    const fullName = formData.get("fullName") as string;
    const emailAddress = formData.get("emailAddress") as string;
    const mobileNumber = formData.get("mobileNumber") as string;
    const currentLocation = formData.get("currentLocation") as string;
    const education = formData.get("education") as string;
    const experienceVal = formData.get("experience") as string;
    const experience = parseInt(experienceVal || "0", 10);
    const applicationType = formData.get("applicationType") as "Internship" | "Full-Time";
    const role = formData.get("role") as string;
    const coverLetter = (formData.get("coverLetter") as string) || "";
    const linkedIn = (formData.get("linkedIn") as string) || "";
    const portfolio = (formData.get("portfolio") as string) || "";
    const resumeFile = formData.get("resume") as File;

    if (!fullName || !emailAddress || !mobileNumber || !resumeFile || !applicationType || !role) {
      return NextResponse.json({ error: "Required fields are missing." }, { status: 400 });
    }

    // Enforce 2 MB max file size for resumes
    const MAX_FILE_SIZE_BYTES = 2 * 1024 * 1024; // 2 MB
    if (resumeFile.size > MAX_FILE_SIZE_BYTES) {
      return NextResponse.json({ 
        error: "Resume file size exceeds the 2 MB limit. Please upload a smaller file." 
      }, { status: 400 });
    }

    // Only accept PDF files
    const allowedTypes = ["application/pdf"];
    if (!allowedTypes.includes(resumeFile.type) && !resumeFile.name.toLowerCase().endsWith(".pdf")) {
      return NextResponse.json({ 
        error: "Only PDF files are accepted for resume uploads." 
      }, { status: 400 });
    }

    let resumeUrl = "";
    
    const timestamp = Date.now();
    const cleanName = fullName.replace(/[^a-zA-Z0-9]/g, "_").toLowerCase();
    const originalExtension = path.extname(resumeFile.name) || ".pdf";
    const safeFilename = `resume_${cleanName}_${timestamp}${originalExtension}`;

    if (isVercel) {
      try {
        // Upload resume directly to Vercel Blob cloud bucket
        const blob = await put(safeFilename, resumeFile, {
          access: "private",
        });
        resumeUrl = blob.url;
      } catch (blobErr: any) {
        console.error("Vercel Blob upload failed:", blobErr);
        return NextResponse.json({ 
          error: "Resume cloud upload failed. Please try again.",
          details: blobErr.message || String(blobErr)
        }, { status: 500 });
      }
    } else {
      // Ensure local upload directory exists (Localhost development)
      const uploadsDir = path.join(process.cwd(), "public", "uploads", "resumes");
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }

      const filePath = path.join(uploadsDir, safeFilename);

      // Save file buffer
      const arrayBuffer = await resumeFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      await fs.promises.writeFile(filePath, buffer);

      resumeUrl = `/uploads/resumes/${safeFilename}`;
    }

    // Store applicant in database (Vercel KV or local JSON file)
    const savedApp = await saveApplication({
      fullName,
      emailAddress,
      mobileNumber,
      currentLocation,
      education,
      experience,
      applicationType,
      role,
      resumeUrl,
      coverLetter,
      linkedIn,
      portfolio,
    });

    // Dispatch confirmation email
    try {
      await sendConfirmationEmail({
        to: emailAddress,
        candidateName: fullName,
        role,
        applicationId: savedApp.id,
        applicationType,
      });
    } catch (emailErr) {
      console.error("Nodemailer confirmation failed:", emailErr);
    }

    return NextResponse.json({
      success: true,
      message: "Thank you for applying to DivineCore Technologies. Your application has been submitted successfully. Our recruitment team will review your profile and contact shortlisted candidates.",
      applicationId: savedApp.id,
    });
  } catch (error: any) {
    console.error("Application POST error:", error);
    return NextResponse.json({ 
      error: "Internal server error occurred.", 
      details: error?.message || String(error),
      stack: error?.stack 
    }, { status: 500 });
  }
}

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
