export function addZedu(xy){ 
    return add([
    sprite("zedu"),
    pos(xy),
    scale(0.7),
    health(2),
    anchor("center"),
    area({ shape: new Rect(vec2(0), 70,100), offset: vec2(20, 0)}),
    {
        speed: 0,
        scoreValue: 100,
    },
    "enemy",
    "zedu"
    ])
}