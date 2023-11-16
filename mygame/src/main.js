import kaboom from "kaboom"

const k = kaboom({
	height: 720,
	width: 1280,
})

k.loadSprite("steve", "sprites/unnamed.png")
k.loadSprite("map", "sprites/images.jpg")
k.loadSprite("tile", "sprites/floor_tile.jpg", {
	sliceX: 16,
	sliceY: 16,
} )

k.add([
	k.pos(2, 2),
	k.sprite("map"),
	k.scale(2),
])

k.add([
	k.pos(320, 80),
	k.sprite("steve"),
	k.scale(0.6),
])

const map = addLevel([
	'---------------',
	'---------------',
	'---------------'
], {
	tileWidth: 16,
	tileHeight: 16,
	tiles: {
		'-': () => [sprite("tile")]
	}
})

map.use(scale(1))

k.onClick(() => k.addKaboom(k.mousePos()))