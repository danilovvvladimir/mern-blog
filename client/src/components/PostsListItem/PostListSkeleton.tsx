import React, { FC } from "react";
import ContentLoader from "react-content-loader";

interface IPostListSkeletonProps {
  className?: string;
}

const PostListSkeleton: FC<IPostListSkeletonProps> = ({ className }) => (
  <ContentLoader
    className={className}
    speed={2}
    width={600}
    height={410}
    viewBox="0 0 600 410"
    backgroundColor="#e7f6ff"
    foregroundColor="#5f8bff">
    <rect x="-1" y="8" rx="0" ry="0" width="594" height="200" />
    <circle cx="22" cy="240" r="18" />
    <rect x="55" y="230" rx="0" ry="0" width="148" height="19" />
    <rect x="8" y="268" rx="0" ry="0" width="412" height="41" />
    <rect x="10" y="325" rx="0" ry="0" width="84" height="18" />
    <rect x="106" y="325" rx="0" ry="0" width="111" height="16" />
    <rect x="10" y="358" rx="0" ry="0" width="65" height="21" />
    <rect x="11" y="383" rx="0" ry="0" width="63" height="21" />
    <rect x="481" y="359" rx="0" ry="0" width="113" height="24" />
    <rect x="513" y="390" rx="0" ry="0" width="81" height="30" />
  </ContentLoader>
);

export default PostListSkeleton;
