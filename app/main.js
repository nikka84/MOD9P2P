/**
 * Consts and state
 */


// Contenedor de instancia del juego
let game;


// Valores constantes
const OPPONENT_HEIGHT = 8,
    OPPONENT_PICTURE = "assets/img/oponente.png",
    OPPONENT_PICTURE_DEAD = "assets/img/oponente_dead.png",
    OPPONENT_SPEED = 8,
    OPPONENT_WIDTH = 8,
    GAME_OVER_PICTURE = "assets/img/game_over.png",
    GAME_WIN_PICTURE = "assets/img/you_win.png",
    KEY_LEFT = "LEFT",
    KEY_RIGHT = "RIGHT",
    KEY_SHOOT = "SHOOT",
    MIN_TOUCHMOVE = 20,
    PLAYER_HEIGHT = 7,
    PLAYER_PICTURE = "assets/img/player.png",
    PLAYER_PICTURE_DEAD = "assets/img/player_dead.png",
    PLAYER_SPEED = 20,
    PLAYER_WIDTH = 7,
    PLAYER_LIVES = 3,
    SHOT_HEIGHT = 2.5,
    SHOT_SPEED = 15,
    SHOT_PICTURE_PLAYER = "assets/img/disparo.png",
    SHOT_PICTURE_OPPONENT = "assets/img/disparo2.png",
    SHOT_WIDTH = 2.5;


// Selectores DOM y estado del juego
const GAME_UI = {
    app: document.querySelector('#app'),
    gameBoard: document.querySelector('.game'),
    pages: {
        splash: document.querySelector('#splash_page'),
        swiperContainer: document.querySelector('#swiper_page'),
        main: document.querySelector('#main_page'),
        menu: document.querySelector('#menu_page'),
        settings: document.querySelector('#settings_page'),
        leaderboard: document.querySelector('#leaderboard_page')
    },
    modalWindows: {
        pause: document.querySelector('#modal_pause_window'),
        confirm: document.querySelector('#modal_confirm'),
        spinner: document.querySelector('#modal_loading_spinner')
    },
    state: {
        navigationStage: '',
        playing: false,
        paused: false,
        spinning: false
    }
};



/**
 * loading scripts
 */
window.addEventListener('load', () => {
    initNavigation();
    initUI();
    navigationTo('#splash_page', 'fade_in');
});
