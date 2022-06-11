class SoundButton extends Phaser.GameObjects.Sprite {
    constructor(scene) {
        super(scene, 130, 100, 'volume');
        this.scene = scene;
        this.setDisplaySize(128, 128);
        this.scene.add.existing(this);
        this.setInteractive({ cursor: 'pointer' });
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