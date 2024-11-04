import './Offers.css';
import { useNavigate } from 'react-router-dom';
import exclusive_image from '../Assests/exclusive_image.png';

const Offers = () => {
  const navigate = useNavigate();
  return (
    <div className='offers'>
      <div className="offer_left">
        <h1>Exclusive</h1>
        <h1>Offers for you</h1>
        <p>ONLY ON BEST SELLERS PRODUCTS</p>
        <button onClick={() => navigate("/women")}>Check Now</button>
      </div>
      <div className="offer_right">
        <img src={exclusive_image} alt="Exclusive Offers" />
      </div>
    </div>
  );
}

export default Offers;
