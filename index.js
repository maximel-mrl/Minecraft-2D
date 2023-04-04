const canvas = document.createElement("canvas");
canvas.width = document.body.clientWidth;
canvas.height = canvas.width/2;
document.body.appendChild(canvas)
const ctx = canvas.getContext("2d")

const block = {
    s: 40,
    vCount: 5,
    dirt: document.createElement("img"),
    grass: document.createElement("img"),
}
block.dirt.src = "./texture/dirt.jpg"
block.grass.src = "./texture/grass.jpg"

const world = {
    translateX: 0,
    blockPos: 0,
}

let curve = {
    a: ((block.vCount-1)/2)*block.s, // height of the curves;
    f: Math.random() * 0.15 + 0.03, // how far apart the peaks are;
}
let infering =  Math.random() * 0.1 + 0.012;

window.onload = () => {
    block["imgS"] = block.dirt.naturalWidth
    updateFg(world.translateX, world.blockPos)
    update()
}

function update() {
    let delay = (Date.now() - lastTime)/1000;
    lastTime = Date.now();
    ctx.clearRect(0,0,canvas.width,canvas.height)
    ctx.save()

    updateBlocks(delay)

    ctx.restore()
    requestAnimationFrame(update)
}
let lastTime = Date.now();

function updateBlocks(delay) {
    world.translateX -= 300*delay;
    if (world.translateX < -1* block.s) {
        world.translateX += block.s;
        world.blockPos++
        console.log(world.translateX)
        console.log(world.blockPos)
    }
    updateFg(world.translateX, world.blockPos)
    // console.log(world.translateX)

}

function drawBlock(img, x, y, mul=1) {
    ctx.drawImage(img, 0, 0, block.imgS, block.imgS, x, y, block.s*mul, block.s*mul);
    // draw image full: imgSRC, imgcropStart x-y, imgcropEnd x-y, posX, posY, SizeX, sizeY  
}

function updateFg(offset, pos) {
    ctx.save()
    ctx.translate(offset, -block.s) // get to th bottom of block
    for (let i = 0; i < canvas.width/block.s*2 + block.s; i++) {
        // generation of terrain
        let hPos =  (Math.sin(curve.f*(i+pos)) * curve.a + curve.a)/2
        hPos += (Math.sin(infering*(i+pos)) * curve.a + curve.a)/2
        hPos = Math.round(hPos/(block.s))

        for (let y = 0; y < hPos; y++) {
            drawBlock(block.dirt, i*block.s, canvas.height-y*block.s)
        }
        drawBlock(block.grass, i*block.s, canvas.height-hPos*block.s)
    }
    ctx.restore()
}