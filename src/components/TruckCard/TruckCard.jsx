import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../../redux/favourites/slice';
import clsx from 'clsx';

import { selectFavorites } from '../../redux/favourites/selectors';
import { formatLocation, formatPrice, truncateText } from '../../js/utils';
import icons from '../../assets/icons.svg';
import css from './TruckCard.module.css';

export default function TruckCard({
  truck: {
    id,
    name,
    price,
    rating,
    reviews,
    description,
    transmission,
    petrol,
    kitchen,
    AC,
    radio,
    bathroom,
    gallery,
    location,
  },
}) {
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites);
  const isFavourite = favorites.includes(id);

  const handleFavouriteToggle = () => {
    if (isFavourite) {
      dispatch(removeFavorite(id));
    } else {
      dispatch(addFavorite(id));
    }
  };

  return (
    <>
      <img className={css.img} src={gallery[0].thumb} alt={name}></img>
      <div className={css.info}>
        <div className={css.titleBox}>
          <h3 className={css.title}>{name}</h3>
          <div className={css.priceBox}>
            <h3 className={css.title}>{formatPrice(price)}</h3>
            <button
              onClick={handleFavouriteToggle}
              className={clsx(css.heartButton, {
                [css.activeHeart]: isFavourite,
              })}
            >
              <svg className={css.heartIcon} width={24} height={21}>
                <use xlinkHref={`${icons}#icon-heart`} />
              </svg>
            </button>
          </div>
        </div>
        <div className={css.reviewBox}>
          <div className={css.review}>
            <svg className={css.star} width={16} height={16}>
              <use xlinkHref={`${icons}#icon-star`} />
            </svg>
            <p
              className={css.textReview}
            >{`${rating}(${reviews.length} Reviews)`}</p>
          </div>
          <div className={css.location}>
            <svg className={css.map} width={16} height={16}>
              <use xlinkHref={`${icons}#icon-map`} />
            </svg>
            <p>{formatLocation(location)}</p>
          </div>
        </div>
        <p className={css.text}>{truncateText(description)}</p>
        <ul className={css.list}>
          {transmission === 'automatic' && (
            <li className={css.item}>
              <svg className={css.icon} width={20} height={20}>
                <use xlinkHref={`${icons}#icon-diagram`} />
              </svg>
              <p>Automatic</p>
            </li>
          )}
          {petrol && (
            <li className={css.item}>
              <svg className={css.icon} width={20} height={20}>
                <use xlinkHref={`${icons}#icon-fuel-pump`} />
              </svg>
              <p>Petrol</p>
            </li>
          )}
          {kitchen && (
            <li className={css.item}>
              <svg className={css.icon} width={20} height={20}>
                <use xlinkHref={`${icons}#icon-cup-hot`} />
              </svg>
              <p>Kitchen</p>
            </li>
          )}
          {AC && (
            <li className={css.item}>
              <svg className={css.icon} width={20} height={20}>
                <use xlinkHref={`${icons}#icon-wind`} />
              </svg>
              <p>AC</p>
            </li>
          )}
          {radio && (
            <li className={css.item}>
              <svg className={css.icon} width={20} height={20}>
                <use xlinkHref={`${icons}#icon-ui-radios`} />
              </svg>
              <p>Radio</p>
            </li>
          )}
          {bathroom && (
            <li className={css.item}>
              <svg className={css.icon} width={20} height={20}>
                <use xlinkHref={`${icons}#icon-bi_droplet`} />
              </svg>
              <p>Bathroom</p>
            </li>
          )}
        </ul>
        <Link to={`${id}`} className={clsx(css.btn, 'btn')}>
          Show More
        </Link>
      </div>
    </>
  );
}
