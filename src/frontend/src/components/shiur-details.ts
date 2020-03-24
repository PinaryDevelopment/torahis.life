import { Shiur } from '../models/index';
import { ShiurimService } from '../services/shiurim.service';

export class ShiurDetails {
    public static parameters: string[] = ['id'];
    public shiur: Shiur;

    public constructor(private shiurimService: ShiurimService) {
    }

    public enter(parameters) {
        this.shiurimService
            .getShiur(parameters.id)
            .then(shiur => this.shiur = shiur);
    }

    // public getVersionLocation(version: Version): string {
    //     return encodeURIComponent(`dist/${this.normalize(this.author)}/${this.normalize(this.series)}/${this.normalize(this.subseries)}/${this.title} - ${this.versions.find(v => v.name === version.name).name} (${this.date}).mp3`);
    //   }

    //   private normalize = (str: string) => str.replace(/\s/g, '').toLocaleLowerCase();
}