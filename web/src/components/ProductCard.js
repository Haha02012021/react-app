import { StarIcon } from "./icons";
import "../styles/components/ProductCard.scss";
import TextWithMark from "./TextWithMark";

export default function ProductCard({ image, categoryName, name, price, description, rating, markText = "" }) {
  return (
    <li className="product-card">
      <article className="">
        <header className="product-card__header">
          <img
            src={image}
            alt={name}
            className="product-card__image"
          />
        </header>
        <div className="product-card__info">
          <p className="product-card__category">{categoryName}</p>
          <h1 className="product-card__name"><TextWithMark text={name} markText={markText} maxLength={name.length} /></h1>
          <p className="product-card__description">
            <TextWithMark text={description} markText={markText} />
          </p>
          <footer className="product-card__footer">
            <p>
              <span className="product-card__dolar">$</span>{" "}
              <strong className="product-card__price">{price}</strong>{" "}
              <span className="product-card__rating">
                <StarIcon size={8} /> { rating }
              </span>
            </p>
          </footer>
        </div>
      </article>
    </li>
  );
}
