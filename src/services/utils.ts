export function randomNumber(min = 0, max = 255) {
    return Math.floor(Math.random() * max) + min
}

export function generateColor() {
    const r = randomNumber()
    const g = randomNumber()
    const b = randomNumber()
    const colors = { rgb: `rgb(${r}, ${g}, ${b})`, rgba: `rgba(${r}, ${g}, ${b}, 0.2)` };
    return colors;
}
