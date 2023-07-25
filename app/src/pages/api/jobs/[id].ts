import type { NextApiRequest, NextApiResponse } from 'next'

import { JOBS } from '../../../data'
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Job | { error: string }>
) {
  // get query parameter
  const { id } = req.query

  // parse to int
  const jobId = parseInt(id as string, 10);

  // number of jobs to define upper border
  const jobNumber = Object.keys(JOBS).length + 1;

  // validation: number && >= 1 && <= #jobs
  if (isNaN(jobId) || jobId < 1 || jobId >= jobNumber) {
    // If the provided ID is not valid, return an error response
    res.status(404).json({ error: 'Job not found' }); // resolving by adding another type for response
  } else {
    // Return the job with the specified ID
    res.status(200).json(JOBS[jobId]);
  }
}
