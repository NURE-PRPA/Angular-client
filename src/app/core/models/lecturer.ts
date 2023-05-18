import {User} from "./user";
import {Organization} from "./organization";

export class Lecturer extends User {
  experience: number | null = null;
  organization: Organization | null = null;
}
