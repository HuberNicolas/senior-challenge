import useSWR from 'swr'
import { useRouter } from 'next/router'
function Details() {
  const router = useRouter();
  const { id } = router.query; // Extract the dynamic 'id' parameter from the router

  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  // Use the dynamic 'id' parameter to construct the API URL
  // access data via SWR from api using defined fetcher
  const { data: job, error } = useSWR<Job, Error>(`/api/jobs/${id}`, fetcher);
  console.log(job)

  // catch error
  if (error) {
    return <div>Error occurred while fetching data.</div>;
  }

  // something went wrong
  if (!job) {
    return <div>Loading...</div>;
  }

  else {
    return (
      <div className="flex flex-col items-center">
        <h1 className="max-w-sm p-4 m-auto mb-2 text-2xl font-bold">Jobs Details</h1>
        <div className="flex flex-wrap mb-2">
          <div className="w-full max-w-sm p-4 m-auto mt-4 border rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700" key={"job" + job.id}>
            <a href={"/jobs/" + job.id}>
              <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">{job.title}</h5>
            </a>
            <p className="font-normal text-gray-900 dark:text-gray-600">{job.company}</p>
            <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">{job.description}</p>
            <p>{"Employment rate: " + job.percent + "%"}</p>
          </div>
        </div>
        <a href="/">
          <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
            Back
          </button>
        </a>
      </div>
    );

  }
}

export default Details
