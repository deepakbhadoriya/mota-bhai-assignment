import React from 'react';

import style from './Hero.module.scss';

const Hero = () => {
  return (
    <section className={style.hero}>
      <div className={style.heroContent}>
        <h1 className={style.heroTitle}>Discover the World</h1>

        <h2 className={style.heroSubtitle}>
          We offer the best adventure holidays and tailor-made trips!
        </h2>

        <button type="button" className={style.heroButton} onclick="location.href='tours.html'">
          Search for tours &raquo;
        </button>
      </div>
    </section>
  );
};

export default Hero;
