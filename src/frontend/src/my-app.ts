import { Shiur, Version } from './shiur';
import { HttpClient } from 'aurelia';

export class MyApp {
  public shiurim: Shiur[] = [];
  public selectedShiur: Shiur = undefined;
  public selectedVersion: Version = undefined;

  constructor(client: HttpClient) {
    client.get('/data/data.json')
      .then(response => response.json())
      .then(data => {
        data.shiurim.forEach((shiur: Shiur) => this.shiurim.push(new Shiur(shiur)));
      });
  }

  public openDialog(shiur: Shiur, version: Version) {
    this.selectedVersion = version;
    this.selectedShiur = shiur;
    document.querySelector('.faux-dialog').classList.add('full');
  }

  public closeDialog() {
    document.querySelector('.faux-dialog').classList.remove('full');
    setTimeout(() => {
      this.selectedShiur = undefined;
      this.selectedVersion = undefined;
    }, 250);
  }

  public get copyrightYears(): string {
    const firstYear = 2020;
    const currentYear = new Date(Date.now()).getFullYear();
    if (currentYear === firstYear) {
      return firstYear.toString();
    }

    return `${firstYear} - ${currentYear}`;
  }

  public downloadShiur(shiur: Shiur, version: Version) {
    window.location.href = `https://torahislife.azurewebsites.net/api/ShiurRetriever?name=${shiur.getVersionLocation(version)}`;
  }
}
