import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/context/AuthProvider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserTable } from "@/components/admin/UserTable";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserIcon, LogOut, Settings } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: "active" | "inactive";
  dateJoined: string;
  city?: string;
  avatar?: string; // Optional avatar property
}

interface CityData {
  city: string;
  sellers: number;
  customers: number;
}

const Page = () => {
  const { currentUser, handleLogout: authHandleLogout } = useAuth();
  const [loading, setLoading] = useState<{
    sellers: boolean;
    customers: boolean;
  }>({
    sellers: true,
    customers: true,
  });

  // Mock data for sellers
  const [sellers, setSellers] = useState<User[]>([]);
  // Mock data for customers
  const [customers, setCustomers] = useState<User[]>([]);
  // City distribution data
  const [cityData, setCityData] = useState<CityData[]>([]);

  // Simulate data fetching
  useEffect(() => {
    // Fetch sellers
    setTimeout(() => {
      setSellers([
        {
          id: "s1",
          name: "Jane Smith",
          email: "jane.smith@example.com",
          phone: "+1 234-567-8901",
          status: "active",
          dateJoined: "2023-01-15",
          city: "Karachi",
        },
        {
          id: "s2",
          name: "John Doe",
          email: "john.doe@example.com",
          phone: "+1 234-567-8902",
          status: "active",
          dateJoined: "2023-02-20",
          city: "Lahore",
        },
        {
          id: "s3",
          name: "Ahmed Khan",
          email: "ahmed@example.com",
          phone: "+92 300-1234567",
          status: "active",
          dateJoined: "2023-05-12",
          city: "Islamabad",
        },
      ]);
      setLoading((prev) => ({ ...prev, sellers: false }));
    }, 1500);

    // Fetch customers
    setTimeout(() => {
      setCustomers([
        {
          id: "c1",
          name: "Alice Johnson",
          email: "alice@example.com",
          phone: "+1 234-567-8903",
          status: "active",
          dateJoined: "2023-03-10",
          city: "Karachi",
        },
        {
          id: "c2",
          name: "Bob Williams",
          email: "bob@example.com",
          phone: "+1 234-567-8904",
          status: "inactive",
          dateJoined: "2023-04-05",
          city: "Lahore",
        },
        {
          id: "c3",
          name: "Faisal Mahmood",
          email: "faisal@example.com",
          phone: "+92 321-9876543",
          status: "active",
          dateJoined: "2023-06-18",
          city: "Islamabad",
        },
        {
          id: "c4",
          name: "Sara Ali",
          email: "sara@example.com",
          phone: "+92 333-5678901",
          status: "active",
          dateJoined: "2023-07-22",
          city: "Karachi",
        },
      ]);
      setLoading((prev) => ({ ...prev, customers: false }));
    }, 2000);

    // Generate city distribution data
    setTimeout(() => {
      setCityData([
        { city: "Karachi", sellers: 5, customers: 12 },
        { city: "Lahore", sellers: 4, customers: 9 },
        { city: "Islamabad", sellers: 3, customers: 6 },
        { city: "Peshawar", sellers: 2, customers: 4 },
        { city: "Quetta", sellers: 1, customers: 3 },
      ]);
    }, 1000);
  }, []);

  // Handle user operations
  const handleEditUser = (type: "seller" | "customer", user: User) => {
    // In a real application, this would make an API call
    if (type === "seller") {
      setSellers(sellers.map((s) => (s.id === user.id ? user : s)));
    } else {
      setCustomers(customers.map((c) => (c.id === user.id ? user : c)));
    }
    toast("User updated", {
      description: `${user.name} has been successfully updated.`,
    });
  };

  const handleDeleteUser = (type: "seller" | "customer", userId: string) => {
    // In a real application, this would make an API call
    if (type === "seller") {
      setSellers(sellers.filter((s) => s.id !== userId));
    } else {
      setCustomers(customers.filter((c) => c.id !== userId));
    }
    toast("User deleted", {
      description: "The user has been successfully removed",
    });
  };

  const handleLogout = () => {
    authHandleLogout();
    toast("Logged out", {
      description: "You have been successfully logged out",
    });
  };

  // Function to get initials from name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>

        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src={currentUser?.name} />
              <AvatarFallback>
                {currentUser?.name ? getInitials(currentUser.name) : "AD"}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <div className="px-4 py-2">
              <p className="font-medium">{currentUser?.name || "Admin User"}</p>
              <p className="text-sm text-gray-500">
                {currentUser?.email || "admin@example.com"}
              </p>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              <UserIcon className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer text-red-600"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Welcome, {currentUser?.name || "Admin"}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              This is the admin dashboard. Here you can manage sellers and
              customers.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Total Sellers</p>
                <p className="text-2xl font-bold">{sellers.length}</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Total Customers</p>
                <p className="text-2xl font-bold">{customers.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* City Distribution Chart */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>User Distribution by City</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={cityData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="city" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sellers" fill="#3b82f6" name="Sellers" />
              <Bar dataKey="customers" fill="#22c55e" name="Customers" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Tabs defaultValue="sellers" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="sellers">Sellers Management</TabsTrigger>
          <TabsTrigger value="customers">Customers Management</TabsTrigger>
        </TabsList>

        <TabsContent value="sellers">
          <Card>
            <CardHeader>
              <CardTitle>Sellers</CardTitle>
            </CardHeader>
            <CardContent>
              <UserTable
                users={sellers}
                loading={loading.sellers}
                onEdit={(user) => handleEditUser("seller", user)}
                onDelete={(userId) => handleDeleteUser("seller", userId)}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customers">
          <Card>
            <CardHeader>
              <CardTitle>Customers</CardTitle>
            </CardHeader>
            <CardContent>
              <UserTable
                users={customers}
                loading={loading.customers}
                onEdit={(user) => handleEditUser("customer", user)}
                onDelete={(userId) => handleDeleteUser("customer", userId)}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Page;
