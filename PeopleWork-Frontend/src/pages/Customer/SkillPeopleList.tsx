import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Pagination from "@/lib/pagination";
import { UserCard } from "@/components/molecules/UserCard"; // Assuming this is your user card component

interface User {
  id: number;
  name: string;
  profession: string;
  rating: number;
  location: string;
}

const SkilledPeoplePage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  // Get the profession from the query parameters
  const location = useLocation();
  const professionQuery = new URLSearchParams(location.search).get(
    "profession"
  );

  useEffect(() => {
    // Simulating fetching users (replace with your actual data fetching)
    const fetchUsers = () => {
      const allUsers = [
        {
          id: 1,
          name: "John Doe",
          profession: "Electrician",
          rating: 4.5,
          location: "New York",
        },
        {
          id: 2,
          name: "Jane Smith",
          profession: "Electrician",
          rating: 3.9,
          location: "Los Angeles",
        },
        {
          id: 3,
          name: "Alex Brown",
          profession: "Plumber",
          rating: 4.7,
          location: "Chicago",
        },
        {
          id: 4,
          name: "Chris Green",
          profession: "Plumber",
          rating: 5.0,
          location: "San Francisco",
        },
        {
          id: 5,
          name: "Lisa White",
          profession: "Electrician",
          rating: 4.2,
          location: "Miami",
        },
        {
          id: 6,
          name: "James Black",
          profession: "Plumber",
          rating: 4.0,
          location: "Houston",
        },
        // Add more users here...
      ];
      setUsers(allUsers);
      setFilteredUsers(allUsers); // Initially showing all users
      setTotalPages(Math.ceil(allUsers.length / 4)); // Set total pages based on user data
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    // Filter users based on the profession query parameter
    if (professionQuery) {
      setFilteredUsers(
        users.filter((user) =>
          user.profession.toLowerCase().includes(professionQuery.toLowerCase())
        )
      );
    } else {
      setFilteredUsers(users);
    }
    setTotalPages(Math.ceil(filteredUsers.length / 4)); // Recalculate total pages based on filtered data
  }, [professionQuery, users]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * 4,
    currentPage * 4
  ); // Get the users for the current page

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6 text-center">
        {professionQuery
          ? `Showing ${professionQuery}s`
          : "Showing Professionals"}
      </h1>

      {/* Skilled People Cards in a Single Column */}
      <div className="space-y-8">
        {paginatedUsers.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>

      {/* Pagination Component */}
      <div className="mt-8 flex justify-center">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default SkilledPeoplePage;
