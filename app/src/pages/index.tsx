import useSWR from 'swr'

// own fetcher
const fetcher = (url: string) => fetch(url).then((res) => res.json())

// HINT: Story 5: the following might be helpful when working with images
// next/image: https://nextjs.org/docs/basic-features/image-optimization

// HINT: Story 6: these example hooks might be useful as a foundation for the filtering mechanism
// const [maxPercent, setMaxPercent] = useState(100)
// const [filteredJobs, setFilteredJobs] = useState<Job[]>([])
// useEffect(() => {
//   const filteredData = data?.filter((job) => job.percent <= maxPercent)
//   if (filteredData) {
//     setFilteredJobs(filteredData)
//   }
// }, [data, maxPercent])

function Index() {

  // access data via SWR from api using defined fetcher
  const { data: jobs } = useSWR<Job[]>('/api/jobs', fetcher)
  console.log(jobs) // DEBUG

  const jobList = jobs ?? [];

  return (
    <div>
      <h1 className="max-w-sm p-4 m-auto mb-2 text-2xl font-bold">Jobs List</h1>
      <div className="flex flex-wrap">
        {jobList.map((job) => (
          <div className="w-full max-w-sm p-4 m-auto mt-4 border rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700" key={"job" + job.id}>
            <a href={"/jobs/" + job.id}>
              <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">{job.title}</h5>
            </a>
            <p className="font-normal text-gray-900 dark:text-gray-600">{job.company}</p>
            <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">{job.description}</p>
            <p>{"Employment rate: " + job.percent + "%"} </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Index
