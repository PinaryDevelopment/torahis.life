export interface Version {
  name: string;
  duration: string;
}

export class Shiur {
    public author: string;
    public date: string;
    public series: string;
    public subseries: string;
    public title: string;
    public versions: Version[];

    constructor(shiur: Shiur) {
        Object.assign(this, shiur);
        this.versions = shiur.versions.slice(0);
    }

    public getVersionLocation(version: Version): string {
      return encodeURIComponent(`dist/${this.normalize(this.author)}/${this.normalize(this.series)}/${this.normalize(this.subseries)}/${this.title} - ${this.versions.find(v => v.name === version.name).name} (${this.date}).mp3`);
    }

    private normalize = (str: string) => str.replace(/\s/g, '').toLocaleLowerCase();
  }
