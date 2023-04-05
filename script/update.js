import { plainGeneration, desertGeneration } from "./biomes.js"
import { sinRnd } from "./utils.js";
window.hpos = [];
setInterval(() => {
    console.log(hpos)
}, 500);
let lastTime = Date.now();
export function update() {
    let delay = (Date.now() - lastTime)/1000;
    lastTime = Date.now();
    ctx.clearRect(0,0,canvas.width,canvas.height)
    ctx.save()
    updateClouds(delay)
    let hPos = updatePos(delay)

    updateHero(hPos, delay)
    ctx.restore()
    requestAnimationFrame(update)
}

function updateHero(hPos, delay) {
    ctx.fillStyle = "green";
    //horizontal movement
    switch (hero.movment) {
        case "left":
            if (hPos[Math.floor(Math.abs(world.translateX/block.s) + hero.x)] + 1 > hero.y) break; // block movement if hit block
            if (hero.x > 4) {
                hero.x -= hero.hSpeed*delay
            } else {
                world.translateX += hero.hSpeed*delay*block.s
            }
            break;
        case "right":
            if (hPos[Math.ceil(Math.abs(world.translateX/block.s) + hero.x)] + 1 > hero.y) break; // block movement if hit block
            if (hero.x < 15) {
                hero.x += hero.hSpeed*delay
            } else {
                world.translateX -= hero.hSpeed*delay*block.s
            }
            break;
    }
    if (hero.jump && !hero.jumping) {
        hero.jump = false;
        hero.jumping = true;
        hero.vSpeed += hero.vAcc
    }
    if (hero.jumping) {
        hero.vSpeed -= 40*delay
        hero.y += hero.vSpeed*delay
        if (hPos[Math.ceil(Math.abs(world.translateX/block.s) + hero.x)] + 1 >= hero.y && hPos[Math.floor(Math.abs(world.translateX/block.s) + hero.x)] + 1 >= hero.y) { // fall
            hero.jumping = false;
            hero.vSpeed = 0
            hero.y = hPos[Math.round(Math.abs(world.translateX/block.s) + hero.x)] + 1
        }
    }
    if (hPos[Math.ceil(Math.abs(world.translateX/block.s) + hero.x)] + 1 < hero.y && hPos[Math.floor(Math.abs(world.translateX/block.s) + hero.x)] + 1 < hero.y && !hero.jumping) { // fall
        hero.y--
    }
    if (hero.y == 0) {
        hero.y = hPos[Math.round(Math.abs(world.translateX/block.s) + hero.x)] + 1
    }
    let x = hero.x*block.s - world.translateX;
    let y = canvas.height-hero.y*block.s;
    ctx.fillRect(x, y, block.s, block.s)
}

function updatePos(delay) {
    world.translateX -= 5000*delay*world.dir;
    if (world.translateX < -5* block.s) {
        world.translateX += block.s;
        world.blockPos++
    }
    if (world.translateX > -1* block.s) {
        world.translateX -= block.s;
        world.blockPos--
    }
    return updateBlocks(world.translateX, world.blockPos)
}
function updateClouds(delay) {
    world.cloudTranslate += 10*delay;
    if (world.cloudTranslate > - 2 * block.s) {
        world.cloudTranslate -= block.s;
        world.cloudPos--
    }
}

function updateBlocks(offset, pos) {
    ctx.translate(offset, -block.s) // get to th bottom of block
    let heights = []
    for (let i = 0; i < canvas.width/block.s*2 + block.s; i++) {

        let hPos = Math.round((sinRnd(i+pos) + 1)* block.vCount * 0.5); // get height of generation

        let biome = sinRnd((i+pos)*world.biomeSeed); // defines biome
        if (biome >= 0) {
            hPos = plainGeneration(i, hPos, pos)
        } else {
            hPos = desertGeneration(i, hPos, pos, biome)
        }
        let clouds = sinRnd((i+pos+world.cloudPos)*world.cloudSeed);
        if (clouds > 0.2) {
            ctx.fillStyle = "#CEE5F2"
            clouds = Math.min(Math.round(clouds*3), 3)
            let x = i*block.s + world.cloudTranslate
            let s = block.s*1.01;
            if (clouds == 3) {
                ctx.fillRect(x, (3)*block.s, s, s)
                ctx.fillRect(x, (2)*block.s, s, s)
                ctx.fillRect(x, (4)*block.s, s, s)
            } else {
                for (let y = 0; y < clouds; y++) {
                    ctx.fillRect(x, (3+y)*block.s, s, s)
                }
            }
        }
        heights.push(hPos);
    }
    return heights;
}