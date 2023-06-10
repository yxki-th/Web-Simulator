import './style.css';

import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer';

import * as THREE from 'three';

import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene()

const labelRenderer = new CSS2DRenderer()

const camera = new THREE.PerspectiveCamera(120, window.innerWidth / window.innerHeight, 0.1,1000000)

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});

//initialising the text renderer and window space for rendering
labelRenderer.setSize(window.innerWidth, window.innerHeight)
labelRenderer.domElement.style.position = 'absolute';
labelRenderer.domElement.style.top = '0px';
document.body.appendChild(labelRenderer.domElement);

//initialising the renderer and the window space for rendering
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
camera.position.set(0,200000,100000)
renderer.render(scene, camera)

// class to construct the planets and later to use when when creating their orbits and orbit animations
class Planets{
  constructor(radius, mass, orbitalVelocity, inclination, color, label){
    this.radius = radius
    this.mass = mass
    this.orbitalVelocity = orbitalVelocity
    this.inclination = inclination
    this.color = color
    this.label = label
  }
  createPlanet(){
    const geometry = new THREE.SphereGeometry(this.radius, 64, 32)
    const material = new THREE.MeshBasicMaterial({color: this.color})
    const sphere = new THREE.Mesh(geometry, material)
    return sphere
  }
  planetLabel(){
    const pl = document.createElement('p')
    pl.textContent = this.label
    pl.style.color = "#FFFFFF"
    pl.addEventListener("click", CameraControls)
  }
}

// each planet is renderd out, might convert each planet into its class later down the line for better manipulation and modulation
// colours are tempory each planet and the sun will have layers and texture mapping for reaslistic visuals
let sunParameters = new Planets((1500),(1.989 * Math.pow(10,30)), (0), (0), (0xffff00))
let sun = sunParameters.createPlanet()
sun.position.set(0,0,0)

const su = document.createElement('p')
su.id = "su"
//su.className = "planet"
su.textContent = "Sun"
su.style.color='#FFFFFF'
const sunLabel = new CSS2DObject(su)
sunLabel.position.set(0,3000,0)

let mercuryParameters = new Planets((24),(0.300 * Math.pow(10,24)), (0), (0), (0x808080))
let mercury = mercuryParameters.createPlanet()
mercury.position.set((57.9 * Math.pow(10,2)),0,0)

const me  = document.createElement('p')
me.id = "me"
//me.className = "planet"
me.textContent = "Mercury"
me.style.color='#FFFFFF'
const mercuryLabel = new CSS2DObject(me)
mercuryLabel.position.set((57.9 * Math.pow(10,2)),36,0)

let venusParameters = new Planets((61),(4.87 * Math.pow(10,24)), (0), (0), (0xffffe5))
let venus = venusParameters.createPlanet()
venus.position.set((108.2 * Math.pow(10,2)),0,0)

const ve  = document.createElement('p')
ve.id = "ve"
//ve.className = "planet"
ve.textContent = "Venus"
ve.style.color='#FFFFFF'
const venusLabel = new CSS2DObject(ve)
venusLabel.position.set((108.3 * Math.pow(10,2)),91.5,0)

let earthParameters = new Planets((64),(5.97 * Math.pow(10,24)), (0), (0), (0x0000ff))
let earth = earthParameters.createPlanet();
earth.position.set((149.6 * Math.pow(10,2)),0,0)

const ea  = document.createElement('p')
ea.id = "ea"
//ea.className = "planet"
ea.textContent = "Earth"
ea.style.color='#FFFFFF'
const earthLabel = new CSS2DObject(ea)
earthLabel.position.set((149.6 * Math.pow(10,2)),96,0)

let marsParameters = new Planets((34),(0.642 * Math.pow(10,24)), (0), (0), (0xff0000))
let mars = marsParameters.createPlanet()
mars.position.set((228 * Math.pow(10,2)),0,0)

const ma  = document.createElement('p')
ma.id = "ma"
//ma.className = "planet"
ma.textContent = "Mars"
ma.style.color='#FFFFFF'
const marsLabel = new CSS2DObject(ma)
marsLabel.position.set((228 * Math.pow(10,2)),51,0)

let jupitarParameters = new Planets((715),(1898 * Math.pow(10,24)), (0), (0), (0xffd700))
let jupitar = jupitarParameters.createPlanet()
jupitar.position.set((778.5 * Math.pow(10,2)),0,0)

const ju  = document.createElement('p')
ju.id = "ju"
//ju.className = "planet"
ju.textContent = "Jupitar"
ju.style.color='#FFFFFF'
const jupitarLabel = new CSS2DObject(ju)
jupitarLabel.position.set((778.5 * Math.pow(10,2)),1072.5,0)

let saturnParameters = new Planets((605), (578 * Math.pow(10,24)), (0), (0), (0xe5e500))
let saturn = saturnParameters.createPlanet()
saturn.position.set((1432 * Math.pow(10,2)),0,0)

const sa  = document.createElement('p')
sa.id = "sa"
//sa.className = "planet"
sa.textContent = "Saturn"
sa.style.color='#FFFFFF'
const saturnLabel = new CSS2DObject(sa)
saturnLabel.position.set((1432 * Math.pow(10,2)),907.5,0)

let uranusParameters = new Planets((256), (86.8 * Math.pow(10,24)), (0), (0), (0xb2b2ff))
let uranus = uranusParameters.createPlanet()
uranus.position.set((2867 * Math.pow(10,2)) ,0,0)

const ur  = document.createElement('p')
ur.id = "ur"
//ur.className = "planet"
ur.textContent = "Uranus"
ur.style.color='#FFFFFF'
const uranusLabel = new CSS2DObject(ur)
uranusLabel.position.set((2867 * Math.pow(10,2)),384,0)

let neptuneParameters = new Planets((248), (102 * Math.pow(10,24)), (0), (0), (0xf0ffff))
let neptune = neptuneParameters.createPlanet()
neptune.position.set((4471.1 * Math.pow(10,2)),0,0)

const ne  = document.createElement('p')
ne.id = "ne"
//ne.className = "planet"
ne.textContent = "Neptune"
ne.style.color='#FFFFFF'
const neptuneLabel = new CSS2DObject(ne)
neptuneLabel.position.set((4471.1 * Math.pow(10,2)),372,0)

const solarSystem = [sun, mercury, venus, earth, mars, jupitar, saturn, uranus, neptune ]
for (let items of solarSystem){
  scene.add(items)
}

const labels = [sunLabel, mercuryLabel, venusLabel, earthLabel, marsLabel, jupitarLabel, saturnLabel, uranusLabel, neptuneLabel]
for (let items of labels){
  scene.add(items)
}

// helpers for building incudes a light and a flat plane grid for reference
const light = new THREE.AmbientLight(0xffffff)
const gridHelper = new THREE.GridHelper(1000,50)
scene.add(light, gridHelper)

const controls = new OrbitControls(camera, renderer.domElement)
controls.update()

function cameraControl(){
document.addEventListener("click", function(e) {
  var x = e.target.id
      switch(x){
        case "su":
           controls.target.set(0,0,0);
           controls.update();
           break;
         case "me":
           controls.target.set((57.9 * Math.pow(10,2)),0,0);
           controls.update();
           break;
         case "ve":
           controls.target.set((108.2 * Math.pow(10,2)),0,0);
           controls.update();
           break;
         case "ea":
           controls.target.set((149.6 * Math.pow(10,2)),0,0);
           controls.update();
           break;
         case "ma":
           controls.target.set((228 * Math.pow(10,2)),0,0);
           controls.update();
           break;
         case "ju":
           controls.target.set((778.5 * Math.pow(10,2)),0,0);
           controls.update();
           break;
         case "sa":
           controls.target.set((1432 * Math.pow(10,2)),0,0);
           controls.update();
           break;
         case "ur":
           controls.target.set((2867 * Math.pow(10,2)) ,0,0);
           controls.update();
           break;
         case "ne":
           controls.target.set((4471.1 * Math.pow(10,2)),0,0);
           controls.update();
           break;
      }}
      )
    }

//animation function, acts like a pygame event loop
function animate() {
    requestAnimationFrame(animate)
    controls.update();
    labelRenderer.render(scene, camera)
    renderer.render(scene, camera)
}

cameraControl();
animate();