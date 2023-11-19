import { player } from "./player.js"

export function enemy(){
    add([
        sprite("ghost"),
        pos(rand(0, width()), rand(0, height())),
        // pos(45, 300),
        scale(0.1),
        anchor("center"),
        area(),
        outline(5),
        "enemy"
    ])


    // console.log(e.pos.unit())
    // wait(1.5, enemy)
}

// const dir = player.pos.sub(enemy.pos).unit()
// 	enemy.move(dir.scale())