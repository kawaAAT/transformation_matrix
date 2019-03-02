const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.set(120, 100, 400);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(650, 450);
renderer.setClearColor(0x242438, 1);

document.getElementById('container').appendChild(renderer.domElement);

const dots = [];
let line;

createCoordinates();
createDots();
createLines();

function createDots() {
  const dotGeometry = new THREE.Geometry();
  dotGeometry.vertices.push(new THREE.Vector3(0, 0, 0));
  const dotMaterial = new THREE.PointsMaterial({ size: 5, sizeAttenuation: false });

  const dot1 = new THREE.Points(dotGeometry, dotMaterial);
  scene.add(dot1);
  dots.push(dot1);

  const dot2 = new THREE.Points(dotGeometry, dotMaterial);
  dot2.position.y = 100;
  scene.add(dot2);
  dots.push(dot2);

  const dot3 = new THREE.Points(dotGeometry, dotMaterial);
  dot3.position.x = 100;
  scene.add(dot3);
  dots.push(dot3);

  const dot4 = new THREE.Points(dotGeometry, dotMaterial);
  dot4.position.z = 100;
  scene.add(dot4);
  dots.push(dot4);
}

function createCoordinates() {
  var material = new THREE.LineBasicMaterial({ color: 0xA4DEFF });
  var geometry = new THREE.Geometry();

  geometry.vertices.push(new THREE.Vector3(0, 0, 0));
  geometry.vertices.push(new THREE.Vector3(1000, 0, 0));
  geometry.vertices.push(new THREE.Vector3(0, 0, 0));
  geometry.vertices.push(new THREE.Vector3(0, 1000, 0));
  geometry.vertices.push(new THREE.Vector3(0, 0, 0));
  geometry.vertices.push(new THREE.Vector3(0, 0, 1000));

  const line = new THREE.Line(geometry, material);
  scene.add(line);
}

function createLines() {
  var material = new THREE.LineBasicMaterial({ color: 0x327A32 });
  var geometry = new THREE.Geometry();

  dots.forEach((dot1, i) => {
    const d1 = dot1.position;

    dots.forEach((dot2, j) => {
      const d2 = dot2.position;

      if (i != j) {
        geometry.vertices.push(new THREE.Vector3(d1.x, d1.y, d1.z));
        geometry.vertices.push(new THREE.Vector3(d2.x, d2.y, d2.z));
      }
    });
  });

  line = new THREE.Line(geometry, material);
  scene.add(line);
}

function transform() {
  dots.forEach(dot => {
    const d = dot.position;
    const newX = d.x * getVal('a') + d.y * getVal('d') + d.z * getVal('h') + +getVal('l');
    const newY = d.x * getVal('b') + d.y * getVal('e') + d.z * getVal('i') + +getVal('m');
    const newZ = d.x * getVal('c') + d.y * getVal('f') + d.z * getVal('j') + +getVal('n');

    anim(d, newX, newY, newZ)
  });

  clearAll();
}

function rotate() {
  const axis = getVal('axis');
  const a = getVal('angle') * Math.PI / 180;

  dots.forEach(dot => {
    const d = dot.position;
    let newX, newY, newZ = 0;
    const pivX = (d.x - getVal('pX'));
    const pivY = (d.y - getVal('pY'));
    const pivZ = (d.z - getVal('pZ'));

    if (axis == 'x') {
      newX = pivX + +getVal('pX');
      newY = Math.cos(a) * pivY - Math.sin(a) * pivZ + +getVal('pY');
      newZ = Math.sin(a) * pivY + Math.cos(a) * pivZ + +getVal('pZ');
    }
    else if (axis == 'y') {
      newX = Math.cos(a) * pivX - Math.sin(a) * pivZ + +getVal('pX');
      newY = pivY + +getVal('pY');
      newZ = Math.sin(a) * pivX + Math.cos(a) * pivZ + +getVal('pZ');
    }
    else if (axis == 'z') {
      newX = Math.cos(a) * pivX + Math.sin(a) * pivY + +getVal('pZ');
      newY = -Math.sin(a) * pivX + Math.cos(a) * pivY + +getVal('pZ');
      newZ = pivZ + +getVal('pZ');;
    }

    anim(d, newX, newY, newZ);
  });

  clearAll();
}

function anim(obj, newX, newY, newZ) {
  const tween = new TWEEN.Tween(obj)
    .to({
      x: newX,
      y: newY,
      z: newZ
    }, 500).start();
}

function getVal(id) {
  return document.getElementById(id).value;
}

function clearAll() {
  const arr = [['a', 1], ['b', 0], ['c', 0], ['d', 0], ['e', 1], ['f', 0],
  ['h', 0], ['i', 0], ['j', 1], ['l', 0], ['m', 0], ['n', 0],
  ['angle', 0], ['pX', 0], ['pY', 0], ['pZ', 0]];

  arr.forEach((elem) => document.getElementById(elem[0]).value = elem[1]);
  document.getElementById('axis').value = 'x';
}

function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
  TWEEN.update();

  scene.remove(line);
  createLines();
}
render();