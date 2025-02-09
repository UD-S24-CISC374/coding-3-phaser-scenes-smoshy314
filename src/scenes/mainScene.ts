import Phaser from "phaser";

export default class MainScene extends Phaser.Scene {
    private platforms?: Phaser.Physics.Arcade.StaticGroup;
    private leaf?: Phaser.Physics.Arcade.Sprite;
    private portal?: Phaser.Physics.Arcade.Sprite;
    private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
    private suns?: Phaser.GameObjects.Group;
    private scoreText: Phaser.GameObjects.Text;
    private score: number;
    private tickCount = 0;
    constructor() {
        super({ key: "MainScene" });
    }
    create() {
        this.add.image(600, 400, "city_bg").setScale(1.3);
        this.portal = this.physics.add.sprite(1200, 50, "portal").setScale(0.5);
        this.platforms = this.physics.add.staticGroup();

        this.score = 0;
        this.scoreText = this.add.text(16, 16, `score: ${this.score}`, {
            fontSize: "32px",
            color: "#000",
        });

        const ground: Phaser.Physics.Arcade.Sprite = this.platforms.create(
            200,
            650,
            "bridge_b"
        );
        ground.setScale(2).refreshBody();
        this.platforms.create(750, 650, "bridge_b").setScale(2).refreshBody();
        this.platforms.create(1300, 650, "bridge_b").setScale(2).refreshBody();

        this.leaf = this.physics.add.sprite(50, 50, "leaf").setScale(0.75);
        this.leaf.setCollideWorldBounds(true);

        this.cursors = this.input.keyboard?.createCursorKeys();

        this.physics.add.collider(this.leaf, this.platforms);

        this.add.image(200, 450, "bridge_t").setScale(2);
        this.add.image(750, 450, "bridge_t").setScale(2);
        this.add.image(1300, 450, "bridge_t").setScale(2);

        //Suns
        this.suns = this.add.group();
        const amount = 10;
        for (let i = 0; i < amount; i++) {
            const x = Phaser.Math.Between(200, 800);
            const y = Phaser.Math.Between(0, 400);
            this.suns.add(
                this.physics.add
                    .image(x, y, "sun")
                    .setScale(0.25)
                    .setScale(0.25)
                    .setMaxVelocity(0)
            );
        }
        this.physics.add.collider(this.suns, this.platforms);
        this.physics.add.overlap(
            this.leaf,
            this.suns,
            this.handleCollectSun,
            undefined,
            this
        );

        //Portal
        this.physics.add.collider(this.portal, this.platforms);
        this.physics.add.overlap(
            this.leaf,
            this.portal,
            () => {
                this.scene.start("SecondScene");
                this.scene.stop("MainScene");
            },
            undefined,
            this
        );

        //Anims
        this.anims.create({
            key: "left",
            frames: this.anims.generateFrameNumbers("leaf", {
                frames: [4, 5, 6, 7, 8, 9, 0, 1, 2, 3],
            }),
            frameRate: 10,
            repeat: -1,
        });
        this.anims.create({
            key: "turn",
            frames: [{ key: "leaf", frame: 4 }],
            frameRate: 20,
        });

        this.anims.create({
            key: "right",
            frames: this.anims.generateFrameNumbers("leaf", {
                frames: [4, 3, 2, 1, 0, 9, 8, 7, 6, 5],
            }),
            frameRate: 10,
            repeat: -1,
        });

        this.anims.create({
            key: "portal_woosh",
            frames: this.anims.generateFrameNumbers("portal", {
                frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 7, 6, 5, 4, 3, 2, 1],
            }),
            frameRate: 10,
            repeat: -1,
        });
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        this.portal?.anims.play("portal_woosh", true);
    }

    private handleCollectSun(
        player:
            | Phaser.Types.Physics.Arcade.GameObjectWithBody
            | Phaser.Tilemaps.Tile,
        s: Phaser.Types.Physics.Arcade.GameObjectWithBody | Phaser.Tilemaps.Tile
    ) {
        console.log("collect");
        const sun = s as Phaser.Physics.Arcade.Image;
        sun.disableBody(true, true);
        this.score += 10;
        this.scoreText.setText(`score: ${this.score}`);
    }

    update() {
        if (this.cursors?.left.isDown) {
            this.leaf?.setVelocityX(-160);
            this.leaf?.anims.play("left", true);
        } else if (this.cursors?.right.isDown) {
            this.leaf?.setVelocityX(160);
            this.leaf?.anims.play("right", true);
        } else {
            this.leaf?.setVelocityX(0);
            this.leaf?.anims.play("turn", true);
        }
        if (this.cursors?.up.isDown && this.leaf?.body?.touching.down) {
            this.leaf.setVelocityY(-330);
        }
    }
}
