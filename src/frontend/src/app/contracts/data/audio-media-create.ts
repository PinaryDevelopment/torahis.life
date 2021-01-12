export interface AudioMediaCreateDto {
  title: string;
  orderInSeries: number;
  releasedOn: Date;
  authorId: string;
  tagIds: string[];
  // previousId?: string;
  // nextId?: string;
}
