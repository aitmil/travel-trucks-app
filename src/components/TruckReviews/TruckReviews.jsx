import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { selectTruck } from '../../redux/trucks/selectors';
import { fetchTruckById } from '../../redux/trucks/operations';

import icons from '../../assets/icons.svg';
import css from './TruckReviews.module.css';

export default function TruckReviews() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const truck = useSelector(selectTruck);

  const reviews = truck?.reviews || [];

  useEffect(() => {
    dispatch(fetchTruckById(id));
  }, [dispatch, id]);

  const renderStars = rating => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <svg
          key={i}
          className={`${css.star} ${i < rating ? css.filled : css.notFilled}`}
          width={20}
          height={20}
        >
          <use xlinkHref={`${icons}#icon-star`} />
        </svg>
      );
    }
    return stars;
  };

  const renderAvatar = name => {
    const initial = name.charAt(0).toUpperCase();
    return <div className={css.avatar}>{initial}</div>;
  };

  return (
    <section className={css.section}>
      <ul className={css.list}>
        {reviews.map((review, index) => (
          <li className={css.item} key={index}>
            <div className={css.header}>
              {renderAvatar(review.reviewer_name)}
              <div className={css.nameBox}>
                <h4 className={css.name}>{review.reviewer_name}</h4>
                <div className={css.rating}>
                  {renderStars(review.reviewer_rating)}
                </div>
              </div>
            </div>
            <p className={css.comment}>{review.comment}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
