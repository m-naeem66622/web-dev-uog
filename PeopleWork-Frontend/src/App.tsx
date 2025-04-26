import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Dashboard from "@/pages/admin/index";
import AuthProvider from "./context/AuthProvider";
import { ThemeProvider } from "./components/organisms/ThemeProvider";
const Home = () => (
  <div className="flex justify-center items-center flex-col h-screen">
    <h1>Welcome to the Bidding Dashboard</h1>
    <p>Select a dashboard to view:</p>
    <ul className="flex space-x-4 cursor-pointer font-bold">
      <li>
        <Link to="/buyer">Buyer Dashboard</Link>
      </li>
      <li>
        <Link to="/seller">Seller Dashboard</Link>
      </li>
      <li>
        <Link to="/admin">Admin Dashboard</Link>
      </li>
    </ul>
  </div>
);

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
