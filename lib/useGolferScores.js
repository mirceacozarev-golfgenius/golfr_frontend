import useSWR from 'swr'
import { getToken } from './userAuth'
import { GOLFERS_URL } from './useGolfer'

const useGolferScores = id => {
  const fetcher = async url => {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })

    if (!res.ok) {
      const error = new Error('An error occurred while fetching the data.')
      // Attach extra info to the error object.
      error.info = await res.json()
      error.status = res.status
      throw error
    }
    return res.json()
      .then(data => data.scores)
  }

  const { data, error } = useSWR(`${GOLFERS_URL}/${id}/scores`, fetcher)

  return {
    scores: data,
    error: error,
  }
}

export default useGolferScores
