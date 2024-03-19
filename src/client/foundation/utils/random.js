export const random = (lower = 0, upper, floating) => {
  if (typeof upper === 'boolean') {
    floating = upper
  }

  if (isNaN(upper)) {
    upper = lower < 0 ? 0 : 1
  }

  if (typeof floating === 'undefined') {
    floating = !Number.isInteger(lower) || !Number.isInteger(upper)
  }

  const randomNumber = Math.random() * (upper - lower) + lower
  return floating ? randomNumber : Math.round(randomNumber)
}

export function baseRandom(lower, upper) {
  return lower + Math.floor(Math.random() * (upper - lower + 1));
}
