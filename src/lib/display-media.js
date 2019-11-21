// todo vísa í rétta hluti með import
import getRandomImage from './nasa-api';
import { empty, el } from './helpers';
import { save, load } from './storage';

// breytur til þess að halda utan um html element nodes
let title; // titill fyrir mynd á forsíðu
let text; // texti fyrir mynd á forsíðu
let img; // mynd á forsíðu
let image; // object sem inniheldur núverandi mynd á forsíðu.

let apod;

/*
 * Sækir nýja Mynd af handahófi frá Nasa API og birtir hana á forsíðunni
 * ásamt titli og texta.
 */
function getNewImage() {
  getRandomImage().then((data) => {
    image = data;
    console.log(image); /* eslint-disable-line */
    title = apod.querySelector('.apod__title');
    text = apod.querySelector('.apod__text');
    img = apod.querySelector('.apod__image');
    empty(title);
    empty(text);
    title.appendChild(document.createTextNode(image.title));
    text.appendChild(document.createTextNode(image.explanation));
    img.src = image.url;
  })
    .catch((error) => {
      console.log(error); /* eslint-disable-line */
    });
}

/*
 * Vistar núverandi mynd í storage.
 */
function saveCurrentImage() {
  save('image', image.url, image.explanation, image.title);
}

/*
 * Upphafsstillir forsíðuna. Setur event listeners á takkana, og sækir eina mynd.
 *
 */
export default function init(_apod) {
  apod = _apod;
  const button = apod.querySelectorAll('button');
  button[0].addEventListener('click', getNewImage);
  button[1].addEventListener('click', saveCurrentImage);
  getNewImage();
}

/*
 * Fall fyrir favourites.html. Sér um að sækja allar vistuðu myndirnar og birta þær ásamt
 * titlum þeirra.
 */
export function loadFavourites() {
  const images = load();
  for (let i = 0; i < images.length; i += 1) {
    const mynd = el('img');
    mynd.classList.add('apod__image');
    mynd.src = images[i].mediaUrl;

    const titill = el('h1');
    titill.classList.add('apod__titill');
    titill.appendChild(document.createTextNode(images[i].title));

    const div = el('div', titill, mynd);
    div.classList.add('apod');

    const main = document.querySelector('main');
    main.appendChild(div);
  }
}
