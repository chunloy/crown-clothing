import Button from "./Button";

import "./ProductCard.scss";

const ProductCard = ({ name, price, imageURL }) => {
  return (
    <div className="product-card-container">
      <img src={imageURL} alt={name} />
      <div className="footer">
        <span className="product-name">{name}</span>
        <span className="product-price">{price}</span>
      </div>
      <Button buttonType="inverted">Add to Cart</Button>
    </div>

  );
}

export default ProductCard;