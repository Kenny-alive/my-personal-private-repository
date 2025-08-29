export interface CountryData {
  year: number;
  population?: number;
  cement_co2?: number;
  cement_co2_per_capita?: number;
  cumulative_cement_co2?: number;
  total_ghg?: number;
}

export interface Country {
  name: string;
  iso_code: string;
  data: CountryData[];
}

export const countryList: Country[] = [
  {
    name: 'Afghanistan',
    iso_code: 'AFG',
    data: [
      { year: 1850, population: 3752993, cement_co2: 0, total_ghg: 7.43 },
      { year: 1851, population: 3767956, cement_co2: 0, total_ghg: 7.5 },
    ],
  },
  {
    name: 'Brazil',
    iso_code: 'BRA',
    data: [
      { year: 1850, population: 20000000, cement_co2: 0, total_ghg: 45.12 },
      { year: 1851, population: 20200000, cement_co2: 0, total_ghg: 45.78 },
    ],
  },
  {
    name: 'China',
    iso_code: 'CHN',
    data: [
      { year: 1850, population: 400000000, cement_co2: 0, total_ghg: 210.5 },
      { year: 1851, population: 405000000, cement_co2: 0, total_ghg: 212.1 },
    ],
  },
];
