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
 scene.background = new THREE.Color('lavender')

 //Camera
 const camera = new THREE.PerspectiveCamera(
    75,
    sizes.aspectRatio,
    0.1,
    100
 )
 scene.add(camera)
 camera.position.set(-2, 3, 5)

 //Renderer
 const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
 })
 renderer.setSize(sizes.width, sizes.height)

 //Controls
 const controls = new OrbitControls(camera, canvas)
 controls.enableDamping = true

/*************
** Meshes **
*************/ 
 //testSphere
 const torusKnotGeometry = new THREE.TorusKnotGeometry(1)
 const torusKnotMaterial = new THREE.MeshNormalMaterial()
 const testTorusKnot = new THREE.Mesh(torusKnotGeometry, torusKnotMaterial)

 scene.add(testTorusKnot)

 //Plane
 const planeGeometry = new THREE.PlaneGeometry(10, 10, 50, 50)
 const planeMaterial = new THREE.MeshBasicMaterial({
   color: new THREE.Color('black'),
   side: THREE.DoubleSide,
   wireframe: true
 })
 const plane = new THREE.Mesh(planeGeometry, planeMaterial)
 plane.rotation.x = Math.PI * 0.5

 scene.add(plane)
 
/*******
** UI **
********/
 //UI
 const ui = new dat.GUI()

 //UI Object
 const uiObject = {
   speed: 1,
   distance: 1,
   rotate: 1,
   scale: 1,
   play: false
 }

 //testTorusKnot UI
 const torusFolder = ui.addFolder('Torus Knot')
 torusFolder
   .add(uiObject, 'speed')
   .min(0.1)
   .max(10)
   .step(0.1)
   .name('Speed')

   torusFolder
   .add(uiObject, 'distance')
   .min(0.1)
   .max(10)
   .step(0.1)
   .name('Distance')

   torusFolder
   .add(uiObject, 'rotate')
   .min(0.1)
   .max(10)
   .step(0.1)
   .name('Rotation')

   torusFolder
   .add(uiObject, 'scale')
   .min(0.1)
   .max(10)
   .step(0.1)
   .name('Scale')

   torusFolder
   .add(uiObject, 'play')
   .name('Animate')

 //testPlane UI
 const planeFolder = ui.addFolder('Plane')
 planeFolder
   .add(planeMaterial, 'wireframe')

/*********************
** Animation Loop **
*********************/
   const clock = new THREE.Clock()

   const animation = () => 
   {
      //Return elapsedTime
      const elapsedTime = clock.getElapsedTime()

      //Animate Sphere
      testTorusKnot.scale.x = uiObject.scale
      testTorusKnot.scale.y = uiObject.scale
      testTorusKnot.scale.z = uiObject.scale

      if(uiObject.play)
      {
        console.log("Animation plays")
        testTorusKnot.position.x = Math.cos(elapsedTime * uiObject.speed) * uiObject.distance
        testTorusKnot.position.z = Math.sin(elapsedTime * uiObject.speed) * uiObject.distance

        //testTorusKnot.rotation.x = elapsedTime * uiObject.rotate
        testTorusKnot.rotation.y = elapsedTime * uiObject.rotate
        //testTorusKnot.rotation.z = elapsedTime * uiObject.rotate
      }

      // Update OrbitControls
      controls.update()

      //Renderer
      renderer.render(scene, camera)

      //Request next frame
      window.requestAnimationFrame(animation)
   }

   animation()
