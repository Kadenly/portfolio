import BackButton from '../../components/BackButton.jsx';
import './pageStyles.css'
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, OrbitControls, useTexture } from '@react-three/drei';
import {useEffect, useMemo,} from 'react';
import * as THREE from 'three';
import {useRef} from 'react';

function CameraResetter({controlsRef, isReturning}){
    const {camera} = useThree();
    useFrame(() => {if (isReturning.current){
        const controls = controlsRef.current;
        camera.position.lerp(controls.position0, 0.05);
        controls.target.lerp(controls.target0, 0.05)
        controls.update();
        if (camera.position.distanceTo(controls.position0) < 0.001){
            isReturning.current = false
        }

    }
    })
    return null;
}

function DistillerModel() {
    const { scene } = useGLTF('/Models/ContDistillerAssembly.glb');
    const steelTexture = useTexture('/textures/brushed-steel.jpg');

    useEffect(() => {
        scene.traverse((child) => {
            if (child.isMesh) {
                const box = new THREE.Box3().setFromObject(scene);
console.log('min:', box.min, 'max:', box.max, 'center:', box.getCenter(new THREE.Vector3()));
                const edges5 = new THREE.EdgesGeometry(child.geometry, 12);
                const edges1 = new THREE.EdgesGeometry(child.geometry, 1);
                const lineMaterial = new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 1 });
                const outline = new THREE.LineSegments( edges5, lineMaterial);
                outline.position.copy(child.position);
                outline.rotation.copy(child.rotation);
                outline.scale.copy(child.scale);
                child.visible = false; // So we hide the original mesh
                child.parent.add(outline);
                
}
            
        });
    }, [scene, steelTexture]);
    return (
        <group position={[0, 0, 0 ]}>
    <primitive object={scene}  scale={1} rotation={[-30 * Math.PI/180, 0, 0]} />
    </group>
    );
}
 
export default function MagDistillerPage(){
    const controlsRef = useRef();
    const resetTimer = useRef();
    const isReturning = useRef(false)


    return (
        <div className="page">
            <BackButton />
            <h1>High Temp, Multi-Effect Magnesium Distiller</h1>

            <img src="/MagCar.png" alt="Car Materials Diagram" className="floatImg" />
                <p>
                        For my senior capstone project, I joined WPI's Energy Metals Research Group (EMRG) and their ongoing research on cleaner, cheaper
                    magnesium production. Magnesium is a great lightweight, structural material; automakers and aerospace companies want more of it, but
                     producing it today is expensive and environmentally damaging. {/*The dominant method worldwide, the Pidgeon process, runs on coal and puts out
                    roughly 25 tons of CO2 per ton of magnesium produced. Yet, both the US and EU have both officiallty named magnesium as a critical material
                    with high supply risk. The group's approach pulls magnesium out of a liquid tin alloy instead, which can be retrofit into existing aluminum
                    production facilities and uses a fraction of the energy. */} My role was designing and building the hardware that allowed the team to test that idea. 

                </p>

            <div className='row modelContainer'>
                 <Canvas camera={{ position: [1.15, 1.15, 1.15], fov: 30 }}>

                    <ambientLight intensity={0.5} />
                    <directionalLight position={[10, 10, 5]} intensity={1} />
                    <directionalLight position={[-10, -10, -5]} intensity={1} />
                    <pointLight position={[0, 10, 0]} intensity={1} />
                    <DistillerModel />
                    <OrbitControls
                        ref = {controlsRef}
                        enablePan={false}
                        enableZoom={false}
                        onStart={() => {
                            clearTimeout(resetTimer.current);
                        isReturning.current =false;
                    }}
                        onEnd = {() => {resetTimer.current = setTimeout(() => {
                            isReturning.current = true;
                        }, 3000)

                        }}
                         />
                    <CameraResetter controlsRef = {controlsRef} isReturning = {isReturning} />
                </Canvas>

            </div>

            <p>
                    I designed two distillers. The first ran the group's established testing process. The second was a new concept: a four-stage
                    continuous distiller that consisted of a melter, condenser, evaportaor, and accumulator stacked vertically. The system runs
                    on a self-sustaining thermal cycle. Magnesium vapor rising from the evaporator condenses in the stage above, and the heat
                    released by that condensation melts the next batch of feedstock in the melter, which then gravity-feeds back down to replenish the evaporator.
                    No pumps, no active control loop, its just the geometry and physics doing the work. Impurities get filtered in a similar way: a tube set
                    0.7" above the evaporator floor allows the slag, which floats in the molten magnesium, to overflow into the accumulator before any clean metal does.

                    
            </p>

            <div className = "imgPair">
                <img src="/DistillerWhiteBoard.JPEG" alt="Distiller whiteboard drawing" className="cropTight " />
                    <img src="/Distiller Drawing.JPEG" alt="Closeup of Distiller inside Furnace packed with insulation" className="" />
            </div>





            
            
        

                <div className="row">
                <p>
                   All the flat sections were plasma cut out of half inch stainless steel plate, and the pipe sections were cut out of 5" stainless steel
                   pipe. All the parts were beveled, sandblasted to remove surface residue, then cleaned with acetone before welding. The first distiller was stick welded
                   because our college's welding shop had some fire safety issues a couple years back, so no hot work was allowed on campus. I ended up welding 
                   it in the backyard of our apartment, trying by best to keep a low profile so the landlord didn't yell at me for welding. The continuous
                   distiller was MIG welded in the college's welding shop, which was a much more pleasant experience.  The build order wasn't arbitrary: once an outer section gets sealed, the welds inside it
                   become permanently unreachable, so I had to sequence every internal joint to be finished and inspected before the next section
                   closed around it.

                </p>
                <img src="/DistillerWelding.PNG" alt="Welding" className="pageImg" />
                <img src="/Magdistiller.jpeg" alt="3 Stage Magnesium Distiller on floor in front of Furnace" className="pageImg" />
                </div>

                <div className="row">
                <p>
                   Before any of this saw a furnace, I ran every distiller through a two-stage leak test: a soapy-water bubble test to catch
                   obvious problems, then an overnight vacuum hold that had to stay within ±0.2 psi to pass. This mattered because a real leak at
                    900°C means oxygen meeting flammable magnesium vapor — not just bad data, an actual hazard.

                </p>
                </div>
                <div className="row">
                <p>
                   In one trial, I ramped the furnace at 4°C/min up to a ~950-1000°C evaporator temperature, holding roughly 200-300° cooler
                   at the condenser to drive vapor flow, and pulled vacuum twice — the second time after outgassing from surface residue pushed
                   the pressure back up mid-ramp — before the 3.5-hour distillation run.

                </p>
                <img src="/DistillerInsulation.jpeg" alt="Distiller inside Furnace packed with insulation" className="pageImg" />
            <img src="/DistillerRunning.jpeg" alt="Closeup of Distiller inside Furnace packed with insulation" className="pageImg" />
                </div>
                <div className="row">
                <p>
                   That run recovered 60.5% of the magnesium at 99.8% purity. Across the full set of experiments, the clearest finding was that
                    evaporation rate controls purity more than temperature does: going fast gets more yield but drags aluminum-rich droplets into
                    the condenser, while slower, controlled evaporation cut aluminum contamination from as high as 2.5% down to 0.04%.
                    That tradeoff is now shaping how the group runs the system going forward.

                </p>
                            <img src="/MagData.png" alt="Graph of Magnesium Production Data" className="pageImg" />
                            <img src="/DistillerInside.JPEG" alt="Inside of the Distiller after a run" className="pageImg" />
                            <img src="/DistillParts.JPEG" alt="The parts of the distiller laid out" className="pageImg" />
                            <img src="/RightAngle.jpeg" alt="Distiller Assembly Photo" className="pageImg" />
                            <img src="/DistillerSide.JPEG" alt="Distiller on its side" className="pageImg" />
                            <img src="/PipeSaw.JPEG" alt="Cutting the Pipe on horizontal band saw" className="pageImg" />

                </div>


        </div>
    )
    }
