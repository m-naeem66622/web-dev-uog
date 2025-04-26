import { useAuth } from "@/components/AuthProvider";
import { useCallback } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const { currentUser, handleLogout, isLoading } = useAuth();

  const logout = useCallback(async () => {
    await handleLogout();
  }, [handleLogout]);

  return (
    <div className="flex justify-center items-center flex-col h-screen">
      <h1 className="text-2xl font-bold mb-4">
        Welcome to the marketplace Dashboard
      </h1>

      {isLoading ? (
        <p>Loading authentication status...</p>
      ) : currentUser ? (
        <div className="text-center mb-4">
          <p className="mb-2">
            Logged in as:{" "}
            <span className="font-semibold">{currentUser.email}</span>
          </p>
          <p className="mb-4">
            Role: <span className="font-semibold">{currentUser.role}</span>
          </p>
          <button
            onClick={logout}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="mb-4">
          <Link
            to="/login"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Login
          </Link>
        </div>
      )}

      <p className="mt-4">Select a dashboard to view:</p>
      <ul className="flex space-x-4 cursor-pointer font-bold mt-2">
        <li>
          <Link to="/customer" className="text-blue-600 hover:underline">
            Buyer Dashboard
          </Link>
        </li>
        <li>
          <Link to="/seller" className="text-blue-600 hover:underline">
            Seller Dashboard
          </Link>
        </li>
        <li>
          <Link to="/admin" className="text-blue-600 hover:underline">
            Admin Dashboard
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Home;
