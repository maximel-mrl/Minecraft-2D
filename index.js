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
    stone: document.createElement("img"),
    tallGrass: document.createElement("img"),
    water: document.createElement("img"),
    sand: document.createElement("img"),
    sandStone: document.createElement("img"),
    cactus: document.createElement("img"),
}
block.vCount = Math.round((canvas.height/block.s)*0.4)
console.log(block.vCount)
block.dirt.src = "./texture/dirt.jpg"
block.grass.src = "./texture/grass.jpg"
block.stone.src = "./texture/stone.jpg"
block.tallGrass.src = "./texture/tallgrass.png"
block.water.src = "./texture/water.jpg"
block.sand.src = "./texture/sand.jpg"
block.sandStone.src = "./texture/sandstone.jpg"
block.cactus.src = "./texture/cactus.png"

const world = {
    translateX: -80,
    blockPos: 0,
    dir: 0,
    curve: {
        a: ((block.vCount-1)/2)*block.s, // height of the curves;
        f: Math.random() * 0.1 + 0.2, // how far apart the peaks are;
        inferings: [
            Math.random() * 0.08 + 0.15,
            Math.random() * 0.08 + 0.15,
            Math.random() * 0.08 + 0.15,
            Math.random() * 0.08 + 0.15,
            Math.random() * 0.08 + 0.15,
            Math.random() * 0.08 + 0.15,
        ]
    },
    stoneSeed: Math.random() * 20,
    grassSeed: Math.random() * 5 + 10,
    biomeSeed: Math.random() * 0.01 + 0.05,
}

let lastTime = 0;
window.onload = () => {
    block["imgS"] = block.dirt.naturalWidth
    updateFg(world.translateX, world.blockPos)
    lastTime = Date.now();
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
    world.translateX -= 5000*delay*world.dir;
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

function drawBlock(img, x, y, Ymul=1) {
    ctx.drawImage(img, 0, 0, block.imgS, block.imgS, x, y + (1-Ymul)*block.s, block.s, block.s*Ymul);
    // draw image full: imgSRC, imgcropStart x-y, imgcropEnd x-y, posX, posY, SizeX, sizeY  
}
function updateFg(offset, pos) {
    ctx.save()
    ctx.translate(offset, -block.s) // get to th bottom of block
    for (let i = 0; i < canvas.width/block.s*2 + block.s; i++) {
        /* ---------------------------------- BLOCK --------------------------------- */
        let hPos = Math.round((sinRnd(i+pos) + 1)* block.vCount * 0.5);
        biome = sinRnd((i+pos)*world.biomeSeed);
        if (biome >= 0) {
            plainGeneration(i, hPos, pos)
        } else {
            desertGeneration(i, hPos, pos, biome)
        }
    }
    ctx.restore()
}

function sinRnd(i) {
    let weight = world.curve.inferings.length+1;
    let hPos =  (Math.sin(world.curve.f*i))/weight
    world.curve.inferings.forEach(infering => {
        hPos += (Math.sin(infering*i))/weight
    })
    return hPos;
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
document.addEventListener("keyup", () => {
    world.dir = 0;
})

function plainGeneration(i, hPos, pos, biome) {
    let dirtHeight = Math.round((sinRnd((i+pos)*world.stoneSeed) + 2));
    // stone
    let y = 0;
    if (hPos > dirtHeight) {
        while (y < hPos - dirtHeight) { 
            drawBlock(block.stone, i*block.s, canvas.height-y*block.s)
            y++
        }
    }
    while (y < hPos) { // dirt
        drawBlock(block.dirt, i*block.s, canvas.height-y*block.s)
        y++
    }
    // grass
    drawBlock(block.grass, i*block.s, canvas.height-hPos*block.s)
    // tallGrass
    if (sinRnd((i+pos) * world.grassSeed) > 0.1) {
        drawBlock(block.tallGrass, i*block.s, canvas.height-(hPos+1)*block.s)
    }
    // water
    for (let y = hPos + 1; y < block.vCount/2; y++) {
        ctx.clearRect(i*block.s, canvas.height-y*block.s, block.s, block.s) // remove grass if necessary
        if (y + 1 < block.vCount/2) {
            drawBlock(block.water, i*block.s, canvas.height-y*block.s)
        }
        drawBlock(block.water, i*block.s, canvas.height-y*block.s, 0.8)
    }
}

function desertGeneration(i, hPos, pos) {
    let sandHeight = Math.round((sinRnd((i+pos)*world.stoneSeed) + 4));
    hPos = Math.round(hPos * 0.75 + block.vCount *0.25)
    let y = 0;
    if (hPos > sandHeight) {
        while (y < hPos - sandHeight) { 
            drawBlock(block.sandStone, i*block.s, canvas.height-y*block.s)
            y++
        }
    }
    while (y < hPos) { // dirt
        drawBlock(block.sand, i*block.s, canvas.height-y*block.s)
        y++
    }
    if (sinRnd((i+pos) * world.grassSeed) > 0.5) {
        for (let z = 0; z <= Math.round(sinRnd((i+pos) * world.grassSeed + 2)*2.5); z++) {
            drawBlock(block.cactus, i*block.s, canvas.height-(hPos+z)*block.s)
        }
    }
    // water
    for (let y = hPos; y < block.vCount/2; y++) {
        ctx.clearRect(i*block.s, canvas.height-(y+9)*block.s, block.s, block.s*10) // remove grass if necessary
        if (y + 1 < block.vCount/2) {
            drawBlock(block.water, i*block.s, canvas.height-y*block.s)
        }
        drawBlock(block.water, i*block.s, canvas.height-y*block.s, 0.8)
    }
}

// test terrain generation to make sure it's good
let message = "succes"
let min = 100;
let max = 0;
for (let u = 0; u < 10000; u++) {
    rnd = Math.round((sinRnd(u) + 1)* block.vCount * 0.5);
    if (rnd > block.vCount) message = "error"
    if (rnd < min) min = rnd
    if (rnd > max) max = rnd
}
console.log(`${message} min: ${min} max: ${max}`)