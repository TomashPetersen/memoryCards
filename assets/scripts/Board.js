class Board extends Phaser.GameObjects.Sprite {
    constructor(scene) {
        super(scene, 240, 620, 'board');
        this.scene = scene;
        this.sizes = this.scene.textures.get('board').getSourceImage();
        this.setDisplaySize(this.sizes.width * 2.3, this.sizes.height * 2.3);
        this.scene.add.existing(this);
    }
}