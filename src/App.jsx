import { SignIn } from "./pages/SignIn.jsx";
import { InfoProvider } from "./providers/InfoProvider.jsx";
import { LoadingProvider } from "./providers/LoadingProvider.jsx";
import './i18n';
import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from "./providers/AuthProvider";
import { ProtectedRoute } from "./providers/ProtectedRoute";
function App() {
  return (
    <InfoProvider>
      <LoadingProvider>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<ProtectedRoute><div>ruta protegida</div></ProtectedRoute>} />
            <Route path="/signin" element={<SignIn />} />
          </Routes>
        </AuthProvider>
      </LoadingProvider>
    </InfoProvider>
  )

}

export default App
