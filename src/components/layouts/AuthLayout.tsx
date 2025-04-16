import { Outlet } from "react-router-dom";
import { cn } from "@/lib/utils";

interface AuthLayoutProps {
  className?: string;
}

export const AuthLayout = ({ className }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-500/10 to-purple-500/10 flex flex-col items-center justify-center p-4">
      <div
        className={cn(
          "w-full max-w-md bg-white rounded-lg shadow-lg p-6 animate-in",
          className
        )}
      >
        <div className="flex justify-center mb-6">
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
        <Outlet />
      </div>
      <div className="mt-6 text-center text-sm text-gray-600">
        <p>Smart Campus Management System</p>
        <p className="mt-1">© 2025 University</p>
      </div>
    </div>
  );
};
