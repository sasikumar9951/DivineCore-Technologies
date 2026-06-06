import fs from "fs";
import path from "path";
import { neon } from "@neondatabase/serverless";

export interface CandidateApplication {
  id: string; // e.g. "DCT-2026-0001"
  applicationType: "Internship" | "Full-Time";
  role: string;
  fullName: string;
  mobileNumber: string;
  emailAddress: string;
  currentLocation: string;
  education: string;
  experience: number;
  resumeUrl: string; // File path or download link
  coverLetter?: string;
  linkedIn?: string;
  portfolio?: string;
  status: "New Application" | "Under Review" | "Shortlisted" | "Interview Scheduled" | "Selected" | "Rejected";
  appliedAt: string; // ISO date string
}

const DATA_DIR = path.join(process.cwd(), "data");
const DB_FILE = path.join(DATA_DIR, "applications.json");

// Check if we are running on Vercel with Neon SQL database configured
const isVercel = typeof process.env.DATABASE_URL !== "undefined" || typeof process.env.POSTGRES_URL !== "undefined";

// Helper to map a Postgres snake_case row to camelCase CandidateApplication interface
function mapRowToApplication(row: any): CandidateApplication {
  return {
    id: row.id,
    applicationType: row.application_type,
    role: row.role,
    fullName: row.full_name,
    mobileNumber: row.mobile_number,
    emailAddress: row.email_address,
    currentLocation: row.current_location,
    education: row.education,
    experience: row.experience,
    resumeUrl: row.resume_url,
    coverLetter: row.cover_letter || "",
    linkedIn: row.linkedin || "",
    portfolio: row.portfolio || "",
    status: row.status,
    appliedAt: new Date(row.applied_at).toISOString(),
  };
}

async function initializeDB() {
  if (isVercel) {
    try {
      const dbUrl = process.env.DATABASE_URL || process.env.POSTGRES_URL || "";
      const sql = neon(dbUrl);
      
      // Auto-create applications table in Neon PostgreSQL if it does not exist
      await sql`
        CREATE TABLE IF NOT EXISTS applications (
          id VARCHAR(50) PRIMARY KEY,
          application_type VARCHAR(20) NOT NULL,
          role VARCHAR(100) NOT NULL,
          full_name VARCHAR(100) NOT NULL,
          mobile_number VARCHAR(20) NOT NULL,
          email_address VARCHAR(100) NOT NULL,
          current_location VARCHAR(100) NOT NULL,
          education VARCHAR(100) NOT NULL,
          experience INTEGER NOT NULL,
          resume_url TEXT NOT NULL,
          cover_letter TEXT,
          linkedin TEXT,
          portfolio TEXT,
          status VARCHAR(50) DEFAULT 'New Application',
          applied_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        )
      `;
    } catch (err) {
      console.error("Neon Postgres initialization error:", err);
    }
    return;
  }

  // Local filesystem initialization
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify([], null, 2), "utf8");
  }
}

export async function getApplications(): Promise<CandidateApplication[]> {
  if (isVercel) {
    try {
      const dbUrl = process.env.DATABASE_URL || process.env.POSTGRES_URL || "";
      if (!dbUrl) {
        console.error("Database URL is missing on Vercel.");
        return [];
      }
      const sql = neon(dbUrl);
      await initializeDB();
      const rows = await sql`SELECT * FROM applications ORDER BY applied_at DESC`;
      return rows.map(mapRowToApplication);
    } catch (error) {
      console.error("Neon Postgres read error:", error);
      return [];
    }
  }

  initializeDB();
  try {
    const data = await fs.promises.readFile(DB_FILE, "utf8");
    return JSON.parse(data) as CandidateApplication[];
  } catch (error) {
    console.error("Error reading applications database:", error);
    return [];
  }
}

export async function saveApplication(appData: Omit<CandidateApplication, "id" | "status" | "appliedAt">): Promise<CandidateApplication> {
  if (isVercel) {
    const dbUrl = process.env.DATABASE_URL || process.env.POSTGRES_URL || "";
    if (!dbUrl) {
      throw new Error("DATABASE_URL is missing.");
    }
    const sql = neon(dbUrl);
    await initializeDB();
    
    // Calculate sequential application ID
    const countResult = await sql`SELECT COUNT(*)::integer as count FROM applications`;
    const totalCount = countResult[0]?.count || 0;
    
    const year = new Date().getFullYear();
    const nextNum = (totalCount + 1).toString().padStart(4, "0");
    const id = `DCT-${year}-${nextNum}`;
    const status = "New Application";
    const appliedAt = new Date().toISOString();

    await sql`
      INSERT INTO applications (
        id, application_type, role, full_name, mobile_number, email_address, 
        current_location, education, experience, resume_url, cover_letter, linkedin, portfolio, status, applied_at
      ) VALUES (
        ${id}, ${appData.applicationType}, ${appData.role}, ${appData.fullName}, ${appData.mobileNumber}, ${appData.emailAddress},
        ${appData.currentLocation}, ${appData.education}, ${appData.experience}, ${appData.resumeUrl}, ${appData.coverLetter || ""}, 
        ${appData.linkedIn || ""}, ${appData.portfolio || ""}, ${status}, ${appliedAt}
      )
    `;

    return {
      ...appData,
      id,
      status,
      appliedAt,
    };
  }

  // Local filesystem persistence
  const applications = await getApplications();
  const year = new Date().getFullYear();
  const nextNum = (applications.length + 1).toString().padStart(4, "0");
  const id = `DCT-${year}-${nextNum}`;
  const status = "New Application";
  const appliedAt = new Date().toISOString();

  const newApp: CandidateApplication = {
    ...appData,
    id,
    status,
    appliedAt,
  };

  applications.push(newApp);
  initializeDB();
  await fs.promises.writeFile(DB_FILE, JSON.stringify(applications, null, 2), "utf8");

  return newApp;
}

export async function updateApplicationStatus(
  id: string,
  status: CandidateApplication["status"]
): Promise<CandidateApplication | null> {
  if (isVercel) {
    const dbUrl = process.env.DATABASE_URL || process.env.POSTGRES_URL || "";
    if (!dbUrl) {
      throw new Error("DATABASE_URL is missing.");
    }
    const sql = neon(dbUrl);
    await initializeDB();
    
    const rows = await sql`
      UPDATE applications 
      SET status = ${status} 
      WHERE id = ${id}
      RETURNING *
    `;

    if (rows.length === 0) {
      return null;
    }

    return mapRowToApplication(rows[0]);
  }

  // Local filesystem persistence
  const applications = await getApplications();
  const index = applications.findIndex((app) => app.id === id);
  
  if (index === -1) {
    return null;
  }

  applications[index].status = status;
  initializeDB();
  await fs.promises.writeFile(DB_FILE, JSON.stringify(applications, null, 2), "utf8");

  return applications[index];
}
