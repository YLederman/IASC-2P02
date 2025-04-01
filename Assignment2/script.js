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
 scene.background = new THREE.Color('black')

 //Camera
 const camera = new THREE.PerspectiveCamera(
    75,
    sizes.aspectRatio,
    0.1,
    100
 )
 scene.add(camera)
 camera.position.set(10, 0, 20)

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

 const drawCube = (height, params) =>
 {
   //Create cube material
   const material = new THREE.MeshStandardMaterial({
      color: new THREE.Color(params.color)
   })

   //Create cube
   const cube = new THREE.Mesh(cubeGeometery, material)

   //Position cube
   cube.position.y = height - 10
   cube.position.x = (Math.random() - 0.5) * params.diameter
   cube.position.z = (Math.random() - 0.5) * params.diameter

   //Scale cubes
   cube.scale.x = params.scale
   cube.scale.y = params.scale
   cube.scale.z = params.scale

   //Randomize rotation
   if(params.randomized){
    cube.rotation.x = Math.random() * 2 * Math.PI
    cube.rotation.y = Math.random() * 2 * Math.PI
    cube.rotation.z = Math.random() * 2 * Math.PI
   }

   //Add to group
   params.group.add(cube)
 }

 //drawCube(0, 'purple')
 //drawCube(4, 'red')

/*******
** UI **
********/
 //UI
 const ui = new dat.GUI()

 let preset = {}

 //Groups
 const group1 = new THREE.Group()
 scene.add(group1)
 const group2 = new THREE.Group()
 scene.add(group2)
 const group3 = new THREE.Group()
 scene.add(group3)

 const uiObj = 
 {
   sourceText: "",
   saveSourceText() {
      saveSourceText()
   },
   term1: {
    group: group1,
    term: 'katniss',
    color: '#0b6b34',
    randomized: true,
    diameter: 10,
    scale: 0.5,
    nCubes: 100
   },
   term2: {
    group: group2,
    term: 'capitol',
    color: '#f505c9',
    randomized: true,
    diameter: 10,
    scale: 0.5,
    nCubes: 100
   },
   term3: {
    group: group3,
    term: 'snow',
    color: '#ff0000',
    randomized: true,
    diameter: 10,
    scale: 0.5,
    nCubes: 100
   },
   saveTerms() {
      saveTerms()
   },
   rotateCamera: false
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
   cameraFolder.show()

   //Text Analysis
   findSearchTermInTokenizedText(uiObj.term1)
   findSearchTermInTokenizedText(uiObj.term2)
   findSearchTermInTokenizedText(uiObj.term3)
 }

 //Text folder
 const textFolder = ui.addFolder("Source Text")

 textFolder
   .add(uiObj, 'sourceText')
   .name("Source Text")

 textFolder
   .add(uiObj, 'saveSourceText')
   .name("Save")

 //Terms, Visualize, and Camera folder
 const termsFolder = ui.addFolder("Search Terms")
 const visualizeFolder = ui.addFolder("Visualize")
 const cameraFolder = ui.addFolder("Camera")

 termsFolder
   .add(uiObj.term1, 'term')
   .name("Term 1")

  termsFolder
   .add(group1, 'visible')
   .name("Term 1 Visibility")

 termsFolder
   .addColor(uiObj.term1, 'color')
   .name("Color for term 1")

 termsFolder
   .add(uiObj.term2, 'term')
   .name("Term 2")

  termsFolder
   .add(group2, 'visible')
   .name("Term 2 Visibility")

 termsFolder
   .addColor(uiObj.term2, 'color')
   .name("Color for term 2")

 termsFolder
   .add(uiObj.term3, 'term')
   .name("Term 3")

  termsFolder
   .add(group3, 'visible')
   .name("Term 3 Visibility")

 termsFolder
   .addColor(uiObj.term3, 'color')
   .name("Color for term 3")

 visualizeFolder
   .add(uiObj, 'saveTerms')
   .name("Visualize")

  cameraFolder
   .add(uiObj, 'rotateCamera')
   .name("Turntable")

 //Terms, Visualize, and Camera folders are hidden by default
 termsFolder.hide()
 visualizeFolder.hide()
 cameraFolder.hide()

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
 const findSearchTermInTokenizedText = (params) => 
   {
   //Use a for loop to go through the array
   for (let i = 0; i < tokenizedText.length; i++)
      {
         //If text matches search term, draw a cube
         if(tokenizedText[i] === params.term){
            //Convert i into height, a value between 0 and 20
            const height = (100 / tokenizedText.length) * i * 0.2
   
            //Call drawCube x 100 using converted height
            for(let a = 0; a < params.nCubes; a++)
            {
               drawCube(height, params)
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

      //Rotate Camera
      if(uiObj.rotateCamera)
      {
        camera.position.x = Math.sin(elapsedTime * 0.1) * 20
        camera.position.z = Math.cos(elapsedTime * 0.1) * 20
        camera.position.y = 5
        camera.lookAt(0, 0, 0)
      }

      //Renderer
      renderer.render(scene, camera)

      //Request next frame
      window.requestAnimationFrame(animation)
   }

   animation()
