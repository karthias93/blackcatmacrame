// import React from 'react'
// import { Pagination } from 'react-bootstrap'
// import { LinkContainer } from 'react-router-bootstrap'

// const Paginate = ({ pages, page, category, isAdmin = false, keyword = '' }) => {
//   return (
//     pages > 1 && (
//       <Pagination>
//         {[...Array(pages).keys()].map((x) => (
//           <LinkContainer
//             key={x + 1}
//             to={
//               !isAdmin
//                 ? keyword
//                   ? `/search/${keyword}/page/${x + 1}`
//                   : category ? `/${category}/${x + 1}` : `/page/${x + 1}`
//                 : `/admin/productlist/${x + 1}`
//             }
//           >
//             <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
//           </LinkContainer>
//         ))}
//       </Pagination>
//     )
//   )
// }

// export default Paginate

import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using react-router-dom for routing

const Paginate = ({ pages, page, category, isAdmin = false, keyword = '' }) => {
  return (
    pages > 1 && (
      <nav className="flex justify-center my-4">
        <ul className="pagination">
          {[...Array(pages).keys()].map((x) => (
            <li key={x + 1} className="page-item">
              <Link
                to={
                  !isAdmin
                    ? keyword
                      ? `/search/${keyword}/page/${x + 1}`
                      : category
                      ? `/${category}/${x + 1}`
                      : `/page/${x + 1}`
                    : `/admin/productlist/${x + 1}`
                }
                className={`page-link ${x + 1 === page ? 'bg-blue-500 text-white' : 'text-blue-500'}`}
              >
                {x + 1}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    )
  );
};

export default Paginate;
