import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Landingpage.css';

const Home = () => {
  const featureRefs = useRef([]);
  const testimonialRefs = useRef([]);
  const navigate = useNavigate();
const userTexts = [
  "Alice loves this app!",
  "Bob finds this app very useful.",
  "Carol thinks it's the best blogging tool.",
  "Dave says it helped him a lot.",
  "Eve recommends this app for writers."
];
  const features = [
    {
      image: "https://tse4.mm.bing.net/th?id=OIP.iXTIEV4D5RsuRU1AaWo1yAHaHa&pid=Api&P=0&h=180",
      title: "Write & Share",
      description: "Create engaging blog posts and share your thoughts with the world."
    },
    {
      image: "/images/editing-tools.png",
      title: "Rich Text Editor",
      description: "Write beautifully formatted content using our intuitive editor."
    },
    {
      image: "/images/analytics.png",
      title: "Track Engagement",
      description: "View stats and track how your blogs are performing over time."
    },
    {
      image: "/images/community.png",
      title: "Connect & Grow",
      description: "Engage with readers, receive feedback, and build your audience."
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          }
        });
      },
      { threshold: 0.1 }
    );

    [...featureRefs.current, ...testimonialRefs.current].forEach(el => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleStartJourney = () => {
    const token = localStorage.getItem('auth-token');
    if (token) {
      navigate('/create-blog'); // user is logged in
    } else {
      navigate('/signup'); // user not logged in
    }
  };

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Transform Your Life</h1>
          <p className="hero-subtitle">Join the Blogify Club Now.</p>
          <button onClick={handleStartJourney} className="hero-cta" aria-label="Start your journey">
            Start Your Journey
          </button>
        </div>
      </section>

      <section className="features">
        <h2 className="section-title">Why Choose Us?</h2>
        <div className="features-grid">
          {features.map((item, index) => (
            <div
              ref={el => featureRefs.current[index] = el}
              key={index}
              className="feature-card"
            >
              <div className="feature-icon">{item.icon}</div>
              <h3 className="feature-title">{item.title}</h3>
              <p className="feature-description">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="testimonials">
        <h2 className="section-title">What Our Users Say</h2>
        <div className="testimonial-cards">
          {["This app changed my life!", "I’ve never felt more motivated to work like this on any platform.", "The Features are insane"].map((text, index) => (
          <div
  ref={el => testimonialRefs.current[index] = el}
  key={index}
  className="testimonial-card"
>
  <p className="testimonial-text">{text}</p>
  <span className="testimonial-user">{userTexts[index] || "Default user testimonial"}</span>
</div>
          ))}
        </div>
      </section>

      <section className="cta">
        <h2 className="cta-title">Ready to Get Fit?</h2>
        <p className="cta-subtitle">Sign up now and take the first step towards a healthier you.</p>
        <a href="/signup" className="cta-button" aria-label="Sign up for fitness now">Join Now</a>
      </section>
    </div>
  );
};

export default Home;
