/**
 * Personaje principal del juego. Hereda de la clase Character.
 * @extends Character
 */
class Player extends Character {
    /**
     * Inicializa un jugador
     * @param game {Game} La instancia del juego al que pertenece el personaje
     */
    constructor(game) {
        const height = PLAYER_HEIGHT * game.width / 100,
            width = PLAYER_WIDTH * game.width / 100,
            x = game.width / 2 - width / 2,
            y = game.height - height,
            speed = PLAYER_SPEED,
            myImage = PLAYER_PICTURE,
            myImageDead = PLAYER_PICTURE_DEAD;

        super(game, width, height, x, y, speed, myImage, myImageDead);

        this.updatesPerShot = 10;
        this.updatesPerShotCount = 0;
        this.dragging = true;
        this.initDraggingAbility();
        //Atributo lives que se inicia en 3
        this.lives = PLAYER_LIVES;
    }

    /**
     * Actualiza los atributos de posición del jugador y los disparos en función de las teclas pulsadas
     */
    update() {
        if (!this.dead && !this.dragging) {
            switch (this.game.keyPressed) {
                case KEY_LEFT:
                    if (this.x > this.speed) {
                        this.x -= this.speed;
                    }
                    break;
                case KEY_RIGHT:
                    if (this.x < this.game.width - this.width - this.speed) {
                        this.x += this.speed;
                    }
                    break;
                case KEY_SHOOT:
                    this.game.shoot(this);
                    break;
            }
        }


        /**
         * In case game is touchable actualiza los disparos
         */
        if (!this.dead) {
            this.updatesPerShotCount++;
            if (this.updatesPerShotCount % this.updatesPerShot == 0) {
                this.game.shoot(this);
            }
        }
    }


    /**
     * In case game is touchable actualiza la posición del player
     */
    initDraggingAbility() {
        let interactable = interact(this.myImageContainer);

        interactable.draggable({
            startAxis: 'xy',
            lockAxis:'xy',
            inertia: true,
            modifiers: [
                interact.modifiers.restrictRect({
                    restriction: 'parent',
                    endOnly:true
                })
            ],
            listeners: {
                start: ev => { console.log(ev) }, 
                move: ev => {
                    this.x += ev.dx;
                   // this.y += ev.dy;
                    ev.currentTarget.style.top = `${this.y}px)`;
                    ev.currentTarget.style.left = `${this.x}px`;
                    console.log(ev)
                }, 
                end: ev => { console.log(ev) }
            }
        })
    }



    /**
     * Mata al jugador
     */
    die() {
        if (!this.dead) {
            //Restamos una vida:
            this.lives--;
            document.getElementById("livesli").innerHTML = this.lives;
            //Comprobamos si es la última:
            if(this.lives===0){
                //Finaliza el juego:
                setTimeout(() => {
                    this.game.endGame();
                }, 2000);
                super.die();
            } else {
                //Debe morir durante dos segundos y revivir:
                setTimeout(() => {
                    this.dead = false;
                    this.myImage.src = PLAYER_PICTURE;
                }, 2000);
                super.die();
            }        
        }
    }
}