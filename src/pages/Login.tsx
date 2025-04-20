
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import { toast } from "sonner";
import { apiService } from "@/services/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let response;
      
      if (isLogin) {
        response = await apiService.login({ email, password });
      } else {
        response = await apiService.register({ email, password });
        if (response.success) {
          // If registration is successful, automatically log in
          response = await apiService.login({ email, password });
        }
      }

      if (!response.success) {
        toast.error(response.message);
        return;
      }

      toast.success(isLogin ? "Successfully logged in!" : "Registration successful!");
      navigate("/");
    } catch (error) {
      toast.error(isLogin ? "Login failed. Please try again." : "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">
            {isLogin ? "Welcome Back" : "Create an Account"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            <Button 
              type="submit" 
              className="w-full bg-purple-500 hover:bg-purple-600"
              disabled={isLoading}
            >
              {isLoading ? (isLogin ? "Signing in..." : "Registering...") : (isLogin ? "Sign In" : "Register")}
            </Button>
            <div className="text-center">
              <Button 
                type="button" 
                variant="link" 
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? "Need an account? Register" : "Already have an account? Login"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
