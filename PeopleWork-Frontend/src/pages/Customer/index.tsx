import Header from "@/components/molecules/CustomerHeader";
import { HeroSection } from "@/components/molecules/CustomerHero";
import ProfessionalsSection from "@/components/molecules/ProfessionalSelection";

const users = [
  {
    id: "1",
    name: "John Doe",
    profession: "Electrician",
    rating: 4.5,
    location: "New York",
    latitude: 40.7128,
    longitude: -74.006,
  },
  {
    id: "2",
    name: "Jane Smith",
    profession: "Electrician",
    rating: 3.9,
    location: "Los Angeles",
    latitude: 34.0522,
    longitude: -118.2437,
  },
  {
    id: "3",
    name: "Alex Brown",
    profession: "Plumber",
    rating: 4.7,
    location: "Chicago",
    latitude: 41.8781,
    longitude: -87.6298,
  },
  {
    id: "4",
    name: "Chris Green",
    profession: "Plumber",
    rating: 5.0,
    location: "San Francisco",
    latitude: 37.7749,
    longitude: -122.4194,
  },
  {
    id: "5",
    name: "Lisa White",
    profession: "Electrician",
    rating: 4.2,
    location: "Miami",
    latitude: 25.7617,
    longitude: -80.1918,
  },
  {
    id: "6",
    name: "James Black",
    profession: "Plumber",
    rating: 4.0,
    location: "Houston",
    latitude: 29.7604,
    longitude: -95.3698,
  },
];

const Page = () => {
  return (
    <div>
      <Header />
      <HeroSection />
      <div className="p-6">
        <ProfessionalsSection category="Electricians" users={users} />
        <ProfessionalsSection category="Plumbers" users={users} />
      </div>
    </div>
  );
};
export default Page;
