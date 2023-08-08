import './Reviews.css';
import React, { useState } from 'react';
import { Button, Input } from 'antd';
import Review from '../Review/Review';  
import { useUserContext } from '../../UserContext';

const Reviews = ({bookId, rating}) => {

  const [bookReviews, setBookReview] = useState([]);
  const [review, setReview] = useState("");
  const { userId, username } = useUserContext();

  function addReview(text) {
    

    function getRandomInt(max) {
      return Math.floor(Math.random() * max);
    }

    let final_name = username;
    if (!username) {
      final_name = "anonymous"
    }

    const d = new Date();
    const month = '' + (d.getMonth() + 1);
    const day = '' + d.getDate();
    const year = d.getFullYear();

    const review = {
      id: getRandomInt(100000),
      userName: final_name,
      text,
      date: [day , month, year].join('/')
    }

    setBookReview(bookReviews => [...bookReviews, review]);
  }

  return (
    <div className='book-reviews'>
      <h3>Reviews</h3>
      {bookReviews.map( r => <Review data={r} key={r.id} />) }
      {bookReviews.length === 0 ? <h4 style={{textAlign:'center'}}>No reviews</h4>:'' }

      <h4>Add a review</h4>
      <Input.TextArea rows={5}  onChange={(event) => { setReview(event.target.value); }}/>
      <Button
        className="book-reviews__button"
        type="primary" 
        onClick={() => addReview(review) }
        >
        Add Review
      </Button>
    </div>
  );
}


export default Reviews;