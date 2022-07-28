import { useRouter } from 'next/router'
import useGolfer from '../../lib/useGolfer'
import useGolferScores from '../../lib/useGolferScores'
import Layout from '../../components/Layout'
import ScoreCard from '../../components/ScoreCard'

const GolferProfile = () => {
  const router = useRouter()
  const { id } = router.query

  const { user, error: errorGolfer } = useGolfer(id)
  const { scores, error: errorScores } = useGolferScores(id)

  return (
    <Layout title={user?.name}>
      <>
        {errorGolfer ? (
          errorGolfer.info.errors
        ) : (errorScores ? (
          errorScores.info.errors
        ) : (
          <>
            {scores && scores.map(score => (
              <ScoreCard
                key={score.id}
                id={score.id}
                totalScore={score.total_score}
                playedAt={score.played_at}
                userId={score.user_id}
                userName={score.user_name}
              />
            ))}
          </>
        ))}
      < />
    </Layout>
  )
}

export default GolferProfile
