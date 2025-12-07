import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import LoggedInRoutes from "./components/LoggedInRoutes";
import Profile from "./pages/Profile";
import CreateQuiz from "./pages/CreateQuiz";
import DashboardLayout from "./components/DashboardLayout";
import CreateQuestions from "./pages/CreateQuestions";
import AdminQuizes from "./pages/AdminQuizes";
import AttemptQuiz from "./pages/AttemptQuiz";
import QuizResult from "./pages/QuizResult";
import { useSelector } from "react-redux";
import History from "./pages/History";
import HomePage from "./pages/Homepage";
import Leaderboard from "./pages/Leaderboard";

function App() {
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    // Disable right-click
    const handleContextMenu = (e) => {
      e.preventDefault();
      return false;
    };

    // Disable common copy shortcuts
    const handleKeyDown = (e) => {
      if (
        (e.ctrlKey && (e.key === 'c' || e.key === 'C')) ||
        (e.ctrlKey && (e.key === 'u' || e.key === 'U')) ||
        (e.ctrlKey && e.shiftKey && (e.key === 'i' || e.key === 'I')) ||
        e.key === 'F12'
      ) {
        e.preventDefault();
        return false;
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className=" bg-slate-950 text-white"
      onCopy={(e) => e.preventDefault()}
      onCut={(e) => e.preventDefault()}
      onPaste={(e) => e.preventDefault()}
    >
      <div className="px-0 mx-auto min-h-screen ">
        <Routes>
          <Route index path="/home" element={<HomePage />} />
          <Route
            path="/"
            element={
              <LoggedInRoutes>
                <Home />
              </LoggedInRoutes>
            }
          />
          <Route
            path="/quiz/:id"
            element={
              <LoggedInRoutes>
                <AttemptQuiz />
              </LoggedInRoutes>
            }
          />

          <Route
            path="/quiz/:id/leaderboard"
            element={
              <LoggedInRoutes>
                <Leaderboard />
              </LoggedInRoutes>
            }
          />
          <Route
            path="/quiz-results"
            element={
              <LoggedInRoutes>
                <QuizResult />
              </LoggedInRoutes>
            }
          />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard">
            <Route
              index
              element={
                <LoggedInRoutes>
                  <DashboardLayout>
                    <Profile />
                  </DashboardLayout>
                </LoggedInRoutes>
              }
            />
            <Route
              path="history"
              element={
                <LoggedInRoutes>
                  <DashboardLayout>
                    <History />
                  </DashboardLayout>
                </LoggedInRoutes>
              }
            />
            <Route
              path="create-quiz"
              element={
                <LoggedInRoutes>
                  <DashboardLayout>
                    <CreateQuiz />
                  </DashboardLayout>
                </LoggedInRoutes>
              }
            />
            <Route
              path="create-quiz/:id"
              element={
                <LoggedInRoutes>
                  <DashboardLayout>
                    <CreateQuestions />
                  </DashboardLayout>
                </LoggedInRoutes>
              }
            />
            <Route
              path="quizes"
              element={
                <LoggedInRoutes>
                  <DashboardLayout>
                    <AdminQuizes />
                  </DashboardLayout>
                </LoggedInRoutes>
              }
            />
            <Route
              path="edit-quiz/:id"
              element={
                <LoggedInRoutes>
                  <DashboardLayout>
                    <CreateQuiz />
                  </DashboardLayout>
                </LoggedInRoutes>
              }
            />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
