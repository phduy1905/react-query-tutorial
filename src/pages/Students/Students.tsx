import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { getStudents } from "../../apis/students.api";
import { useQueryString } from "../../hooks/useQueryString";
import { clsx } from "clsx";

const LIMIT = 10;

export default function Students() {
  const query = useQueryString();
  const page = Number(query.page) || 1;

  const { data, isLoading } = useQuery({
    queryKey: ["students", page],
    queryFn: () => getStudents(page, LIMIT),
  });

  const totalStudents = Number(data?.headers["x-total-count"] || 0);
  const totalPages = Math.ceil(totalStudents / 10);

  return (
    <div>
      {isLoading && (
        <>
          <div role="status" className="mt-6 animate-pulse">
            <div className="mb-4 h-4  rounded bg-gray-200 dark:bg-gray-700" />
            <div className="mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700" />
            <div className="mb-2.5 h-10 rounded bg-gray-200 dark:bg-gray-700" />
            <div className="mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700" />
            <div className="mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700" />
            <div className="mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700" />
            <div className="mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700" />
            <div className="mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700" />
            <div className="mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700" />
            <div className="mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700" />
            <div className="mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700" />
            <div className="mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700" />
            <div className="h-10  rounded bg-gray-200 dark:bg-gray-700" />
            <span className="sr-only">Loading...</span>
          </div>
        </>
      )}
      {data && (
        <>
          <div className="relative mt-6 overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
              <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="py-3 px-6">
                    #
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Avatar
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Name
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Email
                  </th>
                  <th scope="col" className="py-3 px-6">
                    <span className="sr-only">Action</span>
                  </th>
                </tr>
              </thead>
              {data.data.map((student) => {
                return (
                  <tbody key={student.id}>
                    <tr className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600">
                      <td className="py-4 px-6">{student.id}</td>
                      <td className="py-4 px-6">
                        <img
                          src={student.avatar}
                          alt="student"
                          className="h-5 w-5"
                        />
                      </td>
                      <th
                        scope="row"
                        className="whitespace-nowrap py-4 px-6 font-medium text-gray-900 dark:text-white"
                      >
                        {student.last_name}
                      </th>
                      <td className="py-4 px-6">{student.email}</td>
                      <td className="py-4 px-6 text-right">
                        <Link
                          to="/students/1"
                          className="mr-5 font-medium text-blue-600 hover:underline dark:text-blue-500"
                        >
                          Edit
                        </Link>
                        <button className="font-medium text-red-600 dark:text-red-500">
                          Delete
                        </button>
                      </td>
                    </tr>
                  </tbody>
                );
              })}
            </table>
          </div>
          <div className="mt-6 flex justify-center">
            <nav aria-label="Page navigation example">
              <ul className="inline-flex -space-x-px">
                <li>
                  <Link
                    to={`/students?page=${page - 1}`}
                    className={
                      page === 1
                        ? "cursor-not-allowed rounded-l-lg border border-gray-300 py-2 px-3 leading-tight  bg-gray-100 text-gray-700 "
                        : " rounded-l-lg border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 "
                    }
                  >
                    Previous
                  </Link>
                </li>

                {[...Array(totalPages).keys()].map((_, index) => {
                  const isActive = index + 1 === page;
                  return (
                    <li key={index}>
                      <Link
                        // className="border border-gray-300 bg-white py-2 px-3 leading-tight  text-gray-500  hover:bg-gray-100  hover:text-gray-700"
                        className={
                          isActive
                            ? "border border-gray-300 py-2 px-3 leading-tight   bg-gray-100  text-gray-700"
                            : "border border-gray-300 bg-white py-2 px-3 leading-tight  text-gray-500  hover:bg-gray-100  hover:text-gray-700"
                        }
                        to={`/students?page=${index + 1}`}
                      >
                        {index + 1}
                      </Link>
                    </li>
                  );
                })}
                <li>
                  <Link
                    className={
                      page === totalPages
                        ? "rounded-r-lg border border-gray-300 py-2 px-3 leading-tight bg-gray-100 text-gray-700 cursor-not-allowed"
                        : "rounded-r-lg border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 "
                    }
                    to={`/students?page=${page + 1}`}
                  >
                    Next
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </>
      )}
    </div>
  );
}
