import { plainGeneration, desertGeneration } from "biome"

let lastTime = Date.now();
export function update() {
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

function updateFg(offset, pos) {
    ctx.translate(offset, -block.s) // get to th bottom of block
    for (let i = 0; i < canvas.width/block.s*2 + block.s; i++) {
        let hPos = Math.round((sinRnd(i+pos) + 1)* block.vCount * 0.5); // get height of generation
        let biome = sinRnd((i+pos)*world.biomeSeed); // defines biome
        if (biome >= 0) {
            plainGeneration(i, hPos, pos)
        } else {
            desertGeneration(i, hPos, pos, biome)
        }
    }
}