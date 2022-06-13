class LevelBoard extends Phaser.GameObjects.Sprite {
    constructor(scene) {
        super(scene, 1390, 615, 'levelBoard');
        this.scene = scene;
        this.sizes = this.scene.textures.get('levelBoard').getSourceImage();
        this.setDisplaySize(this.sizes.width / 1.5, this.sizes.height / 1.5);
        this.scene.add.existing(this);
    }
}