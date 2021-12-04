import type { NextPage } from 'next'
import Navbar from './navbar'
const Layout: NextPage = ({children}) => {
  return (
    <div>
    
  <Navbar/>
   {children}
     
    </div>
  )
}

export default Layout
