import React from 'react';

import style from './AnimeCard.module.scss';

const AnimeCard = ({ animeData, className }) => {
  return (
    <div className={className}>
      <div className={style.cardContainer}>
        <div
          className={style.cardImage}
          style={{ backgroundImage: `url(${animeData.image_url})` }}
        />
        <div className={style.cardTitle}>
          <h6>{animeData.title}</h6>
        </div>
      </div>
    </div>
  );
};

export default AnimeCard;
