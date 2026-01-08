import { Link } from 'react-router-dom';
import { Home, User, Briefcase, Mail } from 'lucide-react';

const Navbar = () => {
  return (
  <nav style={styles.nav}>
    <Link style={styles.link} to="/"> <Home size={24} /> </Link>
    <Link style={styles.link} to="/about"> <User size={24} /> </Link>
    <Link style={styles.link} to="/projects"> <Briefcase size={24} /> </Link>
    <Link style={styles.link} to="/contact"> <Mail size={24} /> </Link>
  </nav>
);
};


const styles = {
  nav: {
    position: 'fixed',
    top: '20px',             // Floating slightly from the top
    left: '50%',
    transform: 'translateX(-50%)',
    width: '90%',
    maxWidth: '600px',
    display: 'flex',
    justifyContent: 'center',
    gap: '40px',
    background: '#ffffff',    // Solid white to stand out against light blue bg
    padding: '15px 0',
    borderRadius: '50px',     // Pill shape
    boxShadow: '0 10px 25px rgba(56, 189, 248, 0.2)', // Soft blue shadow
    zIndex: 1000,
    border: '1px solid rgba(56, 189, 248, 0.3)',
  },
  link: {
    color: '#0ea5e9',         // Vibrant Sky Blue
    display: 'flex',
    alignItems: 'center',
    transition: '0.3s ease',
  }
};
  
 

export default Navbar;