import { useEffect, useState } from "react";

const LoadingScreen = ({ onLoaded }: { onLoaded: () => void }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
      onLoaded();
    }, 1000);

    return () => clearTimeout(timeout);
  }, [onLoaded]);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gray-900 text-white">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 64 64"
        height="80"
        width="80"
        className="animate-stroke"
      >
        <defs>
          <linearGradient
            id="animatedGradient"
            x1="0%"
            y1="50%"
            x2="100%"
            y2="50%"
          >
            <stop offset="0%" stopColor="#973BED">
              <animate
                attributeName="stop-color"
                values="#973BED; #007CFF; #00FFA3; #FFB800; #973BED"
                dur="4s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="50%" stopColor="#007CFF">
              <animate
                attributeName="stop-color"
                values="#007CFF; #00FFA3; #FFB800; #973BED; #007CFF"
                dur="4s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="100%" stopColor="#00FFA3">
              <animate
                attributeName="stop-color"
                values="#00FFA3; #FFB800; #973BED; #007CFF; #00FFA3"
                dur="4s"
                repeatCount="indefinite"
              />
            </stop>
          </linearGradient>
        </defs>

        <path
          fill="transparent" /* Evita que el fondo sea negro */
          strokeLinejoin="round"
          strokeLinecap="round"
          strokeWidth="8"
          stroke="url(#animatedGradient)"
          d="M 54.722656,3.9726563 A 2.0002,2.0002 0 0 0 54.941406,4 h 5.007813 C 58.955121,17.046124 49.099667,27.677057 36.121094,29.580078 a 2.0002,2.0002 0 0 0 -1.708985,1.978516 V 60 H 29.587891 V 31.558594 A 2.0002,2.0002 0 0 0 27.878906,29.580078 C 14.900333,27.677057 5.0448787,17.046124 4.0507812,4 H 9.28125 c 1.231666,11.63657 10.984383,20.554048 22.6875,20.734375 a 2.0002,2.0002 0 0 0 0.02344,0 c 11.806958,0.04283 21.70649,-9.003371 22.730469,-20.7617187 z"
          strokeDasharray="240"
          strokeDashoffset="240"
          className="animate-path"
        />
      </svg>

      {/* Estilos de animación */}
      <style jsx>{`
        .animate-path {
          opacity: 0;
          animation: fadeIn 0.3s ease-in forwards,
            draw 5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes draw {
          from {
            stroke-dashoffset: 360;
          }
          to {
            stroke-dashoffset: 20;
          }
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;
