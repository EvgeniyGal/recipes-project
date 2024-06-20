import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Pagination from '../../ui/Pagination/Pagination';

const PAGE_RANGE = 1;

const RecipePagination = ({ handlePage, page, total, limit }) => {
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    setTotalPages(Math.ceil(total / limit));
  }, [total, limit]);

  return (
    totalPages > 1 && (
      <Pagination
        handlePage={handlePage}
        page={page}
        totalPages={totalPages}
        pageRande={PAGE_RANGE}
      />
    )
  );
};

RecipePagination.propTypes = {
  handlePage: PropTypes.func,
  page: PropTypes.number,
  total: PropTypes.number,
  limit: PropTypes.number,
};

export default RecipePagination;
