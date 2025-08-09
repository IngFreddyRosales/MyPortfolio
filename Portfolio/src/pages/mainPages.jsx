import '../mainPages.css';
import React, { useEffect, useRef } from 'react';
import GradientText from './GradientText'
import ChromaGrid from './ChromaGrid'

export default function MainPage() {
    const canvasRef = useRef(null);

    const items = [
            {
      image: "Captura de pantalla 2025-08-07 224023.png",
      title: "Pokemon Advance",
      description: "Pokemon management system with option to do teams",
      borderColor: "#4F46E5",
      gradient: "linear-gradient(145deg, #4F46E5, #000)",
      url: "https://github.com/IngFreddyRosales?tab=repositories",
      languageIcon: [ "/icons/javascript_original_logo_icon_146455.png", "/icons/react_original_logo_icon_146374.png"]
    },
    {
      image: "Captura de pantalla 2025-08-07 234331.png",
      title: "Management-Redes-vlsm",
      description: "a network management system using the VLSM technique",
      borderColor: "#CC66DA",
      gradient: "linear-gradient(210deg,#CC66DA, #000)",
      url: "https://github.com/IngFreddyRosales?tab=repositories",
    },
    {
      image: "https://i.pravatar.cc/300?img=3",
      title: "Morgan Blake",
      description: "UI/UX Designer",
      handle: "@morganblake",
      borderColor: "#9929EA",
      gradient: "linear-gradient(165deg, #9929EA, #000)",
      url: "https://dribbble.com/",
    },
    {
      image: "https://i.pravatar.cc/300?img=16",
      title: "Casey Park",
      description: "Data Scientist",
      handle: "@caseypark",
      borderColor: "#4169E1",
      gradient: "linear-gradient(195deg, #4169E1, #000)",
      url: "https://kaggle.com/",
    }

    ];



    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        const colors = ['#9929EA', '#CC66DA', '#4169E1'];
        const lines = [];

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        // Crear líneas iniciales (más centradas)
        for (let i = 0; i < 20; i++) {
            lines.push({
                x: canvas.width * 0.3 + Math.random() * canvas.width * 0.4,
                y: canvas.height * 0.2 + Math.random() * canvas.height * 0.6,
                length: 150 + Math.random() * 150,
                speed: 0.5 + Math.random() * 1,
                angle: (3 * Math.PI) / 4,
                color: colors[Math.floor(Math.random() * colors.length)],
                width: 2 + Math.random() * 2,
                glow: 10 + Math.random() * 20,
            });
        }

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.globalAlpha = 1;
            ctx.fillStyle = '#000000';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            lines.forEach(line => {
                ctx.save();
                ctx.strokeStyle = line.color;
                ctx.shadowColor = line.color;
                ctx.shadowBlur = line.glow;
                ctx.lineWidth = line.width;
                ctx.beginPath();
                ctx.moveTo(line.x, line.y);
                ctx.lineTo(
                    line.x + Math.cos(line.angle) * line.length,
                    line.y + Math.sin(line.angle) * line.length
                );
                ctx.stroke();
                ctx.restore();

                // Mover la línea
                line.x += Math.cos(line.angle) * line.speed;
                line.y += Math.sin(line.angle) * line.speed;

                // Reiniciar si sale de pantalla
                if (
                    line.x < -line.length || line.y > canvas.height + line.length
                ) {
                    line.x = canvas.width * 0.3 + Math.random() * canvas.width * 0.4;
                    line.y = -line.length;
                }
            });

            animationFrameId = requestAnimationFrame(draw);
        }

        draw();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div className="main-container">
            <canvas ref={canvasRef} className="bg-canvas"></canvas>
            <header>
                <GradientText
                    colors={["#9929EA", "#CC66DA", "#4169E1"]}
                    animationSpeed={3}
                    showBorder={false}
                    className="custom-class"
                >
                    Hi, Welcome to my Portfolio
                </GradientText>
            </header>
            <main className="card-project">
                <div style={{ height: '900px', position: 'relative' }}>
                    <ChromaGrid
                        items={items}
                        radius={300}
                        damping={0.45}
                        fadeOut={0.6}
                        ease="power3.out"
                    />
                </div>
            </main>
        </div>
    );
}