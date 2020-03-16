import { Shiur } from '../models/index';
import { ShiurimService } from '../services/shiurim.service';

export class ShiurimGrid {
    public static parameters: string[] = ['tags'];

    public shiurim: Shiur[] = [];
    public v2: any[] = [];

    public constructor(private shiurimService: ShiurimService) {
    }

    public async enter(parameters) {
        const tags = decodeURIComponent(parameters.tags);
        this.shiurim = await this.shiurimService.getShiurim(JSON.parse(tags));
        const distinctDafim = this.shiurim
            .reduce(
                (pv: any, cv) => {
                    const series = cv.series[1];
                    if (pv[cv.title]) {
                        pv[cv.title].versions.push({
                            version: cv.series[2],
                            duration: cv.duration,
                            shiur: cv
                        });
                    } else {
                        pv[cv.title] = {
                            id: 0,
                            series,
                            title: cv.title,
                            author: cv.author,
                            date: cv.date,
                            versions: [
                                {
                                    version: cv.series[2],
                                    duration: cv.duration,
                                    shiur: cv
                                }
                            ]
                        }
                    }

                    return pv;
                },
                {}
            );
        this.v2 = [].concat(Object.keys(distinctDafim)
                    .map(key => distinctDafim[key]))
                    .sort((s1, s2) => s1.date > s2.date ? -1 : s2.date > s1.date ? 1 : 0);
    }

    public downloadShiur(shiur: Shiur) {
        // window.location.href = `https://torahislife.azurewebsites.net/api/ShiurRetriever?tags=${shiur.tags.map(tag => `tags=${tag.tag}`).join('&')}`;
        window.location.href = `http://localhost:7071/api/Shiur?title=${shiur.title}&tags=${shiur.tags.map(tag => `tags=${tag.tag}`).join('&')}`;
    }

}