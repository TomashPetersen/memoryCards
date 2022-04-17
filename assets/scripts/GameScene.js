class GameScene extends Phaser.Scene {
    constructor() {
        super("Game");
    }

    createText() {
        this.timeoutText = this.add.text(10, 330, "Time: 60", {
            font: `28px ComicHelvetic`,
            fill: '#ffffff'
        });
    }
    onTimerTick() {
        this.timeoutText.setText("Time: " + this.timeout);

        if(this.timeout <= 0) {
            this.timer.paused = true;
            this.sounds.timeout.play();
            this.restart()
        } else {
           --this.timeout; 
        }
        
    }
    createTimer() {
        this.timer = this.time.addEvent({
            delay: 1000,
            callback: this.onTimerTick,
            callbackScope: this,
            loop: true
        });
        
    }
    createSounds() {
        this.sounds = {
            card: this.sound.add('card'),
            success: this.sound.add('success'),
            theme: this.sound.add('theme'),
            complete: this.sound.add('complete'),
            timeout: this.sound.add('timeout'),
        };
    }
    create() {
        this.isStarted = false;
        this.timeout = config.timeout;
        this.cardsIsTouchable = true;
        this.createSounds();
        this.createTimer();
        this.createBackground();
        this.createText(10, 330, "Time: ", "28px");
        this.createCards();
        this.start();
        this.timer.paused = true;
    }
    restart() {
        if (!this.isStarted) {
            return;
        }
        this.isStarted = false;
        let count = 0;
        let onCardMoveComplete = () => {
            ++count;
            if (count >= this.cards.length) {
                this.start();
                this.timer.paused = true;
            }
        };
        this.cards.forEach(card => {
            card.depth = 1 / card.position.delay;
            card.move({
                x: this.sys.game.config.width + card.width,
                y: this.sys.game.config.height + card.height,
                delay: card.position.delay,
                callback: onCardMoveComplete
            })
        })
    }
    start() {
        this.initCardsPositions();
        this.timeout = config.timeout;
        this.openedCard = null;
        this.openedCardsCount = 0;
        
        this.initCards();
        this.showCards();

        this.sounds.theme.play({
            volume: 0.1,
            loop: true
        });
        this.isStarted = true;
    }
    initCards() {
        let positions = Phaser.Utils.Array.Shuffle(this.positions);
        this.cards.forEach(card => {
            card.init(positions.pop());
        });
    }
    showCards() {
        let count = 0;
        let onCardMoveComplete = () => {
            ++count;
            if (count >= this.cards.length) {
                this.timer.paused = false;
            }
        };
        this.cards.forEach(card => {
            card.depth = card.position.delay;
            card.move({
                x: card.position.x,
                y: card.position.y,
                delay: card.position.delay,
                callback: onCardMoveComplete
            })
        })
    }
    createBackground() {
        this.add.sprite(0, 0, 'bg').setOrigin(0, 0);
    }
    createCards() {
        this.cards = [];

        for (let value of config.cards) {
            for (let i = 0; i < 2; i++) {
                this.cards.push(new Card(this, value));
            }
        }

        this.input.on("gameobjectdown", this.onCardClicked, this);
    }
    onCardClicked(pointer, card) {
        if (card.opened || !this.cardsIsTouchable) {
            return false;
        }

        this.sounds.card.play({
            volume: 0.4
        });

        this.cardsIsTouchable = false;

        if (this.openedCard) {
            // уже есть открытая карта
            if (this.openedCard.value === card.value) {
                // картинки равны - запомнить
                this.openedCard = null;
                ++this.openedCardsCount;

                this.sounds.success.play({
                    volume: 0.6
                });
            } else {
                // картинки разные - скрыть прошлую
                this.openedCard.close();
                this.openedCard = card;
            }
        } else {
            // еще нет открытой карта
            this.openedCard = card;
        }

        card.open(() => {
            if (this.openedCardsCount === this.cards.length / 2) {
            this.sounds.complete.play({
                volume: 0.6
            });
            this.restart();
        }});
    }
    initCardsPositions() {
        let positions = [];
        let cardTexture = this.textures.get('card').getSourceImage();
        let cardWidth = cardTexture.width + 4;
        let cardHeight = cardTexture.height + 4;
        let offsetX = (this.sys.game.config.width - cardWidth * config.cols) / 2 + cardWidth / 2;
        let offsetY = (this.sys.game.config.height - cardHeight * config.rows) / 2 + cardHeight / 2;

        let id = 0;
    
        for (let row = 0; row < config.rows; row++) {
            for (let col = 0; col < config.cols; col++) {
                ++id;
                positions.push({
                    delay: id * 200,
                    x: offsetX + col * cardWidth,
                    y: offsetY + row * cardHeight,
                });
            }
        }

        this.positions = positions;
    }
}
