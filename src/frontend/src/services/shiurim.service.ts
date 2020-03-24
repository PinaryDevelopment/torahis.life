import { HttpClient, inject } from 'aurelia';
import { Tag, Shiur, Author } from '../models/index';
import { Shiur as ApiShiur } from './shiur';

@inject(HttpClient)
export class ShiurimService {
    public constructor(private client: HttpClient) {
    }

    async getShiur(id: number) {
        const response = await this.client.get(`https://torahislife.azurewebsites.net/api/ShiurInfo?id=${id}`);
        // const response = await this.client.get(`http://localhost:7071/api/ShiurInfo?id=${id}`);
        const data: { tags: Tag[], shiurim: ApiShiur[], authors: Author[] } = await response.json();
        return new Shiur({
                       date: new Date(Date.parse(data.shiurim[0].date)),
                       duration: data.shiurim[0].duration,
                       tags: data.shiurim[0].tags.map(tagId => data.tags.find(tag => tag.id === tagId)),
                       title: data.shiurim[0].title,
                       id: data.shiurim[0].id,
                       previousId: data.shiurim[0].previousId,
                       nextId: data.shiurim[0].nextId,
                       author: data.authors.find(author => author.id === data.shiurim[0].authorId)
                   });
    }

    async getShiurim(tags?: string[]) {
        const response = await this.client.get(`https://torahislife.azurewebsites.net/api/ShiurInfo?${tags.map(tag => `tags=${tag}`).join('&')}`);
        // const response = await this.client.get(`http://localhost:7071/api/ShiurInfo?${tags.map(tag => `tags=${tag}`).join('&')}`);
        const data: { tags: Tag[], shiurim: ApiShiur[], authors: Author[] } = await response.json();
        return data.shiurim
                   .map<Shiur>((dataShiur: ApiShiur) => new Shiur({
                       date: new Date(Date.parse(dataShiur.date)),
                       duration: dataShiur.duration,
                       tags: dataShiur.tags.map(tagId => data.tags.find(tag => tag.id === tagId)),
                       title: dataShiur.title,
                       id: dataShiur.id,
                       previousId: dataShiur.previousId,
                       nextId: dataShiur.nextId,
                       author: data.authors.find(author => author.id === dataShiur.authorId)
                   }));
    }
}