import React from 'react';
import styled from 'styled-components';
import Button from '../common/Button';
import { Link } from 'react-router-dom';

const PaginationBlock = styled.div`
  width: 320px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  margin-bottom: 3rem;
`;
const PageNumber = styled.div`

`;

const Pagination = ({ page, lastPage, searchType, searchKeyword, buildLink }) => {

  return (
  <PaginationBlock>
    { page !== 1 &&
      <Button
        disabled={page === 1}
        to={
          page !== 1 && buildLink({ page: page - 1, searchKeyword, searchType })
        }
      >
        이전
      </Button>
    }
    { page > 2 &&
      <PageNumber>
        <Link
          to={page > 2 && buildLink({ page: page - 2, searchKeyword, searchType })}
        >
          {page-2}
        </Link>
      </PageNumber>
    }
    { page > 1 &&
      <PageNumber>
        <Link
          to={page > 1 && buildLink({ page: page - 1, searchKeyword, searchType })}
        >
          {page-1}
        </Link>
      </PageNumber>
    }
    <PageNumber>
      <b>
        {page}
      </b>
    </PageNumber>
    { page < lastPage &&
      <PageNumber>
        <Link
          to={page < lastPage && buildLink({ page: page + 1, searchKeyword, searchType })
          }
        >
          {page+1}
        </Link>
      </PageNumber>
    }
    { page < lastPage-1 &&
      <PageNumber>
        <Link
          to={page < lastPage-1 && buildLink({ page: page + 2, searchKeyword, searchType })}
        >
          {page+2}
        </Link>
      </PageNumber>
    }
    { page !== lastPage &&
      <Button
        disabled={page === lastPage}
        to={
          page !== lastPage && buildLink({ page: page + 1, searchKeyword, searchType })
        }
      >
        다음
      </Button>
    }
  </PaginationBlock>
  );
};

export default Pagination;