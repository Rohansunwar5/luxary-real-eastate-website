
import React, { useEffect, useRef } from 'react';
import { gsap } from '../../lib/gsap';
import Button from '../ui/Button';
import LazyImage from '../ui/LazyImage';

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Intro animation
      gsap.from('.hero-title-line', {
        y: '100%',
        opacity: 0,
        duration: 1.5,
        stagger: 0.2,
        ease: 'power4.out',
        delay: 0.5
      });

      gsap.from('.hero-cta', {
        opacity: 0,
        y: 20,
        duration: 1,
        ease: 'power3.out',
        delay: 1.5
      });

      // Parallax effect
      gsap.to(imageRef.current, {
        y: '20%',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden bg-stone-200">
      <div
        ref={imageRef}
        className="absolute inset-0 w-full h-[120%] -top-[10%]"
      >
        <LazyImage
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2500"
          alt="Luxury Architecture"
          priority
          sizes="100vw"
          className="w-full h-full"
          imgClassName="w-full h-full object-cover grayscale-[20%] brightness-[0.85]"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-[#f5f5f0]/10"></div>

      <div className="relative h-full flex flex-col justify-center items-center text-center px-6">
        <div className="overflow-hidden mb-2">
          <h1 className="hero-title-line text-5xl md:text-9xl text-white serif italic font-light tracking-tight">
            Curating
          </h1>
        </div>
        <div className="overflow-hidden mb-8 md:mb-12">
          <h1 className="hero-title-line text-5xl md:text-9xl text-white serif font-medium tracking-tight">
            Infinite Spaces
          </h1>
        </div>

        <div className="hero-cta group relative">
          <Button
            variant="outline"
            className="
              relative
              border-white/40
              text-white
              px-8 py-4
              overflow-hidden
            "
          >
            <span
              className="
                relative z-10
                transition-colors duration-500
                group-hover:text-black
              "
            >
              The Collection
            </span>

            {/* Hover overlay */}
            <span
              className="
                absolute inset-0
                bg-white
                opacity-0
                group-hover:opacity-100
                transition-opacity duration-700
              "
            />
          </Button>
        </div>

      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-[1px] h-16 bg-white/40"></div>
      </div>
    </section>
  );
};

export default Hero;
