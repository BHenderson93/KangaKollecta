console.log('Conncted to JS')
const gBoard = document.getElementById('easel')
const ctx = gBoard.getContext('2d')

const main = () => {

    gBoard.width = '500'
    gBoard.height = '500'

    ctx.width = gBoard.width;
    ctx.height = gBoard.height;
    ctx.fillStyle = 'black'
    ctx.lineWidth = 5
    ctx.strokeStyle = 'red'

    let xx = 50
    let yy = 50
    let width = 500
    let height = 200

    ctx.strokeRect(xx, yy, width, height)
    ctx.fillRect(xx, yy, width, height)

    const clearCanvas = () => {
        ctx.clearRect(0, 0, ctx.width, ctx.height)
    }
    const drawRectangle = (ctx, x, y) => {
        let size = 50;
        ctx.fillStyle = 'green'
        ctx.strokeStyle = 'yellow'
        ctx.fillRect(x, y, size, size)
        ctx.strokeRect(x, y, size, size)
    }
    gBoard.addEventListener('click', (event) => {
        addRectangle(event.offsetX, event.offsetY)
    })
    gBoard.addEventListener('mousemove', () => {
        
        clearCanvas()
        drawRectangle(ctx, event.offsetX, event.offsetY)
        drawAllRectangles(ctx, rectanglesArr)
    })

    console.log('DOM loaded, main invoked')
    function drawAllRectangles (ctx, rects){
        rects.forEach((rect)=>{
            drawRectangle(ctx, rect.x, rect.y)
        }
        )
    }
}//exit of the main function
const rectanglesArr = []

const addRectangle= (x, y)=>{
    const rect = new Rectangle(x, y)
    rectanglesArr.push(rect)
    //console.log(rectanglesArr)
}

class Rectangle {
    constructor(x, y) {
        this.x = x
        this.y = y
    }
}





document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', main) : main()
document.addEventListener("DOMContentLoaded", main);
