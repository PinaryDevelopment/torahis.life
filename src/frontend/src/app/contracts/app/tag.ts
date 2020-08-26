import { TagType } from './tag-type.enum';

export interface Tag {
  id: number;
  tag: string;
  type: TagType;
}
