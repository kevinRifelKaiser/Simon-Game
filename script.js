
let buttCol = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let started = false;

//1. Crear una función que genere un número aleatorio entre 0 y 3, luego seleccionar el elemento del array "buttCol" que este en la posición que haya salido aleatoriamente e introducir este color en el array vacío "gamePattern". 2. Luego el item que este asociado al color que salio por el random, hará una animación y un sonido.
function nextSecuence() {

    var ranNum = Math.floor(Math.random()*4);    
    var ranChosCol = buttCol[ranNum];
    gamePattern.push(ranChosCol);
    $("." + ranChosCol).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(ranChosCol);
    //6. Voy aumentando el level desde acá para actualizar el titulo del juego.
    level++;
    $("#level-title").text("Level " + level);
    //7. Acá, cada vez que llamo a esta función, vacío el patron de colores que ingresa el usuario para que lo tenga que ingresar nuevamente cada vez que sube de nivel.
    userClickedPattern = [];

}

//3. Luego creo una función que lo que haga es que cuando el usuario hace click en un boton, almacena en una variable el color de ese boton y lo introduce en el array "userClickPattern".
$(".btn").click(function handler() {

    var userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length - 1);

});

//4. Creo esta función que cuando la llamo activa el sonido del color del boton que estoy tocando, y se la agrego a la función del inicio "nextSecuence" y "handler."
function playSound(name) {

    var audio = new Audio('sounds/' + name + '.mp3');
    audio.play();

}

//5. Creo una función que cuando la llamo ilumina durante un breve instante el color al cual le hago click, usa como input el color del boton que se toco, y aplica durante un momento la clase asiganda a ese color.
function animatePress(currentColor) {

    $("." + currentColor).addClass("pressed");    
    setTimeout(function() {
        $("." + currentColor).removeClass("pressed");
    }, 100);

}

//6. Creo esta función para que, cuando presione cualqueir tecal, evaluar si el juego esta comenzando, si el el nivel 0 entonces el titulo dira "Level" más el número de nivel el cual se almacenara en la variable "level", a su vez si el juego recién comienza la variable "started" sera igual a false, entonces la cambiara a true. 
$(document).keydown(function() {

    if(!started) {
        $("#level-title").text("Level " + level);
        nextSecuence();
        started = true;
    }

});

//7. Creo una función para comparar la respuesta del usuraio (el boton que toca), con la que genero el programa. Para esto chequeo primero si los ultimos items de los arrays "gamePattern" y "userCLicClickedPattern" son iguales, si son iguales evaluo que el largo de los dos arrays sean iguales también, para comprobar que se ingresaron todos los colores que fueron saliendo, si se cumplen ambas condiciones vuelvo a llamar a la función next secuence para pasar al siguiente nivel. Si el usuario se equivoca en repetir el patrón entonces la función emitira un sonido diferente, y dira juego terminado, pidiendo que presione cualquier tecla para comenzar de nuevo.
function checkAnswer(currentLevel) {

    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        if(userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSecuence();
            }, 1000);
        }

        return console.log("success");

    } else {
        playSound("wrong");

        $("body").addClass("game-over");    
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart" );

        startOver()

        return console.log("wrong");
    }   
}

//8. Luego de que el jugador se equivoque resetearemos el patrón aleatorio que genera el sistema, volveremos el nivel a 0 y setearemos la variable "started" en false.
function startOver() {
    gamePattern = [];
    level = 0;
    started = false;
}

