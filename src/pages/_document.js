import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="dark:bg-gray-800 dark:text-gray-300">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}