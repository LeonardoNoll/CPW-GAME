
export function addLulux(xy){ add([
    sprite("lulux"),
    pos(xy),
    scale(0.3),
    body(),
    health(3),
    anchor("center"),
    area({ shape: new Rect(vec2(0), 300,200), offset: vec2(0, 10)}),
    {
        speed: 100,
        scoreValue: 30,
    },
    "enemy",
    "lulux"
    ])
}
