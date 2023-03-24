import SideBar from '../components/SideBar'
import '../styles/globals.css'
import {SessionProvider} from "../components/SessionProvider"
import { getServerSession } from 'next-auth'
import {authOptions} from "../pages/api/auth/[...nextauth]"
import Login from '../components/Login'
import ClientProvider from '../components/ClientProvider'

export const metadata = {
  title: 'Assistant',
  description: 'This web app is using chatGPT Api',
}
// children prop is used to render the main cotent of each page within the layout.
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session= await getServerSession(authOptions)
  return (
    <html lang="en">
      <body>
        <SessionProvider session={session}>
          {!session ? (<Login/>):(
        <div className="flex">
          <div className='bg-[#202123] max-w-xs h-screen overflow-y-auto
                          md:min-w-[20rem]'>
            <SideBar/>
          </div>
          {/* {Client provider - notification} */}
          <ClientProvider/>
         
        <div className='bg-[#484950] flex-grow'>         
          {children}        
        </div>      
        
        </div>
          )}
        </SessionProvider>
        </body>
    </html>
  )
}
