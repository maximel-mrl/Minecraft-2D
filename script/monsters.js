import { drawBlock } from "./utils.js";
import { updateScore, death } from "./score.js";
let monsters = []
for (let i = -50; i < 50; i++) {
    let y = i == 0 ? Math.round(Math.random()*50) : i
    monsters.push({
        x: Math.round((Math.random()*15+8)*y),
        y: 0,
        speed: Math.random() >= 0.5 ?  Math.round(Math.random()*2.5 + 0.5) : -1 * Math.round(Math.random()*2.5 + 0.5),
        pos: 0,
    })
}


export default function updateMonsters(hPos, delay) {
    monsters.forEach((monster, i) => {
        if (monster.pos > 3 || monster.pos < -3) {
            monster.speed = -monster.speed
        }
        monster.pos += monster.speed*delay
        let x = (monster.x + monster.pos - world.blockPos);
        let xcol = Math.round(x)
        if (monster.speed > 0) {
            xcol = Math.ceil(x)
            if (hPos[xcol - 1] > hPos[xcol]) {
                xcol = Math.floor(x)
            }
        } else {
            xcol = Math.floor(x)
            if (hPos[xcol + 1] > hPos[xcol]) {
                xcol = Math.ceil(x)
            }
        }
        monster.y = (hPos[xcol] + 1);
        let y = canvas.height - monster.y * block.s;
        drawBlock(block.monster, x*block.s, y)


        let heroX = hero.x - world.translateX/block.s;
        if (heroX + 0.9 >= x && heroX - 0.9 <= x) {
            ctx.fillStyle = "pink"
            ctx.fillRect(x*block.s, y-100, block.s, block.s)
            if (hero.y > monster.y + 0.8 && hero.y < monster.y + 1.2) {
                monsters.splice(i, 1)
                updateScore()
            } else if (hero.y >= monster.y - 1 && hero.y < monster.y + 0.8) {
                death()
                ctx.fillStyle = "red"
                ctx.fillRect(x*block.s, y-100, block.s, block.s)
            }
            // console.log("col")
        }
    })
}

setInterval(() => {
    // console.log(monsters[49].x + monsters[49].pos)
    // console.log(hero.x + world.blockPos)
}, 150);