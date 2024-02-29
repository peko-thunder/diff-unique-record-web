'use client'
import BothTextArea from '@/components/BothTextArea'
import DiffResult from '@/components/DiffResult'
import DiffTypeSelect from '@/components/DiffTypeSelect'
import DispatchButton from '@/components/DispatchButton'
import UniqueKeySelect from '@/components/UniqueKeySelect'

const Page = () => {
  return (
    <div className="flex flex-col gap-2 w-full p-8 bg-white shadow-md">
      <div className="grid grid-cols-2 gap-2">
        <div className="grid grid-cols-2 gap-2">
          <UniqueKeySelect />
          <DiffTypeSelect />
        </div>
        <DispatchButton />
      </div>
      <BothTextArea />
      <DiffResult />
    </div>
  )
}

export default Page
