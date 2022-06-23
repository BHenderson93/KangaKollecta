console.log('sync')

myCanvas = document.getElementById('canvas')
pencil = myCanvas.getContext('2d')
const screenScaleInfo = Math.round(Math.min(window.innerHeight, window.innerWidth)/100)*95
pencil.canvas.width = screenScaleInfo
pencil.canvas.height = screenScaleInfo

const xMax = myCanvas.width
const xOrig = xMax/2
const yMax = myCanvas.height
const yOrig = yMax/2

/* function drawOrigin(){
    pencil.moveTo(xOrig, yMax)
    pencil.lineTo(xOrig, yMax*.9)
    pencil.stroke()
} */
let listOfChildren = [1,2,3,4,5,6,7,8,9]

function drawChildren (originCoords){

    for(let child of listOfChildren){
        pencil.moveTo()
        pencil.
    }
}




drawOrigin(xOrig,yOrig)

//perceived steps
//Take available space and break it up for each node. I run max number of circles finder function for the space. Packing them staggered.