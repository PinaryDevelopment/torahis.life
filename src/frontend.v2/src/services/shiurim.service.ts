import { HttpClient, inject } from 'aurelia';
import { Tag, Shiur, TagType } from '../models/index';
import { Shiur as ApiShiur } from './shiur';

@inject(HttpClient)
export class ShiurimService {
    public constructor(private client: HttpClient) {
    }

    async getShiurim(tags?: Tag[]) {
        const response = await this.client.get(`http://localhost:7071/api/ShiurInfo?${tags.map(tag => `tags=${tag.tag}`).join('&')}`);
        const data: { tags: Tag[], shiurim: ApiShiur[] } = await response.json();
        return data.shiurim
                   .map<Shiur>((dataShiur: ApiShiur) => new Shiur({
                       date: new Date(Date.parse(dataShiur.date)),
                       duration: dataShiur.duration,
                       tags: dataShiur.tags.map(tagId => data.tags[tagId]),
                       title: dataShiur.title
                   }));
    }
}