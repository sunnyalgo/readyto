import { type FC} from 'react'
import {ThemeProvider as NextThemesProvider} from "next-themes";

import { Header } from './Header'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { LayoutProps } from './Layout.types'

import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";

const Layout:FC<LayoutProps> = ({ children, selected, onSelectChange }) => {
  
  return (
    <NextThemesProvider attribute="class" defaultTheme="dark">
      <div className="bg-white dark:bg-gray-900 w-full border-b border-gray-200 dark:border-gray-600 min-h-screen">
        <Header />
        <div className="md:flex mx-4">
          <Navbar selected={selected} onSelectChange={onSelectChange}/>
          { children }
        </div>
        <Footer />
        <ToastContainer hideProgressBar position='top-right' autoClose={1000}/>
      </div>
    </NextThemesProvider>
  )
}

export default Layout;