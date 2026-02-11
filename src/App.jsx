import { SignIn } from "./pages/SignIn.jsx";
import { InfoProvider } from "./providers/InfoProvider.jsx";
import { LoadingProvider } from "./providers/LoadingProvider.jsx";
import './i18n';

function App() {
  return (
    <InfoProvider>
      <LoadingProvider>
        <SignIn></SignIn>
      </LoadingProvider>
    </InfoProvider>
  )

}

export default App
