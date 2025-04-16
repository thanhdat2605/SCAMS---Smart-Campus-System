// Types for room scheduling
export interface RoomScheduleSlot {
    startTime: string;
    endTime: string;
    isOccupied: boolean;
    courseName?: string;
    lecturer?: string;
    bookingId?: string;
  }
  
  export interface Room {
    id: string;
    name: string;
    building: string;
    floor: string;
    capacity: number;
    hasProjector: boolean;
    hasSoundSystem: boolean;
    type: 'lecture' | 'lab' | 'seminar' | 'meeting';
    image?: string;
  }
  
  export interface RoomSchedule {
    room: Room;
    date: string;
    slots: RoomScheduleSlot[];
  }
  
  export interface DeviceStatus {
    lights: boolean;
    projector: boolean;
    soundSystem: boolean;
    fan: boolean;
    door: boolean;
  }
  
  // Mock rooms data
  const mockRooms: Room[] = [
    {
      id: '101',
      name: 'Lecture Hall 101',
      building: 'Science Building',
      floor: '1',
      capacity: 120,
      hasProjector: true,
      hasSoundSystem: true,
      type: 'lecture',
      image: 'https://images.unsplash.com/photo-1517164850305-99a3e65bb47e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    {
      id: '102',
      name: 'Lecture Hall 102',
      building: 'Science Building',
      floor: '1',
      capacity: 80,
      hasProjector: true,
      hasSoundSystem: true,
      type: 'lecture',
      image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    {
      id: '201',
      name: 'Computer Lab 201',
      building: 'Engineering Building',
      floor: '2',
      capacity: 40,
      hasProjector: true,
      hasSoundSystem: false,
      type: 'lab',
      image: 'https://images.unsplash.com/photo-1581092921461-7284a0e0adf9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    {
      id: '301',
      name: 'Seminar Room 301',
      building: 'Humanities Building',
      floor: '3',
      capacity: 30,
      hasProjector: true,
      hasSoundSystem: false,
      type: 'seminar',
      image: 'https://images.unsplash.com/photo-1566125882500-87e10f726cdc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    {
      id: '401',
      name: 'Meeting Room 401',
      building: 'Administration Building',
      floor: '4',
      capacity: 15,
      hasProjector: false,
      hasSoundSystem: false,
      type: 'meeting',
      image: 'https://images.unsplash.com/photo-1579208575657-c595a05383b7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    }
  ];
  
  // Mock device statuses
  const mockDeviceStatuses: Record<string, DeviceStatus> = {
    '101': {
      lights: true,
      projector: false,
      soundSystem: false,
      fan: true,
      door: false
    },
    '102': {
      lights: true,
      projector: true,
      soundSystem: true,
      fan: true,
      door: true
    },
    '201': {
      lights: false,
      projector: false,
      soundSystem: false,
      fan: false,
      door: false
    },
    '301': {
      lights: true,
      projector: false,
      soundSystem: false,
      fan: true,
      door: false
    },
    '401': {
      lights: false,
      projector: false,
      soundSystem: false,
      fan: false,
      door: false
    }
  };
  
  // Helper to generate a random schedule for a room
  const generateMockSchedule = (room: Room, date: string): RoomScheduleSlot[] => {
    const slots: RoomScheduleSlot[] = [];
    const today = new Date();
    const scheduleDate = new Date(date);
    
    // Current hour if today, otherwise start with 8 AM
    let startHour = scheduleDate.toDateString() === today.toDateString() 
      ? today.getHours()
      : 8;
    
    // Generate slots from startHour to 9 PM (21)
    for (let hour = startHour; hour < 21; hour++) {
      const isOccupied = Math.random() > 0.7; // 30% chance of being occupied
      
      slots.push({
        startTime: `${hour.toString().padStart(2, '0')}:00`,
        endTime: `${(hour + 1).toString().padStart(2, '0')}:00`,
        isOccupied,
        ...(isOccupied ? {
          courseName: `Course ${Math.floor(Math.random() * 100)}`,
          lecturer: `Dr. ${['Smith', 'Johnson', 'Williams', 'Jones', 'Brown'][Math.floor(Math.random() * 5)]}`,
          bookingId: Math.random().toString(36).substring(7),
        } : {})
      });
    }
    
    return slots;
  };
  
  // Room service functions
  export const roomService = {
    // Get all rooms
    getAllRooms: async (): Promise<Room[]> => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockRooms;
    },
    
    // Get room by ID
    getRoomById: async (roomId: string): Promise<Room | null> => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      const room = mockRooms.find(r => r.id === roomId);
      return room || null;
    },
    
    // Get room schedule
    getRoomSchedule: async (roomId: string, date: string): Promise<RoomSchedule | null> => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 700));
      const room = mockRooms.find(r => r.id === roomId);
      
      if (!room) return null;
      
      return {
        room,
        date,
        slots: generateMockSchedule(room, date),
      };
    },
    
    // Book a room
    bookRoom: async (
      roomId: string, 
      date: string, 
      startTime: string, 
      endTime: string, 
      courseName: string, 
      lecturer: string
    ): Promise<boolean> => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, this would update the room schedule in the database
      // and integrate with ROMS via the update_room_schedule web service
      console.log(`Room ${roomId} booked for ${date} from ${startTime} to ${endTime}`);
      return true;
    },
    
    // Get device status
    getDeviceStatus: async (roomId: string): Promise<DeviceStatus | null> => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      return mockDeviceStatuses[roomId] || null;
    },
    
    // Update device status
    updateDeviceStatus: async (roomId: string, status: Partial<DeviceStatus>): Promise<boolean> => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (!mockDeviceStatuses[roomId]) return false;
      
      mockDeviceStatuses[roomId] = {
        ...mockDeviceStatuses[roomId],
        ...status
      };
      
      console.log(`Device status updated for room ${roomId}:`, mockDeviceStatuses[roomId]);
      return true;
    },
    
    // Search rooms by criteria
    searchRooms: async (
      query: string, 
      date?: string, 
      startTime?: string, 
      endTime?: string,
      capacity?: number,
      building?: string,
      roomType?: Room['type']
    ): Promise<Room[]> => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      let filteredRooms = mockRooms;
      
      // Filter by search query
      if (query) {
        const lowerQuery = query.toLowerCase();
        filteredRooms = filteredRooms.filter(room => 
          room.name.toLowerCase().includes(lowerQuery) || 
          room.building.toLowerCase().includes(lowerQuery)
        );
      }
      
      // Filter by building
      if (building) {
        filteredRooms = filteredRooms.filter(room => 
          room.building === building
        );
      }
      
      // Filter by room type
      if (roomType) {
        filteredRooms = filteredRooms.filter(room => 
          room.type === roomType
        );
      }
      
      // Filter by capacity
      if (capacity) {
        filteredRooms = filteredRooms.filter(room => 
          room.capacity >= capacity
        );
      }
      
      // In a real app, we would check availability based on date/time
      // using the get_room_schedule web service
      
      return filteredRooms;
    },
    
    // Get human count in room (mock for the AI people detection service)
    getHumanCountInRoom: async (roomId: string): Promise<number> => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 400));
      
      // Random number of people 0-30
      return Math.floor(Math.random() * 31);
    }
  };
  