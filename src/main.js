const k = kaboom({
    width: 900,
    height: 600,
    scale: 1,
    letterbox: true
})

loadSprite("background", "assets/background.png")
loadSprite("player", "assets/pacman-png-18.png")
loadSprite("bullet", "assets/bullet.png")
setBackground(48,25,52)


function bullet(vx, vy, aim) {
    const velocity = 30
    return {
        add(){
            
        },
        update() {
            this.pos.x += velocity*vx
            this.pos.y += velocity*vy
        }
    }
}


scene("main", (index) => {
    add([
        sprite("background"),
        pos(0, 0),
        scale(2),
    ])

    add([
        sprite("player"),
        pos(center()),
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

    onMousePress(() => {
        const aim = mousePos()
        
        add([
            sprite("bullet"),
            pos(player.pos),
            scale(1),
            area(),
            origin(300,300),
            bullet(34 * 22, aim * 10, aim)
        ])
        console.log(aim)
    });
    // bullet.move(mousePos().scale(2))
})





go("main")



