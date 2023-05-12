import './style.css'

import * as THREE from 'three';

import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(120, window.innerWidth / window.innerHeight, 0.1,1000000);

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});

//initialising the renderer and the window space for rendering
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.set(0,500,150);
renderer.render(scene, camera);

// class to construct the planets and later to use when when creating their orbits and orbit animations
class Planets{
  constructor(radius, mass, orbitalVelocity, inclination, color){
    this.radius = radius;
    this.mass = mass;
    this.orbitalVelocity = orbitalVelocity;
    this.inclination = inclination;
    this.color = color;
  }
  createPlanet(){
    const geometry = new THREE.SphereGeometry(this.radius, 64, 32)
    const material = new THREE.MeshBasicMaterial({color: this.color})
    const sphere = new THREE.Mesh(geometry, material)
    return sphere
  }
  //orbit(){}
}

// each planet is renderd out, might convert each planet into its class later down the line for better manipulation and modulation
let sunParameters = new Planets((1500),(1.989 * Math.pow(10,30)), (0), (0), (0xffff00))
let sun = sunParameters.createPlanet()
sun.position.set(0,0,0)

let mercuryParameters = new Planets((24),(0.300 * Math.pow(10,24)), (0), (0), (0x808080))
let mercury = mercuryParameters.createPlanet()
mercury.position.set((57.9 * Math.pow(10,2)),0,0)

let venusParameters = new Planets((61),(4.87 * Math.pow(10,24)), (0), (0), (0xffffe5))
let venus = venusParameters.createPlanet()
venus.position.set((108.2 * Math.pow(10,2)),0,0)

let earthParameters = new Planets((64),(5.97 * Math.pow(10,24)), (0), (0), (0x0000ff))
let earth = earthParameters.createPlanet();
earth.position.set((149.6 * Math.pow(10,2)),0,0)

let marsParameters = new Planets((34),(0.642 * Math.pow(10,24)), (0), (0), (0xff0000))
let mars = marsParameters.createPlanet()
mars.position.set((228 * Math.pow(10,2)),0,0)

let jupitarParameters = new Planets((715),(1898 * Math.pow(10,24)), (0), (0), (0xffd700))
let jupitar = jupitarParameters.createPlanet()
jupitar.position.set((778.5 * Math.pow(10,2)),0,0)

let saturnParameters = new Planets((605), (578 * Math.pow(10,24)), (0), (0), (0xe5e500))
let saturn = saturnParameters.createPlanet()
saturn.position.set((1432 * Math.pow(10,2)),0,0)

let uranusParameters = new Planets((256), (86.8 * Math.pow(10,24)), (0), (0), (0xb2b2ff))
let uranus = uranusParameters.createPlanet()
uranus.position.set((2867 * Math.pow(10,2)) ,0,0)

let neptuneParameters = new Planets((248), (102 * Math.pow(10,24)), (0), (0), (0xf0ffff))
let neptune = neptuneParameters.createPlanet()
neptune.position.set((4471.1 * Math.pow(10,2)),0,0)

scene.add(sun, mercury, venus, earth, mars, jupitar, saturn, uranus, neptune)


// helpers for building incudes a light and a flat plane grid for reference
const light = new THREE.AmbientLight(0xffffff)
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(light, gridHelper)



const controls = new OrbitControls(camera, renderer.domElement);

// camera control function to change the camera focus when clicking on a specific planet, also will try and remap some of the camera movememnt with this fucnction
function cameraControls() {}

//animation function, acts like a pygame event loop
function animate() {
    requestAnimationFrame(animate);


    controls.update();
    renderer.render(scene, camera);
}

animate();

