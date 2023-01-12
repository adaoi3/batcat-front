import { DateTime } from "luxon";

export interface Pet {
  userId?: number;
  petId?: number;
  species?: string;
  breed?: string;
  name?: string;
  growth?: string;
  weight?: string;
  date?: DateTime;
}
