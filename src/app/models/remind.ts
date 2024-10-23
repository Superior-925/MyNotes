import {Tag} from "./tag";

export interface Remind {
  id: number;
  title: string;
  tags: Tag[];
  deadline:Date
  remindMe:Date
}
