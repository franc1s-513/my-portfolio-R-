import { ExternalLink, Github } from 'lucide-react';

const Projects = () => {
  // This is your database of projects
  const myProjects = [
    {
      id: 1,
      title: "E-Commerce App",
      description: "A sleek shopping experience built with React and Tailwind.",
      tech: ["React", "Node.js", "MongoDB"],
      link: "#"
    },
    {
      id: 2,
      title: "Weather Dashboard",
      description: "Real-time weather tracking with beautiful sky-blue visuals.",
      tech: ["React", "OpenWeather API"],
      link: "#"
    },
    {
      id: 3,
      title: "Fitness Tracker",
      description: "A mobile-responsive app to track daily workouts and health.",
      tech: ["React", "Firebase"],
      link: "#"
    }
  ];

  return (
    <div style={{ padding: '120px 20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', fontSize: '2.5rem', color: '#0ea5e9', marginBottom: '40px' }}>
        My Creative Works
      </h2>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '30px' 
      }}>
        {myProjects.map((project) => (
          <div key={project.id} style={styles.card}>
            <h3 style={{ color: '#0f172a', marginBottom: '10px' }}>{project.title}</h3>
            <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '20px' }}>{project.description}</p>
            
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
              {project.tech.map(t => (
                <span key={t} style={styles.tag}>{t}</span>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '15px' }}>
              <ExternalLink size={20} color="#0ea5e9" cursor="pointer" />
              <Github size={20} color="#0ea5e9" cursor="pointer" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  card: {
    background: '#ffffff',
    padding: '30px',
    borderRadius: '20px',
    border: '1px solid rgba(14, 165, 233, 0.2)',
    boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
    transition: 'transform 0.3s ease',
  },
  tag: {
    background: '#e0f2fe',
    color: '#0ea5e9',
    padding: '5px 12px',
    borderRadius: '50px',
    fontSize: '0.75rem',
    fontWeight: 'bold'
  }
};

export default Projects;