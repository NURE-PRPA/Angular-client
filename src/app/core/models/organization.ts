import {Lecturer} from "./lecturer";

export const OrganizationTypes: Record<number, string> = {
  0 : "None",
  1 : "School",
  2 : "University",
  3 : "College",
  4 : "Company"
};

export class Organization {
  id: string | null = "";
  name: string | null = "";
  type: number = 0;
  lecturers: Lecturer[] = [];
}
