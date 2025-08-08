import '../mainPages.css';
import React, { useEffect, useRef } from 'react';
import Projects from '../card/projects'; '../card/projects.jsx';
import GradientText from './GradientText'

export default function MainPage() {
    const canvasRef = useRef(null);

    const projects = [
        {
            name: "Project 1",
            description: "Description of project 1",
            image: "/9441a2366fb7d1c49523aa75430ab95c.jpg",
            gitLink: "https://github.com/user/project1"
        },
        {
            name: "Project 2",
            description: "Description of project 2",
            image: "/9441a2366fb7d1c49523aa75430ab95c.jpg",
            gitLink: "https://github.com/user/project2"
        },
        {
            name: "Project 3",
            description: "Description of project 3",
            image: "/9441a2366fb7d1c49523aa75430ab95c.jpg",
            gitLink: "https://github.com/user/project3"
        }
    ]



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
                <div className="body-container">
                    <h2>My projects</h2>
                    <div className="projects-list">
                        {projects.map((project, idx) => (
                            <Projects
                                key={idx}
                                name={project.name}
                                description={project.description}
                                image={project.image}
                                gitLink={project.gitLink}
                            />
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}