const treeDisplay = document.getElementById('canvas')
const pencil = treeDisplay.getContext('2d')
const screenScale = Math.min(window.innerHeight * .85, window.innerWidth * .6)
pencil.canvas.width = screenScale
pencil.canvas.height = screenScale
const xOrigin = treeDisplay.width / 2
const yOrigin = treeDisplay.height / 2

let initialPath = []
let viewDepth = 9
let radOffset = initialPath.length
let baseRadius = treeDisplay.height / (2.5 * viewDepth)
let colorScheme = 'mini-max'
let forcedVariationsClosed = false
let highlightForcedVariations = false
let generateAllVariations = true

let currentPath = initialPath.slice()
let pathCopy = initialPath.slice()

const initializeScreen = ()=> {
    document.getElementById('TTT-gameboard').addEventListener('click', (e) => {
        if (!e.target.classList.contains('marked') && (e.target.classList.contains('TTT-tile'))) {
            currentPath.push(Number(e.target.id))
            let result = findGameNode(currentPath)
            
            if (result) {
                drawGameNode(makeIntermediateNode(result))
                e.target.classList.add('marked')
                currentPath.length % 2 === 1 ? e.target.innerText = 'X' : e.target.innerText = 'O'
                pathCopy = currentPath.slice()
            } else {
                currentPath.pop()
            }
        }
    })
    
    document.getElementById('btn-reset').addEventListener('click', () => {
        resetBoard()
    })
    document.getElementById('btn-undo').addEventListener('click', () => {
        undoMove()
    })
    document.getElementById('btn-redo').addEventListener('click', () => {
        redoMove()
    })

    drawGameNode(treeHead)
}

const clearCanvas = ()=> {
    pencil.fillStyle = 'black';
    pencil.fillRect(0, 0, treeDisplay.width, treeDisplay.height)
}

const findGameNode = (pathArray)=> {
    let currentChild = treeHead

    for (let i = 0; i < pathArray.length; i++) {
        let isPossible = false

        for (let child of currentChild.children) {
            //console.log(child.path[i], pathArray[i])
            if (child.path[i] === pathArray[i]) {
                currentChild = child
                isPossible = true
            }
        }

        if (!isPossible) {
            console.log('Cant find that gameNode in tree.')
            return false
        }
    }
    return currentChild
}

const makeIntermediateNode = (gameNode)=> {
    if (gameNode.path.length === 0) {
        return this.gameState.treeHead
    } else {
        return new RecursiveGameNode(gameNode.path, xOrigin, yOrigin, 2 * Math.PI, 0, this.baseRadius, gameNode.path.length, gameNode.path.length + this.viewDepth)
    }
}

const drawGameNode = (gameNode)=> {
    console.log('drawing', gameNode)
    clearCanvas()

    const determineTransitionState = () => {
        //needs two parameters - start and end. 
    }

    const recursiveDraw = (node) => {
        let drawColor
        colorScheme === 'mini-max' ? drawColor = node.nodeColor : drawColor = colorScheme

        if (node.path.length < node.maxTreeSize) {
            node.drawForcedVariationCircle(node.x, node.y, node.radius === 0 ? (node.radiusIncrement / 2) : (node.arcBound / 4) * node.radius, forcedVariationsClosed)
            node.drawLinesToChildren(drawColor)
            node.drawNodeCircle(node.x, node.y, node.radius === 0 ? (node.radiusIncrement / 3) : (node.arcBound / 8) * node.radius, drawColor)
        } else {
            //conditional included for visualization of single node. Always unnecessary unless single node is input.
            if (node.path.length < node.maxTreeSize + 1) {
                node.drawForcedVariationCircle(node.x, node.y, node.radius === 0 ? (node.radiusIncrement / 2) : (node.arcBound / 4) * node.radius, forcedVariationsClosed)
                node.drawNodeCircle(node.x, node.y, node.radius === 0 ? (node.radiusIncrement / 3) : (node.arcBound / 8) * node.radius, drawColor)
            }
        }

        if(this.forcedVariationsClosed){
            for (let child of node.children) {
                if (!node.xWinForced && !node.oWinForced) {
                    recursiveDraw(child)
                }
            }
        }else{
            for (let child of node.children) {
                recursiveDraw(child)
                }
        }
        
    }
    recursiveDraw(gameNode)
}

const resetBoard = ()=> {
    console.log('reseting')
    clearCanvas()
    this.drawGameNode(this.gameState.treeHead)
    this.gameState.currentPath = this.initialPath.slice()
    this.gameState.pathCopy = this.initialPath.slice()
    for (let i = 1; i < 10; i++) {
        let tile = document.getElementById(i)
        tile.classList.remove('marked')
        tile.innerText = ''
    }
}

const undoMove=()=> {
    if (this.gameState.currentPath.length === 0){
        console.log('Nothing to undo. Gameboard should be blank.')
        return 
    }
    let removedNode = document.getElementById(this.gameState.currentPath.pop())
    removedNode.innerText = ''
    removedNode.classList.remove('marked')
    this.drawGameNode(this.makeIntermediateNode(this.findGameNode(this.gameState.currentPath)))
}

const redoMove= ()=> {
    if (this.gameState.currentPath.length === this.gameState.pathCopy.length) {
        console.log("No moves to redo. Currently up to date.")
        return 
    } else {
        let addedNode = document.getElementById(this.gameState.pathCopy[this.gameState.currentPath.length])
        this.gameState.currentPath.push(this.gameState.pathCopy[this.gameState.currentPath.length])
        addedNode.innerText = this.gameState.currentPath.length % 2 === 1 ? 'X' : 'O'
        addedNode.classList.add('marked')
        this.drawGameNode(this.makeIntermediateNode(this.findGameNode(this.gameState.currentPath)))
    }
}

class RecursiveGameNode {
    constructor(path, x, y, arcBound, offsetRadians, radiusIncrement, radiusOffset, maxTreeSize) {
        this.path = path
        this.remainingNums = [1, 2, 3, 4, 5, 6, 7, 8, 9]
        this.childPaths = []
        this.children = []
        this.x = x
        this.y = y
        this.arcBound = arcBound
        this.offsetRadians = offsetRadians
        this.radiusIncrement = baseRadius
        this.radiusOffset = radiusOffset
        this.radius = (this.path.length - this.radiusOffset) * this.radiusIncrement
        this.nodeColor = 'white'
        this.totalNodes = 1
        this.maxTreeSize = maxTreeSize

        //queue of startup-functions to run
        this.determineScoresAndDecisiveColor()

        //use this for the game tree, draw outcomes if there is one.
        if (!this.xWin && !this.oWin && !this.tie) {
            this.generateChildPaths()
            this.generateChildren()
            this.determineColorByNodeScore()
            this.detectForcedXVariations()
            this.detectForcedOVariations()
            this.determineBestXLine()
            this.determineBestOLine()

            //this.drawConeToChild()
            /* if (this.path.length < maxTreeSize) {
                this.drawForcedVariationCircle(this.x, this.y, this.radius === 0 ? (this.radiusIncrement / 3) : (this.arcBound / 4) * this.radius)
                this.drawLinesToChildren()
                this.drawNodeCircle(this.x, this.y, this.radius === 0 ? (this.radiusIncrement / 6) : (this.arcBound / 8) * this.radius)
            }
        } else {
            //conditional included for visualization of single node. Always unnecessary unless single node is input.
            if (this.path.length < maxTreeSize + 1) {
                this.drawNodeCircle(this.x, this.y, this.radius === 0 ? this.radiusIncrement : (this.arcBound / 2) * this.radius)
            } */
        }

        //use this for whole factorial
        /* if(this.remainingNums.length > 0){
            this.generateChildPaths()
            this.generateChildren()
        } */
    }

    //this function is ran on startup.
    determineScoresAndDecisiveColor() {
        //use ids to check which win conditions in the path have been contributed to.
        this.ids = { 1: [1, 0, 0, 1, 0, 0, 1, 0], 2: [0, 1, 0, 1, 0, 0, 0, 0], 3: [0, 0, 1, 1, 0, 0, 0, 1], 4: [1, 0, 0, 0, 1, 0, 0, 0], 5: [0, 1, 0, 0, 1, 0, 1, 1], 6: [0, 0, 1, 0, 1, 0, 0, 0], 7: [1, 0, 0, 0, 0, 1, 0, 1], 8: [0, 1, 0, 0, 0, 1, 0, 0], 9: [0, 0, 1, 0, 0, 1, 1, 0] }
        this.xScore = [0, 0, 0, 0, 0, 0, 0, 0]
        this.oScore = [0, 0, 0, 0, 0, 0, 0, 0]
        this.xWin = false
        this.xWinForced = false
        this.oWin = false
        this.oWinForced = false
        this.tie = false
        this.xWinTally = 0
        this.oWinTally = 0
        this.tieTally = 0
        this.resultTally = 0
        this.nodeScore = 0

        //iterate through the path, take the id array from each digit and add it to appropriate score.
        for (let i = 0; i < this.path.length; i++) {
            if (i % 2 === 0) {
                for (let j = 0; j < 8; j++) {
                    
                    this.xScore[j] += this.ids[this.path[i]][j]
                }
            } else {
                for (let j = 0; j < 8; j++) {
                    this.oScore[j] += this.ids[this.path[i]][j]
                }
            }
        }
        //if a score includes 3, it's a win. If no wins found and path length is 9, it's a tie.
        if (this.xScore.includes(3)) {
            this.xWin = true
            this.xWinTally++
            this.xWinForced = true
            this.resultTally++
            this.nodeColor = `rgba(255,0,0,1)`
            this.nodeScore++
            //console.log(this.path, 'xWin')
        } else if (this.oScore.includes(3)) {
            this.oWin = true
            this.oWinTally++
            this.oWinForced = true
            this.resultTally++
            this.nodeColor = `rgba(0,0,255,1)`
            this.nodeScore--
            //console.log(this.path, 'oWin')
        } else if (this.path.length === 9 && !this.xWin && !this.oWin) {
            this.tie = true
            this.tieTally++
            this.resultTally++
            this.nodeColor = `rgba(0,255,0,1)`
            this.nodeScore // placeholder for aesthetics
            //console.log(this.path, 'tie')
        }


    }

    detectForcedXVariations() {
        //check which move it is. If X's, must contain forced X win in 1 variation, else must contain forced X win in all variations.
        const currMove = this.path.length % 2

        //things if it's X's turn
        if (currMove === 0) {
            for (let child of this.children) {
                if (child.xWinForced) {
                    this.xWinForced = true
                }
            }
        } else {
            let counter = 0
            for (let child of this.children) {
                if (child.xWinForced) {
                    counter++
                }
            }
            if (counter === this.children.length) {
                this.xWinForced = true
            }
        }
    }

    detectForcedOVariations() {
        //check which move it is. If X's, must contain forced X win in 1 variation, else must contain forced X win in all variations.
        const currMove = this.path.length % 2

        //things if it's X's turn
        if (currMove === 1) {
            for (let child of this.children) {
                if (child.oWinForced) {
                    this.oWinForced = true
                }
            }
        } else {
            let counter = 0
            for (let child of this.children) {
                if (child.oWinForced) {
                    counter++
                }
            }
            if (counter === this.children.length) {
                this.oWinForced = true
            }
        }
    }

    //this function is ran during generateChildren
    updateSelfWithChildScores(child) {
        this.totalNodes += child.totalNodes
        this.nodeScore += child.nodeScore
        this.xWinTally += child.xWinTally
        this.oWinTally += child.oWinTally
        this.tieTally += child.tieTally
        this.resultTally += child.resultTally
    }

    determineColorByNodeScore() {

        //could also do nodeScore/totalNodes...
        let red = (this.xWinTally / this.resultTally) * 255
        let green = (this.tieTally / this.resultTally) * 255
        let blue = (this.oWinTally / this.resultTally) * 255
        this.nodeColor = `rgb(${red}, ${green}, ${blue})`
    }

    determineBestXLine() {
        let bestMove = false
        //if a child has X win forced, recommend that.
        for (let child of this.children) {
            if (child.xWinForced) {
                bestMove = child
            }
        }

        //if no forced, pick variation with most xWins/oWins that is not an O forced win.
        if (!bestMove) {
            let bestChildren = this.children.filter((child) => !child.oWinForced)

            if (bestChildren.length > 0) {
                bestMove = bestChildren[0]
                for (let child of bestChildren) {
                    if (child.nodeScore > bestMove.nodeScore) {
                        bestMove = child
                    }
                }
                //if all moves are O forced wins, pick the best X variation
            } else {
                bestMove = this.children[0]
                for (let child of this.children) {
                    if (child.nodeScore > bestMove.nodeScore) {
                        bestMove = child
                    }
                }
            }
        }
        //set the objects best x to the path of the best child
        this.bestXMove = bestMove.path
    }

    determineBestOLine() {
        //see X for explanation
        let bestMove = false
        //if a child has O win forced, recommend that.
        for (let child of this.children) {
            if (child.oWinForced) {
                bestMove = child
            }
        }

        //if no forced, pick variation with least xWins/oWins that is not an X forced win.
        if (!bestMove) {
            let bestChildren = this.children.filter((child) => !child.xWinForced)

            if (bestChildren.length > 0) {
                bestMove = bestChildren[0]
                for (let child of bestChildren) {
                    if (child.nodeScore < bestMove.nodeScore) {
                        bestMove = child
                    }
                }
                //if all moves are X forced wins, pick the best X variation
            } else {
                bestMove = this.children[0]
                for (let child of this.children) {
                    if (child.nodeScore < bestMove.nodeScore) {
                        bestMove = child
                    }
                }
            }
        }
        //set the objects best x to the path of the best child
        this.bestOMove = bestMove.path
    }

    //function to take in the path and produce remaining numbers. Then, push those onto copies of the path and append to this.childPaths property.
    generateChildPaths() {
        for (let num of this.path) {
            this.remainingNums.splice(this.remainingNums.indexOf(num), 1)
        }

        //console.log(this.path, this.remainingNums)
        for (let num of this.remainingNums) {
            let currPath = this.path.slice()
            currPath.push(num)
            this.childPaths.push(currPath)
        }
        //console.log("childPaths made")
    }

    generateChildren() {
        const childArcBound = this.arcBound / this.childPaths.length
        const childRadiusIncrement = this.radiusIncrement
        const childRadius = this.radius + this.radiusIncrement

        let childCount = 0

        for (let childPath of this.childPaths) {
            //console.log(childPath)
            const childOffsetRadians = (childArcBound * childCount) + this.offsetRadians
            //console.log(childOffsetDegree)
            const childX = (Math.sin(childOffsetRadians + (childArcBound / 2)) * childRadius) + xOrigin
            const childY = (Math.cos(childOffsetRadians + (childArcBound / 2)) * childRadius * -1) + yOrigin
            //console.log('Child x,y, offset', childX, childY, childOffsetDegree)
            //this.drawNodeCircle(childX,childY,childArcLength,this.offsetRadians,childArcBound)
            const myChild = new RecursiveGameNode(childPath, childX, childY, childArcBound, childOffsetRadians, childRadiusIncrement, this.path.length, viewDepth+this.path.length)
            this.updateSelfWithChildScores(myChild)
            this.children.push(myChild)
            childCount++
            //this.drawLineToChild(this.x, childX, this.y, childY,'white')
        }
    }

    drawLinesToChildren(color) {
        
        //console.log('in drawLinesToChildren')
        //console.log(color)
        for (let child of this.children) {
            //console.log(this.x,this.y,child.x,child.y)
            pencil.strokeStyle = color
            pencil.lineWidth = this.radius === 0 ? (this.arcBound / 16) * this.radiusIncrement * .2 : (this.arcBound / 16) * this.radius
            pencil.beginPath()
            pencil.moveTo(this.x, this.y)
            pencil.lineTo(child.x, child.y)
            pencil.stroke()
        }

        //console.log('Draw complete')

        //each time a line is about to be drawn, reference gametree for coloring information.
    }

    drawNodeCircle(xStart, yStart, radius, color) {
        //have transparency equal relation of wins.
        //console.log('filling')
        //console.log('in drawNodeCircle')
        pencil.fillStyle = color
        pencil.beginPath()
        pencil.arc(xStart, yStart, radius, 0, 2 * Math.PI)
        pencil.fill()
    }

    drawForcedVariationCircle(xStart, yStart, radius, bool) {
        if (bool === true) {
            //console.log('in FV')
            if (this.xWinForced) {
                pencil.fillStyle = `rgb(255,0,0)`
                pencil.beginPath()
                pencil.arc(xStart, yStart, radius, 0, 2 * Math.PI)
                pencil.fill()
            } else if (this.oWinForced) {
                pencil.fillStyle = `rgb(0,0,255)`
                pencil.beginPath()
                pencil.arc(xStart, yStart, radius, 0, 2 * Math.PI)
                pencil.fill()
            }
        }
    }
}

const treeHead = new RecursiveGameNode([], xOrigin, yOrigin, 2 * Math.PI, 0, baseRadius, radOffset, initialPath.length + viewDepth)
initializeScreen()