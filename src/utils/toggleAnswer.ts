export const toggleAnswer = (
  index: number,
  activeIndexOfAnswer: number | null,
  setActiveIndexOfAnswer: React.Dispatch<React.SetStateAction<number | null>>,
) => {
  setActiveIndexOfAnswer(activeIndexOfAnswer === index ? null : index);
};
