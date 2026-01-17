import React from 'react'
import Calendar from '@/components/Calendar'

type Props = {}

const page = (props: Props) => {
  return (
    <div className='min-h-screen bg-[var(--color-light-gray)]'>
      <Calendar />
    </div>
  )
}

export default page