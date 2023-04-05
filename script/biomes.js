export function plainGeneration(i, hPos, pos) {
    let dirtHeight = Math.round((sinRnd((i+pos)*world.stoneSeed) + 2));
    // stone
    let y = 0;
    if (hPos > dirtHeight) {
        while (y < hPos - dirtHeight) { 
            drawBlock(block.stone, i*block.s, canvas.height-y*block.s)
            y++
        }
    }
    while (y < hPos) { // dirt
        drawBlock(block.dirt, i*block.s, canvas.height-y*block.s)
        y++
    }
    // grass
    drawBlock(block.grass, i*block.s, canvas.height-hPos*block.s)
    // tallGrass
    if (sinRnd((i+pos) * world.grassSeed) > 0.1) {
        drawBlock(block.tallGrass, i*block.s, canvas.height-(hPos+1)*block.s)
    }
    // water
    for (let y = hPos + 1; y < block.vCount/2; y++) {
        ctx.clearRect(i*block.s, canvas.height-y*block.s, block.s, block.s) // remove grass if necessary
        if (y + 1 < block.vCount/2) {
            drawBlock(block.water, i*block.s, canvas.height-y*block.s)
        }
        drawBlock(block.water, i*block.s, canvas.height-y*block.s, 0.8)
    }
}

export function desertGeneration(i, hPos, pos) {
    let sandHeight = Math.round((sinRnd((i+pos)*world.stoneSeed) + 4));
    hPos = Math.round(hPos * 0.75 + block.vCount *0.25)
    let y = 0;
    if (hPos > sandHeight) {
        while (y < hPos - sandHeight) { 
            drawBlock(block.sandStone, i*block.s, canvas.height-y*block.s)
            y++
        }
    }
    while (y < hPos) { // dirt
        drawBlock(block.sand, i*block.s, canvas.height-y*block.s)
        y++
    }
    if (sinRnd((i+pos) * world.grassSeed) > 0.5) {
        for (let z = 0; z <= Math.round(sinRnd((i+pos) * world.grassSeed + 2)*2.5); z++) {
            drawBlock(block.cactus, i*block.s, canvas.height-(hPos+z)*block.s)
        }
    }
    // water
    for (let y = hPos; y < block.vCount/2; y++) {
        ctx.clearRect(i*block.s, canvas.height-(y+9)*block.s, block.s, block.s*10) // remove grass if necessary
        if (y + 1 < block.vCount/2) {
            drawBlock(block.water, i*block.s, canvas.height-y*block.s)
        }
        drawBlock(block.water, i*block.s, canvas.height-y*block.s, 0.8)
    }
}