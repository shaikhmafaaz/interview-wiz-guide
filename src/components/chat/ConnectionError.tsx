
import { WifiOff, RefreshCw, ExternalLink } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface ConnectionErrorProps {
  onRetry: () => void;
  isChecking: boolean;
}

export function ConnectionError({ onRetry, isChecking }: ConnectionErrorProps) {
  return (
    <Alert variant="destructive" className="mb-3">
      <div className="flex items-start gap-2">
        <WifiOff className="h-4 w-4 mt-1" />
        <div className="w-full">
          <AlertTitle className="font-medium mb-1">Connection Error</AlertTitle>
          <AlertDescription className="text-sm">
            <div>
              The chatbot can't connect to the backend server. Please make sure the Flask server is running:
            </div>
            <div className="mt-2 p-2 bg-red-100 dark:bg-red-900 rounded text-xs font-mono overflow-x-auto">
              1. Open a terminal/command prompt<br/>
              2. Navigate to project directory<br/>
              3. Run: <span className="bg-red-200 dark:bg-red-950 px-1 rounded">cd python_backend && python app.py</span>
            </div>
            <Separator className="my-2" />
            <div className="text-xs text-red-800 dark:text-red-300 mb-2">
              <p>Make sure Python and Flask are installed. If using a virtual environment, activate it first.</p>
              <p className="mt-1">Check backend logs for errors. The server should be accessible at <code className="bg-red-200 dark:bg-red-950 px-1 rounded">http://localhost:5000</code></p>
            </div>
            <div className="flex gap-2">
              <Button 
                size="sm" 
                variant="outline" 
                onClick={onRetry}
                className="flex-1 gap-2"
                disabled={isChecking}
              >
                {isChecking ? (
                  <>
                    <RefreshCw className="h-3 w-3 animate-spin" />
                    <span>Checking...</span>
                  </>
                ) : (
                  <>
                    <RefreshCw className="h-3 w-3" />
                    <span>Retry Connection</span>
                  </>
                )}
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="gap-1"
                onClick={() => window.open("./python_backend/README.md", "_blank")}
              >
                <ExternalLink className="h-3 w-3" />
                <span>Setup Guide</span>
              </Button>
            </div>
          </AlertDescription>
        </div>
      </div>
    </Alert>
  );
}
