/* Next.js imports */
import Document, { Html, Head, Main, NextScript } from "next/document";
// import { Inter, Merriweather } from "@next/font/google";

// const inter = Inter();
// const merriweather = Merriweather({
//   weight: ["400", "700"],
//   style: ["normal", "italic"]
// });
export default class MyDocument extends Document {
  render() {
    return (
      // <Html className={[inter.className, merriweather.className]}>
      <Html lang="en">
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Merriweather:ital,wght@0,400;0,700;1,400&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
