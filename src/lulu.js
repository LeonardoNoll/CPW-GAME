
export function addEnemy(xy){ add([
    sprite("lulu"),
    pos(xy),
    scale(0.3),
    body(),
    health(1),
    anchor("center"),
    area(),
    {
        speed: 200,
        scoreValue: 10,
    },
    "enemy",
    "lulu"
    ])
}


