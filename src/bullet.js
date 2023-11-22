export function spawnBullet(p) {
    add([
        // sprite("bullet"),
        circle(3),
        color (rgb(185, 207, 252)),
        outline(1, rgb(0, 0, 0)),
        area(),
        pos(p),
        scale(2),
        anchor("center"),
        outline(5),
        move(vec2(mousePos().x-p.x,mousePos().y-p.y+5), 300), //Matematica sinistra q ajusta o angulo
        offscreen({ destroy: true }),
        // console.log(mousePos().x-450),
        // console.log(mousePos().y-300),
        "bullet",
    ]) 
}
