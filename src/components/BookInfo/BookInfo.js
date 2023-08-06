import './BookInfo.css';
import Rating from '../Rating/Rating'

const BookInfo = ({ bookDetail }) => {

  const book = bookDetail.volumeInfo;
  const title = book.title ?? '';
  const authors = book.authors ?? [];
  const publisher = book.publisher ?? '';
  const pageCount = book.pageCount ?? '';
  const description  = book.description ?? '';
  const averageRating = book.averageRating ?? 0;
  const buyLink = bookDetail.saleInfo.buyLink ?? ' - ';

  return (
    <div className='book-info'>
      <h2 style={{marginTop: 0}}>{title}</h2>
      <span><b>Authors:</b> {authors.join(', ')}</span><br />
      <span><b>Publisher:</b> {publisher}</span><br />
      <span><b>Pages:</b> {pageCount}</span><br />        
      <span><b>Rating:</b> <Rating rating={averageRating} /></span><br />
      <span><b>Buy link:</b> <a target='_blank' rel='noreferrer' href={buyLink}> {buyLink} </a> </span> <br />

      <h3>Description</h3>
      <div className='book-info__description' dangerouslySetInnerHTML={{ __html: description }}></div>
    </div>
  );
}

export default BookInfo;