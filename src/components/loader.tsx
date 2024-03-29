import { Spinner } from '@chakra-ui/spinner';

export type LoaderProps = {
  isLoading: boolean;
};

export default function Loader({ isLoading }: LoaderProps) {
  if (!isLoading) return <></>;
  return (
    <div
      className="absolute z-10 top-0 bottom-0 left-0 right-0
        flex flex-col items-center w-full bg-white justify-center h-full"
    >
      <Spinner
        className="mb-8 z-20"
        thickness="6px"
        speed="0.65s"
        emptyColor="#d1d5db"
        color="#60a5fa"
        boxSize={'60px'}
      />
      <p className="font-poppins text-xl">Carregando...</p>
    </div>
  );
}
