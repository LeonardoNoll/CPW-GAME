export function spawnLulucianBullet(p,e) {
    add([
        // sprite("bullet"),
        circle(2),
        color(255,255,255),
        area(),
        pos(e),
        scale(2),
        anchor("center"),
        move(vec2(p.x-e.x+5,p.y-e.y+5), 200), //Matematica sinistra q ajusta o angulo
        offscreen({ destroy: true }),
        "enemyBullet",
    ]) 
}