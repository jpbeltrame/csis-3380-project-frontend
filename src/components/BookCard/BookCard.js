import './BookCard.css';
import React from 'react';
import { Link } from "react-router-dom";
import { Card } from 'antd';

const BookCard = (props) => {
  const id = props.book.id;
  const book = props.book.volumeInfo;
  const title = book.title;
  const coverPath = book.imageLinks && book.imageLinks.smallThumbnail ? book.imageLinks.smallThumbnail : "no-cover.jpg";
  const authors = book.authors ? book.authors.join(', ') : "Unknow";
  const publisher = book.publisher ?? "-";

  return (
    <Link to={'/books/' + id}>
      <Card className="book-card">
        <img
          src={coverPath}
          alt={title}
        />

        <div>
          <h3>{title}</h3>
          <p><b>Authors:</b> <br /> {authors}</p>
          <p><b>Publisher:</b> <br /> {publisher}</p>
        </div>
      </Card>
    </Link>
  );
};

export default BookCard;