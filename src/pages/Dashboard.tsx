import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Building2,
  CalendarClock,
  Clock,
  DoorClosed,
  Lightbulb,
  MonitorSmartphone,
  Users,
} from "lucide-react";
import { roomService, Room } from "@/services/roomService";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/ui/loader";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [availableRoomsCount, setAvailableRoomsCount] = useState(0);
  const [nextClass, setNextClass] = useState<{
    room: string;
    time: string;
    course: string;
  } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allRooms = await roomService.getAllRooms();
        setRooms(allRooms.slice(0, 3)); // Get first 3 rooms for display
        
        // Calculate available rooms (random for mock data)
        setAvailableRoomsCount(Math.floor(Math.random() * 15) + 5);
        
        // Set mock next class data
        if (user && user.role === "student") {
          setNextClass({
            room: "Science Building - Room 101",
            time: "10:00 - 11:30",
            course: "Introduction to Smart Campus Technologies",
          });
        }
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const statCards = [
    {
      title: "Available Rooms",
      value: availableRoomsCount,
      icon: <Building2 className="h-5 w-5 text-blue-500" />,
      color: "border-blue-200 bg-blue-50",
    },
    {
      title: "Occupied Rooms",
      value: 12,
      icon: <Users className="h-5 w-5 text-purple-500" />,
      color: "border-purple-200 bg-purple-50",
    },
    {
      title: "Scheduled Classes",
      value: 24,
      icon: <CalendarClock className="h-5 w-5 text-green-500" />,
      color: "border-green-200 bg-green-50",
    },
    {
      title: "Active Devices",
      value: 87,
      icon: <MonitorSmartphone className="h-5 w-5 text-amber-500" />,
      color: "border-amber-200 bg-amber-50",
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-md text-sm text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-heading mb-2">
          Welcome, {user?.name}
        </h1>
        <p className="text-gray-600">
          Here's what's happening on campus today
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat, i) => (
          <Card key={i} className={`border ${stat.color}`}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                {stat.icon}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Next Class Card for Students */}
      {user?.role === "student" && nextClass && (
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle>Your Next Class</CardTitle>
              <Clock className="h-5 w-5 text-gray-400" />
            </div>
            <CardDescription>Coming up today</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <div>
                <p className="font-medium">{nextClass.course}</p>
                <p className="text-sm text-gray-500">{nextClass.room}</p>
              </div>
              <div className="text-right">
                <p className="font-medium">{nextClass.time}</p>
                <p className="text-sm text-gray-500">Today</p>
              </div>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full"
              onClick={() => navigate("/room-finder")}
            >
              Find Room
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
        <Button
          variant="outline"
          className="h-24 flex-col space-y-2"
          onClick={() => navigate("/room-finder")}
        >
          <Building2 size={20} />
          <span>Find a Room</span>
        </Button>
        {user?.role === "lecturer" && (
          <Button
            variant="outline"
            className="h-24 flex-col space-y-2"
            onClick={() => navigate("/booking")}
          >
            <CalendarClock size={20} />
            <span>Book a Room</span>
          </Button>
        )}
        {(user?.role === "security" || user?.role === "admin") && (
          <Button
            variant="outline"
            className="h-24 flex-col space-y-2"
            onClick={() => navigate("/security")}
          >
            <DoorClosed size={20} />
            <span>Door Controls</span>
          </Button>
        )}
        {(user?.role === "security" || user?.role === "admin" || user?.role === "staff") && (
          <Button
            variant="outline"
            className="h-24 flex-col space-y-2"
            onClick={() => navigate("/security")}
          >
            <Lightbulb size={20} />
            <span>Light Controls</span>
          </Button>
        )}
      </div>

      {/* Recent Rooms */}
      <div>
        <h2 className="text-xl font-bold font-heading mb-4">Recently Visited Rooms</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {rooms.map((room) => (
            <Card key={room.id} className="overflow-hidden">
              <div className="h-40 bg-gray-100 relative">
                <img
                  src={room.image || "https://images.unsplash.com/photo-1517164850305-99a3e65bb47e"}
                  alt={room.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{room.name}</CardTitle>
                <CardDescription>{room.building}, Floor {room.floor}</CardDescription>
              </CardHeader>
              <CardContent className="text-sm">
                <div className="flex justify-between">
                  <span>Capacity: {room.capacity}</span>
                  <span className="capitalize">{room.type}</span>
                </div>
                <Button
                  variant="link"
                  className="p-0 h-auto mt-2"
                  onClick={() => navigate(`/rooms/${room.id}`)}
                >
                  View details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-4">
          <Button 
            variant="outline"
            onClick={() => navigate("/room-finder")}
          >
            View all rooms
          </Button>
        </div>
      </div>

      {/* Current Time */}
      <div className="mt-6 text-center text-sm text-gray-500">
        <p>Campus operation hours: 5:00 AM - 11:00 PM</p>
        <p>Current system time: {new Date().toLocaleTimeString()}</p>
      </div>
    </div>
  );
};

export default Dashboard;
