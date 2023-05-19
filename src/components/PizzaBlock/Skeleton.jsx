import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton = (props) => (
  <ContentLoader
    speed={2}
    width={280}
    height={500}
    viewBox="0 0 280 500"
    backgroundColor="#fa7000"
    foregroundColor="#fafafa"
    {...props}
  >
    <circle cx="130" cy="130" r="130" />
    <rect x="0" y="285" rx="10" ry="10" width="280" height="20" />
    <rect x="0" y="345" rx="10" ry="10" width="280" height="88" />
    <rect x="0" y="455" rx="10" ry="10" width="95" height="30" />
    <rect x="125" y="447" rx="25" ry="25" width="152" height="45" />
  </ContentLoader>
);

export default Skeleton;
