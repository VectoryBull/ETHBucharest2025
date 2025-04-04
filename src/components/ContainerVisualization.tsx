'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';
import { SensorData } from '@/types/request';

interface Props {
    sensorData: SensorData[];
}

function Container({ sensorData }: Props) {
    const containerRef = useRef<THREE.Mesh>(null);
    const latestData = sensorData?.[sensorData.length - 1];

    // Update container rotation based on acceleration
    if (containerRef.current && latestData?.acceleration) {
        containerRef.current.rotation.x = latestData.acceleration.x * 0.5;
        containerRef.current.rotation.y = latestData.acceleration.y * 0.5;
        containerRef.current.rotation.z = latestData.acceleration.z * 0.1;
    }

    return (
        <group position={[0, -2, 0]}>
            {/* Container body */}
            <mesh ref={containerRef}>
                <boxGeometry args={[4, 2, 2]} />
                <meshStandardMaterial color="#4F46E5" />
            </mesh>

            {/* Truck platform */}
            <mesh position={[0, -1.5, 0]}>
                <boxGeometry args={[6, 0.5, 3]} />
                <meshStandardMaterial color="#1F2937" />
            </mesh>

            {/* Wheels */}
            <mesh position={[-2, -2, 1]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.5, 0.5, 0.3]} />
                <meshStandardMaterial color="#111827" />
            </mesh>
            <mesh position={[-2, -2, -1]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.5, 0.5, 0.3]} />
                <meshStandardMaterial color="#111827" />
            </mesh>
            <mesh position={[2, -2, 1]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.5, 0.5, 0.3]} />
                <meshStandardMaterial color="#111827" />
            </mesh>
            <mesh position={[2, -2, -1]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.5, 0.5, 0.3]} />
                <meshStandardMaterial color="#111827" />
            </mesh>
        </group>
    );
}

export default function ContainerVisualization({ sensorData = [] }: Props) {
    const latestData = sensorData?.[sensorData.length - 1];

    if (!latestData) {
        return (
            <div className="h-[400px] w-full bg-gray-900 rounded-lg flex items-center justify-center text-gray-400">
                No sensor data available
            </div>
        );
    }

    return (
        <div className="flex gap-6">
            <div className="flex-1 h-[400px] bg-gray-900 rounded-lg overflow-hidden">
                <Canvas
                    camera={{
                        position: [8, 4, 8],
                        fov: 45,
                        near: 0.1,
                        far: 1000
                    }}
                    shadows
                    className="bg-gray-800"
                    gl={{
                        alpha: false,
                        antialias: true,
                    }}
                >
                    <color attach="background" args={['#1F2937']} />
                    <ambientLight intensity={0.5} />
                    <directionalLight
                        position={[10, 10, 5]}
                        intensity={1}
                        castShadow
                    />
                    <Container sensorData={sensorData} />
                    <OrbitControls
                        enableZoom={false}
                        minPolarAngle={Math.PI / 4}
                        maxPolarAngle={Math.PI / 2}
                        target={[0, -2, 0]}
                    />
                </Canvas>
            </div>

            <div className="w-64 bg-gray-900 rounded-lg p-4 space-y-4">
                <h3 className="text-lg font-semibold">Current Readings</h3>
                <div className="space-y-3">
                    <div>
                        <p className="text-gray-400 text-sm">Temperature</p>
                        <p className="text-xl">{latestData?.temperature?.toFixed(1) ?? 'N/A'}°C</p>
                    </div>
                    <div>
                        <p className="text-gray-400 text-sm">Humidity</p>
                        <p className="text-xl">{latestData?.humidity?.toFixed(1) ?? 'N/A'}%</p>
                    </div>
                    <div>
                        <p className="text-gray-400 text-sm">Vibrations</p>
                        <p className="text-xl">{latestData?.vibrations?.toFixed(3) ?? 'N/A'}</p>
                    </div>
                    <div>
                        <p className="text-gray-400 text-sm">Acceleration</p>
                        <div className="grid grid-cols-3 gap-2">
                            <div className="text-center">
                                <p className="text-sm">X</p>
                                <p>{latestData?.acceleration?.x?.toFixed(2) ?? 'N/A'}</p>
                            </div>
                            <div className="text-center">
                                <p className="text-sm">Y</p>
                                <p>{latestData?.acceleration?.y?.toFixed(2) ?? 'N/A'}</p>
                            </div>
                            <div className="text-center">
                                <p className="text-sm">Z</p>
                                <p>{latestData?.acceleration?.z?.toFixed(2) ?? 'N/A'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 