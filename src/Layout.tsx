import React from 'react'
import Header from './components/Header'



const Layout = ({children}:{children:React.ReactNode}) => {
   
    return (
        <div>
          
            {children}
          
        </div>
    )
}

export default Layout