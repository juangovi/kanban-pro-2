import { SignIn } from "./pages/SignIn.jsx";
import { InfoProvider } from "./providers/InfoProvider.jsx";
import { LoadingProvider } from "./providers/LoadingProvider.jsx";
import './i18n';
import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from "./providers/AuthProvider";
import { ProtectedRoute } from "./providers/ProtectedRoute";
import { Dashboard } from "./pages/Dashboard.jsx";
import { ModalProvider } from "./providers/ModalProvider";
function App() {
  return (
    <InfoProvider>
      <ModalProvider>
        <LoadingProvider>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/signin" element={<SignIn />} />
            </Routes>
          </AuthProvider>
        </LoadingProvider>
      </ModalProvider>
    </InfoProvider>
  )

}

export default App
