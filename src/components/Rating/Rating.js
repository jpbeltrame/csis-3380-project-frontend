import './Rating.css';
import { StarFilled, StarOutlined } from '@ant-design/icons';

const Rating = ({rating}) => {
  const roundedRating = Math.ceil(rating);
  const buffer = [];
  for(let i = 1; i <= 5; i++ ) {
    if (i <= roundedRating) {
      buffer.push(<StarFilled />);
    } else {
      buffer.push(<StarOutlined />);
    }
  }

  return (<spam> {buffer} </spam>);
} 

export default Rating;