const midi = require('midi')
const five = require('johnny-five')
const input = new midi.Input()
const board = new five.Board({ port: 'COM3' })
input.openPort(1)

board.on('ready', function () {
    const ledMap = [new five.Led(2), new five.Led(3), new five.Led(4)]

    input.on('message', (deltaTime, message) => {
        console.log(message)
        let [type, note, velocity] = message
        if (type === 144) {
            let index = Math.round(map(note, 21, 108, 0, ledMap.length - 1))
            ledMap[index].on()
        } else if (type === 128) {
            let index = Math.round(map(note, 21, 108, 0, ledMap.length - 1))
            ledMap[index].off()
        }
    })
})
function map(val, inputMin, inputMax, outputMin, outputMax) {
    const inputRange = inputMax - inputMin
    const outputRange = outputMax - outputMin
    const scale = outputRange / inputRange
    const trueVal = val - inputMin
    return outputMin + trueVal * scale
}
console.log(input.getPortName(1))
