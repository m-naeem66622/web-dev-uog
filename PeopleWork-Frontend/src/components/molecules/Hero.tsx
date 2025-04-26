import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center bg-gradient-to-b from-primary/5 to-background">
      <div className="container px-4 text-center space-y-8">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Find Skilled Professionals
          <br />
          In Your Area
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Connect with verified local experts for all your home service needs.
          Quality work guaranteed.
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center max-w-lg mx-auto">
          <Input placeholder="What service do you need?" className="md:w-2/3" />
          <Button size="lg" className="md:w-1/3">
            Search
          </Button>
        </div>
      </div>
    </section>
  );
};
