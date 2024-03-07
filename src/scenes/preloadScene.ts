import Phaser from "phaser";

export default class PreloadScene extends Phaser.Scene {
    constructor() {
        super({ key: "PreloadScene" });
    }

    preload() {
        this.load.image("phaser-logo", "assets/img/phaser-logo.png");
        //Image from https://www.reddit.com/r/wallpaper/comments/5k6wqq/pixel_art_city_2560x1440oc/
        this.load.image("city_bg", "assets/img/cityBackground.png");
        //Sprite sheet from https://pocketflo.artstation.com/projects/3dQylv
        this.load.spritesheet("leaf", "assets/img/Leaf_SpriteSheet.png", {
            frameWidth: 125,
            frameHeight: 195,
        });
        //IMage from https://pixeljoint.com/pixelart/141150.htm
        this.load.image("bridge_b", "assets/img/bridge_pillar_bottom.png");
        this.load.image("bridge_t", "assets/img/bridge_top.png");
        //Image from https://stock.adobe.com/search?k=pixel+sun
        this.load.image("sun", "assets/img/sun.png");
        //Gif from https://www.pinterest.com/pin/pixelprojekt--263390278199826715/
        this.load.spritesheet("portal", "assets/img/portal_SriteSheet.png", {
            frameWidth: 498,
            frameHeight: 498,
        });
        //IMage from https://wall.alphacoders.com/big.php?i=736013
        this.load.image("snow_bg", "assets/img/snow_village.jpeg");
        //IMage from https://stock.adobe.com/search?k=dinosaur+background
        this.load.image("dino_bg", "assets/img/dinoBackground.jpeg");
        //Image from https://stock.adobe.com/search?k=%22ocean+background%22
        this.load.image("ocean_bg", "assets/img/ocean_bg.jpeg");
    }

    create() {
        this.scene.start("MainScene");
    }
}
