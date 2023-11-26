import kaboom from "https://unpkg.com/kaboom@3000.1/dist/kaboom.mjs";
import loadAll from "./loader.js";
import { spawnBullet } from "./bullet.js";
import { spawnEnemyBullet } from "./enemyBullet.js";
import { addLulux } from "./lulux.js";
import { addLulucian } from "./lulucian.js";
import { addEnemy } from "./lulu.js";
import { spawnLuluxLazer } from "./luluxLazer.js";
import { spawnLulucianBullet } from "./lulucianBullet.js";
import { healthHeart} from "./health.js";
import { addPlayer } from "./player.js";
import { addZedu } from "./zedu.js";

const k = kaboom({
    width: 924,
    height: 620,
    scale: 1,
    letterbox: true
})

let score = 0
let highscore = 0
const SPAWN_UP = vec2(width()/2,30)
const SPAWN_DOWN = vec2(width()/2,height()-30)
const SPAWN_LEFT = vec2(30,height()/2)
const SPAWN_RIGHT = vec2(width()-30,height()/2)

loadAll()

scene("floor1", () => {
    //comandos para teste
    onKeyPress("2", () => {
        go("floor2")
    })
    onKeyPress("3", () => {
        go("floor3")
    })


    score = 0
    setBackground(0, 0, 0)
    
    add([
        sprite("backgroundFloor1"),
        pos(center()),
        anchor("center"),
        scale(2),
    ])

    
    const scoreboard = add([
        text(`Score:  ${score}`, {
            font: "isaacFont",
        }),
        
        pos(center().x, 40),
        scale(1),
        anchor("center"),
    ])

    const player = addPlayer()
    
    player.onStateEnter("cooldown", () => {
        wait(0.3, () => player.enterState("ready"))
    })
    
    const direction = {
        w: vec2(0, -1),
        s: vec2(0, 1),
        a: vec2(-1, 0),
        d: vec2(1, 0),
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
    let heartsArr =[
    healthHeart(100),
    healthHeart(130),
    healthHeart(160)
    ]
    loop(3, () => {
        let spawnNum = randi(2)
        console.log(spawnNum)
        for (let i = 0; i < spawnNum+1; i++) {
            let spawnPos = randi(3)
            switch (spawnPos) {
                case 0: addEnemy(SPAWN_UP) ; break;
                case 1: addEnemy(SPAWN_DOWN) ; break;
                case 2: addEnemy(SPAWN_LEFT) ; break;
                case 3: addEnemy(SPAWN_RIGHT) ; break;
            }
        }
    })
    loop(5, () => {
        let spawnPos = randi(3)
        switch (spawnPos) {
            case 0: addLulux(SPAWN_UP) ; break;
            case 1: addLulux(SPAWN_DOWN) ; break;
            case 2: addLulux(SPAWN_LEFT) ; break;
            case 3: addLulux(SPAWN_RIGHT) ; break;
        }
    })

    loop(1, () => {
        if (!player.exists()) return
        const enemies = get("lulu")
        enemies.forEach((e) => {
            spawnEnemyBullet(player.pos,e.pos)
        })
    })
    loop(2, () => {
        if (!player.exists()) return
        const enemies = get("lulux")
        enemies.forEach((e) => {
            spawnLuluxLazer(player.pos,e.pos)
        })
    })
    onUpdate("lazer", (l) => {
			l.color = rand(rgb(0, 0, 0), rgb(255, 255, 255))
	})
    onUpdate("enemy", (e) => {
        if (!player.exists()) return
        const dir = player.pos.sub(e.pos).unit()
        e.move(dir.scale(e.speed))
    })

    onMouseDown(() => {
        if (!player.exists()) return
        if (player.state != "ready") return
        spawnBullet(player.pos)
        player.enterState("cooldown")
    });

    onCollide("bullet", "enemy", (b, e) => {
        destroy(b)
        e.hurt(1)
    })

    on("death", "enemy", (e) => {
        destroy(e)
        play("point", {volume: e.scoreValue/100})
        score += e.scoreValue
        scoreboard.text = `Score: ${score}`
        add([
            text(`+${e.scoreValue}`, {
                font: "isaacFont",
            }),
            pos(e.pos),
            scale(0.5+e.scoreValue/100),
            move(vec2(0, -1), 10),
            lifespan(1, { fade: 0.5 }),
        ])
        if (score >= 400) {
            go("floor2")
        }
    })
    player.onCollide("enemyBullet", () => {
        player.hurt(1)
    })
    
    player.onCollide("enemy", (e) => {
        destroy(e)
        player.hurt(1)
    })

    player.on("hurt", () => {
        destroyAll("enemyBullet")
        destroy(heartsArr.pop())
        play(`hurt${randi(2)}`, {volume: 0.2})
    })
    
    player.on("death", () => {
        destroy(player)
        go("gameover")
    })
    onKeyPress("r", () => {
        go("floor1")
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

scene("floor2", () => {
    setBackground(0, 0, 0)
    
    add([
        sprite("backgroundFloor2"),
        pos(center()),
        anchor("center"),
        scale(1.98),
    ])

    const scoreboard = add([
        text(`Score:  ${score}`, {
            font: "isaacFont",
        }),
        
        pos(center().x, 40),
        scale(1),
        anchor("center"),
    ])

    let heartsArr =[
        healthHeart(100),
        healthHeart(130),
        healthHeart(160)
        ]

    const player = addPlayer()

    player.onStateEnter("cooldown", () => {
        wait(0.3, () => player.enterState("ready"))
    })
    const direction = {
        w: vec2(0, -1),
        s: vec2(0, 1),
        a: vec2(-1, 0),
        d: vec2(1, 0),
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
    
    wait(2, () => {
        loop(3, () => {
            let spawnNum = randi(2)
            for (let i = 0; i < spawnNum+1; i++) {
                let spawnPos = randi(3)
                switch (spawnPos) {
                    case 0: addEnemy(SPAWN_UP) ; break;
                    case 1: addEnemy(SPAWN_DOWN) ; break;
                    case 2: addEnemy(SPAWN_LEFT) ; break;
                    case 3: addEnemy(SPAWN_RIGHT) ; break;
                }
            }
        })
        loop(5, () => {
            let spawnPos = randi(3)
            switch (spawnPos) {
                case 0: addLulux(SPAWN_UP) ; break;
                case 1: addLulux(SPAWN_DOWN) ; break;
                case 2: addLulux(SPAWN_LEFT) ; break;
                case 3: addLulux(SPAWN_RIGHT) ; break;
            }
        })
    loop(4.5, () => {
        let spawnPos = randi(3)
        switch (spawnPos) {
            case 0: addLulucian(SPAWN_UP) ; break;
            case 1: addLulucian(SPAWN_DOWN) ; break;
            case 2: addLulucian(SPAWN_LEFT) ; break;
            case 3: addLulucian(SPAWN_RIGHT) ; break;
        }
    })})
    loop(1, () => {
        if (!player.exists()) return
        const enemies = get("lulu")
        enemies.forEach((e) => {
            spawnEnemyBullet(player.pos,e.pos)
        })
    })
    loop(2, () => {
        if (!player.exists()) return
        const enemies = get("lulux")
        enemies.forEach((e) => {
            spawnLuluxLazer(player.pos,e.pos)
        })
    })
    loop(3, () => {
        if (!player.exists()) return
        const enemies = get("lulucian")
        enemies.forEach((e) => {
            for (let i = 0; i < 6; i++) {
                spawnLulucianBullet(vec2(player.pos.x+i*30,player.pos.y+i*10),e.pos)
            }
        })
    })
    onUpdate("lazer", (l) => {
			l.color = rand(rgb(0, 0, 0), rgb(255, 255, 255))
	})
    onUpdate("enemy", (e) => {
        if (!player.exists()) return
        const dir = player.pos.sub(e.pos).unit()
        e.move(dir.scale(e.speed))
    })

    onMouseDown(() => {
        if (!player.exists()) return
        if (player.state != "ready") return
        spawnBullet(player.pos)
        player.enterState("cooldown")
    });

    onCollide("bullet", "enemy", (b, e) => {
        destroy(b)
        e.hurt(1)
    })

    on("death", "enemy", (e) => {
        destroy(e)
        play("point", {volume: e.scoreValue/100})
        score += e.scoreValue
        scoreboard.text = `Score: ${score}`
        add([
            text(`+${e.scoreValue}`, {
                font: "isaacFont",
            }),
            pos(e.pos),
            scale(0.5+e.scoreValue/100),
            move(vec2(0, -1), 10),
            lifespan(1, { fade: 0.5 }),
        ])
        if (score >= 1000) {
            go("floor3")
        }
    })
    player.onCollide("enemyBullet", () => {
        player.hurt(1)
    })

    player.onCollide("enemy", (e) => {
        destroy(e)
        player.hurt(1)
    })

    player.on("hurt", () => {
        destroyAll("enemyBullet")
        destroy(heartsArr.pop())
        play(`hurt${randi(2)}`, {volume: 0.2})
    })
    
    player.on("death", () => {
        destroy(player)
        go("gameover")
    })

    onKeyPress("r", () => {
        go("floor1")
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

scene("floor3", () => {
    setBackground(0, 0, 0)
    
    add([
        sprite("backgroundFloor3"),
        pos(center()),
        anchor("center"),
        scale(1.98),
    ])

    const scoreboard = add([
        text(`Score:  ${score}`, {
            font: "isaacFont",
        }),
        
        pos(center().x, 40),
        scale(1),
        anchor("center"),
    ])

    let heartsArr =[
        healthHeart(100),
        healthHeart(130),
        healthHeart(160)
        ]

    const player = addPlayer()

    player.onStateEnter("cooldown", () => {
        wait(0.3, () => player.enterState("ready"))
    })
    const direction = {
        w: vec2(0, -1),
        s: vec2(0, 1),
        a: vec2(-1, 0),
        d: vec2(1, 0),
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
    
    wait(2, () => {
        loop(3, () => {
            let spawnNum = randi(2)
            for (let i = 0; i < spawnNum+1; i++) {
                let spawnPos = randi(3)
                switch (spawnPos) {
                    case 0: addEnemy(SPAWN_UP) ; break;
                    case 1: addEnemy(SPAWN_DOWN) ; break;
                    case 2: addEnemy(SPAWN_LEFT) ; break;
                    case 3: addEnemy(SPAWN_RIGHT) ; break;
                }
            }
        })
        loop(5, () => {
            let spawnPos = randi(3)
            switch (spawnPos) {
                case 0: addLulux(SPAWN_UP) ; break;
                case 1: addLulux(SPAWN_DOWN) ; break;
                case 2: addLulux(SPAWN_LEFT) ; break;
                case 3: addLulux(SPAWN_RIGHT) ; break;
            }
        })
    wait(2, () => {
    loop(4.5, () => {
        let spawnPos = randi(3)
        switch (spawnPos) {
            case 0: addLulucian(SPAWN_UP) ; break;
            case 1: addLulucian(SPAWN_DOWN) ; break;
            case 2: addLulucian(SPAWN_LEFT) ; break;
            case 3: addLulucian(SPAWN_RIGHT) ; break;
        }
    })
    loop(9, () => {
        let spawnPos = randi(3)
        switch (spawnPos) {
            case 0: addZedu(SPAWN_UP) ; break;
            case 1: addZedu(SPAWN_DOWN) ; break;
            case 2: addZedu(SPAWN_LEFT) ; break;
            case 3: addZedu(SPAWN_RIGHT) ; break;
        }
    })
})

})
    loop(1, () => {
        if (!player.exists()) return
        const enemies = get("lulu")
        enemies.forEach((e) => {
            spawnEnemyBullet(player.pos,e.pos)
        })
    })
    loop(2, () => {
        if (!player.exists()) return
        const enemies = get("lulux")
        enemies.forEach((e) => {
            spawnLuluxLazer(player.pos,e.pos)
        })
    })
    loop(3, () => {
        if (!player.exists()) return
        const enemies = get("lulucian")
        enemies.forEach((e) => {
            for (let i = 0; i < 6; i++) {
                spawnLulucianBullet(vec2(player.pos.x+i*30,player.pos.y+i*10),e.pos)
            }
        })
    })
    onUpdate("lazer", (l) => {
			l.color = rand(rgb(0, 0, 0), rgb(255, 255, 255))
	})


    let curTween = null
    
    loop(3, () => {
        const allZedus = get("zedu")
        if (allZedus.length == 0) return
        const ATTACK_TARGET = player.pos
        const line1 = add([
            rect(70, 10),
            pos(ATTACK_TARGET),
            color(255,0,0),
            anchor("center"),
            rotate(45),
            area({ offset: vec2(0, 10) }),
            lifespan(1, { fade: 0.5 }),
        ]);
        
        const line2 = add([
            rect(70, 10),
            pos(ATTACK_TARGET),
            color(255,0,0),
            anchor("center"),
            rotate(-45),
            area({ offset: vec2(0, 10) }),
            lifespan(1, { fade: 0.5 }),
        ]);
        wait(1, () => {
        allZedus.forEach((e) => { 
                curTween = tween(
                    e.pos,
                    vec2(ATTACK_TARGET.x+rand(-50,50), ATTACK_TARGET.y+rand(-50,50)),
                    0.5,
                    (val) => e.pos = val,
                    easings.easeInOutQuad
            )
        })
        })
    })

    onUpdate("enemy", (e) => {
        if (!player.exists()) return
        const dir = player.pos.sub(e.pos).unit()
        e.move(dir.scale(e.speed))
    })

    onMouseDown(() => {
        if (!player.exists()) return
        if (player.state != "ready") return
        spawnBullet(player.pos)
        player.enterState("cooldown")
    })

    onCollide("bullet", "enemy", (b, e) => {
        destroy(b)
        e.hurt(1)
    })

    on("death", "enemy", (e) => {
        destroy(e)
        play("point", {volume: e.scoreValue/100})
        score += e.scoreValue
        scoreboard.text = `Score: ${score}`
        add([
            text(`+${e.scoreValue}`, {
                font: "isaacFont",
            }),
            pos(e.pos),
            scale(0.5+e.scoreValue/100),
            move(vec2(0, -1), 10),
            lifespan(1, { fade: 0.5 }),
        ])
    })
    player.onCollide("enemyBullet", () => {
        player.hurt(1)
    })
    
    player.onCollide("enemy", (e) => {
        destroy(e)
        player.hurt(1)
    })
    
    player.on("hurt", () => {
        destroyAll("enemyBullet")
        destroy(heartsArr.pop())
        play(`hurt${randi(2)}`, {volume: 0.2})
    })

    player.on("death", () => {
        destroy(player)
        go("gameover")
    })

    onKeyPress("r", () => {
        go("floor1")
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
    wait(1, () => {
        play("risada_lulu", {volume: 0.2})
    })

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
        go("floor1")
    })
})

go("floor1")



