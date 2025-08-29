import { fetchCountries } from './fetchCountries';
import { createResource } from './resourse';

export const countriesResource = createResource(fetchCountries());
