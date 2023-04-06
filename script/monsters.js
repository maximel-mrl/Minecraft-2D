import { drawBlock } from "./utils.js";
let monsters = []
for (let i = -50; i < 50; i++) {
    let y = i == 0 ? Math.round(Math.random()*50) : i
    monsters.push({
        x: Math.round((Math.random()*15+8)*y),
        speed: Math.random() >= 0.5 ?  Math.round(Math.random()*2.5 + 0.5) : -1 * Math.round(Math.random()*2.5 + 0.5),
        pos: 0,
    })
}
console.log(monsters)


export default function updateMonsters(hPos, delay) {
    monsters.forEach(monster => {
        if (monster.pos > 3 || monster.pos < -3) {
            monster.speed = -monster.speed
        }
        monster.pos += monster.speed*delay
        let x = (monster.x + monster.pos - world.blockPos);
        let xcol= Math.round(x)
        let y = canvas.height - (hPos[xcol] + 1) * block.s;
        drawBlock(block.monster, x*block.s, y)
    })
}