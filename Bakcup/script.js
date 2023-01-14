import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextBufferGeometry, TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import { MeshMatcapMaterial } from 'three'

/**
 * Base
 */
// Debug


// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const matcapTexture = textureLoader.load('/textures/matcaps/8.png')

/**
 * Fonts
 */
 const fontLoader = new FontLoader()
 fontLoader.load(
    '/fonts/gentilis_regular.typeface.json',
    (font) =>
    {
        const textGeometry = new TextGeometry(
            'R A H I L J',
            {
                font: font,
                size: 1,
                height: 0.5,
                curveSegments: 8,
                bevelEnabled: true,
                bevelThickness: 0.05,
                bevelSize: 0.05,
                bevelOffset: 0,
                bevelSegments: 5
                
            }
        )
        
        const Material = new THREE.MeshMatcapMaterial({matcap : matcapTexture}) 
        const text = new THREE.Mesh(textGeometry, Material)
        // textGeometry.computeBoundingBox()
        // textGeometry.translate(
        //     - textGeometry.boundingBox.max.x * 0.5,
        //     - textGeometry.boundingBox.max.y * 0.5,
        //     - textGeometry.boundingBox.max.z * 0.5
        // )
        textGeometry.center()
        textGeometry.smoothness = 5


        scene.add(text)

        console.time('donuts')

        const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45)
        const CubeGeometry = new THREE.BoxGeometry(1,1,1)

        for(let i = 0; i < 500; i++) {

            
            const donut = new THREE.Mesh(donutGeometry, Material)

            donut.position.x = (Math.random() - 0.5 ) * 100
            donut.position.y = (Math.random() - 0.5 ) * 100
            donut.position.z = (Math.random() - 0.5 ) * 100

            donut.rotation.x = Math.random() * Math.PI
            donut.rotation.y = Math.random() * Math.PI

            const scale = Math.random()
            donut.scale.set(scale, scale, scale)

            const cube = new THREE.Mesh(CubeGeometry, Material)

            cube.position.x = (Math.random() - 0.5 ) * 100
            cube.position.y = (Math.random() - 0.5 ) * 100
            cube.position.z = (Math.random() - 0.5 ) * 100

            cube.rotation.x = Math.random() * Math.PI
            cube.rotation.y = Math.random() * Math.PI

            const scale1 = Math.random()
            cube.scale.set(scale1, scale1, scale1)

            scene.add(donut)
            scene.add(cube)
        }

        console.timeEnd('donuts')

       
        
    }

)

/**
 * Object
 */

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 10
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.autoRotate = true
controls.autoRotateSpeed = 1
controls.enablePan = false
controls.maxDistance = 50
controls.minDistance = 3
controls.maxPolarAngle = 90

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()