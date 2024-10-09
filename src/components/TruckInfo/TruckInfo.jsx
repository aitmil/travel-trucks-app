import { formatLocation, formatPrice } from '../../js/utils';
import icons from '../../assets/icons.svg';
import css from './TruckInfo.module.css';

export default function TruckInfo({
  truck: { name, price, rating, reviews, description, gallery, location },
}) {
  return (
    <>
      <section className={css.section}>
        <h3 className={css.title}>{name}</h3>

        <div className={css.reviewBox}>
          <div className={css.review}>
            <svg className={css.star} width={16} height={16}>
              <use xlinkHref={`${icons}#icon-star`} />
            </svg>
            <p
              className={css.reviewText}
            >{`${rating}(${reviews.length} Reviews)`}</p>
          </div>

          <div className={css.location}>
            <svg className={css.map} width={16} height={16}>
              <use xlinkHref={`${icons}#icon-map`} />
            </svg>
            <p>{formatLocation(location)}</p>
          </div>
        </div>

        <h3 className={css.title}>{formatPrice(price)}</h3>

        <ul className={css.list}>
          {gallery.map((image, index) => (
            <li className={css.item} key={index}>
              <img
                className={css.img}
                src={image.original}
                alt="photo of truck"
              ></img>
            </li>
          ))}
          <li className={css.item}>
            <img
              className={css.img}
              src={gallery[0].original}
              alt="photo of truck"
            ></img>
          </li>
        </ul>
        <p className={css.text}>{description}</p>
      </section>
    </>
  );
}
