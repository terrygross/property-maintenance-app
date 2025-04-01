
import React from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Building, Wrench, CalendarClock, Users, ClipboardList, Shield } from "lucide-react";

const Features = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-12">CareCrew Platform Features</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={Building}
              title="Property Management"
              description="Comprehensive property database with detailed information, history, and maintenance records."
            />
            
            <FeatureCard 
              icon={Wrench}
              title="Maintenance System"
              description="Streamlined workflow for requesting, assigning, and tracking maintenance tasks across properties."
            />
            
            <FeatureCard 
              icon={CalendarClock}
              title="Job Cards & Scheduling"
              description="Efficient scheduling system for staff assignments, leave management, and call-out rotations."
            />
            
            <FeatureCard 
              icon={Users}
              title="Staff Management"
              description="Comprehensive tools to manage maintenance technicians, admins, and reporting staff."
            />
            
            <FeatureCard 
              icon={ClipboardList}
              title="Compliance Tracking"
              description="Built-in systems for managing and tracking property compliance requirements and inspections."
            />
            
            <FeatureCard 
              icon={Shield}
              title="Secure Multi-tenant Access"
              description="Role-based access control ensuring each user sees only what they need to see."
            />
          </div>
          
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-center mb-8">Why Choose CareCrew?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
              <div>
                <h3 className="text-xl font-semibold mb-4">For Property Managers</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Reduce maintenance response times by up to 40%</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Comprehensive reporting for cost analysis and budget planning</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Automated compliance tracking and reminders</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4">For Maintenance Staff</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Mobile-friendly interfaces for on-the-go task management</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Simple photo documentation and job tracking</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Transparent leave management and call-out scheduling</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

const FeatureCard = ({ icon: Icon, title, description }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="rounded-full bg-blue-100 p-3 w-12 h-12 flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-blue-600" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default Features;
