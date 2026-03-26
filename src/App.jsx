import React, { useState, useEffect } from "react";
import emailjs from '@emailjs/browser';
import "./App.css";

const App = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize EmailJS with your public key
  useEffect(() => {
    // Replace with your actual EmailJS public key
    emailjs.init("YOUR_PUBLIC_KEY");
  }, []);

  useEffect(() => {
    if (window.particlesJS) {
      try {
        window.particlesJS("particles-js", {
          particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: "#00f0ff" },
            shape: { type: "circle" },
            opacity: { value: 0.5, random: false },
            size: { value: 3, random: true },
            line_linked: { enable: true, distance: 150, color: "#00f0ff", opacity: 0.4, width: 1 },
            move: { enable: true, speed: 2, direction: "none", random: false, straight: false, out_mode: "out", bounce: false },
          },
          interactivity: {
            detect_on: "canvas",
            events: { onhover: { enable: true, mode: "grab" }, onclick: { enable: true, mode: "push" }, resize: true },
            modes: { grab: { distance: 140, line_linked: { opacity: 1 } }, push: { particles_nb: 4 } },
          },
          retina_detect: true,
        });
      } catch (e) {
        const particlesEl = document.getElementById("particles-js");
        if (particlesEl) particlesEl.style.display = "none";
      }
    }

    const cursorDot = document.querySelector(".cursor-dot");
    const cursorOutline = document.querySelector(".cursor-outline");
    if (cursorDot && cursorOutline) {
      const handleMouseMove = (e) => {
        cursorDot.style.opacity = "1";
        cursorOutline.style.opacity = "1";
        cursorDot.style.left = `${e.clientX}px`;
        cursorDot.style.top = `${e.clientY}px`;
        cursorOutline.animate({ left: `${e.clientX}px`, top: `${e.clientY}px` }, { duration: 500, fill: "forwards" });
      };
      window.addEventListener("mousemove", handleMouseMove);
      document.querySelectorAll("a, button").forEach((el) => {
        el.addEventListener("mouseover", () => cursorOutline.classList.add("hover"));
        el.addEventListener("mouseleave", () => cursorOutline.classList.remove("hover"));
      });
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) { entry.target.classList.add("show"); observer.unobserve(entry.target); }
        });
      },
      { threshold: 0.15 }
    );
    document.querySelectorAll(".hidden").forEach((el) => observer.observe(el));
    document.querySelectorAll(".hidden-load").forEach((el) => el.classList.add("show"));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const counters = document.querySelectorAll(".stat-number");
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target;
          const end = parseInt(target.getAttribute("data-target"));
          const suffix = target.getAttribute("data-suffix") || "";
          const duration = 2000;
          const step = end / (duration / 16);
          let current = 0;
          const timer = setInterval(() => {
            current += step;
            if (current >= end) { target.textContent = end + suffix; clearInterval(timer); }
            else { target.textContent = Math.floor(current) + suffix; }
          }, 16);
          counterObserver.unobserve(target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach((c) => counterObserver.observe(c));
    return () => counterObserver.disconnect();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Get form data
    const formData = new FormData(e.target);
    const formValues = {
      name: formData.get('name'),
      email: formData.get('email'),
      company: formData.get('company') || 'Not provided',
      service: formData.get('service') || 'Not selected',
      message: formData.get('message'),
    };

    // Prepare template parameters
    const templateParams = {
      to_name: "Chathura AI Team",
      from_name: formValues.name,
      from_email: formValues.email,
      company_name: formValues.company,
      service_interest: formValues.service,
      message: formValues.message,
      reply_to: formValues.email,
    };

    try {
      // Replace with your actual EmailJS service ID and template ID
      const serviceId = "YOUR_SERVICE_ID";
      const templateId = "YOUR_TEMPLATE_ID";
      
      const response = await emailjs.send(serviceId, templateId, templateParams);
      
      if (response.status === 200) {
        alert("Message sent successfully! Our team will be in touch within 24 hours.");
        e.target.reset();
      } else {
        throw new Error("Failed to send email");
      }
    } catch (error) {
      console.error("EmailJS Error:", error);
      alert("Failed to send message. Please try again later or contact us directly at hello@chathura.ai");
    } finally {
      setIsSubmitting(false);
    }
  };

  const services = [
    {
      icon: "fas fa-database",
      title: "AI Data Assistant",
      subtitle: "For Companies",
      desc: "Transform raw enterprise data into instant intelligence. Our AI Data Assistants let your team query databases, generate reports, and surface critical insights using plain English — no SQL or analyst needed. Real-time dashboards, anomaly detection, and predictive forecasting in one conversational interface.",
      img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
      tag: "Data Intelligence",
    },
    {
      icon: "fab fa-whatsapp",
      title: "WhatsApp AI Agent",
      subtitle: "For Businesses",
      desc: "Deploy a 24/7 AI-powered WhatsApp agent that handles lead qualification, order tracking, appointment booking, and customer FAQs — automatically. Built on the official WhatsApp Business API, our agents understand context, switch languages, and escalate to human reps only when it truly matters.",
      img: "https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=600&q=80",
      tag: "Conversational AI",
    },
    {
      icon: "fas fa-file-alt",
      title: "Document AI",
      subtitle: "Huge Opportunity",
      desc: "Unlock the intelligence buried in your contracts, invoices, reports, and compliance documents. Our Document AI extracts, classifies, and cross-references information at scale — reducing manual review time by up to 90%. From legal due diligence to medical records processing, we turn document chaos into structured data.",
      img: "https://images.unsplash.com/photo-1568667256549-094345857637?w=600&q=80",
      tag: "Document Processing",
    },
    {
      icon: "fas fa-project-diagram",
      title: "AI Workflow Automation",
      subtitle: "End-to-End Pipelines",
      desc: "Connect every tool in your stack into one intelligent, self-running workflow. We design AI-native pipelines that trigger actions, make decisions, and adapt to exceptions without human intervention. CRM updates, approval chains, data syncs, and cross-platform handoffs — fully automated and always audit-ready.",
      img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80",
      tag: "Workflow Automation",
    },
    {
      icon: "fas fa-chart-line",
      title: "Data & Analytics Automation",
      subtitle: "Real-Time Insights",
      desc: "Stop waiting for monthly reports. Our automated analytics pipelines continuously ingest, clean, model, and visualize your business data in real time. From ETL pipelines to AI-generated executive summaries, we turn data operations into a competitive advantage your rivals can't replicate overnight.",
      img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80",
      tag: "Analytics",
    },
    {
      icon: "fas fa-headset",
      title: "Customer Support Automation",
      subtitle: "Chat & Voice AI",
      desc: "Deliver instant, accurate, and empathetic support across every channel — chat, email, voice, and social. Our AI agents resolve Tier-1 and Tier-2 queries autonomously, maintain full conversation history, and hand off complex cases with complete context so customers never repeat themselves.",
      img: "https://images.unsplash.com/photo-1556745757-8d76bdb6984b?w=600&q=80",
      tag: "Support AI",
    },
    {
      icon: "fas fa-cogs",
      title: "Business Process Automation",
      subtitle: "Operations",
      desc: "Map, digitize, and automate the operational workflows that slow your business down. HR onboarding, procurement cycles, compliance checks, inventory management — our BPA solutions integrate with your existing systems and eliminate repetitive manual work, freeing your team for high-value decisions.",
      img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&q=80",
      tag: "BPA",
    },
    {
      icon: "fas fa-bullhorn",
      title: "Content & Marketing Automation",
      subtitle: "Scale Your Brand",
      desc: "Scale your content engine without scaling your team. We build AI-powered pipelines that research, draft, personalize, and distribute marketing content across SEO, email, social, and ads. Dynamic audience segmentation, A/B testing at scale, and performance-driven copy — all running on autopilot.",
      img: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=600&q=80",
      tag: "MarTech AI",
    },
    {
      icon: "fas fa-terminal",
      title: "Software + DevOps Agents",
      subtitle: "Ship Faster",
      desc: "Accelerate engineering velocity with AI agents that write, review, test, and deploy code. From automated PR reviews and CI/CD pipeline optimization to intelligent incident detection and self-healing infrastructure — our DevOps agents reduce deployment cycles so your engineers ship faster and sleep better.",
      img: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=600&q=80",
      tag: "DevOps AI",
    },
  ];

  return (
    <div className="app">
      <div id="particles-js"></div>
      <div className="cursor-dot"></div>
      <div className="cursor-outline"></div>

      {/* HEADER */}
      <header id="header">
        <nav className="container">
          <a href="#" className="logo">
            <span className="logo-main">Chathura</span>
            <span className="logo-dot">.</span>
            <span className="logo-sub">AI</span>
          </a>
          <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
            <li><a href="#hero" onClick={() => setMenuOpen(false)}>Home</a></li>
            <li><a href="#services" onClick={() => setMenuOpen(false)}>Solutions</a></li>
            <li><a href="#how" onClick={() => setMenuOpen(false)}>Process</a></li>
            <li><a href="#ethos" onClick={() => setMenuOpen(false)}>Why Us</a></li>
            <li><a href="#journey" onClick={() => setMenuOpen(false)}>Journey</a></li>
            <li><a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a></li>
          </ul>
          <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            <i className="fas fa-bars"></i>
          </div>
        </nav>
      </header>

      <main>
        {/* HERO */}
        <section id="hero">
          <div className="hero-bg-image"></div>
          <div className="hero-overlay"></div>
          <div className="hero-content container">
            <span className="hero-badge hidden-load">
              <i className="fas fa-bolt"></i> Next-Gen AI Solutions for Modern Business
            </span>
            <h1 className="hidden-load">
              We Build AI That<br />
              <span className="accent-text">Works For You</span>
            </h1>
            <p className="hidden-load">
              Intelligent agents, automation workflows, and data solutions that
              eliminate bottlenecks, scale operations, and give your business a
              measurable competitive edge — starting today.
            </p>
            <div className="hero-ctas hidden-load">
              <a href="#services" className="btn-primary">Explore Solutions</a>
              <a href="#contact" className="btn-secondary">Book a Free Demo</a>
            </div>
            <div className="hero-trust hidden-load">
              <span><i className="fas fa-check-circle"></i> No-code setup available</span>
              <span><i className="fas fa-check-circle"></i> Live in 7 days</span>
              <span><i className="fas fa-check-circle"></i> Enterprise security</span>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section id="stats" className="section-padding alternate-bg">
          <div className="container">
            <div className="stats-grid">
              <div className="stat-item hidden">
                <span className="stat-number" data-target="150" data-suffix="+">0+</span>
                <span className="stat-label">Businesses Automated</span>
              </div>
              <div className="stat-item hidden">
                <span className="stat-number" data-target="90" data-suffix="%">0%</span>
                <span className="stat-label">Reduction in Manual Work</span>
              </div>
              <div className="stat-item hidden">
                <span className="stat-number" data-target="7" data-suffix=" Days">0 Days</span>
                <span className="stat-label">Average Go-Live Time</span>
              </div>
              <div className="stat-item hidden">
                <span className="stat-number" data-target="24" data-suffix="/7">0/7</span>
                <span className="stat-label">AI Agents Running</span>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="container section-padding">
          <p className="section-pretitle hidden">What We Deliver</p>
          <h2 className="section-title hidden">Our AI Solutions</h2>
          <p className="section-subtitle hidden">
            From intelligent data assistants to fully autonomous DevOps agents —
            every solution is built to deliver ROI from day one.
          </p>
          <div className="services-hub">
            {services.map((svc, i) => (
              <div
                key={i}
                className="service-card hidden"
                data-animation={i % 2 === 0 ? "slide-in-left" : "slide-in-right"}
              >
                <div className="service-img-wrap">
                  <img src={svc.img} alt={svc.title} className="service-img" loading="lazy" />
                  <span className="service-tag">{svc.tag}</span>
                </div>
                <div className="service-body">
                  <i className={svc.icon}></i>
                  <h3>{svc.title}</h3>
                  <p className="service-subtitle-text">{svc.subtitle}</p>
                  <p>{svc.desc}</p>
                  <a href="#contact" className="service-cta">
                    Get Started <i className="fas fa-arrow-right"></i>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how" className="section-padding alternate-bg">
          <div className="container">
            <p className="section-pretitle hidden">Simple Process</p>
            <h2 className="section-title hidden">How We Work</h2>
            <div className="process-grid">
              {[
                { step: "01", icon: "fas fa-comments", title: "Discovery Call", desc: "We understand your business, pain points, and the specific workflows you want automated." },
                { step: "02", icon: "fas fa-drafting-compass", title: "Solution Design", desc: "Our AI architects design a custom solution tailored to your stack, team, and goals." },
                { step: "03", icon: "fas fa-rocket", title: "Build & Deploy", desc: "We build, test, and deploy your AI solution — typically live within 7 business days." },
                { step: "04", icon: "fas fa-chart-bar", title: "Monitor & Optimize", desc: "We continuously monitor performance, retrain models, and optimize for better results." },
              ].map((item, i) => (
                <div className="process-item hidden" key={i}>
                  <div className="process-step">{item.step}</div>
                  <i className={item.icon}></i>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ETHOS / WHY US */}
        <section id="ethos" className="section-padding">
          <div className="container">
            <p className="section-pretitle hidden">Why Choose Us</p>
            <h2 className="section-title hidden">The Chathura Advantage</h2>
            <div className="ethos-wrapper">
              <div className="ethos-image hidden">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
                  alt="Chathura team collaborating"
                />
                <div className="ethos-image-badge">
                  <i className="fas fa-award"></i>
                  <span>Trusted by 150+ Businesses</span>
                </div>
              </div>
              <div className="ethos-points">
                {[
                  { icon: "fas fa-rocket", title: "Deployment-Ready in Days", desc: "No 6-month roadmaps. We architect AI solutions that go live fast — with production-grade reliability and measurable ROI from week one." },
                  { icon: "fas fa-plug", title: "Integrates With What You Have", desc: "Our AI solutions plug directly into your existing stack — CRMs, ERPs, databases, and communication tools. Zero disruption. Maximum leverage." },
                  { icon: "fas fa-shield-alt", title: "Enterprise-Grade & Secure", desc: "Data privacy, role-based access, audit trails, and compliance built in from day one — not bolted on after." },
                  { icon: "fas fa-headset", title: "Dedicated Support Team", desc: "A dedicated success manager, 24/7 monitoring, and ongoing optimization ensures your AI keeps delivering value long after go-live." },
                ].map((item, i) => (
                  <div className="ethos-item hidden" key={i}>
                    <div className="ethos-icon-wrap"><i className={item.icon}></i></div>
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* JOURNEY */}
        <section id="journey" className="container section-padding">
          <p className="section-pretitle hidden">Our Story</p>
          <h2 className="section-title hidden">Our Journey</h2>
          <div className="timeline">
            {[
              { year: "2022", title: "The Foundation", desc: "Chathura was founded by a team of engineers and AI researchers with a single mission: make enterprise-grade AI automation accessible to businesses of every size." },
              { year: "2023", title: "First AI Deployments", desc: "Delivered our first Document AI and Customer Support Automation solutions to clients across fintech and healthcare, achieving over 80% reduction in manual processing time." },
              { year: "2024", title: "Scaling Intelligence", desc: "Launched our WhatsApp AI Agent platform and AI Workflow Automation suite, serving 150+ business clients across India, the Middle East, and Southeast Asia." },
              { year: "2025+", title: "The Agentic Era", desc: "Building the next generation of autonomous AI agents — systems that don't just automate tasks but make intelligent decisions, learn from outcomes, and evolve with your business." },
            ].map((item, i) => (
              <div className="timeline-item hidden" key={i}>
                <div className="timeline-content">
                  <span className="timeline-year">{item.year}</span>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="section-padding alternate-bg">
          <div className="container">
            <p className="section-pretitle hidden">Get In Touch</p>
            <h2 className="section-title hidden">Let's Build Something Intelligent</h2>
            <p className="section-subtitle hidden">
              Tell us your challenge. We'll design an AI solution for it — free consultation, no commitment.
            </p>
            <div className="contact-wrapper">
              <div className="contact-info hidden">
                <h3>Why talk to us?</h3>
                <ul className="contact-benefits">
                  <li><i className="fas fa-check"></i> Free 30-minute strategy call</li>
                  <li><i className="fas fa-check"></i> Custom solution blueprint at no cost</li>
                  <li><i className="fas fa-check"></i> ROI estimate before you commit</li>
                  <li><i className="fas fa-check"></i> No long-term contracts required</li>
                </ul>
                <div className="contact-details">
                  <p><i className="fas fa-envelope"></i> hello@chathura.ai</p>
                  <p><i className="fab fa-whatsapp"></i> +91 98765 43210</p>
                  <p><i className="fas fa-map-marker-alt"></i> Bengaluru, India</p>
                </div>
              </div>
              <form id="contact-form" className="hidden" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label>Your Name</label>
                    <input type="text" name="name" required placeholder="John Smith" />
                  </div>
                  <div className="form-group">
                    <label>Business Email</label>
                    <input type="email" name="email" required placeholder="john@company.com" />
                  </div>
                </div>
                <div className="form-group">
                  <label>Company Name</label>
                  <input type="text" name="company" placeholder="Your Company" />
                </div>
                <div className="form-group">
                  <label>Which solution interests you?</label>
                  <select name="service">
                    <option value="">Select a solution...</option>
                    <option>AI Data Assistant</option>
                    <option>WhatsApp AI Agent</option>
                    <option>Document AI</option>
                    <option>AI Workflow Automation</option>
                    <option>Data &amp; Analytics Automation</option>
                    <option>Customer Support Automation</option>
                    <option>Business Process Automation</option>
                    <option>Content &amp; Marketing Automation</option>
                    <option>Software + DevOps Agents</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Tell us about your challenge</label>
                  <textarea name="message" rows="4" required placeholder="Describe the problem you want to solve..."></textarea>
                </div>
                <button type="submit" className="btn-primary" disabled={isSubmitting}>
                  <i className="fas fa-paper-plane"></i> {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer>
        <div className="container footer-inner">
          <div className="footer-brand">
            <div className="footer-logo">
              <span className="logo-main">Chathura</span>
              <span className="logo-dot">.</span>
              <span className="logo-sub">AI</span>
            </div>
            <p>Intelligent Automation for the Modern Business.</p>
          </div>
          <div className="footer-links">
            <a href="#services">Solutions</a>
            <a href="#ethos">Why Us</a>
            <a href="#journey">Journey</a>
            <a href="#contact">Contact</a>
          </div>
          <div className="footer-socials">
            <a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin"></i></a>
            <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
            <a href="#" aria-label="WhatsApp"><i className="fab fa-whatsapp"></i></a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 Chathura AI. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;