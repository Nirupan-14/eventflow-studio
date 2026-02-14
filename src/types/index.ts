export type Role = 'user' | 'admin';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  role: Role;
  status: 'active' | 'blocked';
  createdAt: string;
  plan: 'free' | 'premium';
}

export interface EventItem {
  id: string;
  name: string;
  date: string;
  venue: string;
  contact: string;
  category: string;
  region: string;
  description: string;
  status: 'pending' | 'approved' | 'rejected';
  createdBy: string;
}

export interface GalleryFile {
  id: string;
  name: string;
  type: 'image' | 'pdf' | 'video';
  size: number;
  url: string;
  createdAt: string;
}

export interface StatCard {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'up' | 'down' | 'neutral';
  icon: React.ReactNode;
}
