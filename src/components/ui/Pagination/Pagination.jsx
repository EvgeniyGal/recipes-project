import PaginationPage from './PaginationPage';
import cl from './Pagination.module.scss';
import PropTypes from 'prop-types';

const Pagination = ({
  addClass = '',
  handlePage,
  page,
  totalPages,
  pageRange = 1,
}) => {
  const pages = [];

  if (totalPages > 1) {
    let startPage = Math.max(1, page - pageRange);
    let endPage = Math.min(totalPages, page + pageRange);

    if (page <= pageRange) {
      endPage = Math.min(totalPages, 3);
    } else if (page + pageRange > totalPages) {
      startPage = Math.max(1, totalPages - 2);
    }

    for (let i = startPage; i <= endPage; i++) {
      const activePage = i === page;
      pages.push({ page: i, activePage });
    }

    return (
      <>
        <ul className={`${cl.paginationWrapper} ${addClass}`}>
          {pages.map(({ page, activePage }) => {
            return (
              <PaginationPage
                key={page}
                handlePage={handlePage}
                page={page}
                activePage={activePage}
              />
            );
          })}
        </ul>
      </>
    );
  }
};

Pagination.propTypes = {
  addClass: PropTypes.string,
  handlePage: PropTypes.func,
  page: PropTypes.number,
  totalPages: PropTypes.number,
  pageRange: PropTypes.number,
};

export default Pagination;
