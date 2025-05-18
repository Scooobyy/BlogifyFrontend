import React from 'react';
import { Github, Linkedin, Instagram, Mail, } from 'lucide-react';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <div className="about-header">
        <h1 className="about-title">About The Developer</h1>
        <p className="about-subtitle">Learn more about the person behind this BlogCraft</p>
      </div>

      <div className="about-content">
        <div className="profile-section">
          <div className="profile-image">
            {/* Placeholder profile image */}
            <div className="image-placeholder"></div>
          </div>
          
          <div className="profile-info">
            <h2 className="profile-name">Pranav Mane</h2>
            <h3 className="profile-role">Full Stack Developer</h3>
            
            <p className="profile-bio">
              Hi there! I'm Pranav, a passionate Full Stack developer. I created this platform to empower writers and creators to share their stories, ideas, and knowledge through an easy-to-use blog editor. With a focus on simplicity and flexibility, this application is designed to help you craft, edit, and publish your blogs effortlessly, making content creation an enjoyable and rewarding experience.


            </p>
            
            <div className="profile-social">
              <a href="https://github.com/Scooobyy" target="_blank" rel="noopener noreferrer" className="social-link github">
                <Github size={20} />
                <span>GitHub</span>
              </a>
              <a href="https://www.linkedin.com/in/pranav-mane-2b681928b/" target="_blank" rel="noopener noreferrer" className="social-link linkedin">
                <Linkedin size={20} />
                <span>LinkedIn</span>
              </a>
              <a href="https://www.instagram.com/pranavv.xo/" target="_blank" rel="noopener noreferrer" className="social-link instagram">
                <Instagram size={20} />
                <span>Instagram</span>
              </a>
              <a href="mailto:connect.blogify@gmail.com" className="social-link mail">
                <Mail size={20} />
                <span>Email</span>
              </a>
                        </div>
          </div>
        </div>
        
        <div className="about-story">
          <h3 className="section-title">My Blogify Journey</h3>
          <div className="story-content">
            <p>
              My journey into blogging started from a simple desire to share my thoughts and stories with the world. Over time, I realized how powerful writing can be to connect, inspire, and educate people.</p>
            <p>
             Since then, I've written and published numerous blogs on various topics, learning what makes content engaging and how to create a smooth writing experience. This inspired me to build a platform that simplifies the blogging process for everyone — whether you’re a beginner or an experienced writer.
            </p>
            <p>
             This web application combines my passion for writing and web development. I designed it from the ground up to provide intuitive tools that help you create, edit, and publish your blogs seamlessly, so your focus stays on your creativity.


            </p>
          </div>
        </div>
        
        <div className="blog-images-gallery">
  <h3 className="section-title">Inspiration for Your Blogging Journey</h3>
  <div className="gallery-content">
    <img 
      src="https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&q=80" 
      alt="Books on shelf" 
      className="gallery-image"
    />
    <img 
      src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=400&q=80" 
      alt="Person writing on notebook" 
      className="gallery-image"
    />
    <img 
      src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=400&q=80" 
      alt="Laptop with blog editor" 
      className="gallery-image"
    />
    <img 
      src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80" 
      alt="Library with books" 
      className="gallery-image"
    />
  </div>
</div>

        
        <div className="about-cta">
          <h3>Ready to give your best?</h3>
          <p>Join me on this platform and let's work together to achieve something unique.</p>
          <a href="/signup" className="cta-button">Get Started Today</a>
        </div>
      </div>
    </div>
  );
};

export default About;