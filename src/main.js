import kaboom from "https://unpkg.com/kaboom@3000.0.1/dist/kaboom.mjs";
import loadAll from "./loader.js";
import { spawnBullet } from "./bullet.js";
import { player } from "./player.js";
import { enemy } from "./enemy.js";

const k = kaboom({
    width: 900,
    height: 600,
    scale: 1,
    letterbox: true
})


loadAll()
// setBackground(48,25,52)
scene("main", (index) => {
    add([
        sprite("background"),
        pos(0, 0),
        scale(2),
    ])
    
    const player = add([
        sprite("player"),
        pos(center()),
        anchor("center"),
        scale(0.10),
        area(),
    ])
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
    
    const enemy = add([
        sprite("ghost"),
        pos(rand(0, width()), rand(0, height())),
        scale(0.1),
        anchor("center"),
        area(),
        "enemy"
        ])


    onMouseDown(() => {
        spawnBullet(player.pos)
    });

    onCollide("bullet", "enemy", (b, e) => {
        destroy(b)
        destroy(e)
    })

    onCollide("enemy", "player", (e, p) => {
        destroy(p)
        // go("gameover")
    })

    onUpdate("enemy", () => {
        if (!player.exists()) return
        const dir = player.pos.sub(enemy.pos).unit()
        enemy.move(dir.scale(100))
    })

    player.onCollide("enemy", (e) => {
        destroy(player)
        wait(2, () => go("main"))
    })
})





go("main")



