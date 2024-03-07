import Phaser from "phaser";

export class FourthScene extends Phaser.Scene {
    private scoreText: Phaser.GameObjects.Text;
    private platforms?: Phaser.Physics.Arcade.StaticGroup;
    private leaf?: Phaser.Physics.Arcade.Sprite;
    private portal?: Phaser.Physics.Arcade.Sprite;
    private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
    private suns?: Phaser.GameObjects.Group;
    score: number;
    constructor() {
        super({ key: "FourthScene" });
        console.log("SimpleScene#constructor");
    }

    create() {
        const MainScene = this.scene.get("ThirdScene");
        // @ts-expect-error score exists i think
        this.score = MainScene.score;
        this.add.image(600, 400, "ocean_bg").setScale(2.6);
        this.platforms = this.physics.add.staticGroup();

        this.scoreText = this.add.text(
            540,
            200,
            ` GAME OVER\nSCORE IS ${this.score}`,
            {
                fontSize: "32px",
                color: "#000",
            }
        );
        this.leaf = this.physics.add.sprite(640, 360, "leaf").setScale(1);
        const ground: Phaser.Physics.Arcade.Sprite = this.platforms.create(
            640,
            850,
            "bridge_b"
        );
        ground.setScale(4.6).refreshBody();
        this.add.image(25, 450, "bridge_t").setScale(4);
        this.add.image(1255, 450, "bridge_t").setScale(4);

        this.leaf.setCollideWorldBounds(true);

        this.physics.add.collider(this.leaf, this.platforms);
        this.anims.create({
            key: "right",
            frames: this.anims.generateFrameNumbers("leaf", {
                start: 0,
                end: 9,
            }),
            frameRate: 10,
            repeat: -1,
        });
        this.leaf.anims.play("right", true);
    }

    update() {}
}
