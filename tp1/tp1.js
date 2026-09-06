//animacion es donde se guardaran todas las animaciones de maolito se encotraran en aniManoli

let aniManoli = [];
const nombres = ['rest', 'run', 'jump'];
const FramesManolito = [8, 15, 29];
let escala =  0.5;
let fondo;
let piso;
let titulo;
let extrass;
let relleno;

let salto = 0;
let saltoRealizado = false;

let accionActual = 0;
let caminarBoleano = true;
let posX = -100;
let posY = 250;


let FondoX = 0;
let PisoX = 0 ;
let tituloY = 700;
let extrassY = 700;
let rellenoX = 0;




function cargarAccion(nombre, cantidad) {

  let frames = [];

  for (let i = 0; i < cantidad; i++) {
    frames.push(loadImage('imagenes/Manolito/Manolito_' + nombre + '_' + i + '.png'));
  }

  return frames;
}


function elegirFrame(frames, velocidadAnimacion) {

  let indice = floor(frameCount / velocidadAnimacion) % frames.length;
  return frames[indice];
}



function preload() {
  fondo = loadImage ('imagenes/Fondos/Fondo_Rocoso.png');
  piso = loadImage ('imagenes/Fondos/Piso.png');
  relleno = loadImage ('imagenes/Fondos/Relleno.png');
  titulo = loadImage ('imagenes/Fondos/titulo.png');
  extrass = loadImage ('imagenes/Fondos/extras.png');


  for (let a = 0; a < nombres.length; a++) {
    aniManoli.push(cargarAccion(nombres [a], FramesManolito [a]));
  }
}



function setup() {
  createCanvas (800, 600);
}



function draw() {

  background(0);
  image(fondo, FondoX, 0, 2000, 400);
  image(piso, PisoX, 0, 2000, 400);
  image(relleno, rellenoX, 300, 2000, 400)
  image(titulo, 200, tituloY, 400, 256);
  image(extrass, 205, extrassY, 400, 200);

  if (salto == 0 && frameCount >= 480 && saltoRealizado == false) {
    posY = 115;

    salto = frameCount;
    saltoRealizado = true;
    caminarBoleano = false;
    accionActual = 2;
  }

  if (salto != 0) {

    let tiempoSalto = frameCount - salto;
    let framesSalto = aniManoli[2];
    let indiceSalto = floor(tiempoSalto / 6);

    if (indiceSalto < framesSalto.length) {

      accionActual = 2;
      let frame = framesSalto[indiceSalto];
      image(frame, posX, posY, frame.width * escala, frame.height * escala);
      return;
    }
    salto = 0;
    posY = 250;
    caminarBoleano = true;
    accionActual = 1;
  }

  if (caminarBoleano == true) {
    accionActual = 1;
    posX += 1.2;
  }

  if (saltoRealizado == false) {
    PisoX--;
    FondoX -= 1.5;
  }

  if (saltoRealizado == true && tituloY > -20 && extrassY > 0) {
    tituloY -= 5;
    extrassY -= 3;
  }



  let frames = aniManoli[accionActual];
  let frame = elegirFrame(frames, 6);

  image(frame, posX, posY, frame.width * escala, frame.height * escala);
}


//250
