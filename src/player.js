export function addPlayer() {
    return add([
        sprite("playerSprites", {
            anim: "idle",
        }),
        health(3),
        pos(center()),
        anchor("center"),
        scale(2),
        area({ shape: new Rect(vec2(0), 32,32), offset: vec2(0, 5)}),
        state("ready", ["ready", "cooldown" ]),
    ])
    
}


