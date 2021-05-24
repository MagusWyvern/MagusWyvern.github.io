import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

// Octahedron

function addBiggerOctahedron2() {
  const geometry = new THREE.OctahedronGeometry(6.5);
  const material = new THREE.MeshStandardMaterial({ color: 0x0000FF });
  const octahedron = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(20));

  octahedron.position.set(19, y, z);
  scene.add(octahedron);

  function animate() {
    requestAnimationFrame(animate);
  
    octahedron.rotation.x += 0.01;
    octahedron.rotation.y += 0.005;
    octahedron.rotation.z += 0.01;
  
    renderer.render(scene, camera);
  }
  animate()
}

Array(1).fill().forEach(addBiggerOctahedron2);

function addBiggerOctahedron() {
  const geometry = new THREE.OctahedronGeometry(6.5);
  const material = new THREE.MeshStandardMaterial({ color: 0x00FFFF });
  const octahedron = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(20));

  octahedron.position.set(-20, y, z);
  scene.add(octahedron);

  function animate() {
    requestAnimationFrame(animate);
  
    octahedron.rotation.x += 0.01;
    octahedron.rotation.y += 0.005;
    octahedron.rotation.z += 0.01;
  
    renderer.render(scene, camera);
  }
  animate()
}

Array(1).fill().forEach(addBiggerOctahedron);

// const geometry = new THREE.OctahedronGeometry(1.5);
// const material = new THREE.MeshBasicMaterial({ color: 0x0000FF });
// const octahedron = new THREE.Mesh(geometry, material);

// octahedron.position.set(-3, 6, 20)
// scene.add(octahedron)

// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Helpers

// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper)

// const controls = new OrbitControls(camera, renderer.domElement);



function addOctahedron() {
  const geometry = new THREE.OctahedronGeometry(0.25);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addOctahedron);

// Background

const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;

// Moon

const moonTexture = new THREE.TextureLoader().load('moon.jpg');
const normalTexture = new THREE.TextureLoader().load('normal.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
  })
);

scene.add(moon);

moon.position.z = 16;
moon.position.y = -4;
moon.position.setX(-25);

// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  camera.position.z = t * -0.01 + 30;
  // camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop

function animate() {
  requestAnimationFrame(animate);

  moon.rotation.x += 0.005;

  // controls.update();

  renderer.render(scene, camera);
}

animate();
