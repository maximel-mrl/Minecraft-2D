let monsters = []
for (let i = 0; i < 50; i++) {
    monsters.push(Math.round(Math.random()*1000))
}
console.log(monsters)


export default function updateMonsters(hPos) {
    monsters.forEach(monster => {
        let x = (monster - world.blockPos)*block.s;
        let xcol = Math.round(Math.round(x/block.s))
        let y = canvas.height - (hPos[xcol] + 1) * block.s;
        ctx.fillStyle = "red"
        ctx.fillRect(x, y, block.s, block.s)
    })
}