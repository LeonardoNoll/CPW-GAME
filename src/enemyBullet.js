export function spawnEnemyBullet(p,e) {
    add([
        // sprite("bullet"),
        circle(3),
        color(255,0,255),
        area(),
        pos(e),
        scale(2),
        anchor("center"),
        outline(5),
        move(vec2(p.x-e.x,p.y-e.y+5), 300), //Matematica sinistra q ajusta o angulo
        offscreen({ destroy: true }),
        "enemyBullet",
    ]) 
}