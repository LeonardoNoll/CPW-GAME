export default function loadAll(){
    loadFont("isaacFont", "assets/IsaacGame.ttf")
    loadSprite("background", "assets/background.png")
    loadSprite("player", "assets/player.png")
    loadSprite("bullet", "assets/bullet.png")
    loadSprite("enemy", "assets/enemy.png")
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