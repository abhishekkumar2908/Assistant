import { BoltIcon, SunIcon} from '@heroicons/react/24/outline'

function HomePage() {
  return (
    <div className="flex flex-col justify-start items-center  h-screen px-2 text-white">
      <h1 className="text-5xl font-bold p-4 mb-20 mt-20">My Assistant</h1>
      <div className="flex flex-col items-center  h-screen px-2 text-white">
        <div className="flex flex-col">
          <div className="flex flex-col items-center">
            <SunIcon className="h-8 w-8" />            
            <h2>Examples</h2>
          </div>
          <div className="space-y-2">
            <p className="infoText">"Explain something to me"</p>
            <p className="infoText">"What is this"</p>
            <p className="infoText">"What is your review about India's Prime Minister"</p>
          </div>          
        </div>
    </div>
      

    </div>
  )
}

export default HomePage


