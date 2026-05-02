import { type RefObject, useRef, useMemo, useState } from 'react';
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
  /** Set true while the user is dragging the camera. Pointer-up that
   *  arrives during a drag is treated as the end of the drag, not a
   *  navigation click. */
  isDraggingRef: RefObject<boolean>;
}

export default function ConstellationNode({
  constellation: c,
  radius,
  onSelect,
  onHover,
  active,
  showLabels,
  reducedSparkles,
  isDraggingRef,
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
          // Only count as a click if (a) the user didn't drag this pointer,
          // and (b) the OrbitControls aren't reporting a global drag from
          // a different starting target.
          const localDrag = wasDragged.current;
          downXY.current = null;
          wasDragged.current = false;
          if (localDrag || isDraggingRef.current) return;
          e.stopPropagation();
          onSelect(c);
        }}
      >
        <sphereGeometry args={[1.6, 12, 12]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
      {/* HTML overlay label — lives outside the WebGL depth buffer, so it can
          NEVER be occluded by the constellation core, regardless of orbit
          angle. distanceFactor keeps it 3D-scaled with the scene. */}
      {showLabels && (
        <Html
          position={[0, 0.7, 0]}
          center
          distanceFactor={9}
          zIndexRange={[100, 0]}
          pointerEvents="none"
        >
          <span
            style={{
              color: hovered || active ? color : '#f5f1e8',
              fontWeight: 600,
              fontSize: hovered || active ? '0.95rem' : '0.7rem',
              letterSpacing: '-0.01em',
              opacity: hovered || active ? 1 : 0.78,
              whiteSpace: 'nowrap',
              textShadow:
                '0 1px 2px rgba(10,14,39,0.95), 0 0 8px rgba(10,14,39,0.85)',
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
