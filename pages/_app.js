import Layout from "../components/Layout.js";
import Loader from "../components/Loader.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";
import { Provider } from "../contexts/index.js";

function MyApp({ Component, pageProps }) {
  return (
    <Provider>
      <Loader>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Loader>
    </Provider>
  );
}

export default MyApp;
