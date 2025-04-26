import { UserCard } from "./UserCard";
import { ChevronRight } from "lucide-react";

interface User {
  id: string;
  name: string;
  profession: string;
  rating: number;
  location: string;
  latitude: number;
  longitude: number;
}

const ProfessionalsSection = ({
  category,
  users,
}: {
  category: string;
  users: User[];
}) => {
  return (
    <section className="my-12 px-1">
      <div className="flex items-center justify-between mb-6 border-b border-muted pb-2">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          {category}
        </h2>
        <button className="flex items-center gap-1 text-sm text-primary hover:text-primary/80 font-medium transition-colors group">
          View All
          <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8">
        {users.slice(0, 4).map((user) => (
          <div
            key={user.id}
            className="transform hover:-translate-y-1 transition-transform duration-300"
          >
            <UserCard user={user} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProfessionalsSection;
