import { useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sparkles, Html } from '@react-three/drei';
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
  const downXY = useRef<[number, number] | null>(null);
  const wasDragged = useRef(false);

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
        scale={3.6}
        size={hovered || active ? 12 : 8}
        speed={0.45}
        color={color}
        opacity={0.92}
      />
      {/* Glowing core — large enough to be unambiguously clickable on
          desktop without erasing the "star, not planet" feel. */}
      <mesh>
        <sphereGeometry args={[0.45, 24, 24]} />
        <meshBasicMaterial color={color} toneMapped={false} />
      </mesh>
      {/* Soft halo — gives the core depth and visual gravity */}
      <mesh>
        <sphereGeometry args={[0.85, 24, 24]} />
        <meshBasicMaterial color={color} transparent opacity={0.14} toneMapped={false} />
      </mesh>
      {/* Invisible click target — also runs the drag/click discrimination */}
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
        onPointerDown={(e) => {
          downXY.current = [e.clientX, e.clientY];
          wasDragged.current = false;
        }}
        onPointerMove={(e) => {
          if (!downXY.current) return;
          const [x, y] = downXY.current;
          if (Math.hypot(e.clientX - x, e.clientY - y) > 6) {
            wasDragged.current = true;
          }
        }}
        onPointerUp={(e) => {
          // Only count as a click if the user didn't move the pointer
          // appreciably while it was on this constellation. The earlier
          // global OrbitControls drag flag was too aggressive — every
          // pointerdown bubbles to OrbitControls, so the global flag
          // was set even on a stationary tap, blocking every navigation.
          const dragged = wasDragged.current;
          downXY.current = null;
          wasDragged.current = false;
          if (dragged) return;
          e.stopPropagation();
          onSelect(c);
        }}
      >
        <sphereGeometry args={[2.2, 12, 12]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
      {/* HTML overlay label — lives outside the WebGL depth buffer, so it can
          NEVER be occluded by the constellation core, regardless of orbit
          angle. distanceFactor keeps it 3D-scaled with the scene. */}
      {showLabels && (
        <Html
          position={[0, 1, 0]}
          center
          distanceFactor={6}
          zIndexRange={[100, 0]}
          pointerEvents="none"
        >
          <span
            style={{
              color: hovered || active ? color : '#f5f1e8',
              fontWeight: 600,
              fontSize: hovered || active ? '1.25rem' : '0.95rem',
              letterSpacing: '-0.015em',
              opacity: hovered || active ? 1 : 0.85,
              whiteSpace: 'nowrap',
              textShadow:
                '0 1px 3px rgba(10,14,39,0.98), 0 0 12px rgba(10,14,39,0.9)',
              fontFamily:
                "'Inter Variable', system-ui, -apple-system, sans-serif",
              transition: 'font-size 180ms ease, color 180ms ease, opacity 180ms ease',
              userSelect: 'none',
              pointerEvents: 'none',
            }}
          >
            {c.shortName}
          </span>
        </Html>
      )}
    </group>
  );
}
