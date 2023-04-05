export function sinRnd(i) {
    let weight = world.curve.inferings.length+1;
    let hPos =  (Math.sin(world.curve.f*i + world.curve.o))/weight
    world.curve.inferings.forEach((infering, m) => {
        hPos += (Math.sin(infering*i + world.curve.o2*m))/weight
    })
    return hPos;
}


export function drawBlock(img, x, y, Ymul=1) {
    ctx.drawImage(img, 0, 0, block.imgS, block.imgS, x, y + (1-Ymul)*block.s, block.s, block.s*Ymul);
    // draw image full: imgSRC, imgcropStart x-y, imgcropEnd x-y, posX, posY, SizeX, sizeY  
}