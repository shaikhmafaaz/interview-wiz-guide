
import { Briefcase, HelpCircle, Info, LogIn } from "lucide-react";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="w-full bg-purple-500 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
          <Briefcase className="h-6 w-6" />
          <h1 className="text-xl font-bold">Interview Questions Generator</h1>
        </Link>
        <div className="flex items-center space-x-4">
          <Link to="/about" className="flex items-center space-x-1 bg-white/20 px-3 py-1 rounded hover:bg-white/30 transition-colors">
            <Info className="h-4 w-4" />
            <span>About</span>
          </Link>
          <button className="flex items-center space-x-1 bg-white/20 px-3 py-1 rounded hover:bg-white/30 transition-colors">
            <HelpCircle className="h-4 w-4" />
            <span>Help</span>
          </button>
          <Link to="/login" className="flex items-center space-x-1 bg-white/20 px-3 py-1 rounded hover:bg-white/30 transition-colors">
            <LogIn className="h-4 w-4" />
            <span>Login</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
