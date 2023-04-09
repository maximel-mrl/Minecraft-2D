export function sinRnd(i) {
    let weight = world.curve.inferings.length+1;
    let hPos = (Math.sin(world.curve.f*i + world.curve.o))/weight;
    world.curve.inferings.forEach((infering, m) => hPos += (Math.sin(infering*i + world.curve.o2*m))/weight);
    return hPos;
}

export function drawBlock(img, x, y, Ymul=1) {
    ctx.drawImage(img, 0, 0, block.imgS, block.imgS, x, y + (1-Ymul)*block.s, block.s, block.s*Ymul);
    // draw image full: imgSRC, imgcropStart x-y, imgcropEnd x-y, posX, posY, SizeX, sizeY  
}

export function toFloatRange(number) {
    number = number*(10**10) > 10**20 ? number : number*(10**10); // if number to big (return as something e+ something) this function return 0 so make sure number is never to big
    return (parseFloat(`0.${Math.round(number)}`));
}

export const diff = (a,b) => (a>b) ? a-b : b-a; // easiest way working for difference with positive/negatove number and not one always bigger
