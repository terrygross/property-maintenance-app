
import React from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, UserCheck, Building } from "lucide-react";

const Demo = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-center mb-6">Schedule a Personalized Demo</h1>
            <p className="text-lg text-center text-gray-600 mb-12">
              See how CareCrew can transform your property maintenance operations with a
              customized demonstration tailored to your specific needs.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Demo Form */}
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-6">Book Your Demo</h2>
                
                <form className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                      Company Name
                    </label>
                    <input
                      id="company"
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="properties" className="block text-sm font-medium text-gray-700 mb-1">
                      Number of Properties
                    </label>
                    <select
                      id="properties"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option>1-10</option>
                      <option>11-50</option>
                      <option>51-100</option>
                      <option>101-500</option>
                      <option>500+</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="interest" className="block text-sm font-medium text-gray-700 mb-1">
                      Primary Interest
                    </label>
                    <select
                      id="interest"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option>Maintenance Management</option>
                      <option>Compliance Tracking</option>
                      <option>Staff Coordination</option>
                      <option>Reporting Tools</option>
                      <option>Complete Platform</option>
                    </select>
                  </div>
                  
                  <Button type="submit" className="w-full">
                    Request Demo
                  </Button>
                </form>
              </div>
              
              {/* Demo Information */}
              <div>
                <h2 className="text-2xl font-semibold mb-6">What to Expect</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="rounded-full bg-blue-100 p-3 mr-4">
                      <Clock className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">30-Minute Session</h3>
                      <p className="text-gray-600">
                        A focused demonstration of the features most relevant to your needs.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="rounded-full bg-blue-100 p-3 mr-4">
                      <UserCheck className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">Personalized Walkthrough</h3>
                      <p className="text-gray-600">
                        We'll customize the demo to focus on your specific maintenance challenges.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="rounded-full bg-blue-100 p-3 mr-4">
                      <Calendar className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">Flexible Scheduling</h3>
                      <p className="text-gray-600">
                        Choose a time that works for you and your team.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="rounded-full bg-blue-100 p-3 mr-4">
                      <Building className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">Property-Specific Examples</h3>
                      <p className="text-gray-600">
                        See how the platform handles scenarios similar to yours.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-medium text-lg mb-2">Already convinced?</h3>
                  <p className="text-gray-600 mb-4">
                    Skip the demo and start your free trial today.
                  </p>
                  <Button variant="outline" className="bg-white" asChild>
                    <a href="/signup">Start Free Trial</a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Demo;
