/**
 * 
 * animation_FadeIn
 * 
 * Ejemplo de animación. Todas las animaciones tienen siempre 3 pasos: 
 *       a. Seleccionamos los elementos a animar
 *       b. Hemos visto que anime se comporta mejor con CSS declarado en el atributo style del HTML
 *          Por lo tanto, si queremos hacer alguna animación, podemos iniciar los valores con anime.set
 *       c. Animamos, con un timeline mejor, para poder concatenar animaciones...
 *       d. Si queremos meter alguna función después de animar podemos meter el callback complete o usar promesas...
 * 
 * 
 */
const animation_FadeIn = () => {
    // Selecciona elementos a animar
    const splash = GAME_UI.pages.splash;
    const title = splash.querySelector('h1');

    // Necesitas meter algo de CSS antes de la animación??
    anime.set(splash, {
        visibility: 'visible',
        opacity: 0
    });
    anime.set(title, {
        opacity: 0,
        translateY: 600,
        scale: 0,
        rotate: -180,
    });

    // Anima!
    //Tiempo que dura la animación:
    animation_layout = anime.timeline({
        duration: 600,
        easing: 'easeInOutSine'
    });
    //Bloques de la animación:
    animation_layout
        .add({
            targets: [splash],
            opacity: 1
        })
        .add({
            targets: [title],
            opacity: 1, 
            translateY: 0,
            scale: 1,
            rotate: 0,
        }, '-=550')
};


/**
 * El resto de animaciones las construyes tú. 
 * Recuerda que puedes guardar las animaciones del layout
 * en la variable global animation
 */
const animation_SplashToMenu = (getTo) => {
    // Selecciona elementos a animar
    const from = GAME_UI.pages.splash;
    const to = GAME_UI.pages.swiperContainer;
    
    // Necesitas meter algo de CSS antes de la animación??
    anime.set(to, {
        visibility: 'visible', 
        translateY: '100%', 
        opacity: 0
    });

    // Anima!
    animation_layout = anime.timeline({
        duration: 750,
        easing: 'easeInOutSine'
    });
    animation_layout
        .add({
            targets: [from], 
            translateY: '-100%', 
            opacity: 0
        })
        .add({
            targets: [to], 
            translateY: 0, 
            opacity: 1
        }, '-=750')
};

/**
 * Animación del menú al juego
 */
const animation_MenuToMain = (getTo) => {
    //Elementos de la animación
    const from = document.querySelector('#swiper_page');
    const to = document.querySelector('#main_page');
    //Modificaciones CSS
    anime.set(to, {
        visibility: 'visible', 
        translateY: '-100%', 
        opacity: 0,
    });
    //Animamos:
    //Duración
    animation_layout = anime.timeline({
        duration: 750,
        easing: 'easeInOutSine'
    });
    //Bloques
    animation_layout
        .add({
            targets: [from], 
            translateY: '100%', 
            opacity: 0,
            scale: [
                {   value: .1, 
                    easing: 'easeOutSine',
                    duration: 325   },
                {   value: 1, 
                    easing: 'easeInOutQuad',
                    duration: 750   },    
            ],
        })
        .add({
            targets: [to], 
            translateY: 0, 
            opacity: 1,
            scale: [
                {   value: .1, 
                    easing: 'easeOutSine',
                    duration: 325   },
                {   value: 1, 
                    easing: 'easeInOutQuad',
                    duration: 750   },    
            ],
        }, '-=750')
        //Promesas o callbacks: iniciamos el juego
        animation_layout.finished.then(() => {
            game = new Game();
            game.start();
        });        
};

/**
 * Animación que va del juego al menu.
 */
const animation_MaintoMenu = (getTo) => {
    //Elementos de la animación
    const from = document.querySelector('#main_page');
    const to = document.querySelector('#swiper_page');
    //Modificaciones CSS
    anime.set(to, {
        visibility: 'visible', 
        translateY: '100%', 
        opacity: 0,
    });
    //Animamos:
    //Duración
    animation_layout = anime.timeline({
        duration: 750,
        easing: 'easeInOutSine'
    });
    //Bloques
    animation_layout
        .add({
            targets: [from], 
            translateY: '-100%', 
            opacity: 0,  
        })
        .add({
            targets: [to], 
            translateY: '0%', 
            opacity: 1,
        }, '-=750')
        //Promesas o callbacks: iniciamos el juego
        animation_layout.finished.then(() => {
            anime.set(from, {
                visibility: 'hidden'
            });
            game.ended = true;
            document.querySelector('.game').innerHTML = '';
        });        
};


/**
 * 
 * Ejemplo de un popup, como vemos, es lo mismo....
 */
const animation_PopupPause = () => {
    const popup = document.querySelector('#modal_pause_window');

    anime.set(popup, {
        translateY: '20%', 
        opacity: 0, 
        visibility: 'visible'
    });

    animation_layout = anime.timeline({
        duration: 300,
        easing: 'easeOutQuad'
    });

    animation_layout.add({
        targets: popup,
        translateY: '0%',
        opacity: 1
    });
};

/** Animación para volver al juego */
const animation_PopupContinue = (getTo) => {
    const popup = document.querySelector('#modal_pause_window');

    animation_layout = anime.timeline({
        duration: 300,
        easing: 'easeOutQuad'
    });

    animation_layout.add({
        targets: [popup],
        translateY: '-20%',
        opacity: 0
    });

    animation_layout.finished.then(() => {
        game.pauseOrResume();
        anime.set(popup, {
            visibility: 'hidden'
        });
    });
};

/**
 * PopUp de confirmación
 */
const animation_ConfirmIn = (getTo) => {
    const popup = document.querySelector('#modal_confirm');

    anime.set(popup, {
        translateY: '-20%', 
        opacity: 0, 
        visibility: 'visible'
    });

    animation_layout = anime.timeline({
        duration: 300,
        easing: 'easeOutQuad'
    });

    animation_layout.add({
        targets: [popup],
        translateY: '0%',
        opacity: 1
    });
};

/** Animación para ... */
const animation_ConfirmOut = (getTo) => {
    const popup = document.querySelector('#modal_confirm');

    animation_layout = anime.timeline({
        duration: 300,
        easing: 'easeOutQuad'
    });

    animation_layout.add({
        targets: [popup],
        translateY: '-20%',
        opacity: 0
    });

    animation_layout.finished.then(() => {
        anime.set(popup, {
            visibility: 'hidden'
        });
    });
};