'use client'
import BothTextArea from '@/components/BothTextArea'
import DiffResult from '@/components/DIffResult'
import DispatchButton from '@/components/DispatchButton'
import ErrorMessage from '@/components/ErrorMessage'
import KeyCheckbox from '@/components/KeyCheckbox'
import { BothTextProvider } from '@/context/BothTextContext'
import { ParseResultProvider } from '@/context/ParseResultContext'
import { UniqueKeyProvider } from '@/context/UniqueKeyContext'
import { ReactNode } from 'react'

const Provider = ({ children }: { children: ReactNode }) => {
  return (
    <BothTextProvider>
      <ParseResultProvider>
        <UniqueKeyProvider>{children}</UniqueKeyProvider>
      </ParseResultProvider>
    </BothTextProvider>
  )
}

const Home = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full font-mono text-sm">
        <Provider>
          <ErrorMessage />
          <KeyCheckbox />
          <DispatchButton />
          <BothTextArea />
          <DiffResult />
        </Provider>
      </div>
    </main>
  )
}

export default Home
