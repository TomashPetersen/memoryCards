class Card extends Phaser.GameObjects.Sprite {
    constructor(scene, value) {
        super(scene, 0, 0, 'card');
        this.scene = scene;
        this.value = value;
        this.scene.add.existing(this);
        this.opened = false;
        this.setInteractive({ cursor: 'pointer' });
    }

    init(position) {
            this.position = position;
            this.close();
            this.setPosition(-this.width, -this.height);
    }

    move(prop) {
        this.scene.tweens.add ({
            targets: this,
            x: prop.x,
            y: prop.y,
            delay: prop.delay,
            ease: 'Linear',
            duration: 150,
            onComplete: () => {
                if (prop.callback) {
                    prop.callback();
                }
            }
        });
    }

    flip(callback) {
        this.scene.tweens.add ({
            targets: this,
            scaleX: 0,
            ease: 'Linear',
            duration: 250,
            onComplete: () => {
                this.appear(callback);
            }
        });
    }

    appear(callback) {
        let texture = this.opened ? 'card' + this.value : 'card';
        this.setTexture(texture);
        this.scene.tweens.add ({
            targets: this,
            scaleX: 1,
            ease: 'Linear',
            duration: 250,
            onComplete: () => {
                this.scene.cardsIsTouchable = true;
                if (callback) {
                    callback();
                };
            }
        })
    }

    open(callback) {
        this.opened = true;
        this.flip(callback);
    }

    close() {
        if (this.opened) {
            this.opened = false;
            this.flip();
        }
    }
}
