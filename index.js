const canvas = document.createElement("canvas");
canvas.width = document.body.clientWidth;
canvas.height = canvas.width/2;
document.body.appendChild(canvas)
const ctx = canvas.getContext("2d")

const block = {
    s: 30,
    vCount: 5,
    dirt: document.createElement("img"),
    grass: document.createElement("img"),
}
block.vCount = Math.round((canvas.height/block.s)*0.4)
console.log(block.vCount)
block.dirt.src = "./texture/dirt.jpg"
block.grass.src = "./texture/grass.jpg"

const world = {
    translateX: -80,
    blockPos: 0,
    dir: 0
}

let curve = {
    a: ((block.vCount-1)/2)*block.s, // height of the curves;
    f: Math.random() * 0.15 + 0.03, // how far apart the peaks are;
}
let inferings =  [
    Math.random() * 0.3 + 0.25,
    Math.random() * 0.3 + 0.25,
    Math.random() * 0.3 + 0.25,
    Math.random() * 0.3 + 0.25
];
let lastTime = 0;
window.onload = () => {
    block["imgS"] = block.dirt.naturalWidth
    updateFg(world.translateX, world.blockPos)
    let lastTime = Date.now();
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

function updateBlocks(delay) {
    world.translateX -= 500*delay*world.dir;
    if (world.translateX < -5* block.s) {
        world.translateX += block.s;
        world.blockPos++
    }
    if (world.translateX > -1* block.s) {
        world.translateX -= block.s;
        world.blockPos--
    }
    updateFg(world.translateX, world.blockPos)
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
        let hPos = rndTerrain(i+pos)
        for (let y = 0; y < hPos; y++) {
            drawBlock(block.dirt, i*block.s, canvas.height-y*block.s)
        }
        drawBlock(block.grass, i*block.s, canvas.height-hPos*block.s)
    }
    ctx.restore()
}

function rndTerrain(i) {
    let weight = inferings.length+1;
    let hPos =  (Math.sin(curve.f*i) * curve.a + curve.a)/weight
    inferings.forEach(infering => {
        hPos += (Math.sin(infering*i) * curve.a + curve.a)/weight
    })
    return Math.round(hPos/(block.s));
}

document.addEventListener("keydown", ({key}) => {
    switch (key) {
        case "ArrowRight":
            world.dir = 1;
            break;
        case "ArrowLeft":
            world.dir = -1;
            break;
    }
})
document.addEventListener("keyup", ({key}) => {
    world.dir = 0;
})


// test terrain generation to make sure it's good
let message = "succes"
let min = 100;
for (let u = 0; u < 10000; u++) {
    rnd = rndTerrain(u);
    if (rnd > block.vCount) message = "error"
    if (rnd < min) min = rnd
}
console.log(message + min)