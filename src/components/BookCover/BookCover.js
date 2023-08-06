import './BookCover.css';

const BookCover = ({imageLinks, alt}) => {
  const path = imageLinks && imageLinks.thumbnail ? imageLinks.thumbnail : '/no-cover.jpg';

  return (
    <img
      src={path}
      alt={alt}
      style={{ maxHeight: '360px', objectFit: 'contain', width: '100%', marginBottom: '20px' }}
    />
  );
}

export default BookCover;