const game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });

function preload() {
  game.load.image('star', 'assets/star.png');
}

let view;

let handle1;
let handle2;
let handle3;
let handle4;
let line1;
const handles = [];

function create() {
  game.stage.backgroundColor = '#124184';
  view = game.add.group();
  view.x = 200;
  view.y = 400;
  view.scale.y = -1;

  handle1 = game.add.sprite(0, 0, 'star');
  handle1.anchor.set(0.5);
  handles.push(handle1);
  view.add(handle1);

  handle2 = game.add.sprite(100, 0, 'star');
  handle2.anchor.set(0.5);
  handles.push(handle2);
  view.add(handle2);
  
  handle3 = game.add.sprite(100, 100, 'star');
  handle3.anchor.set(0.5);
  handles.push(handle3);
  view.add(handle3);

  handle4 = game.add.sprite(0, 100, 'star');
  handle4.anchor.set(0.5);
  handles.push(handle4);
  view.add(handle4);

  line1 = new Phaser.Line(0, 0, 0, 0);
  line2 = new Phaser.Line(0, 0, 0, 0);
  line3 = new Phaser.Line(0, 0, 0, 0);
  line4 = new Phaser.Line(0, 0, 00, 0);
}

function update() {
  line1 = new Phaser.Line(handle1.x + view.x, -handle1.y + view.y, handle2.x + view.x, -handle2.y + view.y);
  
  line2 = new Phaser.Line(handle2.x + view.x, -handle2.y + view.y, handle3.x + view.x, -handle3.y + view.y);
  
  line3 = new Phaser.Line(handle3.x + view.x, -handle3.y + view.y, handle4.x + view.x, -handle4.y + view.y);
  
  line4 = new Phaser.Line(handle4.x + view.x, -handle4.y + view.y, handle1.x + view.x, -handle1.y + view.y);
}

function render() {
  game.debug.geom(line1);
  game.debug.geom(line2);
  game.debug.geom(line3);
  game.debug.geom(line4);
}

function start() {
  for (let i=0; i<handles.length; i++) {
    const newX = handles[i].x*getVal('a') + handles[i].y*getVal('c') + +getVal('e');
    const newY = handles[i].x*getVal('b') + handles[i].y*getVal('d') + +getVal('f');
    
    anim(handles[i], newX, newY)
  }
}

function anim(obj, newX, newY) {
  game.add.tween(obj)
  .to( { x: newX, y: newY }, 300, "Linear")
  .start();
}

function getVal(id) {
  return document.getElementById(id).value;
}
 