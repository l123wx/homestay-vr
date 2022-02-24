export const isSafari = ():boolean => {
  console.log(navigator.userAgent)
  return /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent)
}

export const getPlaceholderImg = (width: number, height: number): string => {
  return `https://placekitten.com/${width}/${height}`
}