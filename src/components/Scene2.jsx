import { useRef, useEffect } from "react"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { MapControls } from 'three/examples/jsm/controls/OrbitControls.js'

import Stats from "three/examples/jsm/libs/stats.module"
import * as dat from 'dat.gui'


const Scene2 = () => {
  const mountRef = useRef(null)

  useEffect(() => {
    const currentRef = mountRef.current
    const { clientWidth: width, clientHeight: height } = currentRef

    // Debug
    const gui = new dat.GUI()

    /**
    * global
    */
    const zoom = 2

    /**
     *  Escena
     */
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0xffffff)

    /**
     * Cámara
     */
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.001, 100)
    camera.position.x = 0
    camera.position.y = 0.18
    camera.position.z = 2
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
    const controls = new MapControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
     
    controls.screenSpacePanning = false
     
    controls.minDistance = zoom
    controls.maxDistance = zoom
     
    controls.maxPolarAngle = Math.PI * 0.489
    controls.minPolarAngle = Math.PI * 0.35
    controls.minAzimuthAngle = -Math.PI * 0.0001;
    controls.maxAzimuthAngle = Math.PI * 0.0001;

    /**
     * Objects
     */
    // geometría
    const picGeometry = new THREE.PlaneGeometry(.1,.2)
    // colores
    const colors = [
    "AliceBlue",
    "AntiqueWhite",
    "Aqua",
    "Aquamarine",
    "Azure",
    "Beige",
    "Bisque",
    "Black",
    "BlanchedAlmond",
    "Blue",
    "BlueViolet",
    "Brown",
    "BurlyWood",
    "CadetBlue",
    "Chartreuse",
    "Chocolate",
    "Coral",
    "CornflowerBlue",
    "Cornsilk",
    "Crimson",
    "Cyan",
    "DarkBlue",
    "DarkCyan",
    "DarkGoldenRod",
    "DarkGray",
    "DarkGrey",
    "DarkGreen",
    "DarkKhaki",
    "DarkMagenta",
    "DarkOliveGreen",
    "DarkOrange",
    "DarkOrchid",
    "DarkRed",
    "DarkSalmon",
    "DarkSeaGreen",
    "DarkSlateBlue",
    "DarkSlateGray",
    "DarkSlateGrey",
    "DarkTurquoise",
    "DarkViolet",
    "DeepPink",
    "DeepSkyBlue",
    "DimGray",
    "DimGrey",
    "DodgerBlue",
    "FireBrick",
    "FloralWhite",
    "ForestGreen",
    "Fuchsia",
    "Gainsboro",
    "GhostWhite",
    "Gold",
    "GoldenRod",
    "Gray",
    "Grey",
    "Green",
    "GreenYellow",
    "HoneyDew",
    "HotPink",
    "IndianRed",
    "Indigo",
    "Ivory",
    "Khaki",
    "Lavender",
    "LavenderBlush",
    "LawnGreen",
    "LemonChiffon",
    "LightBlue",
    "LightCoral",
    "LightCyan",
    "LightGoldenRodYellow",
    "LightGray",
    "LightGrey",
    "LightGreen",
    "LightPink",
    "LightSalmon",
    "LightSeaGreen",
    "LightSkyBlue",
    "LightSlateGray",
    "LightSlateGrey",
    "LightSteelBlue",
    "LightYellow",
    "Lime",
    "LimeGreen",
    "Linen",
    "Magenta",
    "Maroon",
    "MediumAquaMarine",
    "MediumBlue",
    "MediumOrchid",
    "MediumPurple",
    "MediumSeaGreen",
    "MediumSlateBlue",
    "MediumSpringGreen",
    "MediumTurquoise",
    "MediumVioletRed",
    "MidnightBlue",
    "MintCream",
    "MistyRose",
    "Moccasin",
    "NavajoWhite",
    "Navy",
    "OldLace",
    "Olive",
    "OliveDrab",
    "Orange",
    "OrangeRed",
    "Orchid",
    "PaleGoldenRod",
    "PaleGreen",
    "PaleTurquoise",
    "PaleVioletRed",
    "PapayaWhip",
    "PeachPuff",
    "Peru",
    "Pink",
    "Plum",
    "PowderBlue",
    "Purple",
    "RebeccaPurple",
    "Red",
    "RosyBrown",
    "RoyalBlue",
    "SaddleBrown",
    "Salmon",
    "SandyBrown",
    "SeaGreen",
    "SeaShell",
    "Sienna",
    "Silver",
    "SkyBlue",
    "SlateBlue",
    "SlateGray",
    "SlateGrey",
    "Snow",
    "SpringGreen",
    "SteelBlue",
    "Tan",
    "Teal",
    "Thistle",
    "Tomato",
    "Turquoise",
    "Violet",
    "Wheat",
    "White",
    "WhiteSmoke",
    "Yellow",
    "YellowGreen",]
    let x, z
    console.time()
    for(let color in colors){
        x = Math.cos(color) * (Math.random() * 2.3 + 0.2)
        z = (Math.sin(color) * (Math.random() * 10 + 0.5))-10
        // console.log(colors[color])
        const picMaterial = new THREE.MeshStandardMaterial({color: colors[color]})
        const pic = new THREE.Mesh(picGeometry,picMaterial)
        pic.position.set(x, 0, z)
        scene.add(pic)
    }
    console.timeEnd()
    console.log(colors.length)

    
    
    
    
    

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
    //   const elapsedTime = clock.getElapsedTime()/5
    //   console.log(elapsedTime)
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

export default Scene2