import {User} from "./user";
import {Organization} from "./organization";

export class Lecturer extends User {
  organization: Organization | null = null;
}
