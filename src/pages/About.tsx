
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Lightbulb, Code, BookOpen, User, Briefcase, Users } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col bg-purple-100">
      <Header />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 text-center">
            About Interview Questions Generator
          </h1>
          
          <Card className="p-6 mb-8 shadow-lg bg-white">
            <div className="prose max-w-none">
              <p className="text-lg text-gray-700 mb-4">
                Interview Questions Generator is a tool designed to help students, job seekers, and professionals prepare 
                for their upcoming interviews by providing relevant and role-specific questions.
              </p>
              
              <p className="text-lg text-gray-700 mb-4">
                Whether you're a fresher just starting your career or an experienced professional looking for your next opportunity,
                our customizable question bank will help you prepare effectively.
              </p>
            </div>
          </Card>
          
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Key Features</h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="p-5 shadow-md hover:shadow-lg transition-shadow bg-white">
              <div className="flex items-start space-x-4">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <Briefcase className="h-6 w-6 text-purple-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Role-Specific Questions</h3>
                  <p className="text-gray-600">
                    Get questions tailored to specific job roles including Frontend, Backend, Full Stack, 
                    Data Science, Product Management, and UI/UX Design.
                  </p>
                </div>
              </div>
            </Card>
            
            <Card className="p-5 shadow-md hover:shadow-lg transition-shadow bg-white">
              <div className="flex items-start space-x-4">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <User className="h-6 w-6 text-purple-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Experience Level Filtering</h3>
                  <p className="text-gray-600">
                    Choose between fresher and experienced levels to get questions
                    appropriate for your experience and career stage.
                  </p>
                </div>
              </div>
            </Card>
            
            <Card className="p-5 shadow-md hover:shadow-lg transition-shadow bg-white">
              <div className="flex items-start space-x-4">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <BookOpen className="h-6 w-6 text-purple-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Comprehensive Question Banks</h3>
                  <p className="text-gray-600">
                    Access our extensive library of interview questions covering technical knowledge,
                    behavioral aspects, and industry-specific topics.
                  </p>
                </div>
              </div>
            </Card>
            
            <Card className="p-5 shadow-md hover:shadow-lg transition-shadow bg-white">
              <div className="flex items-start space-x-4">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <Lightbulb className="h-6 w-6 text-purple-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Interactive Chat Assistant</h3>
                  <p className="text-gray-600">
                    Get guidance, tips, and explanations from our chat assistant to help you
                    prepare better for your interviews.
                  </p>
                </div>
              </div>
            </Card>
          </div>
          
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Who Is This For?</h2>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="p-5 text-center shadow-md hover:shadow-lg transition-shadow bg-white">
              <div className="flex justify-center mb-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <Users className="h-6 w-6 text-blue-500" />
                </div>
              </div>
              <h3 className="font-semibold text-lg mb-2">Students</h3>
              <p className="text-gray-600">
                Prepare for your first internship or job interviews with confidence.
              </p>
            </Card>
            
            <Card className="p-5 text-center shadow-md hover:shadow-lg transition-shadow bg-white">
              <div className="flex justify-center mb-4">
                <div className="bg-purple-100 p-3 rounded-full">
                  <Briefcase className="h-6 w-6 text-purple-500" />
                </div>
              </div>
              <h3 className="font-semibold text-lg mb-2">Job Seekers</h3>
              <p className="text-gray-600">
                Sharpen your interview skills and prepare for upcoming opportunities.
              </p>
            </Card>
            
            <Card className="p-5 text-center shadow-md hover:shadow-lg transition-shadow bg-white">
              <div className="flex justify-center mb-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <Code className="h-6 w-6 text-green-500" />
                </div>
              </div>
              <h3 className="font-semibold text-lg mb-2">Professionals</h3>
              <p className="text-gray-600">
                Stay up-to-date with industry questions as you advance in your career.
              </p>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
