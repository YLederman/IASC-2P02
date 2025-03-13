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

 // Resizing
 window.addEventListener('resize', () => {
   sizes.width = window.innerWidth
   sizes.height = window.innerHeight
   sizes.aspectRatio = window.innerWidth / window.innerHeight

   camera.aspect = sizes.aspectRatio
   camera.updateProjectionMatrix()

   renderer.setSize(sizes.width, sizes.height)
   renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
 })

/************
 ** SCENE **
 ************/

 //Canvas
 const canvas = document.querySelector('.webgl')

 //Scene
 const scene = new THREE.Scene()
 scene.background = new THREE.Color('gray')

 //Camera
 const camera = new THREE.PerspectiveCamera(
    75,
    sizes.aspectRatio,
    0.1,
    100
 )
 scene.add(camera)
 camera.position.set(0, 12, -20)

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
** Lights **
*************/
 //Directional light
 const directionalLight = new THREE.DirectionalLight(0x404040, 100)
 scene.add(directionalLight)

/*************
** Meshes **
*************/ 
 //Cube Geometry
 const cubeGeometery = new THREE.BoxGeometry(0.5, 0.5, 0.5)

 const drawCube = (height, color) =>
 {
   //Create cube material
   const material = new THREE.MeshStandardMaterial({
      color: new THREE.Color(color)
   })

   //Create cube
   const cube = new THREE.Mesh(cubeGeometery, material)

   //Position cube
   cube.position.y = height - 10
   cube.position.x = (Math.random() - 0.5) * 10
   cube.position.z = (Math.random() - 0.5) * 10

   //Randomize rotation
   cube.rotation.x = Math.random() * 2 * Math.PI
   cube.rotation.y = Math.random() * 2 * Math.PI
   cube.rotation.z = Math.random() * 2 * Math.PI

   //Add to scene
   scene.add(cube)
 }

 //drawCube(0, 'purple')
 //drawCube(4, 'red')

/*******
** UI **
********/
 //UI
 const ui = new dat.GUI()

 let preset = {}

 const uiObj = 
 {
   sourceText: "",
   saveSourceText() {
      saveSourceText()
   },
   term1: '',
   color1: '',
   term2: '',
   color2: '',
   term3: '',
   color3: '',
   saveTerms() {
      saveTerms()
   }
 }

 //UI Functions
 const saveSourceText = () => 
 {
   //UI
   preset = ui.save()
   textFolder.hide()
   termsFolder.show()
   visualizeFolder.show()

   //Text Analysis 
   tokenizeSourceText(uiObj.sourceText)
 }

 const saveTerms = () => 
 {
   //UI
   preset = ui.save
   visualizeFolder.hide()

   //Text Analysis
   findSearchTermInTokenizedText(uiObj.term1, uiObj.color1)
   findSearchTermInTokenizedText(uiObj.term2, uiObj.color2)
   findSearchTermInTokenizedText(uiObj.term3, uiObj.color3)
 }

 //Text folder
 const textFolder = ui.addFolder("Source Text")

 textFolder
   .add(uiObj, 'sourceText')
   .name("Source Text")

 textFolder
   .add(uiObj, 'saveSourceText')
   .name("Save")

 //Terms and Visualize folder
 const termsFolder = ui.addFolder("Search Terms")
 const visualizeFolder = ui.addFolder("Visualize")

 termsFolder
   .add(uiObj, 'term1')
   .name("Term 1")

 termsFolder
   .addColor(uiObj, 'color1')
   .name("Color for term 1")

 termsFolder
   .add(uiObj, 'term2')
   .name("Term 2")

 termsFolder
   .addColor(uiObj, 'color2')
   .name("Color for term 2")

 termsFolder
   .add(uiObj, 'term3')
   .name("Term 3")

 termsFolder
   .addColor(uiObj, 'color3')
   .name("Color for term 3")

 visualizeFolder
   .add(uiObj, 'saveTerms')
   .name("Visualize")

 //Terms and Visualize folders are hidden by default
 termsFolder.hide()
 visualizeFolder.hide()

/*********************
** TEXT ANALYSIS **
*********************/
 //Variables
 let parsedText, tokenizedText

 //Parse and Tokenize sourceText
 const tokenizeSourceText = (sourceText) =>
 {
   parsedText = sourceText.replaceAll(".", " ").toLowerCase()

   //Tokenize
   tokenizedText = parsedText.split(/[^\w']+/)
 }

 //Find searchTerm in tokenizedText
 const findSearchTermInTokenizedText = (term, color) => 
   {
   //Use a for loop to go through the array
   for (let i = 0; i < tokenizedText.length; i++)
      {
         //If text matches search term, draw a cube
         if(tokenizedText[i] === term){
            //Convert i into height, a value between 0 and 20
            const height = (100 / tokenizedText.length) * i * 0.2
   
            //Call drawCube x 100 using converted height
            for(let a = 0; a < 100; a++)
            {
               drawCube(height, color)
            }
         }
      }
 }

/*********************
** Animation Loop **
*********************/
   const clock = new THREE.Clock()

   const animation = () => 
   {
      //Return elapsedTime
      const elapsedTime = clock.getElapsedTime()

      // Update OrbitControls
      controls.update()

      //Renderer
      renderer.render(scene, camera)

      //Request next frame
      window.requestAnimationFrame(animation)
   }

   animation()
