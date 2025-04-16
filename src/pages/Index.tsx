import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

const Index = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate("/dashboard");
    }
  }, [user, loading, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-500/10 to-purple-500/10">
      <div className="text-center max-w-md p-6 bg-white rounded-lg shadow-lg">
        <div className="flex justify-center mb-4">
          <div className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-primary"
            >
              <path d="M22 9a4 4 0 0 1-4 4h-1v2a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4v-2a2 2 0 0 1 2-2h2v-4a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v2Z"></path>
              <circle cx="8" cy="9" r="1"></circle>
              <circle cx="16" cy="9" r="1"></circle>
            </svg>
            <h1 className="text-2xl font-bold font-heading text-primary">SCAMS</h1>
          </div>
        </div>
        <h2 className="text-2xl font-bold mb-4">Smart Campus System</h2>
        <p className="mb-6 text-gray-600">
          Welcome to the University Smart Campus Management System. Please log in to continue.
        </p>
        <div className="flex flex-col gap-2">
          <Button 
            onClick={() => navigate("/login")} 
            className="w-full"
          >
            Login
          </Button>
          <Button 
            onClick={() => navigate("/register")} 
            variant="outline" 
            className="w-full"
          >
            Register
          </Button>
        </div>
        <div className="mt-8 text-sm text-gray-500">
          <p>© 2025 University Smart Campus System</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
