class Board extends Phaser.GameObjects.Sprite {
    constructor(scene) {
        super(scene, 240, 650, 'board');
        this.scene = scene;
        this.setDisplaySize(228, 188);
        this.scene.add.existing(this);
        // this.setInteractive({ cursor: 'pointer' });
        // this.on('pointerdown', this.onClick, this);
    }
}