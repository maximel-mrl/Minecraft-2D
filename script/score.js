export function updateScore() {
    hero.jump = true;
    hero.jumping = false;
    hero.vSpeed = 0;
    world.score++
    world.scoreElem.innerHTML = `Score: ${world.score}`
}

export function death() {
    hero.dead = true;
    alert("Game Over")
    window.location.reload()
}