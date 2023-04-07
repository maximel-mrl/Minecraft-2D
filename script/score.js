const scoreTxt = document.querySelector(".score");
const gameOverModal = document.querySelector(".game-over");
const finalScoreTxt = gameOverModal.querySelector(".final-score > i");
const seedInput = gameOverModal.querySelector(".seed input")
const seedBtn = gameOverModal.querySelector(".seed button")
const respawnBtn = gameOverModal.querySelector(".respawn")


export function updateScore() {
    hero.jump = true;
    hero.jumping = false;
    hero.vSpeed = 0;
    world.score++
    scoreTxt.innerHTML = world.score
}

export function death() {
    hero.dead = true;

    finalScoreTxt.innerHTML = world.score;
    seedBtn.onclick = () => seedInput.value = seed
    gameOverModal.classList.toggle("hidden");
    respawnBtn.onclick = () => {
        window.location.search = "?seed=" + parseInt(seedInput.value)
        if (!/^[0-9]+$/.test(seedInput.value)) {
            window.location.search = ""
        }
        /^[1-9]+$/
    }

    // alert("Game Over")
    // window.location.reload()
}