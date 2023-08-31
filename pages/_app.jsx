import "../styles/main.scss";

/* context imports */
import { ProgramProvider } from "../context/program-context";

/* misc. library imports */
import { CloudCannonConnect } from "@cloudcannon/react-connector";

export default function App({ Component, pageProps }) {
  const AppComponent = CloudCannonConnect(Component);
  return (
    <ProgramProvider>
      <AppComponent {...pageProps} />
    </ProgramProvider>
  );
}
