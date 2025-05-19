
import { AlertCircle } from "lucide-react";

export function ConnectionError() {
  return (
    <div className="bg-red-500 text-white p-3 text-sm">
      <div className="flex items-center space-x-2">
        <AlertCircle className="h-4 w-4" />
        <span>
          Failed to connect to the backend server. Make sure the Flask server is running on http://localhost:5000.
        </span>
      </div>
      <div className="mt-1 text-xs">
        Run <code className="bg-red-600 px-1 rounded">python app.py</code> in the python_backend directory.
      </div>
    </div>
  );
}
