import './Review.css';
import React from 'react';

const Review = ({data}) => {
  return (
    <div className='review'>
      
      <img className='review__img' src='\user.png' alt='' />
      <div className='review__content'>
        <b>{data.date} - {data.userName}</b>
        <br />
        {data.text}
      </div>
    </div>
  )
}

export default Review;