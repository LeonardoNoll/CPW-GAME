export function healthHeart(x) {
    return add([
        sprite("heart"),
        pos(x, 50),
        scale(2),
        anchor("center"),
        "health"
    ])
}