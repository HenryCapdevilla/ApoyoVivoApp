import { useEffect, useRef } from "react";

interface Sphere {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  collisionCount: number; // Contador de colisiones
}

interface GradientSphereProps {
  spheres: Sphere[];
  setSpheres: React.Dispatch<React.SetStateAction<Sphere[]>>;
}

const Gravity = 0.9;
const Friction = 0.98;
const Restitution = 0.5;
const Damping = 0.4;
const SphereSize = 42;
const CollisionThreshold = 0.5;
const EnergyLossFactor = 0.5; // Reduce la velocidad en un 20% por colisión
const MinVelocityThreshold = 0.5; // Si la velocidad es menor que esto, se considera en reposo


const GradientSphere: React.FC<GradientSphereProps> = ({
  spheres,
  setSpheres,
}) => {
  const requestRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);

  useEffect(() => {
    const container = document.getElementById("sphere-container");
    if (!container) return;

    const containerRect = container.getBoundingClientRect();

    const updatePositions = (time: number) => {
      if (lastTimeRef.current === null) {
        lastTimeRef.current = time;
        requestRef.current = requestAnimationFrame(updatePositions);
        return;
      }

      const deltaTime = (time - lastTimeRef.current) / 16;
      lastTimeRef.current = time;

      setSpheres((prevSpheres) => {
        let newSpheres = prevSpheres.map((sphere) => {
          let newX = sphere.x + sphere.vx * deltaTime;
          let newY = sphere.y + sphere.vy * deltaTime;
          let newVx = sphere.vx;
          let newVy = sphere.vy + Gravity * deltaTime;

          if (newX <= 0 || newX + SphereSize >= containerRect.width) {
            newVx = -newVx * Restitution * Damping;
            newX = Math.max(
              0,
              Math.min(newX, containerRect.width - SphereSize)
            );
          }
          if (newY + SphereSize >= containerRect.height) {
            newVy = -newVy * Restitution * Damping;
            newY = containerRect.height - SphereSize;
          }

          return {
            ...sphere,
            x: newX,
            y: newY,
            vx: newVx * Friction,
            vy: newVy * Friction,
          };
        });

        const corrections: { [id: number]: { dx: number; dy: number } } = {};

        for (const sphere of newSpheres) {
          corrections[sphere.id] = { dx: 0, dy: 0 };
        }

        for (let i = 0; i < newSpheres.length; i++) {
            for (let j = i + 1; j < newSpheres.length; j++) {
              const dx = newSpheres[j].x - newSpheres[i].x;
              const dy = newSpheres[j].y - newSpheres[i].y;
              const distance = Math.sqrt(dx * dx + dy * dy);
          
              if (distance < SphereSize) {
                const nx = dx / distance;
                const ny = dy / distance;
                const overlap = SphereSize - distance;
          
                if (overlap > CollisionThreshold) {
                  corrections[newSpheres[i].id].dx -= (overlap / 2) * nx;
                  corrections[newSpheres[i].id].dy -= (overlap / 2) * ny;
                  corrections[newSpheres[j].id].dx += (overlap / 2) * nx;
                  corrections[newSpheres[j].id].dy += (overlap / 2) * ny;
                }
          
                // Velocidades antes de la colisión
                const vi = newSpheres[i].vx * nx + newSpheres[i].vy * ny;
                const vj = newSpheres[j].vx * nx + newSpheres[j].vy * ny;
          
                // Aplicar pérdida de energía progresiva
                newSpheres[i].vx *= EnergyLossFactor;
                newSpheres[i].vy *= EnergyLossFactor;
                newSpheres[j].vx *= EnergyLossFactor;
                newSpheres[j].vy *= EnergyLossFactor;
          
                // Reducir aún más la velocidad vertical para evitar "levitación"
                newSpheres[i].vy *= 0.9;
                newSpheres[j].vy *= 0.9;
          
                // Si la velocidad cae por debajo del umbral, se considera en reposo
                if (Math.abs(newSpheres[i].vx) < MinVelocityThreshold && Math.abs(newSpheres[i].vy) < MinVelocityThreshold) {
                  newSpheres[i].vx = 0;
                  newSpheres[i].vy = 0;
                }
                if (Math.abs(newSpheres[j].vx) < MinVelocityThreshold && Math.abs(newSpheres[j].vy) < MinVelocityThreshold) {
                  newSpheres[j].vx = 0;
                  newSpheres[j].vy = 0;
                }
          
                // Si una esfera en reposo es golpeada con suficiente fuerza, se reactiva
                const impactForce = Math.abs(vi - vj);
                if (impactForce > MinVelocityThreshold) {
                  if (newSpheres[i].vx === 0 && newSpheres[i].vy === 0) {
                    newSpheres[i].vx = vi * 0.5;
                    newSpheres[i].vy = vj * 0.5;
                  }
                  if (newSpheres[j].vx === 0 && newSpheres[j].vy === 0) {
                    newSpheres[j].vx = vj * 0.5;
                    newSpheres[j].vy = vi * 0.5;
                  }
                }
              }
            }
          }          

        newSpheres = newSpheres.map((sphere) => {
          return {
            ...sphere,
            x: sphere.x + corrections[sphere.id].dx,
            y: sphere.y + corrections[sphere.id].dy,
          };
        });

        return newSpheres;
      });

      requestRef.current = requestAnimationFrame(updatePositions);
    };

    requestRef.current = requestAnimationFrame(updatePositions);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <>
      {spheres.map((sphere) => (
        <div
          key={sphere.id}
          className="absolute w-10 h-10 rounded-full bg-gradient-to-r from-pink-400 to-purple-700"
          style={{ left: `${sphere.x}px`, top: `${sphere.y}px` }}
        />
      ))}
    </>
  );
};

export default GradientSphere;
