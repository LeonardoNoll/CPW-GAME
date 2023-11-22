export default function loadAll(){
    loadFont("isaacFont", "assets/IsaacGame.ttf")
    loadSprite("backgroundFloor1", "assets/backgroundFloor1.png")
    loadSprite("backgroundFloor2", "assets/backgroundFloor2.png")
    loadSprite("backgroundFloor3", "assets/backgroundFloor3.png")
    loadSprite("bullet", "assets/bullet.png")
    loadSprite("lulu", "assets/lulu.png")
    loadSprite("lulux", "assets/lulux.png")
    loadSprite("lulucian", "assets/lulucian.png")
    loadSprite("heart", "assets/heart.png")
    loadSprite("playerSprites", "assets/playerSprites.png", {
        sliceX: 3,
        sliceY: 4,
        anims: {
            idle: 1,
            moveDown: {
                from: 0,
                to: 2,
                loop: true 
            },
            moveLeft: {
                from: 3,
                to: 5,
                loop: true 
            },
            moveRight: {
                from: 6,
                to: 8,
                loop: true 
            },
            moveUp: {
                from: 9,
                to: 11,
                loop: true 
            },
        },
    })
}