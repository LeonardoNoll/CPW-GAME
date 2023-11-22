
export function addLulux(x,y){ add([
    sprite("lulux"),
    pos(x,y),
    scale(0.3),
    body(),
    health(3),
    anchor("center"),
    area(),
    {
        speed: 100,
        scoreValue: 30,
    },
    "enemy",
    "lulux"
    ])
}
