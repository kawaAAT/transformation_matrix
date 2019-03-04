const game = new Phaser.Game(650, 450, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });

function preload() {
  
}

let view;

let handle1, handle2, handle3, handle4;
let line1, line2, line3, line4;
let graphics1, graphics2, graphics3, graphics4;
const handles = [];

function create() {
  game.stage.backgroundColor = "#242438";

  createCoordinates();

  view = game.add.group();
  view.x = 150;
  view.y = 350;
  view.scale.y = -1;

  handle1 = new Phaser.Point(0, 0);
  handles.push(handle1);

  handle2 = new Phaser.Point(100, 0);
  handles.push(handle2);

  handle3 = new Phaser.Point(100, 100);
  handles.push(handle3);

  handle4 = new Phaser.Point(0, 100);
  handles.push(handle4);

  line1 = new Phaser.Line(0, 0, 0, 0);
  line2 = new Phaser.Line(0, 0, 0, 0);
  line3 = new Phaser.Line(0, 0, 0, 0);
  line4 = new Phaser.Line(0, 0, 0, 0);
}

function update() {
  line1 = new Phaser.Line(handle1.x + view.x, -handle1.y + view.y, handle2.x + view.x, -handle2.y + view.y);

  line2 = new Phaser.Line(handle2.x + view.x, -handle2.y + view.y, handle3.x + view.x, -handle3.y + view.y);

  line3 = new Phaser.Line(handle3.x + view.x, -handle3.y + view.y, handle4.x + view.x, -handle4.y + view.y);

  line4 = new Phaser.Line(handle4.x + view.x, -handle4.y + view.y, handle1.x + view.x, -handle1.y + view.y);

  if (graphics1) graphics1.destroy();
  graphics1 = updateGraphics(line1);

  if (graphics2) graphics2.destroy();
  graphics2 = updateGraphics(line2);

  if (graphics3) graphics3.destroy();
  graphics3 = updateGraphics(line3);

  if (graphics4) graphics4.destroy();
  graphics4 = updateGraphics(line4);
}

function render() {
  game.debug.geom(line1);
  game.debug.geom(line2);
  game.debug.geom(line3);
  game.debug.geom(line4);
}

function createCoordinates() {
  const graphics = game.add.graphics(0, 0);
  graphics.lineStyle(1, 0xA4DEFF, 1);
  graphics.moveTo(150, 0);
  graphics.lineTo(150, 350);
  graphics.lineTo(800, 350);
  graphics.endFill();
}

function transform() {
  for (let i = 0; i < handles.length; i++) {
    const newX = handles[i].x * getVal('a') + handles[i].y * getVal('c') + +getVal('e');
    const newY = handles[i].x * getVal('b') + handles[i].y * getVal('d') + +getVal('f');

    anim(handles[i], newX, newY)
  }

  clearAll();
}

function rotate() {
  for (let i = 0; i < handles.length; i++) {
    const a = getVal('angle') * Math.PI / 180;
    const pivX = (handles[i].x - getVal('pX'));
    const pivY = (handles[i].y - getVal('pY'));

    const newX = pivX * Math.cos(a) + pivY * Math.sin(a) + +getVal('pX');
    const newY = -pivX * Math.sin(a) + pivY * Math.cos(a) + +getVal('pY');

    anim(handles[i], newX, newY)
  }

  clearAll();
}

function anim(obj, newX, newY) {
  game.add.tween(obj)
    .to({ x: newX, y: newY }, 300, "Linear")
    .start();
}

function getVal(id) {
  return document.getElementById(id).value;
}

function clearAll() {
  const arr = [['a', 1], ['b', 0], ['c', 0], ['d', 1], ['e', 0], ['f', 0], ['angle', 0], ['pX', 0], ['pY', 0]];

  arr.forEach((elem) => document.getElementById(elem[0]).value = elem[1]);
}

function updateGraphics(l) {
  const graphics = game.add.graphics(0, 0);
  graphics.lineStyle(3, 0x5CF000, 1);
  graphics.moveTo(l.start.x, l.start.y);
  graphics.lineTo(l.end.x, l.end.y);
  graphics.endFill();

  return graphics;
}
