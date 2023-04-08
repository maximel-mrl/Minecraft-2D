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
const infosModal = document.querySelector(".infos")

window.seed = setSeed();
console.log(`%cSeed: ${seed}`,  "font-weight: bold; font-size: 16px")

window.block = { vCount: 12, }
block["s"] = (canvas.height*0.55)/block.vCount;
assets.forEach((asset) => { // load all assets
    switch (asset.type) {
        case "img":
            block[asset.name] = document.createElement("img");
            block[asset.name].src = asset.src;
            break;
        default:
            console.error("asset not recognized -> not imported");
    }
})

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
        inferings: [
            toFloatRange((seed%89)*10) * 0.08 + 0.15,
            toFloatRange((seed%48)*10) * 0.08 + 0.15,
            toFloatRange((seed%11)*10) * 0.08 + 0.15,
            toFloatRange((seed%158)*18) * 0.08 + 0.15,
            toFloatRange((seed%23)*10) * 0.08 + 0.15,
            toFloatRange((seed%189)*35) * 0.08 + 0.15,
        ],
        o:  toFloatRange((seed%789)*seed)*500, // starting offset
        o2: toFloatRange((seed%129)*seed)*500
    },
    stoneSeed: toFloatRange((seed%789)*seed) * 20,
    grassSeed: toFloatRange((seed%79)*seed) * 5 + 10,
    biomeSeed: toFloatRange((seed%89)*seed) * 0.01 + 0.05,
    cloudSeed: toFloatRange((seed%759)*seed) * 0.25 + 0.5,
}

window.hero = {
    x: 5,
    y: 0,
    hSpeed: world.g*0.14,
    vSpeed: 0,
    jSpeed: (2*world.g*1.25)**0.5, // want to be abble to jump 1.1 block what initial speed should go? acoording to rdn dude v = (2gh)**0.5  so just apply
    movment: false,
    jump: true, // jump at start so it initialize Y
    jumping: false,
    dead: false,
}

window.onload = () => {
    block["imgS"] = block.dirt.naturalWidth;
    update()
}

window.onresize = () => {
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;
}

modeSelect.onchange = () => {
    modeSelect.blur()
    if (!/^survival$|^peacefull$|^spec$/.test(modeSelect.value)) return;
    world.gameMode = modeSelect.value;
}

infoBtns.forEach(infoBtn => {
    infoBtn.onclick = () => {
        infosModal.classList.toggle("hidden");
    }
})

function setSeed() {
    let definedSeed = parseInt(window.location.href.split("?seed=")[1])
    if (definedSeed && definedSeed != 0) return definedSeed
    return Math.round(Math.random()*(10**15))
}

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




