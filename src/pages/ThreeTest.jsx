import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { useRef , useState, useMemo, useEffect} from "react";
import { STLLoader } from "three/examples/jsm/Addons.js";
import * as THREE from 'three';
import { OrbitControls, Grid} from "@react-three/drei";
import { useGLTF } from "@react-three/drei";

function DistillerModel() {
    const { scene } = useGLTF('/Models/ContDistillerAssembly.glb');
    return <primitive object={scene} scale={1} />;
}


function ParrotMerged({assembled}){
const {scene} = useGLTF('/Models/Parrot_merged.glb');
const clipPlane = useMemo(() => new THREE.Plane(new THREE.Vector3(-1,-1,-1).normalize(), -1.5), []);
const wasAssembled = useRef(false);
const assembledStartTime = useRef(0);

useEffect(() => {
    scene.traverse((child) => {
        if (child.isMesh) {
            child.material = new THREE.MeshBasicMaterial({
                color: child.material.color,
                clippingPlanes: [clipPlane],
            });
        }
    });
}, [scene]);

useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (assembled && !wasAssembled.current) assembledStartTime.current = t;
    wasAssembled.current = assembled;

    const timeSinceAssembled = assembled ? t - assembledStartTime.current : 0;
    const delay = 1;
    const wipeDuration = 5;
    const wipeProgress = THREE.MathUtils.clamp((timeSinceAssembled - delay)/wipeDuration, 0, 1);
    const eased = wipeProgress * wipeProgress * (3 - 2 * wipeProgress);
clipPlane.constant = THREE.MathUtils.lerp(-1.5, 1.5, eased);

    scene.visible = timeSinceAssembled > delay && wipeProgress < 1;
});

return <primitive object={scene} scale = {1.25}/>

}
function Parrot({assembled}){
    const {scene} = useGLTF('/Models/Parrot.glb');
    
    const parrotRef = useRef();
    const wasAssembled = useRef(false);
    const assembledStartTime = useRef(0);
    useEffect(() => {
        const cubes = [];
        scene.traverse((child) => {
            if (child.isMesh) {
                const originalColor = child.material.color;
                child.material = new THREE.MeshBasicMaterial({color:originalColor, wireframe:true});
            cubes.push({
                object:child, 
                finalPosition: child.position.clone(), 
                finalRotation: child.rotation.clone(),
                homePosition: new THREE.Vector3(
                    (Math.random() - 0.5) * .5,
                    (Math.random() - 0.5) * .5,
                    (Math.random() - 0.5) * .5),
                phase: Math.random() * Math.PI * 2, 
                orbitRadius: .15 + Math.random() * 0.2,
                orbitSpeed: 3 + Math.random() * 3,
                spinX: (Math.random() - 0.5) * 0.05,
                spinY: (Math.random() - 0.5) * 0.05,
                prevPosition: new THREE.Vector3(),
                assembleCurve: null,
                assembleProgress: 0,
            });
            }
        });

        
        const diagValues = cubes.map(c => c.finalPosition.x + c.finalPosition.y);
        const minDiag = Math.min(...diagValues);
        const maxDiag = Math.max(...diagValues);
        cubes.forEach(c => {
            const diag = c.finalPosition.x + c.finalPosition.y;
            c.wipeThreshold = (diag - minDiag) / (maxDiag - minDiag);
        });

        parrotRef.current = cubes;
        
    }, [scene]);
    useFrame ((state) => {
        const t = state.clock.elapsedTime;

        if (assembled && !wasAssembled.current){
            assembledStartTime.current = t;
            parrotRef.current.forEach((cube) => {
                const velocity = cube.object.position.clone().sub(cube.prevPosition);
                const startPosition = cube.object.position.clone();
                const controlPoint = startPosition.add(velocity.multiplyScalar(18));
                cube.assembleCurve = new THREE.QuadraticBezierCurve3(
                    cube.object.position.clone(),
                    controlPoint,
                    cube.finalPosition.clone(),
                );
                cube.assembleProgress = 0;
            }
            )
            
        }
        wasAssembled.current = assembled;

        const timeSinceAssembled = assembled ? t - assembledStartTime.current : 0;
        const delay = 1;
        const wipeDuration = 5;
        const wipeProgress = THREE.MathUtils.clamp((timeSinceAssembled - delay) /  wipeDuration, 0, 1);
        
        parrotRef.current.forEach((cube)=> {
            if (assembled) {
                cube.assembleProgress += (1 - cube.assembleProgress) * 0.05;
                const point = cube.assembleCurve.getPointAt(cube.assembleProgress);
                cube.object.position.copy(point);
                cube.object.rotation.x += (cube.finalRotation.x - cube.object.rotation.x) * 0.1;
                cube.object.rotation.y += (cube.finalRotation.y - cube.object.rotation.y) * 0.1;
                cube.object.rotation.z += (cube.finalRotation.z - cube.object.rotation.z) * 0.1;
                if (wipeProgress >= 1) {
                    cube.object.visible = true;
                    cube.object.material.wireframe = false;
                }
                // cube.object.material.wireframe = wipeProgress <= cube.wipeThreshold;
            } else {
                const angle = t * cube.orbitSpeed + cube.phase;
                const orbitX = Math.cos(angle) * cube.orbitRadius;
                const orbitZ = Math.sin(angle) * cube.orbitRadius;
                const swirlTarget = new THREE.Vector3(
                    cube.homePosition.x + orbitX,
                    cube.homePosition.y,
                    cube.homePosition.z + orbitZ);
                cube.object.position.lerp(swirlTarget, 0.05);
                cube.object.rotation.x += cube.spinX;
                cube.object.rotation.y += cube.spinY;
                cube.object.material.wireframe = true;
                cube.object.visible = true;
                cube.prevPosition.copy(cube.object.position);
            }
        })
        
    });
    
    return <primitive object = {scene} scale = {1.25}/>;
}

function JukeboxSide({position, rotation, color}){
    const geometry = useLoader(STLLoader, '/Models/Minecraft Jukebox Side.STL');
    return(
        <mesh geometry={geometry} position = {position} rotation = {rotation} scale = {0.0025}>
            <lineBasicMaterial color = {color} wireframe/>
        </mesh>
    )
}

function Cube({exploded}){
    const meshRef = useRef();
    
    const progress = useRef(0) //progress of the explode
    const curve = useMemo(() => new THREE.CatmullRomCurve3([new THREE.Vector3(-1.5, 0, 0),new THREE.Vector3(-1.5, 1.5,1), new THREE.Vector3(0,0,2)]), []);
    useFrame(() => {
        meshRef.current.rotation.x += 0.01
        meshRef.current.rotation.y += 0.01
        const target = exploded ? 1.5 : 1;  //explodes 1.5x (scale)
        const pathTarget = exploded ? 1 : 0;
        const newScale = meshRef.current.scale.x += (target - meshRef.current.scale.x) * .1; //scales all axis based on x (x too)
        meshRef.current.scale.setScalar(newScale);

        progress.current += (pathTarget - progress.current) * 0.1;
        const point = curve.getPointAt(progress.current);
        meshRef.current.position.copy(point);
        
    })
    return(
        <mesh ref={meshRef} position={[-1.5, 0, 0]} >
            <boxGeometry args={[1, 1, 1]} /> <meshBasicMaterial wireframe/>



        </mesh>
    )
    
}

function SpeakerModel({exploded}){
    const geometry = useLoader(STLLoader, '/Models/Speaker.stl');
    const speakerRef = useRef();
    useFrame(() => {
        speakerRef.current.rotation.y += 0.01
        // speakerRef.current.rotation.x += 0.05
        // speakerRef.current.rotation.x += 0.01
    }
        
    )
    return(
        <mesh ref={speakerRef} geometry={geometry} scale={0.025}>
            <meshBasicMaterial color={'#20c6f0'} wireframe />
        </mesh>
    )
}
function Sphere({exploded}){
    const sphereRef = useRef(0)
    
    useFrame(() => {
        sphereRef.current.rotation.y -= 0.01
        const target = exploded ? 1.5 : 1;
        const newScale = sphereRef.current.scale.x + (target - sphereRef.current.scale.x) * 0.1
        sphereRef.current.scale.setScalar(newScale)
    })
    return(
        <mesh position={[2, 0, 0]} ref={sphereRef}>
            <sphereGeometry args={[1, 10, 10]}/> <meshBasicMaterial wireframe/> 
        </mesh>
    )
}


export default function ThreeTest(){
    const [exploded, setExploded] = useState(false)
    return (
        <div style={{height:'100vh', background: '#111111', width: '100vh'}} onMouseEnter={() => setExploded(true)} onMouseLeave={()=> setExploded(false)}>
            <Canvas gl ={{localClippingEnabled:true}}>
                <ambientLight intensity={2}/>
                <axesHelper args={[2]}/>
                <OrbitControls/>
                <Cube exploded={exploded}/>
                <Sphere exploded={exploded}/>
                <SpeakerModel/>
                
                <JukeboxSide position ={[0, 0,0]} rotation={[Math.PI/2, 0, Math.PI/2]} color = {'#20c6f0'} />
                <JukeboxSide position = {[0, -1, 0]} rotation = {[Math.PI/2, Math.PI, Math.PI/2]} color={'#0eeb3e'}/>
                <JukeboxSide position = {[1, 0, 0]} rotation = {[Math.PI/2, Math.PI/2, 0]} color={'#b41313'}/>
                <JukeboxSide position = {[-1, 0, 0]} rotation = {[0, -Math.PI/2, 0]}/>
                <JukeboxSide position = {[0, 0 , 0]} rotation = {[Math.PI/2, 0, 0]} color={'#f3ef03'}/>
                <Parrot assembled={exploded}/>
                <ParrotMerged assembled={exploded}/>
                <DistillerModel />
            </Canvas>
            <p>
                    Hello! This is just a test of text showing up on a page with 3d renders and wireframes.
                </p>
        </div>
    )
}