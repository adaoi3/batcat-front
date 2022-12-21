import { DateTime } from "luxon";

export interface User {
  id?: number;
  firstName?: string;
  lastName?: string;
  login?: string;
  password?: string;
  email?: string;
  roles?: string[];
  date?: DateTime;
}
