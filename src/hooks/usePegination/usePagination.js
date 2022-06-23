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
    const NumberOfPages = Math.ceil(totalCount / pageSize);
    const totalPageNumbers = 5 + siblingCount;

    // case 1 : number of page we want to show is greater than the total number of page
    if (totalPageNumbers > NumberOfPages) {
      return getRange(1, totalPageNumbers);
    }
    // Left & right sibling indices
    const leftSiblingIndex = currentPage - siblingCount;
    const rightSiblingIndex = currentPage + siblingCount;

    // Should show dots
    const shouldShowLeftDots = leftSiblingIndex > 3;
    const shouldShowRightDots = NumberOfPages - 2 > rightSiblingIndex;

    const firstPageIndex = 1;
    const lastPageIndex = NumberOfPages;

    // case 2 : No left dots to show, but rights dots to be shown
    if (!shouldShowLeftDots && shouldShowRightDots) {
      const totalLeftItems = 3 + 2 * siblingCount;
      const leftRange = getRange(1, totalLeftItems);

      return [...leftRange, 'DOTS', NumberOfPages];
    }

    // case 3 : No right dots to show,
    if (shouldShowLeftDots && !shouldShowRightDots) {
      const totalRightItems = 3 + 2 * siblingCount;
      const rightRange = getRange(
        NumberOfPages - totalRightItems + 1,
        NumberOfPages
      );
      return [firstPageIndex, 'DOTS', ...rightRange];
    }

    // case 4: Both left & right dots to be shown
    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleItems = getRange(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, 'DOTS', ...middleItems, 'DOTS', lastPageIndex];
    }
  }, [currentPage, pageSize, siblingCount, totalCount]);

  return paginationRange;
};

export { usePagination };
