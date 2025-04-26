import {
  Briefcase,
  Check,
  Home,
  Lightbulb,
  MapPin,
  ShieldCheck,
  Star,
  Users,
  Wrench,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Navigation } from "@/components/molecules/Navigation";
import { AnimatedHero } from "@/components/molecules/AnimatedHero";
import { AnimatedSection } from "@/components/molecules/AnimatedSection";
import { SectionTitle } from "@/components/molecules/SectionTitle";
import { ServiceCard } from "@/components/molecules/ServiceCard";
import { WorkerCard } from "@/components/molecules/WorkerCard";
import { AnimatedFAQ } from "@/components/molecules/AnimatedFaq";

const services = [
  {
    icon: Lightbulb,
    title: "Electricians",
    description: "Professional electrical services for your home or business",
  },
  {
    icon: Wrench,
    title: "Plumbers",
    description: "Expert plumbing solutions for any issue",
  },
  {
    icon: Briefcase,
    title: "Carpenters",
    description: "Quality carpentry and woodworking services",
  },
];

const workers = [
  {
    name: "John Smith",
    profession: "Electrician",
    rating: 4.9,
    location: "New York, NY",
    imageUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  },
  {
    name: "Sarah Johnson",
    profession: "Plumber",
    rating: 4.8,
    location: "Los Angeles, CA",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  },
  {
    name: "Mike Davis",
    profession: "Carpenter",
    rating: 4.7,
    location: "Chicago, IL",
    imageUrl:
      "https://images.unsplash.com/photo-1500048993953-d23a436266cf?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  },
];

const testimonials = [
  {
    quote:
      "Found an amazing electrician within hours. The service was fantastic!",
    author: "Emily Wilson",
    role: "Homeowner",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  },
  {
    quote: "Quality work, reliable professionals, and great customer service.",
    author: "David Chen",
    role: "Business Owner",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  },
];

const faqs = [
  {
    question: "How does the booking process work?",
    answer:
      "Simply search for your needed service, browse available professionals, and book directly through our platform. You can choose based on reviews, pricing, and availability.",
  },
  {
    question: "Are the professionals verified?",
    answer:
      "Yes, all professionals undergo thorough background checks and must provide proper certification and insurance documentation before joining our platform.",
  },
  {
    question: "What if I'm not satisfied with the service?",
    answer:
      "We offer a satisfaction guarantee. If you're not happy with the service, we'll work to resolve the issue or provide a refund according to our policy.",
  },
  {
    question: "How quickly can I find a professional?",
    answer:
      "Most users find suitable professionals within hours of posting their requirements. In urgent cases, we have professionals available for same-day service in many areas.",
  },
  {
    question: "Do you charge any booking fees?",
    answer:
      "We charge a small service fee that helps us maintain the platform and provide support services. The fee is transparent and shown before you confirm your booking.",
  },
];

const Page = () => {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navigation />

      {/* Hero Section */}
      <AnimatedHero />

      {/* How It Works Section */}
      <AnimatedSection id="how-it-works" animation="fade" bgColor="gradient">
        <SectionTitle
          title="How It Works"
          subtitle="Three simple steps to find the perfect professional for your needs"
          alignment="center"
          size="large"
        />

        <div className="grid md:grid-cols-3 gap-8 mt-16 relative">
          {/* Connecting line between steps */}
          <div className="absolute top-1/4 left-0 w-full h-1 bg-primary/20 hidden md:block" />

          {[
            {
              icon: Star,
              title: "Search",
              text: "Find the service you need",
              delay: 0,
            },
            {
              icon: Users,
              title: "Choose",
              text: "Select from verified professionals",
              delay: 150,
            },
            {
              icon: Check,
              title: "Book",
              text: "Schedule and pay securely",
              delay: 300,
            },
          ].map((step, index) => (
            <div
              key={index}
              className="relative flex flex-col items-center text-center z-10"
              style={{ animationDelay: `${step.delay}ms` }}
            >
              <div className="rounded-full bg-primary/10 p-6 mb-6 shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-500 hover:scale-105 relative">
                <div
                  className="absolute inset-0 rounded-full bg-primary/5 animate-ping opacity-75"
                  style={{ animationDuration: "3s" }}
                ></div>
                <step.icon className="w-10 h-10 text-primary" />
              </div>
              <div className="absolute top-24 left-1/2 -translate-x-1/2 rounded-full bg-background border-4 border-primary/20 w-8 h-8 flex items-center justify-center font-bold text-primary">
                {index + 1}
              </div>
              <h3 className="text-2xl font-semibold mt-6">{step.title}</h3>
              <p className="text-muted-foreground mt-2">{step.text}</p>
            </div>
          ))}
        </div>
      </AnimatedSection>

      {/* Popular Services */}
      <AnimatedSection id="services" animation="slide-up" bgColor="pattern">
        <SectionTitle
          title="Popular Services"
          subtitle="Browse our most requested professional services"
          alignment="center"
          size="large"
        />

        <div className="grid md:grid-cols-3 gap-12 mt-16">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} index={index} />
          ))}
        </div>
      </AnimatedSection>

      {/* Featured Workers */}
      <AnimatedSection id="workers" animation="slide-left" bgColor="default">
        <SectionTitle
          title="Featured Local Workers"
          subtitle="Top-rated professionals in your area"
          alignment="center"
          size="large"
        />

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          {workers.map((worker, index) => (
            <WorkerCard key={index} {...worker} index={index} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button
            size="lg"
            className="px-8 py-6 text-lg bg-primary hover:bg-primary/90 group relative overflow-hidden"
          >
            <span className="relative z-10">View All Workers</span>
            <span className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-primary w-full h-full transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
          </Button>
        </div>
      </AnimatedSection>

      {/* Trust & Safety */}
      <AnimatedSection animation="slide-up" bgColor="primary">
        <SectionTitle
          title="Trust & Safety"
          subtitle="We ensure quality service and secure interactions"
          alignment="center"
          size="large"
          inverted={true}
        />

        <div className="grid md:grid-cols-3 gap-12 mt-16">
          {[
            {
              icon: ShieldCheck,
              title: "Verified Professionals",
              text: "Background checks & certification verification",
            },
            {
              icon: Star,
              title: "Rated & Reviewed",
              text: "Real feedback from customers",
            },
            {
              icon: Briefcase,
              title: "Secure Payments",
              text: "Protected transactions & satisfaction guarantee",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-lg rounded-lg p-8 text-center shadow-xl transform hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="rounded-full bg-white/20 p-4 w-20 h-20 mx-auto mb-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent rounded-full animate-spin-slow"></div>
                <item.icon className="w-10 h-10 text-white absolute inset-0 m-auto" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-white">
                {item.title}
              </h3>
              <p className="text-white/80">{item.text}</p>
            </div>
          ))}
        </div>
      </AnimatedSection>

      {/* Testimonials with Zigzag Layout */}
      <AnimatedSection animation="fade" bgColor="default">
        <SectionTitle
          title="What Our Customers Say"
          subtitle="Real experiences from satisfied clients"
          alignment="center"
          size="large"
        />

        <div className="mt-16 space-y-16">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`flex flex-col ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              } items-center gap-8 md:gap-12`}
            >
              <div className="w-full md:w-1/3 relative">
                <div className="aspect-square rounded-full overflow-hidden border-8 border-primary/10 relative">
                  <img
                    src={testimonial.image}
                    alt={testimonial.author}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
                </div>
                <div className="absolute -bottom-4 -right-4 bg-primary text-white rounded-full w-16 h-16 flex items-center justify-center text-3xl font-serif">
                  "
                </div>
              </div>

              <div className="w-full md:w-2/3 bg-background/50 backdrop-blur-sm p-8 rounded-lg shadow-lg relative">
                <p className="text-xl italic mb-6">{testimonial.quote}</p>
                <div className="flex items-center">
                  <div>
                    <p className="font-semibold text-lg">
                      {testimonial.author}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                  <div className="ml-auto flex">
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 text-primary fill-primary"
                        />
                      ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </AnimatedSection>

      {/* Why Choose Us with Overlapping Cards */}
      <AnimatedSection animation="slide-up" bgColor="gradient">
        <SectionTitle
          title="Why Choose Us"
          subtitle="Benefits that set us apart"
          alignment="center"
          size="large"
        />

        <div className="relative mt-20 md:mt-32">
          <div className="absolute top-0 left-0 w-full h-full bg-primary/5 -skew-y-3 transform rounded-3xl hidden md:block"></div>

          <div className="grid md:grid-cols-3 gap-8 relative z-10 px-4">
            {[
              {
                icon: Home,
                title: "Fast Matching",
                text: "Find professionals within hours",
              },
              {
                icon: ShieldCheck,
                title: "Vetted Experts",
                text: "All workers are pre-screened",
              },
              {
                icon: MapPin,
                title: "Local Service",
                text: "Support your local community",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className={`bg-background rounded-xl shadow-xl p-8 ${
                  index === 1 ? "md:-mt-12 z-20" : "z-10"
                } transform hover:scale-105 transition-transform duration-300`}
              >
                <div className="rounded-full bg-primary/10 p-4 w-16 h-16 mb-6 flex items-center justify-center">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.text}</p>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* FAQs with Advanced Animations */}
      <AnimatedSection animation="fade" bgColor="default">
        <SectionTitle
          title="Frequently Asked Questions"
          subtitle="Find answers to common questions about our service"
          alignment="center"
          size="large"
        />

        <div className="mt-16">
          <AnimatedFAQ items={faqs} />
        </div>
      </AnimatedSection>

      {/* Final CTA with Glowing Effect */}
      <AnimatedSection id="cta" animation="slide-up" bgColor="primary">
        <div className="container px-4 text-center relative overflow-hidden py-12">
          {/* Background glowing circles */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="absolute rounded-full bg-white/10 blur-3xl"
                  style={{
                    width: `${Math.random() * 300 + 100}px`,
                    height: `${Math.random() * 300 + 100}px`,
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    animationDuration: `${Math.random() * 10 + 15}s`,
                    animationDelay: `${Math.random() * 5}s`,
                    animation: "pulse 10s infinite ease-in-out",
                    opacity: Math.random() * 0.5 + 0.1,
                  }}
                />
              ))}
          </div>

          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
              Find skilled professionals in your area today and get your project
              done right.
            </p>

            <div className="flex flex-col md:flex-row gap-4 justify-center max-w-xl mx-auto">
              <Input
                placeholder="Enter your email"
                className="md:w-2/3 bg-white/20 text-white placeholder:text-white/50 border-white/20 focus:border-white"
              />
              <Button
                size="lg"
                className="md:w-1/3 bg-white hover:bg-white/90 text-primary hover:text-primary/90 text-lg"
              >
                Get Started
              </Button>
            </div>

            <p className="text-white/60 text-sm mt-4">
              By signing up, you agree to our Terms of Service and Privacy
              Policy.
            </p>
          </div>
        </div>
      </AnimatedSection>

      {/* Footer with Modern Layout */}
      <footer className="bg-background/95 backdrop-blur-sm border-t border-t-border/20">
        <div className="container px-4 py-12 md:py-20">
          <div className="grid md:grid-cols-6 gap-8">
            <div className="md:col-span-2">
              <div className="text-2xl font-bold mb-4">
                <span className="text-primary">Skill</span>Finder
              </div>
              <p className="text-muted-foreground mb-4">
                Connecting skilled professionals with clients who need their
                services. Quality work guaranteed.
              </p>
              <div className="flex space-x-4">
                {["Twitter", "Facebook", "Instagram", "LinkedIn"].map(
                  (social) => (
                    <a
                      key={social}
                      href="#"
                      className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
                      aria-label={social}
                    >
                      <span className="sr-only">{social}</span>
                      {/* Simple placeholder for social icons */}
                      <div className="w-5 h-5 flex items-center justify-center">
                        {social.charAt(0)}
                      </div>
                    </a>
                  )
                )}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">About</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Press
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Help Center
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Safety
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Download Our App</h3>
              <div className="space-y-2">
                <a href="#" className="inline-block">
                  <div className="bg-black text-white px-4 py-2 rounded-lg text-left text-sm">
                    <div className="text-xs">Download on the</div>
                    <div className="font-semibold">App Store</div>
                  </div>
                </a>
                <a href="#" className="inline-block">
                  <div className="bg-black text-white px-4 py-2 rounded-lg text-left text-sm">
                    <div className="text-xs">Get it on</div>
                    <div className="font-semibold">Google Play</div>
                  </div>
                </a>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-6 border-t border-border/20 flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-muted-foreground mb-4 md:mb-0">
              © 2024 SkillFinder. All rights reserved.
            </div>
            <div className="text-sm text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors">
                Privacy
              </a>{" "}
              ·
              <a href="#" className="hover:text-primary transition-colors ml-4">
                Terms
              </a>{" "}
              ·
              <a href="#" className="hover:text-primary transition-colors ml-4">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Page;
