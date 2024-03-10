<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Earth codePen challenge">
    <title>Mc Platformer</title>
    <link rel="icon" type="image/x-icon" href="assets/images/favicon.ico">
    <link rel="stylesheet" href="stylesheet/style.css">
</head>
<body>
    <div class="mobile-controls">
        <button class="ctrl-btn left" data-key="ArrowLeft"><img src="assets/images/arrow-left.jpg" alt="left btn" draggable="false"></button>
        <button class="ctrl-btn jump" data-key="ArrowUp"><img src="assets/images/jump.jpg" alt="jump btn" draggable="false"></button>
        <button class="ctrl-btn right" data-key="ArrowRight"><img src="assets/images/arrow-right.jpg" alt="right btn" draggable="false"></button>
    </div>
    <div class="mode-container">
        <label for="game-mode">Game mode</label>
        <select name="game-mode" id="mode">
            <option value="survival">adventure</option>
            <option value="peacefull">peacefull</option>
            <option value="spec">spectator</option>
        </select>
    </div>
    <div class="score-container">
        Score: <i class="score">0</i>
    </div>
    <div class="info-container">
        <button class="button round-btn toggle-info">i</button>
    </div>
    <div class="sound-container">
        <button class="button round-btn toggle-sound">
            <img class="sound-muted hidden" src="assets/images/sound-muted.png" alt="sound muted">
            <img class="sound-on" src="assets/images/sound-on.png" alt="sound active">
        </button>
    </div>
    <div class="modal infos hidden">
        <section class="content">
            <h1 class="h1">Minecraft 2D</h1>
            <article>
                <h2 class="h2">What is it?</h2>
                <p>
                    Minecraft-2D  is a demonstration of procedural terrain generation through the use of trigonometric functions. The terrain is generated randomly and infinitely using multiple sinusoidal functions,
                    this is inspired by <a href="https://kwa.ng/procedurally-generated-svg-landscapes/" target="_blank">Kevinverse</a> work.
                    The focus of the site is on showcasing the random generation of terrain, so the gameplay is really secondary just to give a "purpose" to the terrain.
                </p>
            </article>
            <article>
                <section>
                    <h2 class="h2">How it works?</h2>
                    <p>
                        The terrain is generated using multiple sinusoidal functions. By adding multiple of these functions interferences are created, and so, a curve is formed that takes a long time to repeat and thus feels completely random. This method is used to generate everything except monsters.
                    </p>
                </section>
                <section>
                    <h3 class="h3">Example of interferences with five sinusoidal functions</h3>
                    <img src="assets/images/curve-illustration-trimed.gif" alt="Illustration of sinusoidal curve generation">
                </section>
                <section>
                    <p>
                        For more info go check the 
                        <a href="https://github.com/maxime-mrl/Minecraft-2D" target="_blank">Source code</a>
                    </p>
                </section>
            </article>
            <button class="button toggle-info">Go back</button>
        </section>
    </div>
    <div class="modal game-over hidden">
        <h2 class="h1">You Died!</h2>
        <h3 class="final-score h2">
            score: <i class="final-score yellow"></i>
        </h3>
        <div class="seed">
            <input type="number" placeholder="Set seed (blank = random)">
            <button class="button">Same seed</button>
        </div>
        <button class="button respawn">Respawn</button>
    </div>
    <div class="modal hidden" id="aspect-alert">
        <img src="assets/images/landscape.gif" alt="phone rotating to landscape">
        <h2 class="h2">Please use landscape mode !</h2>
    </div>
    <p class="cp">© <?= date("Y") ?> - Maxime Morel</p>
    <script src="script/index.js" type="module"></script>
</body>
</html>