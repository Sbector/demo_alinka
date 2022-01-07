import { useRef, useEffect } from "react"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

import Stats from "three/examples/jsm/libs/stats.module"

const Scene = () => {
  const mountRef = useRef(null)

  useEffect(() => {
    const currentRef = mountRef.current
    const { clientWidth: width, clientHeight: height } = currentRef

    /**
     *  Escena
     */
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0xffffff)

    /**
     * Cámara
     */
    const camera = new THREE.PerspectiveCamera(25, width / height, 0.01, 1000)
    camera.position.set(10,10,10)
    scene.add(camera)

    /**
     * Renderizador
     */
    const renderer = new THREE.WebGLRenderer({antialias:true})
    renderer.setSize(width, height)
    renderer.setPixelRatio(window.devicePixelRatio)
    currentRef.appendChild(renderer.domElement)

    /**
     * Controles
     */
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.enablePan = false
    controls.minDistance = 15
    controls.maxDistance = 25

    /**
     * Geometría
     */
    const geometry = new THREE.BoxGeometry(1, 2, 1)
    const material = new THREE.MeshPhongMaterial({ color: 0xaa88ff })
    const cube = new THREE.Mesh(geometry, material)
    scene.add(cube)

    /**
     * Luces
     */
    const light = new THREE.PointLight(0xff0000,1,50)
    light.position.set(0,0,0)
    scene.add(light)

    const ambient = new THREE.AmbientLight(0xffffff,1)
    scene.add(ambient)

    /**
     * Ajustes Generales
     */
    // Dirección de la cámara
    camera.lookAt(cube.position)

    // Reloj para animación
    const clock = new THREE.Clock()

    // Stats
    const stats = Stats()
    document.body.appendChild(stats.dom)

    /**
     * Función Animate
     */
    const animate = () => {
      stats.update()
      const elapsedTime = clock.getElapsedTime()/5
      cube.rotation.y = elapsedTime
      cube.rotation.x = elapsedTime
      cube.position.y = Math.sin(elapsedTime)*2
      cube.position.x = Math.cos(elapsedTime)*1
      //console.log(elapsedTime)
      controls.update()
      renderer.render(scene, camera)
      requestAnimationFrame(animate)
    }

    /**
     * Función Resize
     */
    const resize = () =>{
        const updatedWidth = currentRef.clientWidth
        const updatedHeight = currentRef.clientHeight
        renderer.setSize(updatedWidth, updatedHeight)
        camera.aspect = updatedWidth / updatedHeight
        camera.updateProjectionMatrix()
    }
    window.addEventListener("resize",resize)

    animate()

    return () => {
      currentRef.removeChild(renderer.domElement)
      document.body.removeChild(stats.dom)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return <div ref={mountRef} style={{ width: "100%", height: "100vh" }}></div>
}

export default Scene