import { useMediaPredicate } from 'react-media-hook';
import cl from './categoryCard.module.scss';
import ButtonLink from '../../ui/ButtonLink';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import scrollUpToSection from '../../../utils/scrollUpToSection';

export default function CategoryCard({ name, categoryId, isWide }) {
  const IS_HIRESOLUTION = useMediaPredicate('(min-resolution: 192dpi)');
  const IS_ALL = name === 'All categories';

  let bgStyle = IS_ALL ? { backgroundColor: 'var(--primary-text-color' } : '';

  const res = IS_HIRESOLUTION ? '2x' : '';
  const imageName = `${name.toLowerCase()}${res}`;

  if (!IS_ALL) {
    bgStyle = {
      backgroundImage: `image-set(url('./images/categories/${imageName}.webp') type('image/webp'), url('./images/categories/${imageName}.jpg') type('image/jpeg'))`,
    };
  }

  return (
    <>
      <li
        className={`
          ${cl.category}
          ${isWide ? cl.wide : ''}
          ${IS_ALL ? cl['content-center'] : ''}
        `}
        style={bgStyle}
      >
        {!IS_ALL && (
          <div className={cl.content}>
            <p className={cl['name-pill']}>{name}</p>
            <ButtonLink
              icon="arrow_up_right"
              addClass={cl['button-icon']}
              to={`categories/${categoryId}`}
              onClick={() => scrollUpToSection('#categories')}
            />
          </div>
        )}

        {IS_ALL && (
          <Link
            className={cl['link-to-all']}
            to={`categories/all`}
            onClick={() => scrollUpToSection('#categories')}
          >
            <p>{name}</p>
          </Link>
        )}
      </li>
    </>
  );
}

CategoryCard.propTypes = {
  name: PropTypes.string.isRequired,
  categoryId: PropTypes.string.isRequired,
  isWide: PropTypes.bool,
};
