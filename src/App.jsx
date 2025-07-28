import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  // State for mobile menu
  const [menuOpen, setMenuOpen] = useState(false);

  // Initialize particles and cursor effects
  useEffect(() => {
    // Load particles.js if available
    if (window.particlesJS) {
      try {
        window.particlesJS("particles-js", {
          particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: "#00f0ff" },
            shape: { type: "circle" },
            opacity: { value: 0.5, random: false },
            size: { value: 3, random: true },
            line_linked: {
              enable: true,
              distance: 150,
              color: "#00f0ff",
              opacity: 0.4,
              width: 1,
            },
            move: {
              enable: true,
              speed: 2,
              direction: "none",
              random: false,
              straight: false,
              out_mode: "out",
              bounce: false,
            },
          },
          interactivity: {
            detect_on: "canvas",
            events: {
              onhover: { enable: true, mode: "grab" },
              onclick: { enable: true, mode: "push" },
              resize: true,
            },
            modes: {
              grab: { distance: 140, line_linked: { opacity: 1 } },
              push: { particles_nb: 4 },
            },
          },
          retina_detect: true,
        });
      } catch (e) {
        console.error("Particles.js failed to load:", e);
        const particlesEl = document.getElementById("particles-js");
        if (particlesEl) particlesEl.style.display = "none";
      }
    }

    // Custom cursor effect
    const cursorDot = document.querySelector(".cursor-dot");
    const cursorOutline = document.querySelector(".cursor-outline");

    if (cursorDot && cursorOutline) {
      const handleMouseMove = (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        cursorDot.style.opacity = "1";
        cursorOutline.style.opacity = "1";

        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        cursorOutline.animate(
          {
            left: `${posX}px`,
            top: `${posY}px`,
          },
          { duration: 500, fill: "forwards" }
        );
      };

      window.addEventListener("mousemove", handleMouseMove);

      // Add hover effect to cursor
      document.querySelectorAll("a, button").forEach((el) => {
        el.addEventListener("mouseover", () =>
          cursorOutline.classList.add("hover")
        );
        el.addEventListener("mouseleave", () =>
          cursorOutline.classList.remove("hover")
        );
      });

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
      };
    }
  }, []);

  // Scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    document.querySelectorAll(".hidden").forEach((el) => observer.observe(el));
    document
      .querySelectorAll(".hidden-load")
      .forEach((el) => el.classList.add("show"));

    return () => {
      observer.disconnect();
    };
  }, []);

  // Contact form handler
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Transmission successful! We have received your data packet.");
    e.target.reset();
  };

  return (
    <div className="app">
      {/* Animated Background Container */}
      <div id="particles-js"></div>

      {/* Custom Cursor */}
      <div className="cursor-dot"></div>
      <div className="cursor-outline"></div>

      {/* Header & Navigation */}
      <header id="header">
        <nav className="container">
          <a href="#" className="logo">
            Chitra account
          </a>
          <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
            <li>
              <a href="#hero" onClick={() => setMenuOpen(false)}>
                Home
              </a>
            </li>
            <li>
              <a href="#services" onClick={() => setMenuOpen(false)}>
                Services
              </a>
            </li>
            <li>
              <a href="#ethos" onClick={() => setMenuOpen(false)}>
                Why Us
              </a>
            </li>
            <li>
              <a href="#journey" onClick={() => setMenuOpen(false)}>
                Our Journey
              </a>
            </li>
            <li>
              <a href="#contact" onClick={() => setMenuOpen(false)}>
                Contact
              </a>
            </li>
          </ul>
          <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            <i className="fas fa-bars"></i>
          </div>
        </nav>
      </header>

      <main>
        {/* Hero Section */}
        <section id="hero">
          <div className="hero-content container">
            <h1 className="hidden-load">Forging the Digital Frontier</h1>
            <p className="hidden-load">
              We engineer bespoke technology solutions that connect, automate,
              and accelerate your vision.
            </p>
            <a href="#contact" className="btn-primary hidden-load">
              Initiate Contact
            </a>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="container section-padding">
          <h2 className="section-title hidden">Our Core Services</h2>
          <div className="services-hub">
            <div className="service-card hidden" data-animation="slide-in-left">
              <i className="fas fa-brain"></i>
              <h3>AI Integration</h3>
              <p>Unlock intelligent automation and data-driven insights.</p>
            </div>
            <div
              className="service-card hidden"
              data-animation="slide-in-right"
            >
              <i className="fas fa-cubes"></i>
              <h3>Decentralized Apps</h3>
              <p>Build secure, transparent applications on the blockchain.</p>
            </div>
            <div className="service-card hidden" data-animation="slide-in-left">
              <i className="fas fa-cloud-upload-alt"></i>
              <h3>Cloud Architecture</h3>
              <p>Design scalable, resilient infrastructure for the future.</p>
            </div>
            <div
              className="service-card hidden"
              data-animation="slide-in-right"
            >
              <i className="fas fa-shield-virus"></i>
              <h3>Cybersecurity</h3>
              <p>Fortify your digital assets against evolving threats.</p>
            </div>
          </div>
        </section>

        {/* Ethos/Why Us Section */}
        <section id="ethos" className="section-padding alternate-bg">
          <div className="container">
            <h2 className="section-title hidden">The Chitra account Ethos</h2>
            <div className="ethos-grid">
              <div className="ethos-item hidden">
                <i className="fas fa-lightbulb"></i>
                <h3>Radical Innovation</h3>
                <p>
                  We challenge conventions and explore uncharted technological
                  territories to find the best solution.
                </p>
              </div>
              <div className="ethos-item hidden">
                <i className="fas fa-handshake"></i>
                <h3>Deep Collaboration</h3>
                <p>
                  Your vision is our blueprint. We work as an extension of your
                  team to ensure success.
                </p>
              </div>
              <div className="ethos-item hidden">
                <i className="fas fa-check-double"></i>
                <h3>Uncompromising Quality</h3>
                <p>
                  From code to deployment, we maintain the highest standards of
                  quality and security.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Journey/Timeline Section */}
        <section id="journey" className="container section-padding">
          <h2 className="section-title hidden">Our Journey</h2>
          <div className="timeline">
            <div className="timeline-item hidden">
              <div className="timeline-content">
                <h3>2022 - The Spark</h3>
                <p>
                  Chitra account was conceptualized by a small group of
                  passionate developers aiming to solve complex problems with
                  elegant code.
                </p>
              </div>
            </div>
            <div className="timeline-item hidden">
              <div className="timeline-content">
                <h3>2023 - First Forge</h3>
                <p>
                  Launched our first major project, a decentralized finance
                  platform, receiving industry acclaim for its security and
                  innovation.
                </p>
              </div>
            </div>
            <div className="timeline-item hidden">
              <div className="timeline-content">
                <h3>2024 - Expansion</h3>
                <p>
                  Expanded our service offerings into AI and advanced
                  cybersecurity, growing our team of experts and our global
                  client base.
                </p>
              </div>
            </div>
            <div className="timeline-item hidden">
              <div className="timeline-content">
                <h3>Future - The Horizon</h3>
                <p>
                  Continuously pushing the boundaries of what's possible,
                  exploring quantum computing and next-gen web technologies.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="container section-padding">
          <h2 className="section-title hidden">Establish a Connection</h2>
          <form id="contact-form" className="hidden" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                id="name"
                name="name"
                required
                placeholder="Your Alias // Name"
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="Your Comms-Link // Email"
              />
            </div>
            <div className="form-group">
              <textarea
                id="message"
                name="message"
                rows="5"
                required
                placeholder="Your Data Packet // Message"
              ></textarea>
            </div>
            <button type="submit" className="btn-primary">
              Transmit Message
            </button>
          </form>
        </section>
      </main>

      {/* Footer */}
      <footer>
        <div className="container">
          <p>
            © 2024 Chitra account. All Rights Reserved. // Forging the Future.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
