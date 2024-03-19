import { baseRandom } from "./random";

export function arrayShuffle(array) {
  return shuffleSelf(copyArray(array));
}

function shuffleSelf(array, size) {
  var index = -1,
    length = array.length,
    lastIndex = length - 1;

  size = size === undefined ? length : size;
  while (++index < size) {
    var rand = baseRandom(index, lastIndex),
      value = array[rand];

    array[rand] = array[index];
    array[index] = value;
  }
  array.length = size;
  return array;
}

function copyArray(source, array) {
  var index = -1,
    length = source.length;

  array || (array = new Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}
