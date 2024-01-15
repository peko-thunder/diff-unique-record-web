import { useParseResultContext } from '@/context/ParseResultContext'

const ErrorMessage = () => {
  const [parseResult] = useParseResultContext()
  const errorMessages = Object.values(parseResult)
    .map((result) => result.message)
    .filter((message): message is string => message !== undefined)

  return (
    <>
      {errorMessages.length ? (
        <ul className="mt-10 mb-10 text-red-500">
          {errorMessages.map((message, i) => (
            <li key={i}>{message}</li>
          ))}
        </ul>
      ) : undefined}
    </>
  )
}

export default ErrorMessage
