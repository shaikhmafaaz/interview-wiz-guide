
import { AlertCircle } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

export function ConnectionError() {
  return (
    <Alert variant="destructive" className="mb-3">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle className="font-medium">Connection Error</AlertTitle>
      <AlertDescription className="text-sm">
        <div>
          Failed to connect to the backend server. Make sure the Flask server is running on http://localhost:5000.
        </div>
        <div className="mt-1 text-xs font-mono bg-red-100 dark:bg-red-900 p-1 rounded">
          cd python_backend && python app.py
        </div>
        <div className="mt-2 text-xs">
          If you're using a virtual environment, activate it first.
        </div>
      </AlertDescription>
    </Alert>
  );
}
