import { useState, useEffect } from "react";
import { SearchBar } from "./SearchBar";
import { MapSection } from "../organisms/MapSelection";
import { useUserLocations } from "@/hooks/useUserLocation";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { MapPin, Search } from "lucide-react";

export function HeroSection() {
  const [search, setSearch] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const {
    users,
  }: {
    users: {
      id: string;
      name: string;
      latitude: number;
      longitude: number;
      profession: string;
    }[];
  } = useUserLocations();

  // Add animation on component mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const filteredUsers = users.filter((user) =>
    user.profession.toLowerCase().includes(search.toLowerCase())
  );

  // Common professions for quick selection
  const popularProfessions = [
    "Electrician",
    "Plumber",
    "Carpenter",
    "Painter",
    "Gardener",
  ];

  return (
    <section className="w-full min-h-screen relative overflow-hidden bg-gradient-to-br from-background to-primary/5">
      {/* Decorative elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-secondary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 py-16 px-6 relative z-10">
        {/* Left Side - Enhanced Search */}
        <motion.div
          className="flex flex-col justify-center space-y-8"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -50 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="space-y-4">
            <motion.div
              className="inline-block bg-primary/10 px-4 py-1 rounded-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <span className="text-primary font-medium text-sm">
                Find Local Experts Near You
              </span>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              Expert Help, <br /> Right At Your Doorstep
            </motion.h1>

            <motion.p
              className="text-muted-foreground text-lg max-w-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              Connect with skilled professionals in your area for all your
              household and service needs.
            </motion.p>
          </div>

          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <div className="relative">
              <SearchBar
                value={search}
                onChange={setSearch}
                className="shadow-lg hover:shadow-xl transition-shadow rounded-xl p-4 border border-border/40"
                placeholder="Search by profession (e.g., Electrician)"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                <Button size="sm" className="rounded-lg">
                  <Search className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="text-sm text-muted-foreground mt-1">
                Popular:
              </span>
              {popularProfessions.map((profession) => (
                <button
                  key={profession}
                  onClick={() => setSearch(profession)}
                  className={`text-xs px-3 py-1 rounded-full border transition-colors ${
                    search === profession
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border hover:border-primary/50 hover:bg-primary/5"
                  }`}
                >
                  {profession}
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="pt-4 flex items-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <div className="flex -space-x-2">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className={`w-8 h-8 rounded-full border-2 border-background ${
                    i === 0 ? "bg-primary" : 
                    i === 1 ? "bg-secondary" : 
                    i === 2 ? "bg-accent" : 
                    "bg-muted"
                  }`}
                ></div>
              ))}
            </div>
            <div className="text-sm">
              <span className="font-bold">{users.length}+ professionals</span>
              <span className="text-muted-foreground"> ready to help</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Side - Enhanced Map */}
        <motion.div
          className="w-full h-[500px] rounded-2xl overflow-hidden shadow-2xl border border-border/40 relative"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 50 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
        >
          <div className="absolute inset-0 z-10">
            <MapSection users={filteredUsers} />
          </div>

          <div className="absolute bottom-4 left-4 right-4 bg-background/80 backdrop-blur-sm p-4 rounded-xl border border-border/40 z-20">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              <div>
                <h3 className="font-medium">Near You</h3>
                <p className="text-sm text-muted-foreground">
                  {filteredUsers.length} {search ? search : "professionals"} in
                  your area
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
