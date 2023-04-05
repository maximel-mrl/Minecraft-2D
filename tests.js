const canvas = document.createElement("canvas");
canvas.width = document.body.clientWidth;
canvas.height = canvas.width/2;
document.body.appendChild(canvas)
const ctx = canvas.getContext("2d")


const curve = {
    a: 40, // height of the curves;
    f: Math.random() * 0.15 + 0.03, // how far apart the peaks are;
    inferings: [
        Math.random() * 0.3 + 0.25,
        Math.random() * 0.3 + 0.25,
        Math.random() * 0.3 + 0.25,
        Math.random() * 0.3 + 0.25
    ]
}

console.log(canvas.width)

for (let y = 0; y < canvas.width*10; y++) {
    i = y/10
    let weight = curve.inferings.length+1;
    // generation of terrain
    let hPos =  (Math.sin(curve.f*i) * curve.a)/weight
    curve.inferings.forEach(infering => {
        hPos += (Math.sin(infering*i) * curve.a)/weight
    })
    hPos = hPos + canvas.height/2 - curve.a

    ctx.fillStyle = "red"
    ctx.fillRect(i,hPos,1,1)
    ctx.fillStyle = "blue"
    ctx.fillRect(i, canvas.height/2, 1, 1)
}



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