export function addLulucian(xy){ 
    return add([
    sprite("lulucian"),
    pos(xy),
    scale(0.2),
    body(),
    health(2),
    anchor("center"),
    area(),
    {
        speed: 130,
        scoreValue: 50,
    },
    "enemy",
    "lulucian"
    ])
}


