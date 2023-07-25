import useSWR from 'swr'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'

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

  const [occupation, setOccupation] = useState(100);

  useEffect(() => {
    console.log(occupation);
  })

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
            <Link href={"/jobs/" + job.id} passHref>
              <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">{job.title}</h5>
            </Link>
            <p className="font-normal text-gray-900 dark:text-gray-600">{job.company}</p>
            <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">{job.description}</p>
            <p>{"Employment rate: " + job.percent + "%"} </p>
            <div className="flex flex-wrapjustify-center">
              <Image
                src={job.logoURL}
                width={190}
                height={80}
                alt={"Logo from " + job.company}
              />
            </div>
          </div>
        ))}
      </div>
      <div>
        <label
          htmlFor="occupation-input"
          className="mb-2 inline-block text-neutral-700 dark:text-neutral-200"
        >
          Occupation Rate
        </label>
        <input
          type="range"
          className="transparent h-1.5 w-full cursor-pointer appearance-none rounded-lg border-transparent bg-neutral-200"
          id="occupation-input"
          value={occupation}
          onChange={(e) => setOccupation(parseInt(e.target.value, 10))}
        />
      </div>
    </div>
  )
}

export default Index
