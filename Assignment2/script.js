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
 camera.position.set(25, 2, 30)

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
   cube.scale.x = params.scale / (height / 1.75)
   cube.scale.y = params.scale / (height / 1.75)
   cube.scale.z = params.scale / (height / 1.75)

   //Randomize rotation
   if(params.randomized){
    cube.rotation.x = Math.random() * 2 * Math.PI
    cube.rotation.y = Math.random() * 2 * Math.PI
    cube.rotation.z = Math.random() * 2 * Math.PI
   }

   //Add to group
   params.group.add(cube)
 }

  const drawTorus = (height, params) => 
  {
  const torusGeo = new THREE.TorusKnotGeometry(1.5, 1, 44)
  const torusMat = new THREE.MeshLambertMaterial({
      emissive: new THREE.Color(params.color),
      emissiveIntensity: 0.35,
      transparent: true,
      opacity: 1.0,
  })

  //create sphere
  const torusKnot = new THREE.Mesh(torusGeo, torusMat)

  //scale sphere
  torusKnot.scale.x = params.scale
  torusKnot.scale.y = params.scale
  torusKnot.scale.z = params.scale

  //position sphere
  torusKnot.position.x = (Math.random() - 0.5) * params.diameter
  torusKnot.position.z = (Math.random() - 0.5) * params.diameter
  torusKnot.position.y = height - 10

  params.group.add(torusKnot)
  }

  const drawCone = (height, params) => 
    {
    const coneGeo = new THREE.ConeGeometry(0.5, 0.8, 3)
    const coneMat = new THREE.MeshStandardMaterial({ 
        color: new THREE.Color(params.color), 
        transparent: true, 
        opacity: 1.0 
    })

//create cone
const cone = new THREE.Mesh(coneGeo, coneMat)

//scale cone
cone.scale.x = params.scale
cone.scale.y = params.scale
cone.scale.z = params.scale

//position cone
cone.position.x = (Math.random() - 0.5) * params.diameter * height
cone.position.z = (Math.random() - 0.5) * params.diameter * height
cone.position.y = height - 10

//randomize cone rotation
if(params.randomized)
    {
        cone.rotation.x = Math.random() * 2 * Math.PI
        cone.rotation.z = Math.random() * 2 * Math.PI
        cone.rotation.y = Math.random() * 2 * Math.PI
    }

    params.group.add(cone);
}

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
    emissive: false,
    randomized: true,
    diameter: 2,
    scale: 1,
    nCubes: 50
   },
   term2: {
    group: group2,
    term: 'capitol',
    color: '#f505c9',
    emissive: true,
    randomized: true,
    diameter: 35,
    scale: 0.1,
    nCubes: 50
   },
   term3: {
    group: group3,
    term: 'snow',
    color: '#ff0000',
    emissive: false,
    randomized: false,
    diameter: 10,
    scale: 5,
    nCubes: 350
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

 //find searchTerm in tokenizedText
const findSearchTermInTokenizedText = (params) =>
  {  
      //for loop to go through the tokenizedText array
      for (let i = 0; i < tokenizedText.length; i++)
      {
          //if tokenizedText[i] matches our searchTerm, draw a cube
          if(tokenizedText[i] === params.term){
  
              //convert i into height, with a value between 0 and 20, so that visualization doesn't extend infinitely
              const height = (100 / tokenizedText.length) * i * 0.2
  
              //call drawCube function 100 times using converted height value
              for(let a = 0; a < params.nCubes; a++)
              {
                  if (params.term === "katniss") 
                  {
                      drawCone(height, params);
                  } 
                  else if (params.term === "capitol") 
                  {
                      drawTorus(height, params);
                  } 
                  else if (params.term === "snow") 
                  {
                      drawCube(height, params)
                  }
                  //drawCube(height, params)
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

      //Capitol term spinning
      group2.rotation.y = elapsedTime * 0.2

      //Rotate Camera
      if(uiObj.rotateCamera)
      {
        camera.position.x = Math.sin(elapsedTime * 0.1) * 20
        camera.position.z = Math.cos(elapsedTime * 0.1) * 45
        camera.position.y = 0
        camera.lookAt(0, 2, 0)
        //camera.position.set(20, 2, 25)

      }

      //Renderer
      renderer.render(scene, camera)

      //Request next frame
      window.requestAnimationFrame(animation)
   }

   animation()
