import { User, EventItem } from '@/types';

export const mockUsers: User[] = [
  { id: '1', firstName: 'Alice', lastName: 'Johnson', email: 'alice@example.com', phone: '+1234567890', address: '123 Main St', city: 'New York', role: 'user', status: 'active', createdAt: '2024-01-15', plan: 'premium' },
  { id: '2', firstName: 'Bob', lastName: 'Smith', email: 'bob@example.com', phone: '+1234567891', address: '456 Oak Ave', city: 'Los Angeles', role: 'user', status: 'active', createdAt: '2024-02-20', plan: 'free' },
  { id: '3', firstName: 'Carol', lastName: 'Davis', email: 'carol@example.com', phone: '+1234567892', address: '789 Pine Rd', city: 'Chicago', role: 'user', status: 'blocked', createdAt: '2024-03-10', plan: 'free' },
  { id: '4', firstName: 'Dan', lastName: 'Wilson', email: 'dan@example.com', phone: '+1234567893', address: '321 Elm St', city: 'Houston', role: 'user', status: 'active', createdAt: '2024-04-05', plan: 'premium' },
  { id: '5', firstName: 'Eve', lastName: 'Brown', email: 'eve@example.com', phone: '+1234567894', address: '654 Maple Dr', city: 'Phoenix', role: 'user', status: 'active', createdAt: '2024-05-12', plan: 'free' },
];

export const mockEvents: EventItem[] = [
  { id: '1', name: 'Tech Conference 2024', date: '2024-06-15', venue: 'Convention Center', contact: 'john@tech.com', category: 'Technology', region: 'North America', description: 'Annual technology conference featuring the latest innovations.', status: 'approved', createdBy: '1' },
  { id: '2', name: 'Music Festival', date: '2024-07-20', venue: 'Central Park', contact: 'music@fest.com', category: 'Entertainment', region: 'North America', description: 'Three-day outdoor music festival with top artists.', status: 'approved', createdBy: '2' },
  { id: '3', name: 'Food & Wine Expo', date: '2024-08-10', venue: 'Exhibition Hall', contact: 'food@expo.com', category: 'Food & Beverage', region: 'Europe', description: 'Explore culinary delights from around the world.', status: 'pending', createdBy: '1' },
  { id: '4', name: 'Startup Pitch Day', date: '2024-09-05', venue: 'Innovation Hub', contact: 'startup@pitch.com', category: 'Business', region: 'Asia', description: 'Watch startups pitch to investors and win funding.', status: 'pending', createdBy: '3' },
  { id: '5', name: 'Art Gallery Opening', date: '2024-10-01', venue: 'Modern Art Museum', contact: 'art@gallery.com', category: 'Art', region: 'Europe', description: 'Opening night of contemporary art exhibition.', status: 'rejected', createdBy: '4' },
  { id: '6', name: 'Marathon 2024', date: '2024-11-15', venue: 'City Streets', contact: 'run@marathon.com', category: 'Sports', region: 'North America', description: 'Annual city marathon open to all skill levels.', status: 'approved', createdBy: '5' },
];

export const eventCategories = ['Technology', 'Entertainment', 'Food & Beverage', 'Business', 'Art', 'Sports', 'Education', 'Health'];
export const eventRegions = ['North America', 'Europe', 'Asia', 'Africa', 'South America', 'Oceania'];
