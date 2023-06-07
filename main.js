import './style.css'

import {gsap} from "gsap";
import * as THREE from 'three'
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {sin} from "three/nodes";

const raycaster = new THREE.Raycaster()
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(
    75,
    innerWidth / innerHeight,
    0.1,
    1000
)
const renderer = new THREE.WebGL1Renderer()

camera.position.z = 5

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
    side: THREE.DoubleSide,
    flatShading: true,
    specular: 0x880088,
    vertexColors: true
})
const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial)

// Affichage des coord des vertices du planeMesh
const {array: meshPosition} = planeMesh.geometry.attributes.position
console.log(meshPosition)

// Randomisation de la profondeur des vertices du planeMesh
for (let i = 0; i < meshPosition.length; i += 3) {
    const x = meshPosition[i]
    const y = meshPosition[i + 1]
    const z = meshPosition[i + 2]

    meshPosition[i + 2] = z + Math.random() * 0.5
}

const planeColors = []
for (let i = 0; i < meshPosition.length; i++) {
    planeColors.push(0, 0, 0.2)
}

planeMesh.geometry.setAttribute(
    'color',
    new THREE.BufferAttribute(new Float32Array(planeColors), 3)
)
console.log(planeMesh.geometry.attributes)
scene.add(planeMesh)


const light = new THREE.DirectionalLight(
    0xffffff,
    1
)
light.position.set(0, 0, 1)
scene.add(light)

const mousePos = {
    x: undefined,
    y: undefined
}

function animate() {
    requestAnimationFrame(animate)
    renderer.render(scene, camera)

    // Mettre à jour l'angle de la caméra en fonction de mousePos
    const { x, y } = mousePos;
    camera.rotation.x = y/10
    camera.rotation.y = -x/10

    raycaster.setFromCamera(mousePos, camera)
    const intersects = raycaster.intersectObject(planeMesh)
    if (intersects.length > 0) {

        const initialColor = {
            r: 0,
            g: 0,
            b: 0.2
        }
        const hoverColor = {
            r: 0,
            g: 0,
            b: 0.6
        }
        gsap.to(hoverColor,{
            r: initialColor.r,
            g: initialColor.g,
            b: initialColor.b,
            duration: 2,
            onUpdate: () => {
                intersects[0].object.geometry.attributes.color.setX(intersects[0].face.a, hoverColor.r)
                intersects[0].object.geometry.attributes.color.setY(intersects[0].face.a, hoverColor.g)
                intersects[0].object.geometry.attributes.color.setZ(intersects[0].face.a, hoverColor.b)

                intersects[0].object.geometry.attributes.color.setX(intersects[0].face.b, hoverColor.r)
                intersects[0].object.geometry.attributes.color.setY(intersects[0].face.b, hoverColor.g)
                intersects[0].object.geometry.attributes.color.setZ(intersects[0].face.b, hoverColor.b)

                intersects[0].object.geometry.attributes.color.setX(intersects[0].face.c, hoverColor.r)
                intersects[0].object.geometry.attributes.color.setY(intersects[0].face.c, hoverColor.g)
                intersects[0].object.geometry.attributes.color.setZ(intersects[0].face.c, hoverColor.b)
                intersects[0].object.geometry.attributes.color.needsUpdate = true
            }
        })
    }
}

animate()

addEventListener('mousemove', (event) => {
    mousePos.x = (event.clientX / innerWidth) * 2 - 1
    mousePos.y = -((event.clientY / innerHeight) * 2 - 1)
})