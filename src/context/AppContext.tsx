import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Member, mockMembers, mockEvents, mockOpportunities } from '../data/mockData';

export interface TableItem {
  id: string;
  tableName: string;
  capacity: number;

  location: string;
  assignedMembers: string[];
}

export interface EventItem {
  id: string;
  title: string;
  date: string;
  location: string;
  image: string;
  type: string;
}

export interface AnnouncementItem {
  id: string;
  title: string;
  date: string;
  content: string;
  image?: string;
}

interface AppContextType {
  user: Member | null;
  isAdmin: boolean;
  login: (email: string) => void;
  logout: () => void;
  members: Member[];
  addMember: (member: Member) => void;
  removeMember: (id: string) => void;
  updateMember: (id: string, updatedData: Partial<Member>) => void;
  events: EventItem[];
  addEvent: (event: EventItem) => void;
  tables: TableItem[];
  addTable: (table: TableItem) => void;
  assignMembersToTable: (tableId: string, memberIds: string[]) => void;
  opportunities: typeof mockOpportunities;
  categories: string[];
  addCategory: (category: string) => void;
  removeCategory: (category: string) => void;
  announcements: AnnouncementItem[];
  addAnnouncement: (announcement: AnnouncementItem) => void;
  removeAnnouncement: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<Member | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const initialMembers = mockMembers.filter(m => m.type !== 'Business');
  const [members, setMembers] = useState<Member[]>(initialMembers);
  const [events, setEvents] = useState<EventItem[]>(mockEvents as EventItem[]);
  const [tables, setTables] = useState<TableItem[]>([]);
  const defaultCategories = ['Construction', 'Industries', 'IT Solutions', 'Healthcare', 'Finance', 'Education', 'Retail'];
  const [categories, setCategories] = useState<string[]>(defaultCategories);
  const [announcements, setAnnouncements] = useState<AnnouncementItem[]>([
    { id: '1', title: 'Welcome to BSN!', date: 'Oct 20, 2026', content: 'We have updated our platform with new features.' }
  ]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load data from AsyncStorage on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const storedTables = await AsyncStorage.getItem('@bsn_tables');
        if (storedTables) {
          setTables(JSON.parse(storedTables));
        }

        const storedMembers = await AsyncStorage.getItem('@bsn_members');
        if (storedMembers) {
          const parsed = JSON.parse(storedMembers);
          const mockBusinessIds = new Set(mockMembers.filter(m => m.type === 'Business').map(m => m.id));
          setMembers(parsed.filter((m: Member) => !(m.type === 'Business' && mockBusinessIds.has(m.id))));
        } else {
          setMembers(initialMembers);
        }

        const storedCategories = await AsyncStorage.getItem('@bsn_categories');
        if (storedCategories) {
          setCategories(JSON.parse(storedCategories));
        }

        const storedAnnouncements = await AsyncStorage.getItem('@bsn_announcements');
        if (storedAnnouncements) {
          setAnnouncements(JSON.parse(storedAnnouncements));
        }
      } catch (error) {
        console.error('Failed to load data from storage', error);
      } finally {
        setIsLoaded(true);
      }
    };
    loadData();
  }, []);

  // Save members whenever they change
  useEffect(() => {
    if (!isLoaded) return;
    const saveMembers = async () => {
      try {
        await AsyncStorage.setItem('@bsn_members', JSON.stringify(members));
      } catch (error) {
        console.error('Failed to save members to storage', error);
      }
    };
    saveMembers();
  }, [members, isLoaded]);

  // Save tables whenever they change
  useEffect(() => {
    if (!isLoaded) return;
    const saveTables = async () => {
      try {
        await AsyncStorage.setItem('@bsn_tables', JSON.stringify(tables));
      } catch (error) {
        console.error('Failed to save tables to storage', error);
      }
    };
    saveTables();
  }, [tables, isLoaded]);

  // Save categories whenever they change
  useEffect(() => {
    if (!isLoaded) return;
    const saveCategories = async () => {
      try {
        await AsyncStorage.setItem('@bsn_categories', JSON.stringify(categories));
      } catch (error) {
        console.error('Failed to save categories to storage', error);
      }
    };
    saveCategories();
  }, [categories, isLoaded]);

  // Save announcements whenever they change
  useEffect(() => {
    if (!isLoaded) return;
    const saveAnnouncements = async () => {
      try {
        await AsyncStorage.setItem('@bsn_announcements', JSON.stringify(announcements));
      } catch (error) {
        console.error('Failed to save announcements to storage', error);
      }
    };
    saveAnnouncements();
  }, [announcements, isLoaded]);

  const addCategory = (category: string) => {
    if (category.trim() && !categories.includes(category.trim())) {
      setCategories(prev => [...prev, category.trim()]);
    }
  };

  const removeCategory = (category: string) => {
    setCategories(prev => prev.filter(c => c !== category));
  };

  const login = (email: string) => {
    if (email.toLowerCase() === 'admin' || email.toLowerCase() === 'admin@admin.com') {
      setIsAdmin(true);
      setUser(null);
    } else {
      setIsAdmin(false);
      const foundUser = mockMembers[0]; // just use the first user for now
      setUser(foundUser);
    }
  };

  const logout = () => {
    setUser(null);
    setIsAdmin(false);
  };

  const addMember = (newMember: Member) => {
    setMembers(prev => [newMember, ...prev]);
  };

  const removeMember = (id: string) => {
    setMembers(prev => prev.filter(m => m.id !== id));
  };

  const updateMember = (id: string, updatedData: Partial<Member>) => {
    setMembers(prev => prev.map(m => m.id === id ? { ...m, ...updatedData, company: { ...m.company, ...(updatedData.company || {}) }, socialMedia: { ...m.socialMedia, ...(updatedData.socialMedia || {}) } } : m));
  };

  const addEvent = (newEvent: EventItem) => {
    setEvents(prev => [newEvent, ...prev]);
  };

  const addTable = (newTable: TableItem) => {
    setTables(prev => [newTable, ...prev]);
  };

  const assignMembersToTable = (tableId: string, memberIds: string[]) => {
    setTables(prev => prev.map(t => t.id === tableId ? { ...t, assignedMembers: memberIds } : t));
  };

  const addAnnouncement = (announcement: AnnouncementItem) => {
    setAnnouncements(prev => [announcement, ...prev]);
  };

  const removeAnnouncement = (id: string) => {
    setAnnouncements(prev => prev.filter(a => a.id !== id));
  };

  return (
    <AppContext.Provider
      value={{
        user,
        isAdmin,
        login,
        logout,
        members,
        addMember,
        removeMember,
        updateMember,
        events,
        addEvent,
        tables,
        addTable,
        assignMembersToTable,
        opportunities: mockOpportunities,
        categories,
        addCategory,
        removeCategory,
        announcements,
        addAnnouncement,
        removeAnnouncement,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
