

export const generateTextShadow = (color: string, angle: number, length: number) => {
  const shadows = []

  const rad = (Math.PI / 180) * angle
  const xOffset = Math.cos(rad)
  const yOffset = Math.sin(rad)

  for (let i = 1; i <= length; i++) {
    shadows.push(`${-xOffset * i}px ${yOffset * i}px 0 ${color}`)
  }

  return shadows.join(', ')
}