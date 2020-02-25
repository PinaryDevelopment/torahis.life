export class App {
    public get copyrightYears(): string {
        const firstYear = 2020;
        const currentYear = new Date(Date.now()).getFullYear();
        if (currentYear === firstYear) {
            return firstYear.toString();
        }

        return `${firstYear} - ${currentYear}`;
    }
}
