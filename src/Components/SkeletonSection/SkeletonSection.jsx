import "./SkeletonSection.scss";

// eslint-disable-next-line react/prop-types
function SkeletonSection({text}) {
  return <div className="skeleton_section">{text}</div>;
}

export default SkeletonSection;
