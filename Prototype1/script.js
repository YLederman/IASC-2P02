import * as THREE from "three"

/************
 ** SCENE **
 ************/

 //Canvas
 const canvas = document.querySelector('.webgl')

 //Scene
 const scene = new THREE.Scene()
 scene.background = new THREE.Color('indigo')

 //Camera
 const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    100
 )
 scene.add(camera)
 camera.position.set(0, 0, 5)

 //Renderer
 const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
 })
 renderer.setSize(window.innerWidth, window.innerHeight)

/*************
** Meshes **
*************/ 
 //testCube
 const cubeGeomtery = new THREE.BoxGeometry(1)
 const cubeMaterial = new THREE.MeshNormalMaterial()
 const testCube = new THREE.Mesh(cubeGeomtery, cubeMaterial)

 scene.add(testCube)

 //testTorus
 const torusGeometry = new THREE.TorusGeometry(2.5)
 const torusMaterial = new THREE.MeshNormalMaterial()
 const testTorus = new THREE.Mesh(torusGeometry, torusMaterial)

 scene.add(testTorus)

/*********************
** Animation Loop **
*********************/
const clock = new THREE.Clock()

const animation = () => 
{
    //Return elapsedTime
    const elapsedTime = clock.getElapsedTime()

    //Animate testCube
    const cubeSpeed = 1
    testCube.scale.x = Math.sin(elapsedTime)
    testCube.scale.y = Math.sin(elapsedTime)
    testCube.scale.z = Math.sin(elapsedTime)

    testCube.rotation.x = elapsedTime * cubeSpeed
    testCube.rotation.y = elapsedTime * cubeSpeed
    testCube.rotation.z = elapsedTime * cubeSpeed

    //Animate testTorus
    const torusSpeed = 1
    testTorus.rotation.x = elapsedTime * torusSpeed
    testTorus.rotation.y = elapsedTime * torusSpeed
    testTorus.rotation.z = elapsedTime * torusSpeed

    //Renderer
    renderer.render(scene, camera)

    //Request next frame
    window.requestAnimationFrame(animation)
}

animation()
