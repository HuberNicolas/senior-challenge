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
      <div>
        <h1>{job.title}</h1>
        <p>{job.description}</p>
      </div>
    )
  }
}

export default Details
