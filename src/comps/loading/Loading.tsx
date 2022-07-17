import {FC} from 'react'

const Loading:FC = () => {
  return (
    <div className='fixed inset-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center z-10'>
        <div className='w-24 h-24 bg-slate-200 rounded-full animate-ping'></div>
    </div>
  )
}

export default Loading