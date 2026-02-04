import { SignIn } from "./pages/SignIn.jsx";
import { InfoProvider } from "./providers/InfoProvide.jsx";
import './i18n';

function App() {
  return (
    <InfoProvider>
      <SignIn></SignIn>
    </InfoProvider>
  )
 
  }

export default App
