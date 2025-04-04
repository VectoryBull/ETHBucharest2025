'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
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
        <group position={[0, -1, 0]} scale={1.5}>
            {/* Container body */}
            <mesh ref={containerRef} position={[0, 1, 0]}>
                <boxGeometry args={[4, 2, 2]} />
                <meshStandardMaterial color="#4F46E5" />
            </mesh>

            {/* Trailer back lights */}
            <group position={[5.0, -0.5, 0]}>
                {/* Left back light */}
                <mesh position={[0, -0.1, 1]}>
                    <boxGeometry args={[0.1, 0.3, 0.3]} />
                    <meshStandardMaterial color="#FF0000" emissive="#FF0000" emissiveIntensity={0.5} />
                </mesh>
                {/* Right back light */}
                <mesh position={[0, -0.1, -1]}>
                    <boxGeometry args={[0.1, 0.3, 0.3]} />
                    <meshStandardMaterial color="#FF0000" emissive="#FF0000" emissiveIntensity={0.5} />
                </mesh>
                {/* Brake lights (top) */}
                <mesh position={[0, 0.1, 0.8]}>
                    <boxGeometry args={[0.1, 0.2, 0.4]} />
                    <meshStandardMaterial color="#FF0000" emissive="#FF0000" emissiveIntensity={0.5} />
                </mesh>
                <mesh position={[0, 0.1, -0.8]}>
                    <boxGeometry args={[0.1, 0.2, 0.4]} />
                    <meshStandardMaterial color="#FF0000" emissive="#FF0000" emissiveIntensity={0.5} />
                </mesh>
            </group>

            {/* Truck cab */}
            <group position={[-3.5, 0, 0]}>
                {/* Main cab body - Optimus Prime Red */}
                <mesh position={[0, 0.4, 0]}>
                    <boxGeometry args={[2.5, 2.6, 2.2]} />
                    <meshStandardMaterial color="#CC0000" metalness={0.8} roughness={0.2} />
                </mesh>

                {/* Hood - Optimus Prime Blue with red stripe */}
                <mesh position={[-1.2, -0.4, 0]}>
                    <boxGeometry args={[1.8, 1.2, 2.2]} />
                    <meshStandardMaterial color="#0000CC" metalness={0.8} roughness={0.2} />
                </mesh>

                {/* Red stripe on hood */}
                <mesh position={[-1.2, -0.2, 0]}>
                    <boxGeometry args={[1.81, 0.3, 2.21]} />
                    <meshStandardMaterial color="#FFFFFF" metalness={0.8} roughness={0.2} />
                </mesh>

                {/* Grill (chrome) */}
                <mesh position={[-1.4, -0.4, 0]}>
                    <boxGeometry args={[0.1, 0.8, 1.8]} />
                    <meshStandardMaterial color="#C0C0C0" metalness={1} roughness={0.1} />
                </mesh>

                {/* Windshield - tinted blue */}
                <mesh position={[0.2, 0.4, 0]} rotation={[0, 0, -0.3]}>
                    <boxGeometry args={[0.1, 1, 1.8]} />
                    <meshStandardMaterial color="#000066" metalness={0.9} roughness={0.1} opacity={0.8} transparent />
                </mesh>

                {/* Main headlights - bigger and brighter */}
                <mesh position={[-2.1, -0.4, 0.9]}>
                    <cylinderGeometry args={[0.25, 0.25, 0.15]} />
                    <meshStandardMaterial color="#FFFFFF" emissive="#FFFFFF" emissiveIntensity={1} />
                </mesh>
                <mesh position={[-2.1, -0.4, -0.9]}>
                    <cylinderGeometry args={[0.25, 0.25, 0.15]} />
                    <meshStandardMaterial color="#FFFFFF" emissive="#FFFFFF" emissiveIntensity={1} />
                </mesh>

            </group>

            {/* Truck platform - raised up */}
            <mesh position={[0, -0.5, 0]}>
                <boxGeometry args={[10, 0.5, 3.5]} />
                <meshStandardMaterial color="#000066" metalness={0.5} roughness={0.5} />
            </mesh>

            {/* Wheels with chrome rims and blue accents - raised up */}
            {[
                [-4.5, -1, 1.3], [-4.5, -1, -1.3],
                [2, -1, 1.3], [2, -1, -1.3],
                [3.5, -1, 1.3], [3.5, -1, -1.3]
            ].map((position, index) => (
                <group key={index} position={position as [number, number, number]}>
                    {/* Tire */}
                    <mesh rotation={[Math.PI / 2, 0, 0]}>
                        <cylinderGeometry args={[0.6, 0.6, 0.5]} />
                        <meshStandardMaterial color="#111827" roughness={0.8} />
                    </mesh>
                    {/* Chrome rim with blue accent */}
                    <mesh rotation={[Math.PI / 2, 0, 0]}>
                        <cylinderGeometry args={[0.35, 0.35, 0.51]} />
                        <meshStandardMaterial color="#C0C0C0" metalness={1} roughness={0.1} />
                    </mesh>
                    <mesh rotation={[Math.PI / 2, 0, 0]}>
                        <cylinderGeometry args={[0.4, 0.4, 0.49]} />
                        <meshStandardMaterial color="#FFFFFF" metalness={0.8} roughness={0.2} />
                    </mesh>
                </group>
            ))}

            {/* Chrome exhaust pipes with blue base - bigger, longer, and parallel */}
            <mesh position={[-3, 0.6, 1.2]} rotation={[0, 0, 0]}>
                <cylinderGeometry args={[0.15, 0.15, 2.6]} />
                <meshStandardMaterial color="#FFFFFF" metalness={0.9} roughness={0.1} />
            </mesh>
            <mesh position={[-3, 0.6, -1.2]} rotation={[0, 0, 0]}>
                <cylinderGeometry args={[0.15, 0.15, 2.6]} />
                <meshStandardMaterial color="#FFFFFF" metalness={0.9} roughness={0.1} />
            </mesh>

            {/* Chrome tips for exhaust pipes */}
            <mesh position={[-3, 2.0, 1.2]} rotation={[0, 0, 0]}>
                <cylinderGeometry args={[0.18, 0.28, 0.3]} />
                <meshStandardMaterial color="#C0C0C0" metalness={1} roughness={0.1} />
            </mesh>
            <mesh position={[-3, 2.0, -1.2]} rotation={[0, 0, 0]}>
                <cylinderGeometry args={[0.18, 0.28, 0.3]} />
                <meshStandardMaterial color="#C0C0C0" metalness={1} roughness={0.1} />
            </mesh>

            {/* License plate with text */}
            <group position={[5, -0.4, 0]}>
                {/* Plate background */}
                <mesh>
                    <boxGeometry args={[0.1, 0.4, 1.2]} />
                    <meshStandardMaterial color="#FFFFFF" metalness={0.5} roughness={0.5} />
                </mesh>
                {/* VECTOR text */}
                <Text
                    position={[0.06, 0, 0]}
                    rotation={[0, Math.PI / 2, 0]}
                    fontSize={0.2}
                    color="#000000"
                    anchorX="center"
                    anchorY="middle"
                >
                    VECTOR
                </Text>
            </group>

            {/* ETHBucharest 2025 label with text */}
            <group position={[-4.8, 1.2, 0]} rotation={[0, - Math.PI / 2, 0]}>
                {/* Background panel */}
                <mesh>
                    <boxGeometry args={[2, 0.8, 0.1]} />
                    <meshStandardMaterial color="#000066" metalness={0.8} roughness={0.2} />
                </mesh>
                {/* ETHBucharest text */}
                <Text
                    position={[0, 0.1, 0.06]}
                    fontSize={0.3}
                    color="#FFFFFF"
                    anchorX="center"
                    anchorY="middle"
                >
                    ETHBucharest
                </Text>
                {/* 2025 text */}
                <Text
                    position={[0, -0.2, 0.06]}
                    fontSize={0.3}
                    color="#FFFFFF"
                    anchorX="center"
                    anchorY="middle"
                >
                    2025
                </Text>
            </group>
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
            <div className="flex-1 h-[500px] bg-gray-900 rounded-lg overflow-hidden">
                <Canvas
                    camera={{
                        position: [12, 8, 12],
                        fov: 40,
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
                    <ambientLight intensity={0.7} />
                    <directionalLight
                        position={[15, 15, 8]}
                        intensity={1.2}
                        castShadow
                    />
                    <Container sensorData={sensorData} />
                    <OrbitControls
                        enableZoom={true}
                        minDistance={10}
                        maxDistance={30}
                        zoomSpeed={0.5}
                        minPolarAngle={Math.PI / 4}
                        maxPolarAngle={Math.PI / 2.2}
                        target={[0, 0, 0]}
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