import React, { useCallback } from 'react';
import { Container, Row, Button } from 'react-bootstrap';
import Profile from '../assets/profile.jpg';
import '../styles/css/Components/Banner.min.css';
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim"; // Import the slim package

export default function Banner() {
  const particlesInit = useCallback(async engine => {
    console.log(engine);
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async container => {
    await console.log(container);
  }, []);

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
                value: "#ffffff",
              },
              links: {
                color: "#ffffff",
                distance: 150,
                enable: true,
                opacity: 0.5,
                width: 1,
              },
              move: {
                direction: "none",
                enable: true,
                outModes: {
                  default: "bounce",
                },
                random: false,
                speed: 2,
                straight: false,
              },
              number: {
                density: {
                  enable: true,
                },
                value: 80,
              },
              opacity: {
                value: 0.5,
              },
              shape: {
                type: "triangle",
                options: {
                  triangle: {
                    fill: true,
                    close: true
                  }
                }
              },
              size: {
                value: { min: 1, max: 5 },
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
              <h1 className="gradient-text">Hi, I'm Indranil Roy</h1>
              <h2>Backend Developer at Innoraft | Full-Stack Software Engineer | Technology Leader</h2>
              <p>
                With over 3 years of experience in full-stack software engineering, I specialize in designing and delivering exceptional solutions that prioritize quality, maintainability, and scalability. Currently a part of the Ads Central UX team at Google in Bengaluru, I am passionate about creating transformative user experiences and driving innovation in every project I undertake.
              </p>
              <div className='banner_btn'>
                <Button variant="primary" size="lg" className="gradient-btn-primary" href="#expertise">
                  View My Work
                </Button>
                <Button variant="secondary" size="lg" className="gradient-btn-secondary" href="#contact">
                  Contact Me
                </Button>
              </div>
            </Row>
          </div>
        </Container>
      </section>
    </>
  );
}