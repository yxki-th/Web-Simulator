import './style.css';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer';
import * as THREE from 'three';
//import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import { TrackballControls } from 'three/addons/controls/TrackballControls.js';
import {RGBELoader} from 'three/examples/jsm/loaders/RGBELoader';



const windowValues = {
  width: innerWidth,
  height: innerHeight
}

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(120, window.innerWidth / window.innerHeight, 0.1,100000000000000000)

//initialising the text renderer and window space for rendering
const labelRenderer = new CSS2DRenderer()

labelRenderer.setSize(window.innerWidth, window.innerHeight)
labelRenderer.domElement.style.position = 'absolute';
labelRenderer.domElement.style.top = '0px';
document.body.appendChild(labelRenderer.domElement);

//initialising the renderer and the window space for rendering
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(windowValues.width, windowValues.height)
camera.position.set(0,0,10000000)


const controls = new TrackballControls(camera, renderer.domElement)
controls.noPan = true
controls.rotateSpeed = 3
controls.dollySpeed = 2


// class to construct the planets and later to use when when creating their orbits and orbit animations
class Planets{
  constructor(radius, mass, orbitalVelocity, color, distanceFromSun, orbitInclination, orbitPeriod){
    this.radius = radius
    this.mass = mass
    this.orbitalVelocity = orbitalVelocity
    this.color = color
    this.distanceFromSun = distanceFromSun
    this.orbitInclination = orbitInclination
    this.orbitPeriod = orbitPeriod 
  }
  createPlanet(){
    const geometry = new THREE.SphereGeometry(this.radius, 64, 32)
    const material = new THREE.MeshBasicMaterial({color: this.color})
    const sphere = new THREE.Mesh(geometry, material)
    return sphere
  }
  createEllipses(){
      const curve = new THREE.EllipseCurve(
        (-this.distanceFromSun), 0,
        this.distanceFromSun * 2, this.distanceFromSun,
        0, 2 * Math.PI,
        false,
        0 
      )
      
      const points = curve.getPoints(100000);
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const material = new THREE.MeshBasicMaterial({color: 0xff0000});
      const ellipse = new THREE.Line(geometry, material)
      return ellipse

  }
  orbitCurrentTime(){
    let time = Date.now() / (1000 * 3600 * 24 * this.orbitPeriod)
    return time
  }
}
// each planet is renderd out, might convert each planet into its class later down the line for better manipulation and modulation
// colours are tempory each planet and the sun will have layers and texture mapping for reaslistic visuals
let sunParameters = new Planets((695700),(1.989 * Math.pow(10,30)), (0),  (0xffff00))
let sun = sunParameters.createPlanet()
sun.position.set(0,0,0)

const su = document.createElement('p')
su.id = "su"
su.textContent = "Sun"
su.style.color='#FFFFFF'
const sunLabel = new CSS2DObject(su)
sun.add(sunLabel)
sunLabel.position.set(0,0,3000)

let mercuryParameters = new Planets((2439.5),(0.300 * Math.pow(10,24)), (0),  (0x808080), (57.9 * Math.pow(10,6)),(7 * (Math.PI/180)), (88))
let mercury = mercuryParameters.createPlanet()
let mercuryEllipse = mercuryParameters.createEllipses()
mercuryEllipse.rotateY(mercuryParameters.orbitInclination)
//mercury.position.set((57.9 * Math.pow(10,6)),0,0)

const me  = document.createElement('p')
me.id = "me"
me.textContent = "Mercury"
me.style.color='#FFFFFF'
const mercuryLabel = new CSS2DObject(me)
mercury.add(mercuryLabel)
//mercuryLabel.position.set(mercury.position.x, mercury.position.y, 48)

let venusParameters = new Planets((6052),(4.87 * Math.pow(10,24)), (0),  (0xffffe5), (108.2 * Math.pow(10,6)), (3.4 * (Math.PI/180)), (224.7))
let venus = venusParameters.createPlanet()
let venusEllipse = venusParameters.createEllipses()
venusEllipse.rotateY(venusParameters.orbitInclination)
//venus.position.set((108.2 * Math.pow(10,6)),0,0)

const ve  = document.createElement('p')
ve.id = "ve"
ve.textContent = "Venus"
ve.style.color='#FFFFFF'
const venusLabel = new CSS2DObject(ve)
venus.add(venusLabel)
//venusLabel.position.set((108.3 * Math.pow(10,2)),91.5,0)

let earthParameters = new Planets((6378),(5.97 * Math.pow(10,24)), (0),  (0x0000ff), (149.6 * Math.pow(10,6)), 0, (365.2))
let earth = earthParameters.createPlanet();
let earthEllipse = earthParameters.createEllipses()
//earth.position.set((149.6 * Math.pow(10,6)),0,0)

const ea  = document.createElement('p')
ea.id = "ea"
ea.textContent = "Earth"
ea.style.color='#FFFFFF'
const earthLabel = new CSS2DObject(ea)
earth.add(earthLabel)
//earthLabel.position.set((149.6 * Math.pow(10,2)),96,0)

let marsParameters = new Planets((3396),(0.642 * Math.pow(10,24)), (0),  (0xff0000), (228 * Math.pow(10,6)), (1.8 * (Math.PI/180)), (687))
let mars = marsParameters.createPlanet()
let marsEllipse = marsParameters.createEllipses()
marsEllipse.rotateY(marsParameters.orbitInclination)
//mars.position.set((228 * Math.pow(10,6)),0,0)

const ma  = document.createElement('p')
ma.id = "ma"
ma.textContent = "Mars"
ma.style.color='#FFFFFF'
const marsLabel = new CSS2DObject(ma)
mars.add(marsLabel)
//marsLabel.position.set((228 * Math.pow(10,2)),51,0)

let jupitarParameters = new Planets((74192),(1898 * Math.pow(10,24)), (0),  (0xffd700), (778.5 * Math.pow(10,6)), (1.3 * (Math.PI/180)), (4331))
let jupitar = jupitarParameters.createPlanet()
let jupitarEllipse = jupitarParameters.createEllipses()
jupitarEllipse.rotateY(jupitarParameters.orbitInclination)
//jupitar.position.set((778.5 * Math.pow(10,6)),0,0)

const ju  = document.createElement('p')
ju.id = "ju"
ju.textContent = "Jupitar"
ju.style.color='#FFFFFF'
const jupitarLabel = new CSS2DObject(ju)
jupitar.add(jupitarLabel)
//jupitarLabel.position.set((778.5 * Math.pow(10,2)),1072.5,0)

let saturnParameters = new Planets((60268), (578 * Math.pow(10,24)), (0),  (0xe5e500), (1432 * Math.pow(10,6)), (2.5 * (Math.PI/180)), (10747))
let saturn = saturnParameters.createPlanet()
let saturnEllipse = saturnParameters.createEllipses()
saturnEllipse.rotateY(saturnParameters.orbitInclination)
//saturn.position.set((1432 * Math.pow(10,6)),0,0)

const sa  = document.createElement('p')
sa.id = "sa"
sa.textContent = "Saturn"
sa.style.color='#FFFFFF'
const saturnLabel = new CSS2DObject(sa)
saturn.add(saturnLabel)
//saturnLabel.position.set((1432 * Math.pow(10,2)),907.5,0)

let uranusParameters = new Planets((25559), (86.8 * Math.pow(10,24)), (0),  (0xb2b2ff), (2867 * Math.pow(10,6)), (0.8 * (Math.PI/180)), (30589))
let uranus = uranusParameters.createPlanet()
let uranusEllipse = uranusParameters.createEllipses()
uranusEllipse.rotateY(uranusParameters.orbitInclination)
//uranus.position.set((2867 * Math.pow(10,6)) ,0,0)

const ur  = document.createElement('p')
ur.id = "ur"
ur.textContent = "Uranus"
ur.style.color='#FFFFFF'
const uranusLabel = new CSS2DObject(ur)
uranus.add(uranusLabel)
//uranusLabel.position.set((2867 * Math.pow(10,2)),384,0)

let neptuneParameters = new Planets((24764), (102 * Math.pow(10,24)), (0),  (0xf0ffff), (4515 * Math.pow(10,6)), (1.8 * (Math.PI/180)),(59800))
let neptune = neptuneParameters.createPlanet()
let neptuneEllipse = neptuneParameters.createEllipses()
neptune.add(neptuneEllipse)
neptuneEllipse.rotateY(neptuneParameters.orbitInclination)
//neptune.position.set((4471.1 * Math.pow(10,6)),0,0)

const ne  = document.createElement('p')
ne.id = "ne"
ne.textContent = "Neptune"
ne.style.color='#FFFFFF'
const neptuneLabel = new CSS2DObject(ne)
neptune.add(neptuneLabel)
//neptuneLabel.position.set((4471.1 * Math.pow(10,2)),372,0)

const solarSystem = [sun, mercury, venus, earth, mars, jupitar, saturn, uranus, neptune ]
for (let items of solarSystem){
  scene.add(items)
}

const labels = [sunLabel, mercuryLabel, venusLabel, earthLabel, marsLabel, jupitarLabel, saturnLabel, uranusLabel, neptuneLabel]
for (let items of labels){
  scene.add(items)
}

const ellipses = [mercuryEllipse, venusEllipse, earthEllipse, marsEllipse, jupitarEllipse, saturnEllipse, uranusEllipse, neptuneEllipse]
for (let items of ellipses){ 
  scene.add(items)
}


// helpers for building incudes a light and a flat plane grid for reference
const light = new THREE.AmbientLight(0xffffff)
const axisHelper = new THREE.AxesHelper(100000000000)
//const gridHelper = new THREE.GridHelper(1000,50)
scene.add(light, axisHelper)



//animation function, acts like a pygame event loop
function animate() {
    requestAnimationFrame(animate)


    window.addEventListener("resize", () => {
      windowValues.width = innerWidth
      windowValues.height = innerHeight
       
      camera.aspect = windowValues.width / windowValues.height
      camera.updateProjectionMatrix()
      renderer.setSize(windowValues.width, windowValues.height)
      labelRenderer.setSize(windowValues.width, windowValues.height)
    
    })


    let time = Date.now() / ( 1000 * 3600 * 24)
    

    // planet rotation animation
    for (let items of solarSystem){
      items.rotation.x += 0.5
    }
    
    //planet orbit animation
    function orbitQuaternion(angle, position){
      const quaternion = new THREE.Quaternion()
      quaternion.setFromAxisAngle(new THREE.Vector3(0,1,0), angle)
      position.applyQuaternion(quaternion) 
    }
    
    mercury.position.set(((Math.cos(mercuryParameters.orbitCurrentTime()) * (mercuryParameters.distanceFromSun * 2)) - mercuryParameters.distanceFromSun),((Math.sin(mercuryParameters.orbitCurrentTime()) * mercuryParameters.distanceFromSun)),0)
    orbitQuaternion(mercuryParameters.orbitInclination, mercury.position)
    venus.position.set(((2 * Math.cos(venusParameters.orbitCurrentTime()) * venusParameters.distanceFromSun) - venusParameters.distanceFromSun),(Math.sin(venusParameters.orbitCurrentTime()) * venusParameters.distanceFromSun),0)
    orbitQuaternion(venusParameters.orbitInclination, venus.position)
    earth.position.set(((2 * Math.cos(earthParameters.orbitCurrentTime()) * earthParameters.distanceFromSun) - earthParameters.distanceFromSun), (Math.sin(earthParameters.orbitCurrentTime()) * earthParameters.distanceFromSun),0)
    mars.position.set(((2 * Math.cos(marsParameters.orbitCurrentTime()) * marsParameters.distanceFromSun) - marsParameters.distanceFromSun),(Math.sin(marsParameters.orbitCurrentTime()) * marsParameters.distanceFromSun),0)
    orbitQuaternion(marsParameters.orbitInclination, mars.position)
    jupitar.position.set(((2 * Math.cos(jupitarParameters.orbitCurrentTime()) * jupitarParameters.distanceFromSun) - jupitarParameters.distanceFromSun),(Math.sin(jupitarParameters.orbitCurrentTime()) * jupitarParameters.distanceFromSun),0)
    orbitQuaternion(jupitarParameters.orbitInclination, jupitar.position)
    saturn.position.set(((2 * Math.cos(saturnParameters.orbitCurrentTime()) * saturnParameters.distanceFromSun) - saturnParameters.distanceFromSun),(Math.sin(saturnParameters.orbitCurrentTime()) * saturnParameters.distanceFromSun),0)
    orbitQuaternion(saturnParameters.orbitInclination, saturn.position)
    uranus.position.set(((2 * Math.cos(uranusParameters.orbitCurrentTime()) * uranusParameters.distanceFromSun) - uranusParameters.distanceFromSun),(Math.sin(uranusParameters.orbitCurrentTime()) * uranusParameters.distanceFromSun),0)
    orbitQuaternion(uranusParameters.orbitInclination, uranus.position)
    neptune.position.set(((2 * Math.cos(neptuneParameters.orbitCurrentTime()) * neptuneParameters.distanceFromSun) - neptuneParameters.distanceFromSun),(Math.sin(neptuneParameters.orbitCurrentTime()) * neptuneParameters.distanceFromSun),0)
    orbitQuaternion(neptuneParameters.orbitInclination, neptune.position)
    
    mercuryLabel.position.set(mercury.position.x, mercury.position.y, 48)
    orbitQuaternion(mercuryParameters.orbitInclination, mercuryLabel.position)
    venusLabel.position.set(venus.position.x, venus.position.y, 122 )
    orbitQuaternion(venusParameters.orbitInclination, venusLabel.position)
    earthLabel.position.set(earth.position.x, earth.position.y, 7000)
    orbitQuaternion(venusParameters.orbitInclination, venusLabel.position)
    marsLabel.position.set(mars.position.x, mars.position.y, 68)
    orbitQuaternion(marsParameters.orbitInclination, marsLabel.position)
    jupitarLabel.position.set(jupitar.position.x, jupitar.position.y, 1430)
    orbitQuaternion(jupitarParameters.orbitInclination, jupitarLabel.position)
    saturnLabel.position.set(saturn.position.x, saturn.position.y, 1210)
    orbitQuaternion(saturnParameters.orbitInclination, saturnLabel.position)
    uranusLabel.position.set(uranus.position.x, uranus.position.y, 512)
    orbitQuaternion(uranusParameters.orbitInclination, uranusLabel.position)
    neptuneLabel.position.set(neptune.position.x, neptune.position.y, 496)
    orbitQuaternion(neptuneParameters.orbitInclination, neptuneLabel.position)




    function cameraControl( position1, position2, position3, position4, position5, position6, position7, position8){
      document.addEventListener("click", function(e) {
        var x = e.target.id
            switch(x){
              case "su":
                 controls.target.set(0,0,0);
                 //camera.position.set(0,0, 2500);
                 camera.position.set(0,0,3000);
                 controls.update();
                 break;
               case "me":
                 controls.target.set(position1.x, position1.y, position1.z);
                 camera.position.set(position1.x, position1.y, 48);
                 controls.update();
                 break;
               case "ve":
                 controls.target.set(position2.x, position2.y, position2.z);
                 camera.position.set(position2.x, position2.y, 61);
                 controls.update();
                 break;
               case "ea":
                 controls.target.set(position3.x, position3.y, position3.z);
                 camera.position.set(position3.x, position3.y, 128); 
                 controls.update();
                 break;
               case "ma":
                 controls.target.set(position4.x, position4.y, position4.z);
                 camera.position.set(position4.x, position4.y, 68);
                 controls.update();
                 break;
               case "ju":
                 controls.target.set(position5.x, position5.y, position5.z);
                 camera.position.set(position5.x, position5.y, 1430);
                 controls.update();
                 break;
               case "sa":
                 controls.target.set(position6.x, position6.y, position6.z);
                 camera.position.set(position6.x, position6.y, 1210);
                 controls.update();
                 break;
               case "ur":
                 controls.target.set(position7.x, position7.y, position7.z );
                 camera.position.set(position7.x, position7.y, 512);
                 controls.update();
                 break;
               case "ne":
                 controls.target.set(position8.x, position8.y, position8.z);
                 camera.position.set(position8.x, position8.y, 496);
                 controls.update();
                 break;
            }}
            )
          }
    
          cameraControl(mercury.position, venus.position, earth.position, mars.position, jupitar.position, saturn.position, uranus.position, neptune.position )

    controls.update();
    labelRenderer.render(scene, camera)
    renderer.render(scene, camera)
}


animate();

