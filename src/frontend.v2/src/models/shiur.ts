import { Tag } from './tag';
import { TagType } from './tag-type.enum';

export class Shiur {
    public title: string;
    public tags: Tag[];
    public date: Date;
    public duration: string;

    constructor({title = '', tags = [], date, duration = '' }) {
        this.title = title;
        this.tags = tags;
        this.date = date;
        this.duration = duration;
    }

    public get author() {
        return this.tags.find(tag => tag.type === TagType.Author).tag;
    }

    public get series() {
        return this.tags.filter(tag => tag.type === TagType.Series).map(tag => tag.tag);
    }
}