'use client'
import BothTextArea from '@/components/BothTextArea'
import DiffResult from '@/components/DIffResult'
import DiffTypeSelect from '@/components/DiffTypeSelect'
import DispatchButton from '@/components/DispatchButton'
import UniqueKeySelect from '@/components/UniqueKeySelect'
import { MultiSelectProvider } from '@/context/MultiSelectContext'
import { TextParseProvider } from '@/context/TextParseContext'
import { ReactNode } from 'react'

const Provider = ({ children }: { children: ReactNode }) => {
  return (
    <MultiSelectProvider>
      <TextParseProvider>{children}</TextParseProvider>
    </MultiSelectProvider>
  )
}

const Home = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Provider>
        <div className="flex flex-col gap-2 max-w-5xl w-full ">
          <div className="flex justify-between">
            <div className="flex gap-2">
              <UniqueKeySelect />
              <DiffTypeSelect />
            </div>
            <DispatchButton />
          </div>
          <BothTextArea />
          <DiffResult />
        </div>
      </Provider>
    </main>
  )
}

export default Home
