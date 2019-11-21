import { randomDate } from './helpers';
/**
 * Sækir Myndir frá nasa API. Til þess að sjá dæmi um json svar sjá apod.json
 */

// API lykill til að fá aðgang að nasa gögnum.
const API_KEY = 'dSTq4BECZG8MJLoFYw9M9b6ofxWTeB9UqWMkuzqc';
// Slóð að sækja myndir frá. Dæmi um heila slóð https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=2019-11-10
const URL = 'https://api.nasa.gov/planetary/apod?api_key=';


/**
 * Sækir mynd af handahófi frá APOD API hjá nasa
 *
 * @returns {Promise} sem mun innihalda upplýsingar um mynd/myndband hjá nasa.
 */
export default async function getRandomImage() {
  const date = randomDate(new Date(1995, 5, 16), new Date());

  return fetch(`${URL}${API_KEY}&date=${date}`)
    .then((response) => {
      if (!response) {
        throw new Error('Non 200 status');
      }
      return response.json();
    });
}
