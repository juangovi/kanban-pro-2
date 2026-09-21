import { SignIn } from "./pages/SignIn.jsx";
import { InfoProvider } from "./providers/InfoProvider.jsx";
import { LoadingProvider } from "./providers/LoadingProvider.jsx";
import './i18n';
import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from "./providers/AuthProvider";
import { ProtectedRoute } from "./providers/ProtectedRoute";
import { Dashboard } from "./pages/Dashboard.jsx";
import { Projects } from "./pages/Projects.jsx";
import { Board } from "./pages/Board.jsx";
import { ModalProvider } from "./providers/ModalProvider";
function App() {
  return (
    <LoadingProvider>
      <InfoProvider>
        <ModalProvider>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}>
                <Route index element={<Projects />} />
                <Route path="projects" element={<Projects />} />
                <Route path="board/:id" element={<Board />} />
              </Route>
              <Route path="/signin" element={<SignIn />} />
            </Routes>
          </AuthProvider>
        </ModalProvider>
      </InfoProvider>
    </LoadingProvider>
  )

}

export default App
