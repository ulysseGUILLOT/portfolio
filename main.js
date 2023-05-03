import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(
    75,
    innerWidth / innerHeight,
    0.1,
    1000
)
const renderer = new THREE.WebGL1Renderer()

renderer.setSize(innerWidth, innerHeight)
renderer.setPixelRatio(devicePixelRatio)
document.body.appendChild(renderer.domElement)

const planeGeometry = new THREE.PlaneGeometry(
    20,
    20,
    50,
    50
)
const planeMaterial = new THREE.MeshPhongMaterial({
    color: 0xff0000,
    side: THREE.DoubleSide,
    flatShading: true,
    specular: 0x880088
})
const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial)

// Affichage des coord des vertices du planeMesh
const {array} = planeMesh.geometry.attributes.position
console.log(array)

// Randomisation de la profondeur des vertices du planeMesh
for (let i = 0; i < array.length; i += 3) {
    const x = array[i]
    const y = array[i + 1]
    const z = array[i + 2]

    array[i + 2] = z + Math.random()
}
scene.add(planeMesh)


const light = new THREE.DirectionalLight(
    0xffffff,
    1
)
light.position.set(0, 0, 1)
scene.add(light)

const backLight = new THREE.DirectionalLight(
    0xffffff,
    1
)
backLight.position.set(0, 0, -1)
scene.add(backLight)


new OrbitControls(camera, renderer.domElement)
camera.position.z = 5

function animate() {
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
}

animate()