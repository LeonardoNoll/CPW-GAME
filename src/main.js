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

    player()
    enemy()


    onMouseDown(() => {
        spawnBullet(get("player")[0].pos)
    });

    onCollide("bullet", "enemy", (b, e) => {
        destroy(b)
        destroy(e)
    })

    onCollide("enemy", "player", (e, p) => {
        destroy(p)
        // go("gameover")
    })

    onUpdate("enemy", (e) => {
        let auxX = get("player")[0].pos.x
        let auxY = get("player")[0].pos.y
        let dir = vec2(((auxX/width())-0.5)*2, ((auxY/height())-0.5)*2)
        console.log(dir.scale(10))
        e.move(dir.scale(50))
        // if (!player.exists()) return
        // const dir = player.pos.sub(e.pos).unit()

        // e.move(e.dir.scale(10))
    })
})





go("main")



