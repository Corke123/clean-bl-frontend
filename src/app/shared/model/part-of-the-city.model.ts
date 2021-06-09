import { Street } from './street.model';

export interface PartOfTheCity {
  id?: number;
  name: string;
  streets?: Street[];
}
