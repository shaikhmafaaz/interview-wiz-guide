
import { Header } from "@/components/Header";
import { QuestionGenerator } from "@/components/QuestionGenerator";
import { ChatbotAssistant } from "@/components/ChatbotAssistant";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-purple-100">
      <Header />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            Interview Questions Generator
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Prepare for your next interview with customized questions based on your role and experience level
          </p>
        </div>
        <QuestionGenerator />
      </main>
      <ChatbotAssistant />
      <Footer />
    </div>
  );
};

export default Index;
