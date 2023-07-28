export default function NewPagination(props) {
  const { containerstyle, totalRecords, recordsPerPage, currentPage, paginationClick } = props;

  let numberOfPages = Math.ceil(totalRecords / recordsPerPage);
  let pagesArr = [];
  for (let i = 1; i <= numberOfPages; i++) {
    pagesArr.push(i);
  }

  return (
    (totalRecords > 0 && numberOfPages > 1) && (
      <div
        className={`${containerstyle} flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6`}
      >
        <div className="flex flex-1 sm:hidden gap-5 m-auto">
          <p
            onClick={() => paginationClick(1)}
            className="cursor-pointer relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
          >
            <span className={`${currentPage > 1 ? "opacity-100" : "opacity-70"}`}>
              First
            </span>
          </p>
          <p
            onClick={() => paginationClick(currentPage == 1 ? 1 : currentPage - 1)}
            className="cursor-pointer relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
          >
            <span className={`${(currentPage > 1 && currentPage <= numberOfPages) ? "opacity-100" : "opacity-70"}`}>
              Previous
            </span>
          </p>
          <p
            onClick={() => paginationClick(currentPage === numberOfPages ? numberOfPages : currentPage + 1)}
            className=" cursor-pointer relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
          >
            <span className={`${currentPage < numberOfPages ? "opacity-100" : "opacity-70"}`}>
              Next
            </span>
          </p>
          <p
            onClick={() => paginationClick(numberOfPages)}
            className="cursor-pointer relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
          >
            <span className={`${currentPage < numberOfPages ? "opacity-100" : "opacity-70"}`}>
              Last
            </span>
          </p>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between mr-14">
          <div>
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">{currentPage === 1 ? 1 : (currentPage - 1) * recordsPerPage}</span> to{" "}
              <span className="font-medium">{currentPage === 1 ? recordsPerPage : (currentPage) * recordsPerPage - 1}</span> of{" "}
              <span className="font-medium">{totalRecords}</span> results
            </p>
          </div>
          <div>
            <div className="flex flex-1 justify-between gap-2">
              <p
                onClick={() => paginationClick(1)}
                className="cursor-pointer relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
              >
                <span className={`${currentPage > 1 ? "opacity-100" : "opacity-70"}`}>
                  First
                </span>
              </p>
              <p
                onClick={() => paginationClick(currentPage == 1 ? 1 : currentPage - 1)}
                className="cursor-pointer relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
              >
                <span className={`${(currentPage > 1 && currentPage <= numberOfPages) ? "opacity-100" : "opacity-70"}`}>
                  Previous
                </span>
              </p>
              <p
                onClick={() => paginationClick(currentPage === numberOfPages ? numberOfPages : currentPage + 1)}
                className="cursor-pointer relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
              >
                <span className={`${currentPage < numberOfPages ? "opacity-100" : "opacity-70"}`}>
                  Next
                </span>
              </p>
              <p
                onClick={() => paginationClick(numberOfPages)}
                className="cursor-pointer relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
              >
                <span className={`${currentPage < numberOfPages ? "opacity-100" : "opacity-70"}`}>
                  Last
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
