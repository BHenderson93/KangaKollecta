console.log('hooked up')
const main = ()=>{
    const myCanvas = document.getElementById('gl-canvas')
    const gl = myCanvas.getContext('webgl')
    const screenScaleInfo = Math.round(Math.min(window.innerHeight * 2, window.innerWidth) / 100) * 80
    gl.canvas.width = screenScaleInfo
    gl.canvas.height = screenScaleInfo /2
    if (gl === null) {
        alert("Cannot initialize. Your browser or machine may not support WebGL.")
        return
    }
    gl.clearColor(0,0,0,1)
    gl.clear(gl.COLOR_BUFFER_BIT)
}
window.onload = main;


/* 
pencil.canvas.width = screenScaleInfo
pencil.canvas.height = screenScaleInfo / 2

const xMax = myCanvas.width
const xOrig = xMax/2
const yMax = myCanvas.height
const yOrig = yMax/2
let listOfChildren = [] */

function drawNodes(childCoordinates){
    pencil.moveTo(xOrig,yMax)
    pencil.lineTo(xOrig,yOrig)
    pencil.stroke()
}

//drawNodes()