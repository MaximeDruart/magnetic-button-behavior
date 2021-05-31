export const getDistance = (x1, y1, x2, y2) => {
  var a = x1 - x2
  var b = y1 - y2
  return Math.hypot(a, b)
}

export const getDistanceXY = (x1, y1, x2, y2) => {
  var distanceX = Math.abs(x1 - x2)
  var distanceY = Math.abs(y1 - y2)
  return { distanceX, distanceY }
}

export const radToDeg = (radians) => {
  return (radians * 180) / Math.PI
}

export const mapRange = (number, in_min, in_max, out_min, out_max) =>
  ((number - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min

console.log(radToDeg(-Math.PI / 2))

export const lerp = (a, b, n) => (1 - n) * a + n * b
