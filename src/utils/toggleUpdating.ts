export const toggleInputUpdating = (
  index: number,
  activeIndexUpdating: number | null,
  setActiveIndexUpdating: React.Dispatch<React.SetStateAction<number | null>>,
) => {
  setActiveIndexUpdating(activeIndexUpdating === index ? null : index);
};
