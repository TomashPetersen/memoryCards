class SoundButton extends Phaser.GameObjects.Sprite {
    constructor(scene) {
        super(scene, 50, 50, 'volume');
        this.scene = scene;
        this.scene.add.existing(this);
        this.setInteractive();
        this.on('pointerdown', this.onClick, this);
    }

    onClick () {
        this.setSoundButtonTexture();
    }

    setSoundButtonTexture() {
        let texture = game.sound.mute ? 'volume' : 'mute';
        game.sound.mute = !game.sound.mute;
        this.setTexture(texture);
    }
}