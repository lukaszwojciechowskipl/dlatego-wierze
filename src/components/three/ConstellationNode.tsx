import { useMemo, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sparkles, Billboard, Text } from '@react-three/drei';
import { Group, Vector3 } from 'three';
import type { Constellation } from '@/lib/constants';

interface Props {
  constellation: Constellation;
  radius: number;
  onSelect: (c: Constellation) => void;
  onHover: (c: Constellation | null) => void;
  active: boolean;
  showLabels: boolean;
  reducedSparkles: boolean;
}

/**
 * One constellation in the galaxy: a hover-reactive group of sparkles
 * around a transparent click target, plus an always-billboarded label that
 * scales up on hover.
 */
export default function ConstellationNode({
  constellation: c,
  radius,
  onSelect,
  onHover,
  active,
  showLabels,
  reducedSparkles,
}: Props) {
  const groupRef = useRef<Group>(null);
  const [hovered, setHovered] = useState(false);
  const targetScale = useRef(1);

  const position = useMemo<Vector3>(
    () => new Vector3(c.position[0] * radius, c.position[1] * radius, c.position[2] * radius),
    [c.position, radius],
  );

  const color = `hsl(${c.hue}, 70%, 65%)`;
  const sparkleCount = reducedSparkles ? Math.max(8, Math.floor(c.starCount / 4)) : c.starCount;

  useFrame((_, delta) => {
    targetScale.current = hovered || active ? 1.35 : 1;
    if (groupRef.current) {
      const s = groupRef.current.scale.x;
      const next = s + (targetScale.current - s) * Math.min(1, delta * 6);
      groupRef.current.scale.setScalar(next);
    }
  });

  return (
    <group ref={groupRef} position={position}>
      <Sparkles
        count={sparkleCount}
        scale={2.4}
        size={hovered || active ? 6 : 4}
        speed={0.45}
        color={color}
        opacity={0.85}
      />
      {/* Brighter core */}
      <mesh>
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshBasicMaterial color={color} toneMapped={false} />
      </mesh>
      {/* Invisible click target */}
      <mesh
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          onHover(c);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setHovered(false);
          onHover(null);
          document.body.style.cursor = '';
        }}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(c);
        }}
      >
        <sphereGeometry args={[1.6, 12, 12]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
      {showLabels && (
        <Billboard position={[0, 1.1, 0]}>
          <Text
            fontSize={hovered || active ? 0.42 : 0.32}
            color={hovered || active ? color : 'white'}
            anchorX="center"
            anchorY="bottom"
            outlineWidth={0.018}
            outlineColor="#0a0e27"
            fillOpacity={hovered || active ? 1 : 0.75}
          >
            {c.shortName}
          </Text>
        </Billboard>
      )}
    </group>
  );
}
