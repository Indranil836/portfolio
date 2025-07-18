import React from 'react';
import { Container } from 'react-bootstrap';
import '../../styles/css/Components/Footer.min.css';

function Footer() {
  const socialLinks = [
    { icon: 'bi-github', url: 'https://github.com/yourusername' },
    { icon: 'bi-linkedin', url: 'https://www.linkedin.com/in/indranil-roy-83b1291a9/' },
    { icon: 'bi-twitter-x', url: 'https://twitter.com/yourhandle' },
    { icon: 'bi-instagram', url: 'https://instagram.com/yourprofile' },
    { icon: 'bi-envelope-fill', url: 'mailto:your@email.com' }
  ];

  return (
    <>
      <section className='footer'>
        <Container>
          <div className='footer_head'>
            <h3 className='text-center'>Let's Connect</h3>
            <p className='text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed'>
              I'm not currently taking on new client work but feel free to contact me for any other inquiries, collaborations, or just to say hello!
            </p>
          </div>
          
          {/* Social Media Icons with Glass Morphism */}
          <div className='social-media-wrapper my-5'>
            <div className='social-media-glass'>
              {socialLinks.map((link, index) => (
                <a 
                  key={index}
                  href={link.url} 
                  target='_blank' 
                  rel='noopener noreferrer'
                  className='social-icon'
                >
                  <i className={`bi ${link.icon}`}></i>
                </a>
              ))}
            </div>
          </div>
          
          <div className='footer_bottom'>
            <p className='text-center'>© 2025 Indranil Roy. All rights reserved.</p>
            <p className='text-center'>Made with ❤️ using Modern Technology</p>
          </div>
        </Container>
      </section>
    </>
  );
}

export default Footer;