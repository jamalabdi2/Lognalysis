const getRandomColor = () =>{
    const letters = '0123456789ABCDEF'.split('')
    let color = '#'
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
    }
    return color
}

export const generateRandomColors = (numColors) =>{
    const colors = []
    for (let i = 0; i < numColors; i++) {
        colors.push(getRandomColor())
    }
    return colors
}