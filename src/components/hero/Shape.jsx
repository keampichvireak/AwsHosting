import React from 'react'
import { Sphere, MeshDistortMaterial } from '@react-three/drei'

const Shape = () => {
    return (
        <>
            <mesh>
                <Sphere args={[1, 100, 200]} scale={2.4}>
                    <MeshDistortMaterial color="#DB8B9B" attach="material" distort={0.5} speed={1} />

                </Sphere>
                <ambientLight intensity={2} />
                <directionalLight position={[1, 0, 5]} />
            </mesh>
        </ >
    )
}

export default Shape