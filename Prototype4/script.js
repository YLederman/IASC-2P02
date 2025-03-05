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

/*********************
** TEXT ANALYSIS **
*********************/
 //SourceText
 const sourceText = "When me and my family moved to Canada we adopted a barn cat named Leo. Leo was left behind by his mother because he was the runt of his litter. It was pretty evident when we saw him that he was- he was so small that he could fit into the palm of my hand as a kitten. We brought him home and had to remind ourselves we didn't need to treat Leo like glass, because although he was small he was still pretty hardy. I suppose that's what living for a bit in the elements does to you. Now, Leo is less small but still a bit of a runt, in attitude if nothing else. He's been with us for about eleven years, and hopefully he stays for a little longer still. We love him dearly- as much of an asshole as he is, I couldn't imagine my home without Leo."

 //Variables
 let parsedText, tokenizedText

 //Parse and Tokenize sourceText
 const tokenizeSourceText = () =>
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

 tokenizeSourceText()
 findSearchTermInTokenizedText("leo", "black")
 findSearchTermInTokenizedText("runt", "white")
 findSearchTermInTokenizedText("small", "purple")
 findSearchTermInTokenizedText("little", "purple")

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
