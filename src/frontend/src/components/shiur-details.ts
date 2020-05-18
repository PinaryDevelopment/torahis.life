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
}