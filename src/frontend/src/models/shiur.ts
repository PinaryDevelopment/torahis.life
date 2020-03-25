import { Tag } from './tag';
import { TagType } from './tag-type.enum';
import { Author } from './author';

export class Shiur {
    public title: string;
    public tags: Tag[];
    public date: Date;
    public duration: string;
    public id: number;
    public previousId?: number;
    public nextId?: number;
    public author: Author;

    constructor({ title = '', tags = [], date, duration = '', id, previousId, nextId, author }) {
        this.title = title;
        this.tags = tags;
        this.date = date;
        this.duration = duration;
        this.id = id;
        this.previousId = previousId;
        this.nextId = nextId;
        this.author = author;
    }

    public get series() {
        return this.tags.filter(tag => tag.type === TagType.Series).map(tag => tag.tag);
    }
}