import './style.css'
import * as THREE from 'three'

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

const boxGeometry = new THREE.BoxGeometry(
    1,
    1,
    1
)
const boxMaterial = new THREE.MeshBasicMaterial(
    {color: 0x00ff00}
)
const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial)

const planeGeometry = new THREE.PlaneGeometry(
    5,
    5,
    10,
    10
)
const planeMaterial = new THREE.MeshBasicMaterial(
    {color: 0xff0000}
)
const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial)

scene.add(boxMesh)
scene.add(planeMesh)
camera.position.z = 5

function animate() {
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
    boxMesh.rotation.x +=0.05
    boxMesh.rotation.y +=0.02
}

animate()