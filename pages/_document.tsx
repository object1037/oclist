import Document, { Html, Head, Main, NextScript, DocumentContext} from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang='en' className="text-gray-100 bg-gray-900">
        <Head>
          <link
            rel="preload"
            href="/fonts/Inter-var.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <meta name='application-name' content='oclist' />
          <meta name='apple-mobile-web-app-capable' content='yes' />
          <meta name='apple-mobile-web-app-status-bar-style' content='default' />
          <meta name='apple-mobile-web-app-title' content='oclist' />
          <meta name='description' content='Manage all online class URLs in one place.' />
          <meta name='format-detection' content='telephone=no' />
          <meta name='mobile-web-app-capable' content='yes' />
          <meta name='msapplication-TileColor' content='#171717' />
          <meta name='msapplication-tap-highlight' content='no' />
          <meta name='theme-color' content='#171717' />

          <link rel='apple-touch-icon' sizes='152x152' href='/apple-touch-icon-152x152.png' />
          <link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png' />

          <link rel='manifest' href='/manifest.json' />
     
          <meta name='twitter:card' content='summary' />
          <meta name='twitter:url' content='https://oclist.vercel.app' />
          <meta name='twitter:title' content='oclist' />
          <meta name='twitter:description' content='Manage all online class URLs in one place.' />
          <meta name='twitter:image' content='https://oclist.vercel.app/icon-512x512.png' />
          <meta name='twitter:creator' content='@object1037' />
          <meta property='og:type' content='website' />
          <meta property='og:title' content='oclist' />
          <meta property='og:description' content='Manage all online class URLs in one place.' />
          <meta property='og:site_name' content='oclist' />
          <meta property='og:url' content='https://oclist.vercel.app' />
          <meta property='og:image' content='https://oclist.vercel.app/icon-512x512.png' />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
