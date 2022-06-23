## React Pagination

```json
{
"name":"Custom pagination",
"section":"What are we using?",
"packages": [
    "react",
    "react-query",
    "react-error-boundary",
    "axios"
    ]'
}
```

## [usePagination](https://github.com/mdpabel/react-pagination/blob/main/src/hooks/usePegination/usePagination.js)

```js
import { useMemo } from 'react';
import { getRange } from './helpers/getRange';

// const DOTS = '';

const usePagination = ({
  totalCount,
  pageSize,
  siblingCount = 1,
  currentPage,
}) => {
  const paginationRange = useMemo(() => {
    // case 1 : number of page we want to show is greater than the total number of page
    if (totalPageNumbers > NumberOfPages) {
      ...
    }
    // Left & right sibling indices
    const leftSiblingIndex = currentPage - siblingCount;
    const rightSiblingIndex = currentPage + siblingCount;

    // Should show dots
    const shouldShowLeftDots = leftSiblingIndex > 3;
    const shouldShowRightDots = NumberOfPages - 2 > rightSiblingIndex;

    // case 2 : No left dots to show, but rights dots to be shown
    if (!shouldShowLeftDots && shouldShowRightDots) {
      ...
    }

    // case 3 : No right dots to show,
    if (shouldShowLeftDots && !shouldShowRightDots) {
     ...
    }

    // case 4: Both left & right dots to be shown
    if (shouldShowLeftDots && shouldShowRightDots) {
      ...
    }
  }, [currentPage, pageSize, siblingCount, totalCount]);

  return paginationRange;
};
```

![output of pagination](/Screenshot_1.png)

## Prefetch

```js
const queryKeys = new Set();

queries.map((key) => queryKeys.add(key.queryKey[1]));

paginationRange.map((page) => {
  if (page === currentPage || page === 'DOTS' || queryKeys.has(page)) {
    return null;
  }

  return queryClient.prefetchQuery(['photos', page], () =>
    fetchPhotos(page, pageSize)
  );
});
```

![prefetching the data](/Screenshot_2.png)
