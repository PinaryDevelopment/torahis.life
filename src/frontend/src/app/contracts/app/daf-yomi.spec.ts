import { DafYomi } from './daf-yomi';

describe('DafYomi', () => {
  it('should be first daf of berachos', () => {
    const daf = DafYomi.getDafByDate(new Date(2020, 0, 5));
    expect(daf.name).toBe('Berachos');
    expect(daf.daf).toBe(2);
  });

  it('should be last daf of berachos', () => {
    const daf = DafYomi.getDafByDate(new Date(2020, 2, 7));
    expect(daf.name).toBe('Berachos');
    expect(daf.daf).toBe(64);
  });

  it('should be first daf of shabbos', () => {
    const daf = DafYomi.getDafByDate(new Date(2020, 2, 8));
    expect(daf.name).toBe('Shabbos');
    expect(daf.daf).toBe(2);
  });

  it('should be last daf of shabbos', () => {
    const daf = DafYomi.getDafByDate(new Date(2020, 7, 10));
    expect(daf.name).toBe('Shabbos');
    expect(daf.daf).toBe(157);
  });

  it('should be first daf of eruvin', () => {
    const daf = DafYomi.getDafByDate(new Date(2020, 7, 11));
    expect(daf.name).toBe('Eruvin');
    expect(daf.daf).toBe(2);
  });

  it('should be last daf of eruvin', () => {
    const daf = DafYomi.getDafByDate(new Date(2020, 10, 22));
    expect(daf.name).toBe('Eruvin');
    expect(daf.daf).toBe(105);
  });

  it('should be first daf of pesachim', () => {
    const daf = DafYomi.getDafByDate(new Date(2020, 10, 23));
    expect(daf.name).toBe('Pesachim');
    expect(daf.daf).toBe(2);
  });

  it('should be last daf of pesachim', () => {
    const daf = DafYomi.getDafByDate(new Date(2021, 2, 22));
    expect(daf.name).toBe('Pesachim');
    expect(daf.daf).toBe(121);
  });

  it('should be first daf of shekalim', () => {
    const daf = DafYomi.getDafByDate(new Date(2021, 2, 23));
    expect(daf.name).toBe('Shekalim');
    expect(daf.daf).toBe(2);
  });

  it('should be last daf of shekalim', () => {
    const daf = DafYomi.getDafByDate(new Date(2021, 3, 12));
    expect(daf.name).toBe('Shekalim');
    expect(daf.daf).toBe(22);
  });

  it('should be first daf of yoma', () => {
    const daf = DafYomi.getDafByDate(new Date(2021, 3, 13));
    expect(daf.name).toBe('Yoma');
    expect(daf.daf).toBe(2);
  });

  it('should be last daf of yoma', () => {
    const daf = DafYomi.getDafByDate(new Date(2021, 6, 8));
    expect(daf.name).toBe('Yoma');
    expect(daf.daf).toBe(88);
  });

  it('should be first daf of succah', () => {
    const daf = DafYomi.getDafByDate(new Date(2021, 6, 9));
    expect(daf.name).toBe('Succah');
    expect(daf.daf).toBe(2);
  });

  it('should be last daf of succah', () => {
    const daf = DafYomi.getDafByDate(new Date(2021, 8, 1));
    expect(daf.name).toBe('Succah');
    expect(daf.daf).toBe(56);
  });

  it('should be first daf of beitzah', () => {
    const daf = DafYomi.getDafByDate(new Date(2021, 8, 2));
    expect(daf.name).toBe('Beitzah');
    expect(daf.daf).toBe(2);
  });

  it('should be last daf of beitzah', () => {
    const daf = DafYomi.getDafByDate(new Date(2021, 9, 10));
    expect(daf.name).toBe('Beitzah');
    expect(daf.daf).toBe(40);
  });

  it('should be first daf of rosh hashanah', () => {
    const daf = DafYomi.getDafByDate(new Date(2021, 9, 11));
    expect(daf.name).toBe('Rosh Hashanah');
    expect(daf.daf).toBe(2);
  });

  it('should be last daf of rosh hashanah', () => {
    const daf = DafYomi.getDafByDate(new Date(2021, 10, 13));
    expect(daf.name).toBe('Rosh Hashanah');
    expect(daf.daf).toBe(35);
  });

  it('should be first daf of taanis', () => {
    const daf = DafYomi.getDafByDate(new Date(2021, 10, 14));
    expect(daf.name).toBe('Taanis');
    expect(daf.daf).toBe(2);
  });

  it('should be last daf of taanis', () => {
    const daf = DafYomi.getDafByDate(new Date(2021, 11, 13));
    expect(daf.name).toBe('Taanis');
    expect(daf.daf).toBe(31);
  });

  it('should be first daf of megilah', () => {
    const daf = DafYomi.getDafByDate(new Date(2021, 11, 14));
    expect(daf.name).toBe('Megilah');
    expect(daf.daf).toBe(2);
  });

  it('should be last daf of megilah', () => {
    const daf = DafYomi.getDafByDate(new Date(2022, 0, 13));
    expect(daf.name).toBe('Megilah');
    expect(daf.daf).toBe(32);
  });

  it('should be first daf of moed katan', () => {
    const daf = DafYomi.getDafByDate(new Date(2022, 0, 14));
    expect(daf.name).toBe('Moed Katan');
    expect(daf.daf).toBe(2);
  });

  it('should be last daf of moed katan', () => {
    const daf = DafYomi.getDafByDate(new Date(2022, 1, 10));
    expect(daf.name).toBe('Moed Katan');
    expect(daf.daf).toBe(29);
  });

  it('should be first daf of chagigah', () => {
    const daf = DafYomi.getDafByDate(new Date(2022, 1, 11));
    expect(daf.name).toBe('Chagigah');
    expect(daf.daf).toBe(2);
  });

  it('should be last daf of chagigah', () => {
    const daf = DafYomi.getDafByDate(new Date(2022, 2, 8));
    expect(daf.name).toBe('Chagigah');
    expect(daf.daf).toBe(27);
  });

  it('should be first daf of yevamos', () => {
    const daf = DafYomi.getDafByDate(new Date(2022, 2, 9));
    expect(daf.name).toBe('Yevamos');
    expect(daf.daf).toBe(2);
  });

  it('should be last daf of yevamos', () => {
    const daf = DafYomi.getDafByDate(new Date(2022, 6, 7));
    expect(daf.name).toBe('Yevamos');
    expect(daf.daf).toBe(122);
  });

  it('should be first daf of kesuvos', () => {
    const daf = DafYomi.getDafByDate(new Date(2022, 6, 8));
    expect(daf.name).toBe('Kesuvos');
    expect(daf.daf).toBe(2);
  });

  it('should be last daf of kesuvos', () => {
    const daf = DafYomi.getDafByDate(new Date(2022, 9, 26));
    expect(daf.name).toBe('Kesuvos');
    expect(daf.daf).toBe(112);
  });

  it('should be first daf of nedarim', () => {
    const daf = DafYomi.getDafByDate(new Date(2022, 9, 27));
    expect(daf.name).toBe('Nedarim');
    expect(daf.daf).toBe(2);
  });

  it('should be last daf of nedarim', () => {
    const daf = DafYomi.getDafByDate(new Date(2023, 0, 24));
    expect(daf.name).toBe('Nedarim');
    expect(daf.daf).toBe(91);
  });

  it('should be first daf of nazir', () => {
    const daf = DafYomi.getDafByDate(new Date(2023, 0, 25));
    expect(daf.name).toBe('Nazir');
    expect(daf.daf).toBe(2);
  });

  it('should be last daf of nazir', () => {
    const daf = DafYomi.getDafByDate(new Date(2023, 2, 30));
    expect(daf.name).toBe('Nazir');
    expect(daf.daf).toBe(66);
  });

  it('should be first daf of sotah', () => {
    const daf = DafYomi.getDafByDate(new Date(2023, 2, 31));
    expect(daf.name).toBe('Sotah');
    expect(daf.daf).toBe(2);
  });

  it('should be last daf of sotah', () => {
    const daf = DafYomi.getDafByDate(new Date(2023, 4, 17));
    expect(daf.name).toBe('Sotah');
    expect(daf.daf).toBe(49);
  });

  it('should be first daf of gittin', () => {
    const daf = DafYomi.getDafByDate(new Date(2023, 4, 18));
    expect(daf.name).toBe('Gittin');
    expect(daf.daf).toBe(2);
  });

  it('should be last daf of gittin', () => {
    const daf = DafYomi.getDafByDate(new Date(2023, 7, 14));
    expect(daf.name).toBe('Gittin');
    expect(daf.daf).toBe(90);
  });

  it('should be first daf of kiddushin', () => {
    const daf = DafYomi.getDafByDate(new Date(2023, 7, 15));
    expect(daf.name).toBe('Kiddushin');
    expect(daf.daf).toBe(2);
  });

  it('should be last daf of kiddushin', () => {
    const daf = DafYomi.getDafByDate(new Date(2023, 10, 3));
    expect(daf.name).toBe('Kiddushin');
    expect(daf.daf).toBe(82);
  });

  it('should be first daf of bavah kamah', () => {
    const daf = DafYomi.getDafByDate(new Date(2023, 10, 4));
    expect(daf.name).toBe('Bavah Kamah');
    expect(daf.daf).toBe(2);
  });

  it('should be last daf of bavah kamah', () => {
    const daf = DafYomi.getDafByDate(new Date(2024, 1, 29));
    expect(daf.name).toBe('Bavah Kamah');
    expect(daf.daf).toBe(119);
  });

  it('should be first daf of bavah metziah', () => {
    const daf = DafYomi.getDafByDate(new Date(2024, 2, 1));
    expect(daf.name).toBe('Bavah Metziah');
    expect(daf.daf).toBe(2);
  });

  it('should be last daf of bavah metziah', () => {
    const daf = DafYomi.getDafByDate(new Date(2024, 5, 26));
    expect(daf.name).toBe('Bavah Metziah');
    expect(daf.daf).toBe(119);
  });

  it('should be first daf of bavah basrah', () => {
    const daf = DafYomi.getDafByDate(new Date(2024, 5, 27));
    expect(daf.name).toBe('Bavah Basrah');
    expect(daf.daf).toBe(2);
  });

  it('should be last daf of bavah basrah', () => {
    const daf = DafYomi.getDafByDate(new Date(2024, 11, 18));
    expect(daf.name).toBe('Bavah Basrah');
    expect(daf.daf).toBe(176);
  });

  it('should be first daf of sanhedrin', () => {
    const daf = DafYomi.getDafByDate(new Date(2024, 11, 19));
    expect(daf.name).toBe('Sanhedrin');
    expect(daf.daf).toBe(2);
  });

  it('should be last daf of sanhedrin', () => {
    const daf = DafYomi.getDafByDate(new Date(2025, 3, 9));
    expect(daf.name).toBe('Sanhedrin');
    expect(daf.daf).toBe(113);
  });

  it('should be first daf of makkos', () => {
    const daf = DafYomi.getDafByDate(new Date(2025, 3, 10));
    expect(daf.name).toBe('Makkos');
    expect(daf.daf).toBe(2);
  });

  it('should be last daf of makkos', () => {
    const daf = DafYomi.getDafByDate(new Date(2025, 4, 2));
    expect(daf.name).toBe('Makkos');
    expect(daf.daf).toBe(24);
  });

  it('should be first daf of shevuos', () => {
    const daf = DafYomi.getDafByDate(new Date(2025, 4, 3));
    expect(daf.name).toBe('Shevuos');
    expect(daf.daf).toBe(2);
  });

  it('should be last daf of shevuos', () => {
    const daf = DafYomi.getDafByDate(new Date(2025, 5, 19));
    expect(daf.name).toBe('Shevuos');
    expect(daf.daf).toBe(49);
  });

  it('should be first daf of avodah zarah', () => {
    const daf = DafYomi.getDafByDate(new Date(2025, 5, 20));
    expect(daf.name).toBe('Avodah Zarah');
    expect(daf.daf).toBe(2);
  });

  it('should be last daf of avodah zarah', () => {
    const daf = DafYomi.getDafByDate(new Date(2025, 8, 2));
    expect(daf.name).toBe('Avodah Zarah');
    expect(daf.daf).toBe(76);
  });

  it('should be first daf of horios', () => {
    const daf = DafYomi.getDafByDate(new Date(2025, 8, 3));
    expect(daf.name).toBe('Horios');
    expect(daf.daf).toBe(2);
  });

  it('should be last daf of horios', () => {
    const daf = DafYomi.getDafByDate(new Date(2025, 8, 15));
    expect(daf.name).toBe('Horios');
    expect(daf.daf).toBe(14);
  });

  it('should be first daf of zevachim', () => {
    const daf = DafYomi.getDafByDate(new Date(2025, 8, 16));
    expect(daf.name).toBe('Zevachim');
    expect(daf.daf).toBe(2);
  });

  it('should be last daf of zevachim', () => {
    const daf = DafYomi.getDafByDate(new Date(2026, 0, 12));
    expect(daf.name).toBe('Zevachim');
    expect(daf.daf).toBe(120);
  });

  it('should be first daf of menachos', () => {
    const daf = DafYomi.getDafByDate(new Date(2026, 0, 13));
    expect(daf.name).toBe('Menachos');
    expect(daf.daf).toBe(2);
  });

  it('should be last daf of menachos', () => {
    const daf = DafYomi.getDafByDate(new Date(2026, 4, 1));
    expect(daf.name).toBe('Menachos');
    expect(daf.daf).toBe(110);
  });

  it('should be first daf of chullin', () => {
    const daf = DafYomi.getDafByDate(new Date(2026, 4, 2));
    expect(daf.name).toBe('Chullin');
    expect(daf.daf).toBe(2);
  });

  it('should be last daf of chullin', () => {
    const daf = DafYomi.getDafByDate(new Date(2026, 8, 19));
    expect(daf.name).toBe('Chullin');
    expect(daf.daf).toBe(142);
  });

  it('should be first daf of bechoros', () => {
    const daf = DafYomi.getDafByDate(new Date(2026, 8, 20));
    expect(daf.name).toBe('Bechoros');
    expect(daf.daf).toBe(2);
  });

  it('should be last daf of bechoros', () => {
    const daf = DafYomi.getDafByDate(new Date(2026, 10, 18));
    expect(daf.name).toBe('Bechoros');
    expect(daf.daf).toBe(61);
  });

  it('should be first daf of arachin', () => {
    const daf = DafYomi.getDafByDate(new Date(2026, 10, 19));
    expect(daf.name).toBe('Arachin');
    expect(daf.daf).toBe(2);
  });

  it('should be last daf of arachin', () => {
    const daf = DafYomi.getDafByDate(new Date(2026, 11, 21));
    expect(daf.name).toBe('Arachin');
    expect(daf.daf).toBe(34);
  });

  it('should be first daf of temurah', () => {
    const daf = DafYomi.getDafByDate(new Date(2026, 11, 22));
    expect(daf.name).toBe('Temurah');
    expect(daf.daf).toBe(2);
  });

  it('should be last daf of temurah', () => {
    const daf = DafYomi.getDafByDate(new Date(2027, 0, 23));
    expect(daf.name).toBe('Temurah');
    expect(daf.daf).toBe(34);
  });

  it('should be first daf of kerisos', () => {
    const daf = DafYomi.getDafByDate(new Date(2027, 0, 24));
    expect(daf.name).toBe('Kerisos');
    expect(daf.daf).toBe(2);
  });

  it('should be last daf of kerisos', () => {
    const daf = DafYomi.getDafByDate(new Date(2027, 1, 19));
    expect(daf.name).toBe('Kerisos');
    expect(daf.daf).toBe(28);
  });

  it('should be first daf of meilah', () => {
    const daf = DafYomi.getDafByDate(new Date(2027, 1, 20));
    expect(daf.name).toBe('Meilah');
    expect(daf.daf).toBe(2);
  });

  it('should be last daf of meilah', () => {
    const daf = DafYomi.getDafByDate(new Date(2027, 2, 12));
    expect(daf.name).toBe('Meilah');
    expect(daf.daf).toBe(22);
  });

  it('should be first daf of kinim', () => {
    const daf = DafYomi.getDafByDate(new Date(2027, 2, 13));
    expect(daf.name).toBe('Kinim');
    expect(daf.daf).toBe(23);
  });

  it('should be last daf of kinim', () => {
    const daf = DafYomi.getDafByDate(new Date(2027, 2, 15));
    expect(daf.name).toBe('Kinim');
    expect(daf.daf).toBe(25);
  });

  it('should be first daf of tamid', () => {
    const daf = DafYomi.getDafByDate(new Date(2027, 2, 16));
    expect(daf.name).toBe('Tamid');
    expect(daf.daf).toBe(26);
  });

  it('should be last daf of tamid', () => {
    const daf = DafYomi.getDafByDate(new Date(2027, 2, 24));
    expect(daf.name).toBe('Tamid');
    expect(daf.daf).toBe(34);
  });

  it('should be first daf of middos', () => {
    const daf = DafYomi.getDafByDate(new Date(2027, 2, 25));
    expect(daf.name).toBe('Middos');
    expect(daf.daf).toBe(35);
  });

  it('should be last daf of middos', () => {
    const daf = DafYomi.getDafByDate(new Date(2027, 2, 27));
    expect(daf.name).toBe('Middos');
    expect(daf.daf).toBe(37);
  });

  it('should be first daf of niddah', () => {
    const daf = DafYomi.getDafByDate(new Date(2027, 2, 28));
    expect(daf.name).toBe('Niddah');
    expect(daf.daf).toBe(2);
  });

  it('should be last daf of niddah', () => {
    const daf = DafYomi.getDafByDate(new Date(2027, 5, 7));
    expect(daf.name).toBe('Niddah');
    expect(daf.daf).toBe(73);
  });
});
