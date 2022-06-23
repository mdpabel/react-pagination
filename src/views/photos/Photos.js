import React, { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { useErrorHandler } from 'react-error-boundary';

import { fetchPhotos } from '../../api/getPosts';
import Card from '../../components/photo/photoCard';
import Paginate from '../../components/paginate/Paginate';
import { usePagination } from '../../hooks/usePegination/usePagination';

const totalPhotos = 5000;
const pageSize = 20;

const Posts = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const queryClient = useQueryClient();
  const paginationRange = usePagination({
    totalCount: totalPhotos,
    currentPage,
    pageSize,
  });

  const {
    data: posts,
    isLoading,
    error,
  } = useQuery(
    ['photos', currentPage],
    () => fetchPhotos(currentPage, pageSize),
    {
      refetchOnWindowFocus: false,
      keepPreviousData: true,
      cacheTime: 20 * 60 * 1000,
    }
  );

  useErrorHandler(error);

  useEffect(() => {
    const { queries } = queryClient.getQueryCache();
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
  }, [currentPage, paginationRange, queryClient]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='grid'>
      <div className='p-10 flex justify-center flex-wrap gap-3'>
        {posts.map((post) => (
          <Card key={post.id} post={post} />
        ))}
      </div>

      <div className='text-white flex justify-center gap-x-4 pb-10'>
        <Paginate
          totalCount={totalPhotos}
          currentPage={currentPage}
          onChangePage={(pageNum) => setCurrentPage(pageNum)}
          pageSize={pageSize}
        />
      </div>
    </div>
  );
};

export default Posts;
