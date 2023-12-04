import 'styles/globals.scss'
import type { AppProps } from 'next/app'
import { ClerkProvider, RedirectToSignIn, SignedIn, SignedOut } from "@clerk/nextjs"
import { ThemeProvider } from "next-themes"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider>
      <ThemeProvider attribute='class'>
        <SignedIn>
          <Component {...pageProps} />
        </SignedIn>
        <SignedOut>
          <RedirectToSignIn />
        </SignedOut>
      </ThemeProvider>
    </ClerkProvider>
  )
}
