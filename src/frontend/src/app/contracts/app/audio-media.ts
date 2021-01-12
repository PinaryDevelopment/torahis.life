import { CSharpTimeSpan } from '../time-span';

export interface AudioMedia {
  id: string;
  series: string;
  title: string;
  versions: {
    version: string,
    duration: CSharpTimeSpan,
    shiur: string
  }[];
  author: {
    id: string,
    name: string
  };
  date: Date;
  nextId?: string;
  previousId?: string;
}
