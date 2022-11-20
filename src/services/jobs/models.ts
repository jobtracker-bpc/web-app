import { Contact } from "services/contacts/models";
import { Skill } from "services/skills/models";

export interface Job {
  id: number;
  job_title: string;
  job_link: string;
  company: string;
  date_applied: string;
  interview: string;
  status: string;
  user: string;
  skills: Skill[];
  contacts: Contact[];
}
