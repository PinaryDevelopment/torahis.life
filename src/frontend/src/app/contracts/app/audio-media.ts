export interface AudioMedia {
  id: string;
  series: string;
  title: string;
  versions: {
    version: string,
    duration: string,
    shiur: string
  }[];
  author: {
    id: number,
    name: string
  };
  date: Date;
  nextId?: number;
  previousId?: number;
}
