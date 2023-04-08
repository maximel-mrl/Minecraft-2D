import { drawBlock } from "./utils.js";
export default function updateHero(hPos, delay) {
    let waterMul = 1;
    if (hero.y < world.waterHeight) { // if water
        waterMul = 0.5
    }
    switch (hero.movment) { // left to right movement
        case "left":
            if (hPos[Math.floor(Math.abs(world.translateX/block.s) + hero.x)] + 1 > hero.y) break; // stop movement if hit block
            if (hero.x > 4) hero.x -= hero.hSpeed*waterMul*delay
            else world.translateX += hero.hSpeed*waterMul*delay*block.s
            break;
        case "right":
            if (hPos[Math.ceil(Math.abs(world.translateX/block.s) + hero.x)] + 1 > hero.y) {
                break;
            } // stop movement if hit block
            if (hero.x < 15) hero.x += hero.hSpeed*waterMul*delay
            else world.translateX -= hero.hSpeed*waterMul*delay*block.s
            break;
    }
    // jump
    if ((hero.jump && !hero.jumping) || (hero.jump && waterMul < 1)) {
        hero.jump = false;
        hero.jumping = true;
        hero.vSpeed += hero.jSpeed
        hero.y += hero.vSpeed*delay
    }
    if (hero.jumping) {
        hero.vSpeed -= world.g*delay 
        hero.y += hero.vSpeed*delay

        
        let x = Math.abs(world.translateX/block.s) + hero.x;
        let xcol = Math.round(x)

        if (hPos[xcol - 1] > hPos[xcol]) {
            xcol = Math.floor(x)
        } else if (hPos[xcol + 1] > hPos[xcol]) {
            xcol = Math.ceil(x)
        }
        if (hero.y <= hPos[xcol] + 1 && hero.y >= hPos[xcol] + 0.8 || hero.y <= hPos[xcol]) {
                hero.jumping = false;
                hero.vSpeed = 0
                hero.y = hPos[xcol] + 1
        }
    }

    if (hPos[Math.ceil(Math.abs(world.translateX/block.s) + hero.x)] + 1 < hero.y && hPos[Math.floor(Math.abs(world.translateX/block.s) + hero.x)] + 1 < hero.y && !hero.jumping) { // fall
        hero.jumping = true;
    }


    let x = hero.x*block.s - world.translateX;
    let y = canvas.height-hero.y*block.s;
    drawBlock(block.hero, x, y)
}
