import { Canvas } from '@react-three/fiber'
import React, { Suspense } from 'react'
import { ComputerModel } from './ComputerModel'
import { OrbitControls, PerspectiveCamera, Stage } from '@react-three/drei'

const ComputerModelContainer = () => {
    return (
        <Canvas>
            <Suspense fallback="loading...">
                <Stage environment="night" intensity={0.5} >
                    <ComputerModel />
                </Stage>
                <OrbitControls enableZoom={false} autoRotate />
                <PerspectiveCamera zoom={0.7} position={[-1, 0, 1.8]} makeDefault />
            </Suspense>
        </Canvas>
    )
}

export default ComputerModelContainer