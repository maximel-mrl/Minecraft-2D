import { drawBlock } from "./utils.js";

export default function updateHero(hPos, delay) {
    let waterMul = hero.y < world.waterHeight ? 0.5 : 1;
    /* -------------------------------- MOVEMENT -------------------------------- */
    switch (hero.movment) { // left to right movement
        case "left":
            if (hPos[Math.floor(Math.abs(world.translateX/block.s) + hero.x)] + 1 > hero.y) break; // stop movement if hit block
            if (hero.x > 4) hero.x -= hero.hSpeed*waterMul*delay;
            else world.translateX += hero.hSpeed*waterMul*delay*block.s;
            break;
        case "right":
            if (hPos[Math.ceil(Math.abs(world.translateX/block.s) + hero.x)] + 1 > hero.y) break; // stop movement if hit block
            if (hero.x < 15) hero.x += hero.hSpeed*waterMul*delay;
            else world.translateX -= hero.hSpeed*waterMul*delay*block.s;
            break;
    }
    /* --------------------------------- JUMPING -------------------------------- */
    let jSpeed = hero.jSpeed * waterMul;
    let gravity = world.g * waterMul

    if ((hero.jump && !hero.jumping) || (hero.jump && waterMul < 1)) { // if jump action
        hero.jump = false;
        hero.jumping = true;
        if (hero.vSpeed < jSpeed) {
            hero.vSpeed += jSpeed;
        }
        hero.y += hero.vSpeed * delay;
    }
    if (hero.jumping) { // if in the air
        hero.vSpeed -= gravity*delay;
        hero.y += hero.vSpeed*delay;
        
        let x = Math.abs(world.translateX/block.s) + hero.x;
        // defines which block should be used for colision
        let xcol = Math.round(x);
        if (hPos[xcol - 1] > hPos[xcol]) xcol = Math.floor(x);
        else if (hPos[xcol + 1] > hPos[xcol]) xcol = Math.ceil(x);
        // check colision
        if (hero.y <= hPos[xcol] + 1 && hero.y >= hPos[xcol] + (1-20*delay) || hero.y <= hPos[xcol]) {
            hero.jumping = false;
            hero.vSpeed = 0;
            hero.y = hPos[xcol] + 1;
        }
    }
    // fall detection
    if (
        hPos[Math.ceil(Math.abs(world.translateX/block.s) + hero.x)] + 1 < hero.y &&
        hPos[Math.floor(Math.abs(world.translateX/block.s) + hero.x)] + 1 < hero.y &&
        !hero.jumping
    ) hero.jumping = true;

    /* ---------------------------------- DRAW ---------------------------------- */
    let x = hero.x*block.s - world.translateX;
    let y = canvas.height-hero.y*block.s;
    drawBlock(block.hero, x, y);
}
