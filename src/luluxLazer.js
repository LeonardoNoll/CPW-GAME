export function spawnLuluxLazer(p,e) {
    add([
        // sprite("bullet"),
        rect(30,10),
        color(255,0,255),
        outline(1),
        rotate(e.angle(p)),
        area(),
        pos(e),
        scale(2),
        anchor("center"),
        move(vec2(p.x-e.x,p.y-e.y+5), 300), //Matematica sinistra q ajusta o angulo
        offscreen({ destroy: true }),
        "lazer",
        "enemyBullet",
    ]) 
}