import { TagTypeDto } from './tag-type.enum';

export interface TagDto {
  id: string;
  tag: string;
  type: TagTypeDto;
}
