import Skeleton from 'react-loading-skeleton';

export default function CardSkeleton() {
  return (
    <div
      style={{ height: '440px', width: '350px', minWidth: '350px' }}
      className="flex flex-col shadow-lg rounded-2xl"
    >
      <div className="h-1/2">
        <Skeleton className='className="w-full h-full rounded-t-2xl' />
      </div>

      <div className="p-8 h-1/2">
        <h1 className="font-poppins text-blue-400 font-medium text-xl mb-3">
          <Skeleton />
        </h1>

        <h3 className="font-poppins">
          <Skeleton />
        </h3>

        <Skeleton
          className="font-poppins flex justify-between items-center
        hover:opacity-85 w-48 mt-8 font-medium text-white
         rounded-md  p-2"
        />
      </div>
    </div>
  );
}
