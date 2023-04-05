import "./utils.js"
import assets from "./assets.js"
import { update } from "./update.js";

window.canvas = document.createElement("canvas");
canvas.width = document.body.clientWidth;
canvas.height = canvas.width/2;
document.body.appendChild(canvas)
window.ctx = canvas.getContext("2d")

window.block = {
    s: 30,
    vCount: 5,
}
block.vCount = Math.round((canvas.height/block.s)*0.4)
assets.forEach((asset) => { // load all assets
    switch (asset.type) {
        case "img":
            block[asset.name] = document.createElement("img")
            block[asset.name].src = asset.src
            break;
        default:
            console.error("asset not recognized -> not imported")
    }
})

window.world = {
    translateX: -80,
    blockPos: 0,
    dir: 0,
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
        ]
    },
    stoneSeed: Math.random() * 20,
    grassSeed: Math.random() * 5 + 10,
    biomeSeed: Math.random() * 0.01 + 0.05,
}

window.onload = () => {
    block["imgS"] = block.dirt.naturalWidth
    update()
}

document.addEventListener("keydown", ({key}) => {
    switch (key) {
        case "ArrowRight":
            world.dir = 1;
            break;
        case "ArrowLeft":
            world.dir = -1;
            break;
    }
})
document.addEventListener("keyup", () => {
    world.dir = 0;
})


// test terrain generation to make sure it's good (TEMP)
let message = "succes"
let min = 100;
let max = 0;
for (let u = 0; u < 10000; u++) {
    let rnd = Math.round((sinRnd(u) + 1)* block.vCount * 0.5);
    if (rnd > block.vCount) message = "error"
    if (rnd < min) min = rnd
    if (rnd > max) max = rnd
}
console.log(`${message} min: ${min} max: ${max}`)