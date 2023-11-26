export default function loadAll(){
    loadFont("isaacFont", "assets/IsaacGame.ttf")
    loadFont("isaacTitleFont", "assets/titleFont.ttf")
    loadSound("hurt0", "assets/audios/hurt0.wav")
    loadSound("hurt1", "assets/audios/hurt1.wav")
    loadSound("hurt2", "assets/audios/hurt2.wav")
    loadSound("risada_lulu", "assets/audios/pt_br_lulu.mp3")
    loadSound("point", "assets/audios/point.mp3")
    loadSound("hit", "assets/audios/hit.wav")
    loadSprite("backgroundFloor1", "assets/backgroundFloor1.png")
    loadSprite("backgroundFloor2", "assets/backgroundFloor2.png")
    loadSprite("backgroundFloor3", "assets/backgroundFloor3.png")
    loadSprite("title_bg", "assets/title_bg.png")
    loadSprite("awsd", "assets/awsd.png")
    loadSprite("bullet", "assets/bullet.png")
    loadSprite("lulu", "assets/lulu.png")
    loadSprite("lulux", "assets/lulux.png")
    loadSprite("lulucian", "assets/lulucian.png")
    loadSprite("zedu", "assets/zedu.png")
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