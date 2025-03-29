import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./pages/home";
import About from "./pages/about";
import Profile from "./pages/Profile";
import { ThemeProvider } from "./context/ThemeContext";
import Login from "./pages/login";
import Register from "./pages/register";
import Emotions from "./pages/emotions";
import MoodsNotes from "./pages/MoodsNotes";
import SelfAwareness from "./pages/SelfAwareness";
import StreakTracker from "./pages/StreakTracker";
import EmotionJar from "./components/emotionJar";

import TestComponent from "./pages/prueba";
const App = () => {
  return (
    <ThemeProvider>
      <Router>
          <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/prueba" element={<TestComponent />} />
              <Route path="/about" element={<About />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/emotions" element={<Emotions/>} />
              <Route path="/moods-notes" element={<MoodsNotes />} />
              <Route path="/self-awareness" element={<SelfAwareness />} />
              <Route path="/streak-tracker" element={<StreakTracker />} />
              <Route path="/emotion-jar" element={<EmotionJar />} />
            </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
