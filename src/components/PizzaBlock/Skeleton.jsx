import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton = (props) => (
  <div className="pizza-block-wrapper">
    <ContentLoader
      speed={2}
      width={288}
      height={466}
      viewBox="0 0 288 466"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      {...props}
    >
      <circle cx="134" cy="120" r="120" />
      <rect x="0" y="262" rx="10" ry="10" width="280" height="27" />
      <rect x="0" y="315" rx="11" ry="11" width="280" height="80" />
      <rect x="146" y="418" rx="30" ry="30" width="138" height="47" />
      <rect x="0" y="429" rx="10" ry="10" width="111" height="27" />
    </ContentLoader>
  </div>
);

export default Skeleton;
