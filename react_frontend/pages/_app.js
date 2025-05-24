import "../styles/globals.css";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "../utils/authProvider";

const App = ({ Component, pageProps }) => {
  return (
    <AuthProvider>
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
