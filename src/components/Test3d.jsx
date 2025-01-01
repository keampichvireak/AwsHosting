import React from 'react'
import { Canvas } from '@react-three/fiber'
import { MeshDiscardMaterial, MeshDistortMaterial, OrbitControls, Sphere } from "@react-three/drei"
const Test3d = () => {
    return (
        <section style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Canvas>
                <mesh>
                    <Sphere args={[1, 100, 200]} scale={2.4}>
                        <MeshDistortMaterial color="#DB8B9B" attach="material" distort={0.5} speed={1} />

                    </Sphere>
                    {/* <meshStandardMaterial color="skyblue" /> */}
                    <ambientLight intensity={2} />
                    <directionalLight position={[1, 0, 5]} />
                    <OrbitControls enableZoom={false} />
                </mesh>
            </Canvas>
        </section>
    )
}

export default Test3d