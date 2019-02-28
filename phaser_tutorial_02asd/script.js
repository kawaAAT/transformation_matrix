const game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });

function preload() {
  game.load.image('star', 'assets/star.png');
}

let handle1;
let handle2;
let handle3;
let handle4;

const handles = [];

let line1;

function create() {

  game.stage.backgroundColor = '#124184';

  handle1 = game.add.sprite(200, 200, 'star');
  handle1.anchor.set(0.5);
  handles.push(handle1);

  handle2 = game.add.sprite(200, 400, 'star');
  handle2.anchor.set(0.5);
  handles.push(handle2);
  
  handle3 = game.add.sprite(400, 400, 'star');
  handle3.anchor.set(0.5);
  handles.push(handle3);

  handle4 = game.add.sprite(400, 200, 'star');
  handle4.anchor.set(0.5);
  handles.push(handle4);

  line1 = new Phaser.Line(100, 100, 500, 500);
  line2 = new Phaser.Line(100, 100, 500, 500);
  line3 = new Phaser.Line(100, 100, 500, 500);
  line4 = new Phaser.Line(100, 100, 500, 500);
}

function update() {
  line1 = new Phaser.Line(handle1.x, handle1.y, handle2.x, handle2.y);
  line2 = new Phaser.Line(handle2.x, handle2.y, handle3.x, handle3.y);
  line3 = new Phaser.Line(handle3.x, handle3.y, handle4.x, handle4.y);
  line4 = new Phaser.Line(handle4.x, handle4.y, handle1.x, handle1.y);
}
  

function render() {
 
  game.debug.geom(line1);
  game.debug.geom(line2);
  game.debug.geom(line3);
  game.debug.geom(line4);
}

function baka() {
  moveMatrix(100);
}

function moveMatrix(data) {
  for (let i=0; i<handles.length; i++) {
    const newX = handles[i].x + data;
    const newY = handles[i].y + data;
    
    anim(handles[i], newX, newY)
  }
}

function anim(obj, newX, newY) {
  game.add.tween(obj)
  .to( { x: newX, y: newY }, 300, "Linear")
  .start();
}
 