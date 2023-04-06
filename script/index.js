import assets from "./assets.js";
import { update } from "./update.js";
import { toFloatRange } from "./utils.js";

let seed = setSeed();

window.canvas = document.createElement("canvas");
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;
    document.body.appendChild(canvas);
window.ctx = canvas.getContext("2d");

window.block = { s: 35, }
block["vCount"] = Math.round((canvas.height/block.s)*0.55);
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

    translateX: 0,
    blockPos: 0,
    cloudTranslate: -120,
    cloudPos: 0,
    waterHeight: block.vCount/2,

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
    hSpeed: 10,
    vSpeed: 0,
    jSpeed: (2*world.g*1.2)**0.5, // want to be abble to jump 1.1 block what initial speed should go? acoording to rdn dude v = (2gh)**0.5  so just apply
    movment: false,
    jump: true, // jump at start so it initialize Y
    jumping: false,
}

window.onload = () => {
    block["imgS"] = block.dirt.naturalWidth;
    update()
}

window.onresize = () => {
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;
}

function setSeed() {
    let definedSeed = parseInt(window.location.href.split("?seed=")[1])
    console.log(definedSeed)
    if (definedSeed && definedSeed != 0) return definedSeed
    return Math.round(Math.random()*(10**15))
}

document.addEventListener("keydown", ({key}) => {
    switch (key) {
        case "ArrowRight":
            hero.movment = "right";
            break;
        case "ArrowLeft":
            hero.movment = "left";
            break;
        case "ArrowUp":
            hero.jump = true;
            break;
    }
})
document.addEventListener("keyup", ({key}) => {
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


