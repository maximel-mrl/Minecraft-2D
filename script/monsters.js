import { drawBlock, diff } from "./utils.js";
import { updateScore, death } from "./score.js";

let monsters = [];

export default function updateMonsters(hPos, delay) {
    monsters.forEach((monster, i) => {
        /* -------------------------------- MOVEMENT -------------------------------- */
        if (Math.abs(monster.pos) > 3) {
            monster.speed = -monster.speed;
            monster.pos += monster.speed*delay; // make sure don't enter in infinite loop where monster always change direction
        }
        /* -------------------------------- POSITION -------------------------------- */
        // x
        monster.pos += monster.speed*delay;
        let x = (monster.x + monster.pos - world.blockPos);
        // y
        let xcol = Math.round(x);
        if (hPos[xcol - 1] > hPos[xcol]) xcol = Math.floor(x);
        else if (hPos[xcol + 1] > hPos[xcol]) xcol = Math.ceil(x);
        monster.y = (hPos[xcol] + 1);
        let y = canvas.height - monster.y * block.s;
        // draw
        drawBlock(block.monster, x*block.s, y);

        /* --------------------------- HERO COLISION CHECK -------------------------- */
        let heroX = hero.x - world.translateX/block.s;
        if (heroX + 0.9 >= x && heroX - 0.9 <= x) {
            if (hero.y > monster.y + 0.8 && hero.y < monster.y + 1.2) {
                monsters.splice(i, 1);
                updateScore();
            } else if (hero.y >= monster.y - 1 && hero.y < monster.y + 0.8) death();
        }
        /* ----------------------- MONSTER UPDATE + GENERATION ---------------------- */
        if (diff(world.blockPos, monster.x) > 100) monsters.splice(i, 1);
    })
    if (monsters.length < 12) newMonster(1);
}

function newMonster(repeatMultiplier) {
    let side = Math.random() > 0.5 ? 1 : -1;
    let toAdd = {
        x: Math.round(world.blockPos + (window.innerWidth/block.s)*side + Math.random()*50*side*repeatMultiplier),
        y: 10,
        speed: Math.round(Math.random()*2.5 + 0.5),
        pos: 0,
    };
    for (let i = 0; i < monsters.length; i++) {
        if (diff(toAdd.x, monsters[i].x) < 8) return newMonster(repeatMultiplier*2.5); // repeat multiplier allow to increase probabilty of no colision, avoid maximum call stack
    }
    monsters.push(toAdd);
}
