import { CSharpTimeSpan } from '../time-span';

export interface AudioMediaDto {
  id: string;
  title: string;
  duration: CSharpTimeSpan;
  orderInSeries: number;
  releasedOn: string;
  authorId: string;
  organizationId: string;
  tagIds: string[];
  previousId?: string;
  nextId?: string;
}
