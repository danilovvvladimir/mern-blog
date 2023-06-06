import React, { FC } from "react";
import ContentLoader from "react-content-loader";

interface IAsideFilterTagSkeletonProps {
  className?: string;
}

const AsideFilterTagSkeleton: FC<IAsideFilterTagSkeletonProps> = ({ className }) => (
  <ContentLoader
    speed={2}
    width={290}
    height={45}
    viewBox="0 0 290 45"
    backgroundColor="#e7f6ff"
    foregroundColor="#5f8bff"
    className={className}>
    <rect x="0" y="2" rx="10" ry="10" width="275" height="43" />
  </ContentLoader>
);

export default AsideFilterTagSkeleton;
