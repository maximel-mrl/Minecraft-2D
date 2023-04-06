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
    ],
    o: Math.random()*500, // starting offset
    o2: Math.random()*200
}

console.log(canvas.width)

for (let y = 0; y < canvas.width*10; y++) {
    i = y/10
    let weight = curve.inferings.length+1;
    // generation of terrain
    let hPos =  (Math.sin(curve.f*i + curve.o) * curve.a)/weight
    curve.inferings.forEach((infering,m) => {
        hPos += (Math.sin(infering*i + (curve.o2*m)) * curve.a)/weight
    })
    hPos = hPos + canvas.height/2 - curve.a

    ctx.fillStyle = "red"
    ctx.fillRect(i,hPos,1,1)
    ctx.fillStyle = "blue"
    ctx.fillRect(i, canvas.height/2, 1, 1)
}

let seed = Math.random()*1000000;

function toFloat(number) {
    return (parseFloat(`0.${Math.round(number*(10**10))}`))
}

console.log(toFloat(seed))
console.log(toFloat((seed%532)*seed))