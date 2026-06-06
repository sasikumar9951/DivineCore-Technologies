import fs from "fs";
import path from "path";

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
  status: "New Application" | "Under Review" | "Shortlisted" | "Interview Scheduled" | "Selected" | "Rejected";
  appliedAt: string; // ISO date string
}

const DATA_DIR = path.join(process.cwd(), "data");
const DB_FILE = path.join(DATA_DIR, "applications.json");

// Ensure data folder and file exist
function initializeDB() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify([], null, 2), "utf8");
  }
}

export async function getApplications(): Promise<CandidateApplication[]> {
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
  initializeDB();
  const applications = await getApplications();
  
  // Generate a unique Application ID: e.g. DCT-2026-0001
  const year = new Date().getFullYear();
  const nextNum = (applications.length + 1).toString().padStart(4, "0");
  const id = `DCT-${year}-${nextNum}`;

  const newApp: CandidateApplication = {
    ...appData,
    id,
    status: "New Application",
    appliedAt: new Date().toISOString(),
  };

  applications.push(newApp);
  await fs.promises.writeFile(DB_FILE, JSON.stringify(applications, null, 2), "utf8");
  return newApp;
}

export async function updateApplicationStatus(
  id: string,
  status: CandidateApplication["status"]
): Promise<CandidateApplication | null> {
  initializeDB();
  const applications = await getApplications();
  const index = applications.findIndex((app) => app.id === id);
  
  if (index === -1) {
    return null;
  }

  applications[index].status = status;
  await fs.promises.writeFile(DB_FILE, JSON.stringify(applications, null, 2), "utf8");
  return applications[index];
}
