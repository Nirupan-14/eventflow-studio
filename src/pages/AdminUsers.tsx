import React, { useState } from 'react';
import { mockUsers } from '@/data/mock';
import { User } from '@/types';
import { Search, ShieldCheck, ShieldOff, Mail, MapPin } from 'lucide-react';

const AdminUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [search, setSearch] = useState('');

  const filtered = users.filter(u =>
    `${u.firstName} ${u.lastName} ${u.email}`.toLowerCase().includes(search.toLowerCase())
  );

  const toggleStatus = (id: string) => {
    setUsers(us => us.map(u => u.id === id ? { ...u, status: u.status === 'active' ? 'blocked' : 'active' } : u));
  };

  return (
    <div className="space-y-6 animate-slide-up">
      <div>
        <h1 className="text-2xl font-bold text-foreground">User Management</h1>
        <p className="text-muted-foreground mt-1">Manage platform users and their access</p>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input value={search} onChange={e => setSearch(e.target.value)} className="input-field pl-10" placeholder="Search users..." />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(user => (
          <div key={user.id} className="card-glass p-5">
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
                {user.firstName[0]}{user.lastName[0]}
              </div>
              <span className={`badge-status ${user.status === 'active' ? 'bg-accent/10 text-accent' : 'bg-destructive/10 text-destructive'}`}>
                {user.status}
              </span>
            </div>
            <h3 className="text-base font-semibold text-foreground">{user.firstName} {user.lastName}</h3>
            <div className="space-y-1 mt-2">
              <p className="text-sm text-muted-foreground flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" />{user.email}</p>
              <p className="text-sm text-muted-foreground flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" />{user.city}</p>
            </div>
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
              <span className={`badge-status ${user.plan === 'premium' ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                {user.plan}
              </span>
              <button
                onClick={() => toggleStatus(user.id)}
                className={`flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-lg transition-colors ${
                  user.status === 'active'
                    ? 'text-destructive hover:bg-destructive/10'
                    : 'text-accent hover:bg-accent/10'
                }`}
              >
                {user.status === 'active' ? (
                  <><ShieldOff className="w-4 h-4" /> Block</>
                ) : (
                  <><ShieldCheck className="w-4 h-4" /> Unblock</>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminUsers;
