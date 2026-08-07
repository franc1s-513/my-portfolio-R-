import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const useScrollReveal = (ref, deps = []) => {
  useEffect(() => {
    if (!ref.current) return;
    
    // Find all elements with the "reveal" class inside this container
    const revealElements = ref.current.querySelectorAll('.reveal');
    
    const ctx = gsap.context(() => {
      revealElements.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }, ref);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, ...deps]);
};

export default useScrollReveal;

