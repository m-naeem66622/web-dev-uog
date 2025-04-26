import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AdminDashboard from "./pages/Admin"
import BuyerLayout from "./pages/Buyer/BuyerLayout"
import SellerLayout from "./pages/Seller/SellerLayout"

const Home = () => (
  <div className='flex justify-center items-center flex-col h-screen'>
    <h1>Welcome to the Bidding Dashboard</h1>
    <p>Select a dashboard to view:</p>
    <ul className='flex space-x-4 cursor-pointer font-bold'>
      <li><Link to="/buyer">Buyer Dashboard</Link></li>
      <li><Link to="/seller">Seller Dashboard</Link></li>
      <li><Link to="/admin">Admin Dashboard</Link></li>
    </ul>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/buyer" element={<BuyerLayout />} />
        <Route path="/seller" element={<SellerLayout />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
