export const toggleEllipsis = (
  index: number,
  activeIndex: number | null,
  setActiveIndex: React.Dispatch<React.SetStateAction<number | null>>,
) => {
  setActiveIndex(activeIndex === index ? null : index);
};
