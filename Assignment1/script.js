import * as THREE from "three"
import { OrbitControls } from "OrbitControls"
import * as dat from "lil-gui"

/************
 ** SETUP **
 ************/
 // Sizes
 const sizes = {
   width: window.innerWidth * 0.4,
   height: window.innerHeight,
   aspectRatio:window.innerWidth * 0.4 / window.innerHeight
 }

/************
 ** SCENE **
 ************/
 //Canvas
 const canvas = document.querySelector('.webgl')

 //Scene
 const scene = new THREE.Scene()
 //scene.background = new THREE.Color('black')

 //Camera
 const camera = new THREE.PerspectiveCamera(
    75,
    sizes.aspectRatio,
    0.1,
    100
 )
 scene.add(camera)
 camera.position.set(10, 2, 7.5)

 //Renderer
 const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true
 })
 renderer.setSize(sizes.width, sizes.height)
 renderer.shadowMap.enabled = true

 //Controls
 const controls = new OrbitControls(camera, canvas)
 controls.enableDamping = true

/*************
** Meshes **
*************/ 
 //Cave Wall
 const caveGeomtery = new THREE.PlaneGeometry(15.5, 7.5)
 const caveMaterial = new THREE.MeshStandardMaterial({
   color: new THREE.Color('white'),
   side: THREE.DoubleSide
 })
 const cave = new THREE.Mesh(caveGeomtery, caveMaterial)

 cave.rotation.y = Math.PI * 0.5

 cave.receiveShadow = true

 scene.add(cave)

 //Objects
 const smileGeometry = new THREE.CapsuleGeometry(0.7, 7, 20, 20) 
 const smileMaterial = new THREE.MeshNormalMaterial()
 const smile = new THREE.Mesh(smileGeometry, smileMaterial)

 smile.position.set(13, 1, 0)
 smile.rotation.x = Math.PI * 0.5

 smile.castShadow = true
 
 scene.add(smile)

 //Cat
 const earGeometry = new THREE.ConeGeometry(0.7, 0.7, 32)
 const earMaterial = new THREE.MeshNormalMaterial()
 const ear = new THREE.Mesh(earGeometry, earMaterial)

 ear.position.set(13, 3, -4.4)

 ear.castShadow = true

 scene.add(ear)

 const eyeTwoGeometry = new THREE.SphereGeometry() 
 const eyeTwoMaterial = new THREE.MeshNormalMaterial() 
 const eyeTwo = new THREE.Mesh(eyeTwoGeometry, eyeTwoMaterial)

 eyeTwo.position.set(13, 2, -4.5)

 eyeTwo.castShadow = true
 
 scene.add(eyeTwo)

 const noseGeometry = new THREE.SphereGeometry(0.5) 
 const noseMaterial = new THREE.MeshNormalMaterial() 
 const nose = new THREE.Mesh(noseGeometry, noseMaterial)

 nose.position.set(13, 2, -5.2)

 nose.castShadow = true
 
 scene.add(nose)

 const legOneGeometry = new THREE.CapsuleGeometry(0.5, 1, 20, 20) 
 const legOneMaterial = new THREE.MeshNormalMaterial()
 const legOne = new THREE.Mesh(legOneGeometry, legOneMaterial)

 legOne.position.set(13, -0.25, -3.5)

 legOne.castShadow = true
 
 scene.add(legOne)

 const legTwoGeometry = new THREE.CapsuleGeometry(0.5, 1, 20, 20) 
 const legTwoMaterial = new THREE.MeshNormalMaterial()
 const legTwo = new THREE.Mesh(legTwoGeometry, legTwoMaterial)

 legTwo.position.set(13, -0.25, 1)

 legTwo.castShadow = true
 
 scene.add(legTwo)

 const tailGeometry = new THREE.CapsuleGeometry(0.5, 1.3, 20, 20) 
 const tailMaterial = new THREE.MeshNormalMaterial()
 const tail = new THREE.Mesh(tailGeometry, tailMaterial)

 tail.position.set(13, 2, 0.5)
 tail.rotation.x = Math.PI * 0.7

 tail.castShadow = true
 
 scene.add(tail)

 //Gun
 const pointOneGeometry = new THREE.CapsuleGeometry(0.7, 3, 20, 20) 
 const pointOneMaterial = new THREE.MeshNormalMaterial()
 const pointOne = new THREE.Mesh(pointOneGeometry, pointOneMaterial)

 pointOne.position.set(13, 1, 4)
 pointOne.rotation.x = Math.PI * 0.5

 pointOne.castShadow = true
 
 scene.add(pointOne)

 const tOneGeometry = new THREE.CapsuleGeometry(0.2, 0.5, 20, 20) 
 const tOneMaterial = new THREE.MeshNormalMaterial()
 const tOne = new THREE.Mesh(tOneGeometry, tOneMaterial)

 tOne.position.set(13, 0, 2)

 tOne.castShadow = true
 
 scene.add(tOne)
 

/*************
** Lights **
*************/
 //const ambientLight = new THREE.AmbientLight(
   //new THREE.Color('white')
 //)
 //scene.add(ambientLight)

 //Directional Light
 const oneDirectionalLight = new THREE.DirectionalLight(
   new THREE.Color('white'),
   0.5
 )

 oneDirectionalLight.position.set(35, 5, -10)
 oneDirectionalLight.target = cave

 oneDirectionalLight.castShadow = false
 scene.add(oneDirectionalLight)

 const twoDirectionalLight = new THREE.DirectionalLight(
  new THREE.Color('white'),
  0.5
)

 twoDirectionalLight.position.set(35, 5, 10)
 twoDirectionalLight.target = cave

 twoDirectionalLight.castShadow = false

 scene.add(twoDirectionalLight)

 const threeDirectionalLight = new THREE.DirectionalLight(
  new THREE.Color('white'),
  0.5
)

 threeDirectionalLight.position.set(35, 3, 0)
 threeDirectionalLight.target = cave

 threeDirectionalLight.castShadow = false

 scene.add(threeDirectionalLight)

 //Directional Light Helper
 //const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight)
 //scene.add(directionalLightHelper)

/*********************
** DOM INTERACTIONS **
**********************/
 const domObject = {
  part: 1,
  firstChange: false,
  secondChange: false,
  thirdChange: false,
  fourthChange: false,
  fifthChange: false
 }


 //Part one
 document.querySelector('#part-one').onclick = function() {
  domObject.part = 1
  oneDirectionalLight.castShadow = false
  twoDirectionalLight.castShadow = false
  threeDirectionalLight.castShadow = false
 }

 //Part two
 document.querySelector('#part-two').onclick = function() {
  domObject.part = 2
 }

 //First change
 document.querySelector('#first-change').onclick = function() {
  domObject.firstChange = true
  oneDirectionalLight.castShadow = true
  twoDirectionalLight.castShadow = false
  threeDirectionalLight.castShadow = false
 }

 //Second change
 document.querySelector('#second-change').onclick = function() {
  domObject.secondChange = true
  oneDirectionalLight.castShadow = false
  twoDirectionalLight.castShadow = true
  threeDirectionalLight.castShadow = false
 }

 //Third change
 document.querySelector('#third-change').onclick = function() {
  domObject.thirdChange = true
  oneDirectionalLight.castShadow = false
  twoDirectionalLight.castShadow = false
  threeDirectionalLight.castShadow = true
 }

 //Fourth change
 document.querySelector('#fourth-change').onclick = function() {
  domObject.fourthChange = true
  oneDirectionalLight.castShadow = false
  twoDirectionalLight.castShadow = false
  threeDirectionalLight.castShadow = true
 }

 //Fifth change
 document.querySelector('#fifth-change').onclick = function() {
  domObject.fifthChange = true
  oneDirectionalLight.castShadow = false
  twoDirectionalLight.castShadow = false
  threeDirectionalLight.castShadow = true
 }

/*******
** UI **
********/
 //UI
 /*const ui = new dat.GUI()

 const lightPositionFolder = ui.addFolder('Light Position')

 lightPositionFolder
 .add(directionalLight.position, 'x')
 .min(-10)
 .max(20)
 .step(0.1)

 lightPositionFolder
 .add(directionalLight.position, 'y')
 .min(-10)
 .max(10)
 .step(0.1)

 lightPositionFolder
 .add(directionalLight.position, 'z')
 .min(-10)
 .max(10)
 .step(0.1)
 */

/*********************
** Animation Loop **
*********************/
   const clock = new THREE.Clock()

   const animation = () => 
   {
      //Return elapsedTime
      const elapsedTime = clock.getElapsedTime()

      //Animate objects
      //torusKnot.rotation.y = elapsedTime

      //part one
      if(domObject.part === 1)
      {
        camera.position.set(10, 0, 0)
        camera.lookAt(0, 0, 0)
      }

      //part two
      if(domObject.part === 2)
      {
        camera.position.set(27, 1, 0)
        camera.lookAt(0, 0, 0)
      }

      //first change
      if(domObject.firstChange)
      {
        //oneDirectionalLight.castShadow = true
        //twoDirectionalLight.castShadow = false
      }

      //second change
      if(domObject.secondChange)
      {
        //oneDirectionalLight.castShadow = false
        //twoDirectionalLight.castShadow = true
      }

      //third change
      if(domObject.thirdChange)
      {
        threeDirectionalLight.position.z = Math.cos(elapsedTime) * 7
      }

      //fourth change
      if(domObject.fourthChange)
      {
        threeDirectionalLight.position.set(13, 3, 0)
      }

      //fifth change
      if(domObject.fifthChange)
      {
        threeDirectionalLight.position.set(200, 3, 0)
      }

      //Helper
      //directionalLightHelper.update

      //Update OrbitControls
      controls.update()

      //Renderer
      renderer.render(scene, camera)

      //Request next frame
      window.requestAnimationFrame(animation)
   }

   animation()
