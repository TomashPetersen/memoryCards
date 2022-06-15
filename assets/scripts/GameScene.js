class GameScene extends Phaser.Scene {
    constructor() {
        super("Game");
    }

    createLevelTExt() {
        this.levelText = this.add.text(1390, 610, `LEVEL ${this.currentLevel}`, {
            font: `42px PirateOfTheSeaside`,
            fill: '#ffffff'
        }).setOrigin(0.5);
    }
    createMainText() {
        this.mainText = this.add.text(this.sys.game.config.width / 2, 80, ``, {
            font: `42px PirateOfTheSeaside`,
            fill: '#ffffff'
        }).setOrigin(0.5);
    }
    createTimerText() {
        this.timeoutText = this.add.text(140, 560, `Time: ${this.timeout}`, {
            font: `34px PirateOfTheSeaside`,
            fill: '#ffffff'
        });
    }
    createScoreText() {
        this.score = 0;
        this.scoreText = this.add.text(140, 610, `Score: ${this.score}`, {
            font: `34px PirateOfTheSeaside`,
            fill: '#ffffff'
        });
    }
    setTimerText() {
        this.timeoutText.setText("Time: " + this.timeout);
    }
    onTimerTick() {
        this.setTimerText();

        if(this.timeout <= 0) {
            this.cardsIsTouchable = false;
            this.sounds.timeout.play();
            this.mainText.setText(`YOU ARE LOSE..`);
            this.currentLevel = 1;
            this.score = 0;
            this.setScore();
            this.restart()
        } else {
           --this.timeout; 
        }  
    }
    openCardScoreCounter() {
        this.score += 15;
        this.setScore();
    }
    levelPassScoreCounter() {
        let timeLeft = this.timeout;
        this.score = this.score + timeLeft;
        this.setScore();
    }
    setScore() {
        this.scoreText.setText(`Score: ${this.score}`);
    }
    createTimer() {
        this.timeout = this.level[this.currentLevel].timeout;
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
        this.cardsIsTouchable = false;
        this.currentLevel = 5;
        this.numberOfLevels = Object.keys(config.levels).length;
        this.level = config.levels;
        this.createSounds();
        this.createTimer();
        this.createBackground();
        this.createSoundButton();
        this.createLevelBoard();
        this.createBoard();
        this.createMainText();
        this.createLevelTExt();
        this.createTimerText();
        this.createScoreText();
        this.start();
        this.timer.paused = true;
    }
    restart() {
        if (!this.isStarted) {
            return;
        }
        this.timeout = this.level[this.currentLevel].timeout;
        this.timer.paused = true;
        this.isStarted = false;
        this.timeoutText.setText(`Time: ${this.timeout}`);
        let count = 0;
        let onCardMoveComplete = () => {
            ++count;
            if (count >= this.cards.length) {
                this.timer.paused = true;
                this.levelText.setText(`LEVEL ${this.currentLevel}`);
                this.mainText.setText(``);
                this.start();    
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
        this.openedCard = null;
        this.openedCardsCount = 0;
        this.createCards();
        this.initCards();
        this.showCards();

        this.sounds.theme.play({
            volume: 0.1,
            loop: true
        });
        
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
            if (count >= this.level[this.currentLevel].cards.length * 2) {
                this.timer.paused = false;
                this.isStarted = true;
                this.cardsIsTouchable = true;
                
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

        for (let value of this.level[this.currentLevel].cards) {
            for (let i = 0; i < 2; i++) {
                this.cards.push(new Card(this, value));
            }
        }

        this.input.on("gameobjectdown", this.onCardClicked, this);
    }
    createSoundButton() {
        let button = new SoundButton(this);
    }
    createBoard() {
        let board = new Board(this);
    }
    createLevelBoard() {
        let levelBoard = new LevelBoard(this);
    }
    onCardClicked(pointer, card) {
        if (card instanceof SoundButton) return;
        if (card.opened || !this.cardsIsTouchable) {
            return false;
        }
        this.cardsIsTouchable = false;
        this.sounds.card.play({
            volume: 0.4
        });

        if (this.openedCard) {
            // уже есть открытая карта
            if (this.openedCard.value === card.value) {
                // картинки равны - запомнить
                this.openedCard = null;
                ++this.openedCardsCount;

                this.sounds.success.play({
                    volume: 0.6
                });

                this.openCardScoreCounter()

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
            if (this.openedCardsCount >= this.cards.length / 2) {
                this.sounds.complete.play ({
                    volume: 0.6
                });

                if (this.currentLevel < this.numberOfLevels) {
                    this.mainText.setText(`LEVEL ${this.currentLevel} PASSED!`);
                    ++this.currentLevel;
                    this.levelPassScoreCounter();
                    this.restart();  
                } else {
                    this.mainText.setText(`YOU ARE WIN!`);
                    this.levelPassScoreCounter();
                    this.currentLevel = 1;
                    this.score = 0;
                    this.setScore();
                    this.restart();
                }
        }});
    }
    initCardsPositions() {
        let positions = [];
        let cardTexture = this.textures.get('card').getSourceImage();
        let cardWidth = cardTexture.width + 4;
        let cardHeight = cardTexture.height + 4;
        let offsetX = (this.sys.game.config.width - cardWidth * this.level[this.currentLevel].cols) / 2 + cardWidth / 2;
        let offsetY = (this.sys.game.config.height - cardHeight * this.level[this.currentLevel].rows) / 2 + cardHeight / 2 + 20;

        let id = 0;
    
        for (let row = 0; row < this.level[this.currentLevel].rows; row++) {
            for (let col = 0; col < this.level[this.currentLevel].cols; col++) {
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
