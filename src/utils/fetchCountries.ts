export type ExtraData = Record<string, number | undefined>;

export interface CountryData extends ExtraData {
  year: number;
  population?: number;
  co2?: number;
  co2_per_capita?: number;
}

export interface Country {
  name: string;
  iso_code?: string;
  data: CountryData[];
}

export type RawData = Record<
  string,
  {
    name?: string;
    iso_code?: string;
    data: CountryData[];
  }
>;

let countryPromise: Promise<Country[]> | null = null;

export function fetchCountries(): Promise<Country[]> {
  if (!countryPromise) {
    countryPromise = fetch('/owid-co2-data.json')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load data');
        return res.json() as Promise<RawData>;
      })
      .then((raw: RawData) => parseData(raw));
  }
  return countryPromise;
}

function parseData(raw: RawData): Country[] {
  return Object.keys(raw).map((key) => ({
    name: raw[key].name || key,
    iso_code: raw[key].iso_code,
    data: raw[key].data,
  }));
}
