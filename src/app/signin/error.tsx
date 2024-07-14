'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div>
      <h2 className='font-bold'>Something went wrong!</h2>
      <h4>{error.name}</h4>
      <button onClick={() => reset()}>Try again</button>
    </div>
  )
}