export function player() {
    add([
        sprite("player"),
        pos(center()),
        anchor("center"),
        scale(0.10),
        area(),
        "player"
    ])

    const player = get("player")[0]

    const direction = {
    w: vec2(0, -1),
    up: vec2(0, -1),
    s: vec2(0, 1),
    down: vec2(0, 1),
    a: vec2(-1, 0),
    left: vec2(-1, 0),
    d: vec2(1, 0),
    right: vec2(1, 0),
    }
    for (const dir in direction) {
        onKeyDown(dir, () => {
            player.move(direction[dir].scale(400))
        })
    }
}