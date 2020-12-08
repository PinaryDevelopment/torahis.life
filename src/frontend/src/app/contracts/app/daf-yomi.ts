import { Talmud } from './talmud';

export const DafYomi = {
  cycleStartDate: new Date(2020, 0, 5),
  masechtos: Talmud.bavli.gemaras(),

  getDafByDate(date: Date): { name: string, daf: number } {
    let daysFromCycleStart = this.datediff(this.cycleStartDate, date);
    let masechtaIndex = 0;
    while (daysFromCycleStart >= 0) {
        const masechta = this.masechtos[masechtaIndex];
        if (masechta.dafim > daysFromCycleStart)
        {
            return { name: masechta.name, daf: daysFromCycleStart + masechta.startingDaf };
        }

        daysFromCycleStart -= masechta.dafim;
        masechtaIndex++;

        if (masechtaIndex === this.masechtos.length)
        {
            masechtaIndex = 0;
        }
    }

    throw new Error();
  },

  datediff(first: Date, second: Date): number {
    // Take the difference between the dates and divide by milliseconds per day.
    // Round to nearest whole number to deal with DST.
    return Math.round((second.valueOf() - first.valueOf()) / (1000 * 60 * 60 * 24));
  }
};
