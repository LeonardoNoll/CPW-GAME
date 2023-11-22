import kaboom from "https://unpkg.com/kaboom@3000.1/dist/kaboom.mjs";
import loadAll from "./loader.js";
import { spawnBullet } from "./bullet.js";
import { spawnEnemyBullet } from "./enemyBullet.js";

const k = kaboom({
    width: 924,
    height: 620,
    scale: 1,
    letterbox: true
})

loadAll()

let score = 0
let highscore = 0

scene("main", () => {
    add([
        sprite("background"),
        pos(0, 0),
        scale(2),
    ])

    const scoreboard = add([
        text("Score: 0", {
            font: "isaacFont",
        }),
        
        pos(center().x, 40),
        scale(1),
        anchor("center"),
    ])

    const player = add([
        sprite("playerSprites", {
            anim: "idle",
        }),
        pos(center()),
        anchor("center"),
        scale(2),
        area({ shape: new Rect(vec2(0), 32,32), offset: vec2(0, 5) }),
        state("ready", ["ready", "cooldown" ]),
        offscreen({ destroy: true })        
    ])

    player.onStateEnter("cooldown", () => {
        wait(0.5, () => player.enterState("ready"))
    })
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
            onKeyPress(dir, () => {
                if (dir == "a") {
                    player.play("moveLeft")
                }
                if (dir == "d") {
                    player.play("moveRight")
                }
                if (dir == "w") {
                    player.play("moveUp")
                }
                if (dir == "s") {
                    player.play("moveDown")
                }
                player.animSpeed = 1
            })
            onKeyRelease (dir, () => {
                    if (dir == "a" && player.curAnim() == "moveLeft") {
                        player.play("idle")
                    }
                    if (dir == "d" && player.curAnim() == "moveRight") {
                        player.play("idle")
                    }
                    if (dir == "w" && player.curAnim() == "moveUp") {
                        player.play("idle")
                    }
                    if (dir == "s" && player.curAnim() == "moveDown") {
                        player.play("idle")
                    }
            })
        }
    
        function addEnemy(x,y){ add([
            sprite("enemy"),
            pos(x,y),
            scale(0.3),
            body(),
            anchor("center"),
            area(),
            "enemy"
            ])
        }

        onDestroy("enemy",() => {
            score += 10
            scoreboard.text = `Score: ${score}`
        }),

    loop(3, () => {
        let spawnPos = randi(3)
        console.log(spawnPos)
        switch (spawnPos) {
            case 0: addEnemy(width()/2,30) ; break;
            case 1: addEnemy(width()/2,height()-30) ; break;
            case 2: addEnemy(30,height()/2) ; break;
            case 3: addEnemy(width()-30,height()/2) ; break;
        }
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
        if (!player.exists()) return
        if (player.state != "ready") return
        spawnBullet(player.pos)
        player.enterState("cooldown")
    });

    onCollide("bullet", "enemy", (b, e) => {
        destroy(b)
        destroy(e)
    })

    player.onCollide("enemyBullet", (eb) => {
        destroy(eb)
        destroy(player)
        go("gameover")
    })

    player.onCollide("enemy", (e) => {
        destroy(player)
        go("gameover")
        // wait(2, () => go("main"))
    })
    onKeyPress("r", () => {
        go("main")
        console.log("restart")
    })

    player.onUpdate(() => {
        if (player.pos.x < 120) {
            player.pos.x = 120
        }
        if (player.pos.x > width()-120) {
            player.pos.x = width()-120
        }
        if (player.pos.y < 60) {
            player.pos.y = 60
        }
        if (player.pos.y > height()-150) {
            player.pos.y = height()-150
        }
    })
})

scene("gameover", () => {
    if (score > highscore) {
        highscore = score
    }
    setBackground(0, 0, 0)
    add([
        text("Game Over", {
            font: "isaacFont",
        }),
        pos(center().x, center().y - 200),
        scale(3),
        anchor("center"),
    ])
    add([
        text("Final Score: " + score, {
            font: "isaacFont",
        }),
        pos(center().x, center().y - 100),
        scale(1.5),
        anchor("center"),
        score = 0
    ])
    add([
        text("High Score: " + highscore, {
            font: "isaacFont",
        }),
        pos(center().x, center().y - 50),
        scale(1.5),
        anchor("center"),
    ])
    add([
        text("Press R to restart", {
            font: "isaacFont",
        }),
        pos(center().x, center().y + 200),
        scale(2),
        anchor("center"),
    ])
    onKeyPress("r", () => {
        go("main")
        console.log("restart")
    })
})

go("main")



