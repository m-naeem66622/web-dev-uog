import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { SearchIcon } from "lucide-react";
import { useState, useEffect } from "react";

export const AnimatedHero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [animateButton, setAnimateButton] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  const handleSearchFocus = () => {
    setAnimateButton(true);
    setTimeout(() => setAnimateButton(false), 1000);
  };

  return (
    <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden">
      {/* Dynamic background with gradient and animated elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-background to-background z-0">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className={cn(
                "absolute rounded-full bg-primary/5",
                "animate-pulse"
              )}
              style={{
                width: `${Math.random() * 200 + 50}px`,
                height: `${Math.random() * 200 + 50}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDuration: `${Math.random() * 10 + 5}s`,
                animationDelay: `${Math.random() * 5}s`,
                opacity: Math.random() * 0.5,
                transform: `scale(${Math.random() * 0.5 + 0.5})`,
              }}
            />
          ))}
        </div>

        {/* Light rays effect */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className={cn(
              "absolute -top-[10%] left-1/2 -translate-x-1/2 w-[200%] h-[120%]",
              "bg-gradient-to-b from-primary/30 to-transparent opacity-20",
              "transform rotate-180 scale-x-150",
              "animate-pulse duration-10000"
            )}
          ></div>
        </div>
      </div>

      <div className="container px-4 z-10 space-y-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1
            className={cn(
              "text-4xl md:text-7xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70",
              "transition-all duration-1000 transform",
              isLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            )}
          >
            Find Skilled Professionals
            <br />
            In Your Area
          </h1>

          <p
            className={cn(
              "text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mt-6",
              "transition-all duration-1000 delay-300",
              isLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            )}
          >
            Connect with verified local experts for all your home service needs.
            <span className="text-primary font-semibold">
              {" "}
              Quality work guaranteed.
            </span>
          </p>

          <div
            className={cn(
              "mt-12 relative z-10 max-w-xl mx-auto",
              "transition-all duration-1000 delay-500",
              isLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            )}
          >
            <div className="relative">
              {/* Glowing effect around the search */}
              <div
                className={cn(
                  "absolute inset-0 bg-primary/20 rounded-lg blur-xl",
                  "transition-opacity duration-1000",
                  animateButton ? "opacity-70" : "opacity-0"
                )}
              ></div>

              <div className="relative flex flex-col md:flex-row gap-4 items-center">
                <div className="relative w-full md:w-2/3">
                  <Input
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onFocus={handleSearchFocus}
                    placeholder="What service do you need?"
                    className="pl-12 py-7 text-lg rounded-lg shadow-lg border-primary/20 focus:border-primary transition-all"
                  />
                  <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />

                  {/* Search suggestions */}
                  {searchValue && (
                    <div className="absolute top-full left-0 w-full mt-1 bg-background rounded-lg shadow-lg border border-border overflow-hidden z-20">
                      {["Electrician", "Plumber", "Carpenter"].map(
                        (suggestion, i) => (
                          <div
                            key={i}
                            className="px-4 py-3 cursor-pointer hover:bg-primary/5 transition-colors"
                            onClick={() => setSearchValue(suggestion)}
                          >
                            {suggestion}
                          </div>
                        )
                      )}
                    </div>
                  )}
                </div>

                <Button
                  size="lg"
                  className={cn(
                    "w-full md:w-1/3 py-7 text-lg rounded-lg shadow-lg bg-primary",
                    "relative overflow-hidden hover:scale-105 transition-all",
                    animateButton && "animate-pulse"
                  )}
                >
                  <span className="relative z-10">Search</span>
                  {/* Animated shine effect */}
                  <div className="absolute inset-0 w-full h-full">
                    <div
                      className={cn(
                        "absolute -inset-[100%] bg-gradient-to-r from-transparent via-white/20 to-transparent",
                        "animate-[shine_3s_ease-in-out_infinite]"
                      )}
                    ></div>
                  </div>
                </Button>
              </div>
            </div>

            {/* Popular searches */}
            <div
              className={cn(
                "mt-6 flex flex-wrap justify-center gap-2",
                "transition-all duration-1000 delay-700",
                isLoaded ? "opacity-100" : "opacity-0"
              )}
            >
              <span className="text-muted-foreground">Popular:</span>
              {["Electrician", "Plumber", "Carpenter", "Painter"].map(
                (term, i) => (
                  <button
                    key={i}
                    onClick={() => setSearchValue(term)}
                    className="text-primary hover:underline transition-colors"
                  >
                    {term}
                  </button>
                )
              )}
            </div>
          </div>
        </div>

        {/* Animated down arrow */}
        <div
          className={cn(
            "absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0 transform translate-y-10",
            "transition-all duration-1000 delay-1000",
            isLoaded && "opacity-100 translate-y-0"
          )}
        >
          <div className="animate-bounce p-2 bg-background rounded-full shadow-lg">
            <svg
              className="h-6 w-6 text-primary"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};
