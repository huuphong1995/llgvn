import { randomUUID } from "crypto";
import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";

const STORE_PATH = path.join(process.cwd(), "data", "contact-leads.json");

export type ContactLead = {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  service?: string;
  source?: string;
  createdAt: string;
};

export type ContactLeadInput = {
  name: string;
  email: string;
  phone?: string;
  message: string;
  service?: string;
  source?: string;
};

async function readLeads(): Promise<ContactLead[]> {
  try {
    const raw = await readFile(STORE_PATH, "utf8");
    const parsed = JSON.parse(raw) as ContactLead[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function writeLeads(leads: ContactLead[]) {
  await mkdir(path.dirname(STORE_PATH), { recursive: true });
  await writeFile(STORE_PATH, JSON.stringify(leads, null, 2), "utf8");
}

export async function listContactLeads(limit = 100) {
  const leads = await readLeads();
  return leads
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit);
}

export async function saveContactLead(input: ContactLeadInput): Promise<ContactLead> {
  const lead: ContactLead = {
    _id: randomUUID(),
    name: input.name.trim(),
    email: input.email.trim().toLowerCase(),
    phone: input.phone?.trim() || undefined,
    message: input.message.trim(),
    service: input.service?.trim() || undefined,
    source: input.source?.trim() || undefined,
    createdAt: new Date().toISOString(),
  };

  const leads = await readLeads();
  leads.unshift(lead);

  try {
    await writeLeads(leads.slice(0, 500));
  } catch {
    // Vercel/read-only FS: vẫn trả lead để gửi email/webhook.
  }

  return lead;
}
