import React from 'react';

const Post = ({ post }) => {
  const { thumbnailUrl, title } = post;
  return (
    <div>
      <div
        className='w-60 h-60 text-white flex justify-center items-end '
        style={{
          backgroundImage: `url(${thumbnailUrl})`,
        }}
      >
        <p className='px-5 py-2 bg-gray-700'>{title}</p>
      </div>
    </div>
  );
};

export default Post;
