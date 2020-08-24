export interface AudioMediaDto {
  id: number;
  title: string;
  tags: number[];
  date: string;
  duration: string;
  previousId?: number;
  nextId?: number;
  authorId: number;
  authorName: string;
}
