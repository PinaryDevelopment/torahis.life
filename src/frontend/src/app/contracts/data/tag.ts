import { TagTypeDto } from './tag-type.enum';

export interface TagDto {
  id: number;
  tag: string;
  type: TagTypeDto;
}
