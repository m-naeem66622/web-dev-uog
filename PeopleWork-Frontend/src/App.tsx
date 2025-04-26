import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "@/pages/admin/index";
import AuthProvider from "./context/AuthProvider";
import { ThemeProvider } from "./components/organisms/ThemeProvider";
import Home from "@/pages/common/Home";

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="peopleWork-ui-theme">
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<Dashboard />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
