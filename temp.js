const canvas = document.createElement("canvas");
canvas.width = document.body.clientWidth;
canvas.height = canvas.width/2;
document.body.appendChild(canvas)
const ctx = canvas.getContext("2d")

let curve = {
    a: 40, // height of the curves;
    f: Math.random() * 0.02 + 0.002, // how far apart the peaks are;
    p: Math.random() * 250, // move the curve left / right
}
let infering = {
    f: Math.random() * 0.02 + 0.002,
    p: Math.random() * 250,
};

for (let i = 0; i < canvas.width; i++) {
    // generation of terrain
    let hPos =  (Math.sin(curve.f*(i + curve.p)) * curve.a + curve.a)/2
    hPos += (Math.sin(infering.f*(i + infering.p)) * curve.a + curve.a)/2
    hPos = hPos + canvas.height/2

    ctx.fillRect(i,hPos,1,1)
}