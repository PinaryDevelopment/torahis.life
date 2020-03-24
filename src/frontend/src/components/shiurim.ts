import { Shiur } from '../models/index';
import { ShiurimService } from '../services/shiurim.service';

export class Shiurim {
    public static parameters: string[] = ['tags'];

    public shiurim: Shiur[] = [];
    public v2: any[] = [];

    public constructor(private shiurimService: ShiurimService) {
    }

    public async enter(parameters) {
        const tags: any = parameters.tags.split('&'); // TODO: use & and | as delimiters for more complex filtering operations?
        this.shiurim = await this.shiurimService.getShiurim(tags);
        // group by root series
        const series = this.shiurim
                           .reduce((pv: any, cv: any) => {
                                if (pv[cv.series[1]]) {
                                    pv[cv.series[1]].push(cv);
                                } else {
                                    pv[cv.series[1]] = [cv];
                                }

                                return pv;
                            }, {});

        // group shiurim within series
         Object.keys(series)
               .forEach(key => {
                    series[key] = series[key].reduce(
                            (pv: any, cv: any) => {
                                const seriesTitle = cv.series[1];
                                if (pv[cv.title]) {
                                    pv[cv.title].versions
                                                .push({
                                                    version: cv.series[2],
                                                    duration: cv.duration,
                                                    shiur: cv
                                                });
                                } else {
                                    pv[cv.title] = {
                                        id: cv.id,
                                        series: seriesTitle,
                                        title: cv.title,
                                        author: cv.author,
                                        date: cv.date,
                                        versions: [{
                                            version: cv.series[2],
                                            duration: cv.duration,
                                            shiur: cv
                                        }]
                                    };
                                }

                            return pv;
                        },
                        {}
                    );
                    series[key] = [].concat(Object.keys(series[key])
                                                  .map(key2 => series[key][key2])
                                  ).sort(this.dateDescending);
               }
            );
        this.v2 = [].concat(Object.keys(series)
                                  .map(key => ({ title: key, shiurim: series[key] }))
                  ).reverse();
    }

    public dateDescending(s1: Shiur, s2: Shiur): -1 | 1 | 0 {
        return s1.date > s2.date ? -1 : s2.date > s1.date ? 1 : 0;
    }

    public downloadShiur(shiur: Shiur) {
        window.location.href = `https://torahislife.azurewebsites.net/api/ShiurRetriever?id=${shiur.id}`;
        // window.location.href = `http://localhost:7071/api/ShiurRetriever?id=${shiur.id}`;
    }

}