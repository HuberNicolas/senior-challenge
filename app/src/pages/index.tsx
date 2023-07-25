import useSWR from 'swr'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'

// own fetcher
const fetcher = (url: string) => fetch(url).then((res) => res.json())


function Index() {
  // access data via SWR from api using defined fetcher
  const { data: jobs } = useSWR<Job[]>('/api/jobs', fetcher)

  // use effects
  const [maxPercent, setMaxPercent] = useState(100)
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([])

  useEffect(() => {
    const filteredData = jobs?.filter((job) => job.percent <= maxPercent + 1) // +1 to include the last job
    if (filteredData) {
      setFilteredJobs(filteredData)
    }
  }, [jobs, maxPercent])

  return (
    <div>
      <nav id="navbar" className="bg-gray-400">
        <div className="w-full flex justify-center">
          <div className="w-1/5 mx-auto">
            <label
              htmlFor="occupation-input"
              className=""
            >
              Set maximal Occupation Rate: {maxPercent}
            </label>
            <input
              type="range"
              className="transparent h-1.5 w-full cursor-pointer appearance-none rounded-lg border-transparent bg-neutral-200"
              id="occupation-input"
              value={maxPercent}
              onChange={(e) => setMaxPercent(parseInt(e.target.value, 10))}

            />
          </div>

        </div>
      </nav>
      <div id="container">
        <h1 className="flex flex-wrap justify-center text-2xl font-bold">Jobs List</h1>
        <div className="flex flex-wrap">
          {filteredJobs.map((job) => (
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
      </div>
    </div>
  )
}

export default Index
