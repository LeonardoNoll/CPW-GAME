
export function addEnemy(x,y){ add([
    sprite("lulu"),
    pos(x,y),
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


