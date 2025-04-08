
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { ArrowRight, Check } from "lucide-react";

const Index = () => {
  const [currentTheme, setCurrentTheme] = useState<string>("default");
  
  // Monitor theme changes
  useEffect(() => {
    // Get initial theme
    const storedTheme = localStorage.getItem("colorTheme") || "default";
    setCurrentTheme(storedTheme);
    
    // Listen for theme changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "colorTheme") {
        setCurrentTheme(e.newValue || "default");
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Custom event listener for theme changes within the same window
    const handleCustomThemeChange = (e: CustomEvent) => {
      setCurrentTheme(e.detail.theme || "default");
    };
    
    window.addEventListener('themeChange', handleCustomThemeChange as EventListener);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('themeChange', handleCustomThemeChange as EventListener);
    };
  }, []);

  // Determine hero background based on theme
  const getHeroStyles = () => {
    switch(currentTheme) {
      case "luxury-black-gold":
        return {
          background: "bg-gradient-to-r from-black to-gray-900",
          textColor: "text-amber-100",
          accentClass: "from-amber-500 to-yellow-600",
          borderClass: "border-amber-500" 
        };
      case "sleek-black":
        return {
          background: "bg-gradient-to-r from-gray-900 to-black",
          textColor: "text-white",
          accentClass: "from-gray-700 to-gray-800",
          borderClass: "border-gray-600"
        };
      case "warm-orange":
        return {
          background: "bg-gradient-to-r from-orange-700 to-amber-700",
          textColor: "text-orange-50",
          accentClass: "from-orange-500 to-amber-500",
          borderClass: "border-orange-400"
        };
      case "fresh-green":
        return {
          background: "bg-gradient-to-r from-green-700 to-emerald-700",
          textColor: "text-green-50",
          accentClass: "from-green-500 to-emerald-500",
          borderClass: "border-green-400"
        };
      case "elegant-navy":
        return {
          background: "bg-gradient-to-r from-slate-900 to-blue-900",
          textColor: "text-slate-50",
          accentClass: "from-slate-700 to-blue-700",
          borderClass: "border-slate-400"
        };
      case "modern-green":
        return {
          background: "bg-gradient-to-r from-emerald-900 to-teal-800",
          textColor: "text-emerald-50",
          accentClass: "from-emerald-600 to-teal-600",
          borderClass: "border-emerald-400"
        };
      case "professional-blue":
        return {
          background: "bg-gradient-to-r from-blue-800 to-indigo-900",
          textColor: "text-blue-50",
          accentClass: "from-blue-600 to-indigo-600",
          borderClass: "border-blue-400"
        };
      default: // Default blue theme
        return {
          background: "bg-gradient-to-r from-blue-600 to-indigo-700",
          textColor: "text-white",
          accentClass: "from-blue-500 to-indigo-500",
          borderClass: "border-blue-300"
        };
    }
  };

  const heroStyles = getHeroStyles();
  
  // Determine card styles based on theme
  const getCardStyles = () => {
    if (currentTheme === "luxury-black-gold") {
      return "bg-gradient-to-b from-gray-900 to-black border border-amber-500/30 shadow-[0_0_15px_rgba(251,191,36,0.2)]";
    } else if (currentTheme.includes("black")) {
      return "bg-gradient-to-b from-gray-900 to-black border border-gray-700 shadow-md";
    } else {
      return "bg-white border border-gray-200 shadow-md";
    }
  };
  
  // Determine text color based on theme
  const getTextColor = () => {
    if (currentTheme === "luxury-black-gold") {
      return "text-amber-100";
    } else if (currentTheme.includes("black")) {
      return "text-gray-100";
    } else {
      return "text-gray-600";
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow">
        {/* Hero Section with dynamic styling */}
        <section className={`${heroStyles.background} py-24 relative overflow-hidden`}>
          {/* Gold accents for luxury theme */}
          {currentTheme === "luxury-black-gold" && (
            <div className="absolute inset-0">
              <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-amber-500/10 blur-xl"></div>
              <div className="absolute bottom-10 right-10 w-64 h-64 rounded-full bg-yellow-500/10 blur-xl"></div>
              <div className="absolute top-1/2 left-1/4 w-40 h-40 rounded-full bg-amber-500/5 blur-lg"></div>
            </div>
          )}
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 ${heroStyles.textColor}`}>
                Streamline Your Property Maintenance
              </h1>
              
              {currentTheme === "luxury-black-gold" && (
                <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-yellow-500 mx-auto mb-6"></div>
              )}
              
              <p className={`text-xl md:text-2xl mb-10 max-w-2xl mx-auto ${heroStyles.textColor} opacity-90`}>
                Efficiently manage maintenance requests, track repairs, and keep your properties in pristine condition with CareCrew.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
                <Button size="lg" className="sm:col-span-1" asChild>
                  <Link to="/signup" className="group">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className={`bg-white/10 ${heroStyles.borderClass} sm:col-span-1`} asChild>
                  <Link to="/demo">Request Demo</Link>
                </Button>
                <Button size="lg" variant="secondary" className="sm:col-span-1" asChild>
                  <Link to="/reporter">Reporter Station</Link>
                </Button>
              </div>
            </div>
            
            {/* Optional hero image placeholder */}
            <div className="mt-16 max-w-4xl mx-auto px-4 hidden md:block">
              <div className={`rounded-xl overflow-hidden border ${heroStyles.borderClass} aspect-video bg-gradient-to-br ${heroStyles.accentClass} bg-opacity-10 flex items-center justify-center`}>
                <div className="text-center p-8">
                  <p className={`${heroStyles.textColor} text-lg font-medium`}>Custom hero image placeholder</p>
                  <p className={`${heroStyles.textColor} opacity-70 text-sm`}>Upload your brand image in settings</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Preview with theme-aware styling */}
        <section className={`py-20 ${currentTheme.includes('black') ? 'bg-gray-900' : 'bg-gray-50'}`}>
          <div className="container mx-auto px-4">
            <h2 className={`text-3xl font-bold text-center mb-4 ${currentTheme.includes('black') ? 'text-gray-100' : 'text-gray-800'}`}>
              Comprehensive Maintenance Management
            </h2>
            
            {currentTheme === "luxury-black-gold" && (
              <div className="w-24 h-0.5 bg-gradient-to-r from-amber-400 to-yellow-500 mx-auto mb-6"></div>
            )}
            
            <p className={`text-center mb-12 max-w-2xl mx-auto ${currentTheme.includes('black') ? 'text-gray-300' : 'text-gray-600'}`}>
              Everything you need to keep your properties in perfect condition
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Feature Cards */}
              <div className={`${getCardStyles()} rounded-lg p-8`}>
                <div className={`rounded-full ${currentTheme === "luxury-black-gold" ? "bg-amber-900" : "bg-blue-100"} p-3 w-14 h-14 flex items-center justify-center mb-6`}>
                  <svg className={`w-7 h-7 ${currentTheme === "luxury-black-gold" ? "text-amber-400" : "text-blue-600"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className={`text-xl font-semibold mb-3 ${currentTheme.includes('black') ? 'text-gray-100' : 'text-gray-800'}`}>Task Management</h3>
                <p className={getTextColor()}>Easily create, assign, and track maintenance tasks from request to completion with our intuitive interface.</p>
              </div>
              
              <div className={`${getCardStyles()} rounded-lg p-8`}>
                <div className={`rounded-full ${currentTheme === "luxury-black-gold" ? "bg-amber-900" : "bg-blue-100"} p-3 w-14 h-14 flex items-center justify-center mb-6`}>
                  <svg className={`w-7 h-7 ${currentTheme === "luxury-black-gold" ? "text-amber-400" : "text-blue-600"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className={`text-xl font-semibold mb-3 ${currentTheme.includes('black') ? 'text-gray-100' : 'text-gray-800'}`}>Performance Reports</h3>
                <p className={getTextColor()}>Generate detailed analytical reports to track maintenance performance, costs, and identify areas for improvement.</p>
              </div>
              
              <div className={`${getCardStyles()} rounded-lg p-8`}>
                <div className={`rounded-full ${currentTheme === "luxury-black-gold" ? "bg-amber-900" : "bg-blue-100"} p-3 w-14 h-14 flex items-center justify-center mb-6`}>
                  <svg className={`w-7 h-7 ${currentTheme === "luxury-black-gold" ? "text-amber-400" : "text-blue-600"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className={`text-xl font-semibold mb-3 ${currentTheme.includes('black') ? 'text-gray-100' : 'text-gray-800'}`}>Team Coordination</h3>
                <p className={getTextColor()}>Seamlessly coordinate between administrators, technicians, and reporting stations for maximum efficiency.</p>
              </div>
            </div>
            
            <div className="text-center mt-12">
              <Button asChild>
                <Link to="/features">Explore All Features</Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Pricing Section with theme-aware styling */}
        <section className={`py-20 ${currentTheme.includes('black') ? 'bg-gray-950' : 'bg-white'}`} id="pricing">
          <div className="container mx-auto px-4">
            <h2 className={`text-3xl font-bold text-center mb-4 ${currentTheme.includes('black') ? 'text-gray-100' : 'text-gray-800'}`}>
              Simple, Transparent Pricing
            </h2>
            
            {currentTheme === "luxury-black-gold" && (
              <div className="w-24 h-0.5 bg-gradient-to-r from-amber-400 to-yellow-500 mx-auto mb-6"></div>
            )}
            
            <p className={`text-center mb-12 max-w-2xl mx-auto ${currentTheme.includes('black') ? 'text-gray-300' : 'text-gray-600'}`}>
              Choose the plan that best fits your property management needs
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Trial Plan */}
              <div className={`${getCardStyles()} rounded-lg overflow-hidden transition-all duration-200 hover:shadow-lg`}>
                <div className="p-8">
                  <h3 className={`text-lg font-semibold mb-2 ${currentTheme.includes('black') ? 'text-gray-100' : 'text-gray-800'}`}>Trial</h3>
                  <div className={`text-4xl font-bold mb-4 ${currentTheme.includes('black') ? 'text-gray-100' : 'text-gray-800'}`}>Free</div>
                  <p className={`mb-6 ${getTextColor()}`}>For 3 months, experience all features</p>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-start">
                      <Check className={`w-5 h-5 mr-3 mt-0.5 flex-shrink-0 ${currentTheme === "luxury-black-gold" ? "text-amber-400" : "text-green-500"}`} />
                      <span className={getTextColor()}>1 Admin</span>
                    </li>
                    <li className="flex items-start">
                      <Check className={`w-5 h-5 mr-3 mt-0.5 flex-shrink-0 ${currentTheme === "luxury-black-gold" ? "text-amber-400" : "text-green-500"}`} />
                      <span className={getTextColor()}>3 Maintenance Technicians</span>
                    </li>
                    <li className="flex items-start">
                      <Check className={`w-5 h-5 mr-3 mt-0.5 flex-shrink-0 ${currentTheme === "luxury-black-gold" ? "text-amber-400" : "text-green-500"}`} />
                      <span className={getTextColor()}>1 Reporting Station</span>
                    </li>
                  </ul>
                  <Button className="w-full" asChild>
                    <Link to="/signup">Start Trial</Link>
                  </Button>
                </div>
              </div>
              
              {/* Basic Plan */}
              <div className={`${getCardStyles()} rounded-lg overflow-hidden transition-all duration-200 hover:shadow-lg`}>
                <div className="p-8">
                  <h3 className={`text-lg font-semibold mb-2 ${currentTheme.includes('black') ? 'text-gray-100' : 'text-gray-800'}`}>Basic</h3>
                  <div className={`text-4xl font-bold mb-4 ${currentTheme.includes('black') ? 'text-gray-100' : 'text-gray-800'}`}>£1,400</div>
                  <p className={`mb-6 ${getTextColor()}`}>Per year, all features included</p>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-start">
                      <Check className={`w-5 h-5 mr-3 mt-0.5 flex-shrink-0 ${currentTheme === "luxury-black-gold" ? "text-amber-400" : "text-green-500"}`} />
                      <span className={getTextColor()}>1 Admin</span>
                    </li>
                    <li className="flex items-start">
                      <Check className={`w-5 h-5 mr-3 mt-0.5 flex-shrink-0 ${currentTheme === "luxury-black-gold" ? "text-amber-400" : "text-green-500"}`} />
                      <span className={getTextColor()}>4 Maintenance Technicians</span>
                    </li>
                    <li className="flex items-start">
                      <Check className={`w-5 h-5 mr-3 mt-0.5 flex-shrink-0 ${currentTheme === "luxury-black-gold" ? "text-amber-400" : "text-green-500"}`} />
                      <span className={getTextColor()}>2 Reporting Stations</span>
                    </li>
                  </ul>
                  <Button className="w-full" asChild>
                    <Link to="/signup">Choose Basic</Link>
                  </Button>
                </div>
              </div>
              
              {/* Professional Plan */}
              <div className={`${currentTheme === "luxury-black-gold" 
                ? "bg-gradient-to-b from-gray-900 to-black border border-amber-500/50 shadow-[0_0_20px_rgba(251,191,36,0.3)]" 
                : (currentTheme.includes('black')
                    ? "bg-gradient-to-b from-gray-900 to-black border border-gray-600 shadow-lg"
                    : "bg-blue-50 border border-blue-200 shadow-md"
                  )
                } rounded-lg overflow-hidden transition-all duration-200 hover:shadow-lg`}>
                <div className={`${currentTheme === "luxury-black-gold" ? "bg-amber-500" : "bg-blue-600"} text-white text-center py-2 text-sm font-semibold`}>
                  MOST POPULAR
                </div>
                <div className="p-8">
                  <h3 className={`text-lg font-semibold mb-2 ${currentTheme.includes('black') ? 'text-gray-100' : 'text-gray-800'}`}>Professional</h3>
                  <div className={`text-4xl font-bold mb-4 ${currentTheme.includes('black') ? 'text-gray-100' : 'text-gray-800'}`}>£2,900</div>
                  <p className={`mb-6 ${getTextColor()}`}>Per year, all features included</p>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-start">
                      <Check className={`w-5 h-5 mr-3 mt-0.5 flex-shrink-0 ${currentTheme === "luxury-black-gold" ? "text-amber-400" : "text-green-500"}`} />
                      <span className={getTextColor()}>2 Admins</span>
                    </li>
                    <li className="flex items-start">
                      <Check className={`w-5 h-5 mr-3 mt-0.5 flex-shrink-0 ${currentTheme === "luxury-black-gold" ? "text-amber-400" : "text-green-500"}`} />
                      <span className={getTextColor()}>6 Maintenance Technicians</span>
                    </li>
                    <li className="flex items-start">
                      <Check className={`w-5 h-5 mr-3 mt-0.5 flex-shrink-0 ${currentTheme === "luxury-black-gold" ? "text-amber-400" : "text-green-500"}`} />
                      <span className={getTextColor()}>3 Reporting Stations</span>
                    </li>
                  </ul>
                  <Button className="w-full" asChild>
                    <Link to="/signup">Choose Professional</Link>
                  </Button>
                </div>
              </div>
              
              {/* Commercial Plan */}
              <div className={`${getCardStyles()} rounded-lg overflow-hidden transition-all duration-200 hover:shadow-lg`}>
                <div className="p-8">
                  <h3 className={`text-lg font-semibold mb-2 ${currentTheme.includes('black') ? 'text-gray-100' : 'text-gray-800'}`}>Commercial</h3>
                  <div className={`text-4xl font-bold mb-4 ${currentTheme.includes('black') ? 'text-gray-100' : 'text-gray-800'}`}>£3,900</div>
                  <p className={`mb-6 ${getTextColor()}`}>Per year, all features included</p>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-start">
                      <Check className={`w-5 h-5 mr-3 mt-0.5 flex-shrink-0 ${currentTheme === "luxury-black-gold" ? "text-amber-400" : "text-green-500"}`} />
                      <span className={getTextColor()}>4 Admins</span>
                    </li>
                    <li className="flex items-start">
                      <Check className={`w-5 h-5 mr-3 mt-0.5 flex-shrink-0 ${currentTheme === "luxury-black-gold" ? "text-amber-400" : "text-green-500"}`} />
                      <span className={getTextColor()}>12 Maintenance Technicians</span>
                    </li>
                    <li className="flex items-start">
                      <Check className={`w-5 h-5 mr-3 mt-0.5 flex-shrink-0 ${currentTheme === "luxury-black-gold" ? "text-amber-400" : "text-green-500"}`} />
                      <span className={getTextColor()}>6 Reporting Stations</span>
                    </li>
                  </ul>
                  <Button className="w-full" asChild>
                    <Link to="/signup">Choose Commercial</Link>
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="mt-16 text-center">
              <p className={`${getTextColor()} mb-4`}>Need additional capacity?</p>
              <p className={`font-medium mb-2 ${currentTheme.includes('black') ? 'text-gray-300' : 'text-gray-700'}`}>
                Extra Maintenance Technician: £20/month • Extra Reporting Station: £20/month
              </p>
              <p className={`font-medium ${currentTheme === "luxury-black-gold" ? "text-amber-500" : "text-blue-600"}`}>
                Maintenance Manager Role: £30/month per manager (available with any plan)
              </p>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
