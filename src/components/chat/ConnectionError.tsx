
import { WifiOff } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

interface ConnectionErrorProps {
  onRetry: () => void;
  isChecking: boolean;
}

export function ConnectionError({ onRetry, isChecking }: ConnectionErrorProps) {
  return (
    <Alert variant="destructive" className="mb-3 border-red-500 bg-red-50 dark:bg-red-950/30">
      <div className="flex items-start gap-2">
        <WifiOff className="h-5 w-5 mt-1 text-red-500" />
        <div className="w-full">
          <AlertTitle className="font-medium mb-2 text-red-600 dark:text-red-400">Connection Error</AlertTitle>
          <AlertDescription>
            <div className="text-sm text-red-600 dark:text-red-300">
              The chatbot can't connect to the backend server. Please make sure the Flask server is running:
            </div>
            
            <ol className="mt-3 pl-5 list-decimal text-xs text-red-600 dark:text-red-300 space-y-1">
              <li>Open a <span className="px-1 py-0.5 bg-red-100 dark:bg-red-900 rounded font-mono">terminal/command prompt</span></li>
              <li>Navigate to project directory</li>
              <li>Run: <span className="px-1 py-0.5 bg-red-100 dark:bg-red-900 rounded font-mono">cd python_backend && python app.py</span></li>
            </ol>
            
            <div className="mt-3 text-xs text-red-600 dark:text-red-300">
              <p>Make sure Python and Flask are installed. If using a virtual environment, activate it first.</p>
              <p className="mt-2 font-medium">Important: Make sure the server is running on <span className="px-1 py-0.5 bg-red-100 dark:bg-red-900 rounded font-mono">0.0.0.0:5000</span> (not just localhost).</p>
            </div>
            
            <div className="mt-3 flex">
              <Button 
                size="sm" 
                variant="outline" 
                onClick={onRetry}
                className="flex-1 gap-2 border-red-400 text-red-600 hover:bg-red-100 dark:border-red-700 dark:text-red-400 dark:hover:bg-red-950"
                disabled={isChecking}
              >
                {isChecking ? "Checking connection..." : "Retry Connection"}
              </Button>
            </div>
          </AlertDescription>
        </div>
      </div>
    </Alert>
  );
}
