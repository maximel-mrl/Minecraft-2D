import "./utils.js";
import assets from "./assets.js";
import { update } from "./update.js";

window.canvas = document.createElement("canvas");
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;
    document.body.appendChild(canvas);
window.ctx = canvas.getContext("2d");

window.block = { s: 30, }
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
    translateX: 0,
    blockPos: 0,
    dir: 0,
    cloudTranslate: -120,
    cloudPos: 0,
    curve: {
        a: ((block.vCount-1)/2)*block.s, // height of the curves;
        f: Math.random() * 0.1 + 0.2, // how far apart the peaks are;
        inferings: [
            Math.random() * 0.08 + 0.15,
            Math.random() * 0.08 + 0.15,
            Math.random() * 0.08 + 0.15,
            Math.random() * 0.08 + 0.15,
            Math.random() * 0.08 + 0.15,
            Math.random() * 0.08 + 0.15,
        ],
        o: Math.random()*500, // starting offset
        o2: Math.random()*500
    },
    stoneSeed: Math.random() * 20,
    grassSeed: Math.random() * 5 + 10,
    biomeSeed: Math.random() * 0.01 + 0.05,
    cloudSeed: Math.random() * 0.25 + 0.5,
}

window.hero = {
    x: 5,
    y: 0,
    hSpeed: 8,
    vSpeed: 0,
    vAcc: 10,
    movment: false,
    jump: false,
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


