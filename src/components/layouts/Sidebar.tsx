import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { 
  ChevronLeft, 
  Home, 
  Search, 
  Calendar, 
  Settings, 
  BookOpen, 
  Lock, 
  BarChart3, 
  Users, 
  User, 
  Bell
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserRole } from "@/contexts/AuthContext";

type SidebarLink = {
  title: string;
  href: string;
  icon: React.ElementType;
  allowedRoles: UserRole[];
};

const links: SidebarLink[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Home,
    allowedRoles: ["student", "lecturer", "staff", "security", "admin", "guest"],
  },
  {
    title: "Find Room",
    href: "/room-finder",
    icon: Search,
    allowedRoles: ["student", "lecturer", "staff", "security", "admin", "guest"],
  },
  {
    title: "Room Schedule",
    href: "/schedule",
    icon: Calendar,
    allowedRoles: ["student", "lecturer", "staff", "security", "admin", "guest"],
  },
  {
    title: "Book Room",
    href: "/booking",
    icon: BookOpen,
    allowedRoles: ["lecturer", "staff", "admin"],
  },
  {
    title: "Security Panel",
    href: "/security",
    icon: Lock,
    allowedRoles: ["security", "admin"],
  },
  {
    title: "Reports",
    href: "/reports",
    icon: BarChart3,
    allowedRoles: ["staff", "admin"],
  },
  {
    title: "User Management",
    href: "/users",
    icon: Users,
    allowedRoles: ["admin"],
  },
  {
    title: "Notifications",
    href: "/notifications",
    icon: Bell,
    allowedRoles: ["student", "lecturer", "staff", "security", "admin"],
  },
  {
    title: "Profile",
    href: "/profile",
    icon: User,
    allowedRoles: ["student", "lecturer", "staff", "security", "admin", "guest"],
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
    allowedRoles: ["student", "lecturer", "staff", "security", "admin"],
  },
];

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  const filteredLinks = links.filter((link) =>
    link.allowedRoles.includes(user.role)
  );

  return (
    <div
      className={cn(
        "fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 md:relative",
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0 md:w-16"
      )}
    >
      <div className="h-full flex flex-col">
        <div className="flex items-center justify-between h-16 px-4 border-b">
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
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
            {isOpen && <span className="ml-2 font-bold">SCAMS</span>}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden"
          >
            <ChevronLeft size={18} />
          </Button>
        </div>
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-2">
            {filteredLinks.map((link) => (
              <li key={link.href}>
                <NavLink
                  to={link.href}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors",
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-gray-700 hover:bg-gray-100",
                      !isOpen && "justify-center"
                    )
                  }
                >
                  <link.icon
                    className={cn("flex-shrink-0", isOpen ? "mr-3" : "")}
                    size={20}
                  />
                  {isOpen && <span>{link.title}</span>}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};
