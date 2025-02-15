import * as THREE from "three"
import { OrbitControls } from "OrbitControls"
import * as dat from "lil-gui"

/************
 ** SETUP **
 ************/
 // Sizes
 const sizes = {
   width: window.innerWidth,
   height: window.innerHeight,
   aspectRatio:window.innerWidth / window.innerHeight
 }

/************
 ** SCENE **
 ************/
 //Canvas
 const canvas = document.querySelector('.webgl')

 //Scene
 const scene = new THREE.Scene()
 scene.background = new THREE.Color('black')

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
    antialias: true
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
 const torusKnotGeometry = new THREE.TorusKnotGeometry(0.5, 0.2)
 const torusKnotMaterial = new THREE.MeshNormalMaterial()
 const torusKnot = new THREE.Mesh(torusKnotGeometry, torusKnotMaterial)

 torusKnot.position.set(6, 1.5, 0)

 torusKnot.castShadow = true

 scene.add(torusKnot)

 const eyeOneGeometry = new THREE.SphereGeometry() 
 const eyeOneMaterial = new THREE.MeshNormalMaterial() 
 const eyeOne = new THREE.Mesh(eyeOneGeometry, eyeOneMaterial)

 eyeOne.position.set(6, 3, 4)

 eyeOne.castShadow = true
 
 scene.add(eyeOne)

 const eyeTwoGeometry = new THREE.SphereGeometry() 
 const eyeTwoMaterial = new THREE.MeshNormalMaterial() 
 const eyeTwo = new THREE.Mesh(eyeTwoGeometry, eyeTwoMaterial)

 eyeTwo.position.set(6, 3, -4)

 eyeTwo.castShadow = true
 
 scene.add(eyeTwo)

 const smileGeometry = new THREE.CapsuleGeometry(0.5, 4, 20, 20) 
 const smileMaterial = new THREE.MeshNormalMaterial()
 const smile = new THREE.Mesh(smileGeometry, smileMaterial)

 smile.position.set(6, -1, 0)
 smile.rotation.x = Math.PI * 0.5

 smile.castShadow = true
 
 scene.add(smile)

/*************
** Lights **
*************/

 //const ambientLight = new THREE.AmbientLight(
   //new THREE.Color('white')
 //)
 //scene.add(ambientLight)

 //Directional Light
 const directionalLight = new THREE.DirectionalLight(
   new THREE.Color('white'),
   0.5
 )

 directionalLight.position.set(20, 4.1, 0)
 directionalLight.target = cave

 directionalLight.castShadow = true

 scene.add(directionalLight)

 //Directional Light Helper
 //const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight)
 //scene.add(directionalLightHelper)

/*******
** UI **
********/
 //UI
 const ui = new dat.GUI()

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

/*********************
** Animation Loop **
*********************/
   const clock = new THREE.Clock()

   const animation = () => 
   {
      //Return elapsedTime
      const elapsedTime = clock.getElapsedTime()

      //Animate objects
      torusKnot.rotation.y = elapsedTime

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
