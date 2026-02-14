import React, { useState } from 'react';
import { mockEvents } from '@/data/mock';
import { EventItem } from '@/types';
import { CheckCircle2, XCircle, Edit2, Trash2, Search } from 'lucide-react';

const AdminEvents: React.FC = () => {
  const [events, setEvents] = useState<EventItem[]>(mockEvents);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filtered = events.filter(e => {
    const matchSearch = e.name.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'all' || e.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const updateStatus = (id: string, status: EventItem['status']) => {
    setEvents(evs => evs.map(e => e.id === id ? { ...e, status } : e));
  };

  const deleteEvent = (id: string) => {
    setEvents(evs => evs.filter(e => e.id !== id));
  };

  const statusBadge = (status: string) => {
    const c: Record<string, string> = {
      approved: 'bg-accent/10 text-accent',
      pending: 'bg-warning/10 text-warning',
      rejected: 'bg-destructive/10 text-destructive',
    };
    return `badge-status ${c[status] || ''}`;
  };

  return (
    <div className="space-y-6 animate-slide-up">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Event Moderation</h1>
        <p className="text-muted-foreground mt-1">Review and moderate user-submitted events</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input value={search} onChange={e => setSearch(e.target.value)} className="input-field pl-10" placeholder="Search events..." />
        </div>
        <div className="flex gap-1 p-1 bg-muted rounded-lg">
          {['all', 'pending', 'approved', 'rejected'].map(s => (
            <button key={s} onClick={() => setFilterStatus(s)} className={`px-3 py-1.5 rounded-md text-sm font-medium capitalize transition-colors ${filterStatus === s ? 'bg-card shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}>
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="card-glass overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="table-header">Event</th>
                <th className="table-header hidden md:table-cell">Date</th>
                <th className="table-header hidden lg:table-cell">Category</th>
                <th className="table-header">Status</th>
                <th className="table-header text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map(ev => (
                <tr key={ev.id} className="hover:bg-muted/30 transition-colors">
                  <td className="table-cell">
                    <div>
                      <p className="font-medium text-foreground">{ev.name}</p>
                      <p className="text-xs text-muted-foreground">{ev.venue}</p>
                    </div>
                  </td>
                  <td className="table-cell hidden md:table-cell text-muted-foreground">{ev.date}</td>
                  <td className="table-cell hidden lg:table-cell text-muted-foreground">{ev.category}</td>
                  <td className="table-cell"><span className={statusBadge(ev.status)}>{ev.status}</span></td>
                  <td className="table-cell text-right">
                    <div className="flex items-center justify-end gap-1">
                      {ev.status !== 'approved' && (
                        <button onClick={() => updateStatus(ev.id, 'approved')} className="p-1.5 rounded-lg text-muted-foreground hover:text-accent hover:bg-accent/10" title="Approve">
                          <CheckCircle2 className="w-4 h-4" />
                        </button>
                      )}
                      {ev.status !== 'rejected' && (
                        <button onClick={() => updateStatus(ev.id, 'rejected')} className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10" title="Reject">
                          <XCircle className="w-4 h-4" />
                        </button>
                      )}
                      <button className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted" title="Edit">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => deleteEvent(ev.id)} className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10" title="Delete">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminEvents;
