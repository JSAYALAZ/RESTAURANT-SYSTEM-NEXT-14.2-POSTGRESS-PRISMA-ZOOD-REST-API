import Link from "next/link";

type propsT = {
  actualPage: number;
  totalPages: number;
};

export default function ProductsPagination({ actualPage, totalPages }: propsT) {
  const pages = Array.from({length:totalPages},(_,i)=>i+1)
  
  return (
    <nav className="flex justify-center py-10">
      {actualPage >1 && (
        <Link 
        href={`/admin/products?page=${actualPage - 1}`}
        className="px-4 py-2 text-sm text-gray-900 
        ring-1 ring-inset ring-gray-300 focus:outline-offset-0"
        >
          &laquo;
        </Link>
      )}
      {pages.map(page=>(
        <Link
        key={page}
        href={`/admin/products?page=${page}`}
        className={` px-4 py-2 text-sm text-gray-900 
        ring-1 ring-inset ring-gray-300 focus:outline-offset-0 
        ${actualPage==page ? 'font-black bg-amber-500':'bg-white'}
        `}
        >{page}</Link>
      ))}
      {actualPage < totalPages && (
        <Link 
        href={`/admin/products?page=${actualPage + 1}`}
        className="px-4 py-2 text-sm text-gray-900 
        ring-1 ring-inset ring-gray-300 focus:outline-offset-0"
        >
          &raquo;
        </Link>
      )}
    </nav>
  );
}
