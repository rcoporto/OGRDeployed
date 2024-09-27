// pages/_app.js
import '../styles/globals.css'; // Ensure you import your global CSS file
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
