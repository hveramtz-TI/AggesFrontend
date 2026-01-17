import Spinner from '@/components/Spinner'

export default function Loading() {
  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <Spinner />
    </div>
  )
}