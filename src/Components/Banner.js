import React, { useCallback } from 'react';
import { Container, Row, Button } from 'react-bootstrap';
import { useTheme } from '../context/ThemeContext';
import Profile from '../assets/profile.jpeg';
import '../styles/css/Components/Banner.min.css';
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim"; // Import the slim package

export default function Banner() {
  const { theme } = useTheme();

  const particlesInit = useCallback(async engine => {
    console.log(engine);
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async container => {
    await console.log(container);
  }, []);

  const isDark = theme === 'dark';
  const particleColors = isDark 
    ? ["#38bdf8", "#818cf8", "#c084fc"] 
    : ["#4f46e5", "#0284c7", "#9333ea"];
  const linkColor = isDark ? "#818cf8" : "#4f46e5";

  return (
    <>
      <section className='hero_banner d-flex justify-content-center align-items-center'>
        <Particles
          id="tsparticles"
          init={particlesInit}
          loaded={particlesLoaded}
          options={{
            background: {
              color: {
                value: "transparent",
              },
            },
            fullScreen: {
              enable: false,
              zIndex: -1
            },
            fpsLimit: 240,
            interactivity: {
              events: {
                onClick: {
                  enable: true,
                  mode: "push",
                },
                onHover: {
                  enable: true,
                  mode: "repulse",
                },
              },
              modes: {
                push: {
                  quantity: 4,
                },
                repulse: {
                  distance: 200,
                  duration: 0.4,
                },
              },
            },
            particles: {
              color: {
                value: particleColors,
              },
              links: {
                color: linkColor,
                distance: 140,
                enable: true,
                opacity: isDark ? 0.25 : 0.35,
                width: 1,
              },
              move: {
                direction: "none",
                enable: true,
                outModes: {
                  default: "bounce",
                },
                random: true,
                speed: 1.5,
                straight: false,
              },
              number: {
                density: {
                  enable: true,
                },
                value: 65,
              },
              opacity: {
                value: { min: 0.2, max: 0.45 },
              },
              shape: {
                type: "circle",
              },
              size: {
                value: { min: 1, max: 3.5 },
              },
            },
            detectRetina: true,
          }}
        />
        <Container>
          <div className='hero_content'>
            <Row>
              <div className='hero_image'>
                <img src={Profile} alt="Indranil Roy" width={160} height={160} />
              </div>
            </Row>
            <Row>
              <h1 className="gradient-text">Hi, I'm Indranil</h1>
              <h2>Full-Stack Developer | Drupal Specialist | Cloud & AI Enthusiast</h2>
              <p>
                I build scalable, high-performance web applications, combining a deep passion for backend engineering, cloud architecture, and modern system design with a commitment to client success. Over the past four years, I have specialized in bridging the gap between complex technical requirements and intuitive, business-driven solutions.
              </p>
              <div className='banner_btn'>
                <Button variant="primary" size="lg" className="gradient-btn-primary" href="#expertise">
                  View My Work
                </Button>
                <Button variant="secondary" size="lg" className="gradient-btn-secondary" href="#contact">
                  Get in Touch
                </Button>
              </div>
            </Row>
          </div>
        </Container>
      </section>
    </>
  );
}