class Card extends Phaser.GameObjects.Sprite {
    constructor(scene, value) {
        super(scene, 0, 0, 'card');
        this.scene = scene;
        this.value = value;
        // this.setOrigin(0.5, 0.5);
        this.scene.add.existing(this);
        this.opened = false;
        this.setInteractive();
    }

    flip(texture) {
        this.scene.tweens.add ({
            targets: this,
            scaleX: 0,
            ease: 'Linear',
            duration: 150,
            onComplete: () => {
                this.appear(texture);
            }
        });
    }

    appear(texture) {
        this.setTexture(texture);
        this.scene.tweens.add ({
            targets: this,
            scaleX: 1,
            ease: 'Linear',
            duration: 150,
        })
    }

    open() {
        this.opened = true;
        this.flip("card" + this.value);
    }

    close() {
        this.opened = false;
        this.flip("card");
    }
}
