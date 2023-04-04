const canvas = document.createElement("canvas");
canvas.width = document.body.clientWidth;
canvas.height = canvas.width/2;
document.body.appendChild(canvas)
const ctx = canvas.getContext("2d")

let curve = {
    a: 40, // height of the curves;
    f: Math.random() * 0.15 + 0.002, // how far apart the peaks are;
}
let infering = {
    f: Math.random() * 0.02 + 0.002,
};
let infering2 = {
    f: Math.random() * 0.02 + 0.002,
};

for (let i = 0; i < canvas.width; i++) {
    // generation of terrain
    let hPos =  (Math.sin(curve.f*(i)) * curve.a)/2
    hPos += (Math.sin(infering.f*(i)) * curve.a)/2
    hPos += (Math.cos(infering2.f*(i)) * curve.a)/2
    hPos = hPos + canvas.height/2

    ctx.fillStyle = "red"
    ctx.fillRect(i,hPos,1,1)
    ctx.fillStyle = "blue"
    ctx.fillRect(i, canvas.height/2, 1, 1)
}