import { Link } from "react-router-dom";
import "./Carousel.scss";
import { shortenText } from "../../utils";

function Carouseltem({ url, name, price, description }) {
  return (
    <div className="carouselItem">
      <Link to="/product-details">
        <img className="product--image" src={url} alt={name} />
        <p className="price">{`$${price}`}</p>
        <h4>{shortenText(name, 18)}</h4>
        <p>{shortenText(description, 26)}</p>
      </Link>

      <button
        className="--btn --btn-primary --btn-block"
        style={{
          marginBottom: "50px",
        }}>
        Add To Card
      </button>
    </div>
  );
}

export default Carouseltem;
