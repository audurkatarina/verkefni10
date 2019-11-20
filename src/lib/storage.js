/**
 * Sækir og vistar í localStorage
 */

// Fast sem skilgreinir heiti á lykli sem vistað er undir í localStorage
const LOCALSTORAGE_KEY = 'favourite_spacephotos';

function makeList(oldList, newList) {
  const oldString = oldList.substring(0, oldList.length - 1);
  const newString = newList.substring(1, newList.length - 1);
  const list = `${oldString},${newString}]`;
  return list;
}

/**
 * Sækir gögn úr localStorage. Skilað sem lista á forminu:
 * [{ type, mediaUrl, text, title },
 *  { type, mediaUrl, text, title },
 *  ...,
 *  { type, mediaUrl, text, title }]
 *
 * @returns {array} fylki af myndum eða tóma fylkið ef ekkert vistað.
 */
export function load() {
  const savedImages = localStorage.getItem(LOCALSTORAGE_KEY);
  if(savedImages){
    const obj = JSON.parse(savedImages);
    return obj;
  }
  return [];
}

/**
 * Vistaðar myndir með texta.
 *
 * @param {string} type annað hvort image eða video
 * @param {string} mediaUrl URL á myndinni/myndbandinu.
 * @param {string} text texti fyrir myndina/myndbandið.
 * @param {string} title titill fyrir myndina/myndbandið.
 */
export function save(type, mediaUrl, text, title) {
  let data = [{type, mediaUrl, text, title}];
  const savedImages = localStorage.getItem(LOCALSTORAGE_KEY);
  if(savedImages){
    data = JSON.parse(makeList(savedImages, JSON.stringify(data)));
  }
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(data));
}


/**
 * Hreinsar allar myndir úr localStorage
 */
export function clear() {
  localStorage.removeItem(LOCALSTORAGE_KEY);
}
