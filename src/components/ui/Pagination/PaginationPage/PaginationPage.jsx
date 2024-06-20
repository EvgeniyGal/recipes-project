import cl from './PaginationPage.module.scss';
import PropTypes from 'prop-types';

const PaginationPage = ({ page, handlePage, activePage, addClass = '' }) => {
  const handleClick = e => {
    e.preventDefault();
    handlePage(page);
  };

  return (
    <>
      <li
        className={`${cl.wrapperPage} ${addClass} ${
          activePage ? cl.active : ''
        }`}
      >
        <a
          className={cl.pageLink}
          data-page={page}
          href="#"
          onClick={handleClick}
        >
          {page}
        </a>
      </li>
    </>
  );
};

PaginationPage.propTypes = {
  page: PropTypes.number,
  handlePage: PropTypes.func,
  activePage: PropTypes.bool,
  addClass: PropTypes.string,
};

export default PaginationPage;
