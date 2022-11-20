import { Job } from "services/jobs/models";

export interface Skill {
  id: number;
  skill_name: string;
  skill_proficiency: string;
  skill_frequency: number;
  jobs: Job[];
  user: string;
}
