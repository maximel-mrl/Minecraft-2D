import assets from "./assets.js";
import { update } from "./update.js";
import { toFloatRange } from "./utils.js";

window.canvas = document.createElement("canvas");
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;
    document.body.appendChild(canvas);
window.ctx = canvas.getContext("2d");

const modeSelect = document.querySelector("#mode");
const infoBtns = document.querySelectorAll(".toggle-info");
const infosModal = document.querySelector(".infos");

window.seed = setSeed();
console.log(`%cSeed: ${seed}`,  "font-weight: bold; font-size: 16px");

window.block = { vCount: 12 };
block["s"] = (canvas.height*0.55)/block.vCount;


window.world = {
    g: 75,
    gameMode: "survival",

    translateX: 0,
    blockPos: 0,
    cloudTranslate: -120,
    cloudPos: 0,
    score: 0,
    waterHeight: block.vCount/2,
    dir: 0,

    curve: {
        a: ((block.vCount-1)/2)*block.s, // height of the curves;
        f: toFloatRange(seed) * 0.1 + 0.2, // how far apart the peaks are;
        inferings: [ // inferings curve
            toFloatRange((seed%89)*150.87) * 0.08 + 0.15, // seed is a "random" big number to make it different a simple % allow to get a number that feel unrelated then multiply it so it's not too small and varies a bit more
            toFloatRange((seed%48)*137.8) * 0.08 + 0.15,
            toFloatRange((seed%11)*162.97) * 0.08 + 0.15,
            toFloatRange((seed%158)*183.7) * 0.08 + 0.15,
            toFloatRange((seed%23)*103) * 0.08 + 0.15,
            toFloatRange((seed%189)*358.9) * 0.08 + 0.15,
        ],
        o:  toFloatRange((seed%789)*seed)*500, // starting offset
        o2: toFloatRange((seed%129)*seed)*500,
    },
    stoneSeed: toFloatRange((seed%789)*seed) * 20,
    grassSeed: toFloatRange((seed%79)*seed) * 5 + 10,
    biomeSeed: toFloatRange((seed%89)*seed) * 0.01 + 0.05,
    cloudSeed: toFloatRange((seed%759)*seed) * 0.25 + 0.5,
};

window.hero = {
    hSpeed: world.g*0.14,
    jSpeed: (2*world.g*1.25)**0.5, // want to be abble to jump 1.25 block what initial speed should go? acoording to rdn dude initialSpeed = (2gh)**0.5
    x: 5,
    y: 0,
    vSpeed: 0,
    movment: false,
    jump: true, // jump at start to initialize Y
    jumping: false,
    dead: false,
};

assets.forEach((asset) => { // import all assets
    switch (asset.type) {
        case "img":
            block[asset.name] = document.createElement("img");
            block[asset.name].src = asset.src;
            break;
        default:
            console.error("asset not recognized -> not imported");
    }
});

window.onload = () => {
    block["imgS"] = block.dirt.naturalWidth;
    update();
}

window.onresize = () => {
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;
}

modeSelect.onchange = () => {
    modeSelect.blur();
    if (!/^survival$|^peacefull$|^spec$/.test(modeSelect.value)) return;
    world.gameMode = modeSelect.value;
}

infoBtns.forEach(infoBtn => {
    infoBtn.onclick = () => infosModal.classList.toggle("hidden");
})

function setSeed() {
    let definedSeed = parseInt(window.location.href.split("?seed=")[1]);
    if (definedSeed && definedSeed != 0) return definedSeed;
    return Math.round(Math.random()*(10**15));
}

/* ----------------------------- INPUT LISTENING ---------------------------- */
document.addEventListener("keydown", ({key}) => {
    switch (key) {
        case "ArrowRight":
            hero.movment = "right";
            world.dir = 1;
            break;
        case "ArrowLeft":
            hero.movment = "left";
            world.dir = -1;
            break;
        case "ArrowUp":
            hero.jump = true;
            break;
    }
})
document.addEventListener("keyup", ({key}) => {
    world.dir = 0;
    switch (key) {
        case "ArrowRight":
            if (hero.movment != "right") return;
            hero.movment = false; 
            break;
        case "ArrowLeft":
            if (hero.movment != "left") return;
            hero.movment = false; 
            break;
    }
})
