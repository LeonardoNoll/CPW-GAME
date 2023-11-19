import kaboom from "https://unpkg.com/kaboom@3000.0.1/dist/kaboom.mjs";
import loadAll from "./loader.js";
import { spawnBullet } from "./bullet.js";
import { spawnEnemyBullet } from "./enemyBullet.js";

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
        area({ scale: 1 }),
        offscreen({ destroy: true })
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
                if (dir == "a") {
                    player.flipX = true
                }
                if (dir == "d") {
                    player.flipX = false
                }
            })
        }
    
        function addEnemy(){ add([
            sprite("enemy"),
            pos(rand(0, width()), rand(0, height())),
            scale(0.3),
            anchor("center"),
            area(),
            "enemy"
            ])
        }

    loop(3, () => {
        addEnemy()
    })

    loop(1, () => {
        if (!player.exists()) return
        const enemies = get("enemy")
        enemies.forEach((e) => {
            spawnEnemyBullet(player.pos,e.pos)
        })
    })

    onUpdate("enemy", (e) => {
        if (!player.exists()) return
        const dir = player.pos.sub(e.pos).unit()
        e.move(dir.scale(100))
    })

    onMouseDown(() => {
        spawnBullet(player.pos)
    });

    onCollide("bullet", "enemy", (b, e) => {
        destroy(b)
        destroy(e)
    })

    player.onCollide("enemyBullet", (eb) => {
        destroy(eb)
        destroy(player)
    })



    player.onCollide("enemy", (e) => {
        destroy(player)
        // wait(2, () => go("main"))
    })
    onKeyPress("r", () => {
        go("main")
        console.log("restart")
    })
})

go("main")



