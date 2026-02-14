import React, { useState } from 'react';
import { mockEvents, eventCategories, eventRegions } from '@/data/mock';
import { EventItem } from '@/types';
import { Plus, Search, Edit2, Trash2, X, LayoutGrid, List, ChevronDown, CalendarDays } from 'lucide-react';

const emptyEvent: Omit<EventItem, 'id' | 'status' | 'createdBy'> = {
  name: '', date: '', venue: '', contact: '', category: '', region: '', description: '',
};

const UserEvents: React.FC = () => {
  const [events, setEvents] = useState<EventItem[]>(mockEvents.filter(e => ['1', '2'].includes(e.createdBy)));
  const [search, setSearch] = useState('');
  const [view, setView] = useState<'table' | 'card'>('table');
  const [formOpen, setFormOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyEvent);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filtered = events.filter(e => e.name.toLowerCase().includes(search.toLowerCase()) || e.category.toLowerCase().includes(search.toLowerCase()));

  const openAdd = () => { setForm(emptyEvent); setEditId(null); setFormOpen(true); };
  const openEdit = (ev: EventItem) => { setForm(ev); setEditId(ev.id); setFormOpen(true); };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editId) {
      setEvents(evs => evs.map(ev => ev.id === editId ? { ...ev, ...form } : ev));
    } else {
      setEvents(evs => [...evs, { ...form, id: Date.now().toString(), status: 'pending', createdBy: '1' }]);
    }
    setFormOpen(false);
  };

  const handleDelete = () => {
    if (deleteId) setEvents(evs => evs.filter(e => e.id !== deleteId));
    setDeleteId(null);
  };

  const statusBadge = (status: string) => {
    const colors: Record<string, string> = {
      approved: 'bg-accent/10 text-accent',
      pending: 'bg-warning/10 text-warning',
      rejected: 'bg-destructive/10 text-destructive',
    };
    return `badge-status ${colors[status] || ''}`;
  };

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">My Events</h1>
          <p className="text-muted-foreground mt-1">Create and manage your events</p>
        </div>
        <button onClick={openAdd} className="btn-primary flex items-center gap-2 self-start">
          <Plus className="w-4 h-4" /> Add Event
        </button>
      </div>

      {/* Search & View Toggle */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input value={search} onChange={e => setSearch(e.target.value)} className="input-field pl-10" placeholder="Search events..." />
        </div>
        <div className="flex gap-1 p-1 bg-muted rounded-lg">
          <button onClick={() => setView('table')} className={`p-2 rounded-md transition-colors ${view === 'table' ? 'bg-card shadow-sm text-foreground' : 'text-muted-foreground'}`}>
            <List className="w-4 h-4" />
          </button>
          <button onClick={() => setView('card')} className={`p-2 rounded-md transition-colors ${view === 'card' ? 'bg-card shadow-sm text-foreground' : 'text-muted-foreground'}`}>
            <LayoutGrid className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Events */}
      {filtered.length === 0 ? (
        <div className="empty-state card-glass py-16">
          <CalendarDays className="w-12 h-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold text-foreground">No events found</h3>
          <p className="text-muted-foreground mt-1">Try adjusting your search or create a new event.</p>
        </div>
      ) : view === 'table' ? (
        <div className="card-glass overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50 border-b border-border">
                <tr>
                  <th className="table-header">Name</th>
                  <th className="table-header hidden md:table-cell">Date</th>
                  <th className="table-header hidden lg:table-cell">Venue</th>
                  <th className="table-header hidden sm:table-cell">Category</th>
                  <th className="table-header">Status</th>
                  <th className="table-header text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map(ev => (
                  <tr key={ev.id} className="hover:bg-muted/30 transition-colors">
                    <td className="table-cell font-medium">{ev.name}</td>
                    <td className="table-cell hidden md:table-cell text-muted-foreground">{ev.date}</td>
                    <td className="table-cell hidden lg:table-cell text-muted-foreground">{ev.venue}</td>
                    <td className="table-cell hidden sm:table-cell text-muted-foreground">{ev.category}</td>
                    <td className="table-cell"><span className={statusBadge(ev.status)}>{ev.status}</span></td>
                    <td className="table-cell text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => openEdit(ev)} className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted"><Edit2 className="w-4 h-4" /></button>
                        <button onClick={() => setDeleteId(ev.id)} className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(ev => (
            <div key={ev.id} className="card-glass p-5">
              <div className="flex items-start justify-between mb-3">
                <span className={statusBadge(ev.status)}>{ev.status}</span>
                <div className="flex gap-1">
                  <button onClick={() => openEdit(ev)} className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted"><Edit2 className="w-4 h-4" /></button>
                  <button onClick={() => setDeleteId(ev.id)} className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
              <h3 className="text-base font-semibold text-foreground">{ev.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">{ev.date} · {ev.venue}</p>
              <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{ev.description}</p>
              <div className="flex gap-2 mt-3">
                <span className="badge-status bg-muted text-muted-foreground">{ev.category}</span>
                <span className="badge-status bg-muted text-muted-foreground">{ev.region}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Event Form Modal */}
      {formOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/20 backdrop-blur-sm" onClick={() => setFormOpen(false)}>
          <div className="w-full max-w-lg bg-card border border-border rounded-xl shadow-xl animate-fade-scale" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <h2 className="text-lg font-semibold text-foreground">{editId ? 'Edit Event' : 'Add Event'}</h2>
              <button onClick={() => setFormOpen(false)} className="text-muted-foreground hover:text-foreground"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              <div>
                <label className="label-field">Event Name</label>
                <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="input-field" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label-field">Date</label>
                  <input type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} className="input-field" required />
                </div>
                <div>
                  <label className="label-field">Venue</label>
                  <input value={form.venue} onChange={e => setForm(f => ({ ...f, venue: e.target.value }))} className="input-field" required />
                </div>
              </div>
              <div>
                <label className="label-field">Contact</label>
                <input value={form.contact} onChange={e => setForm(f => ({ ...f, contact: e.target.value }))} className="input-field" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label-field">Category</label>
                  <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} className="input-field" required>
                    <option value="">Select</option>
                    {eventCategories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="label-field">Region</label>
                  <select value={form.region} onChange={e => setForm(f => ({ ...f, region: e.target.value }))} className="input-field" required>
                    <option value="">Select</option>
                    {eventRegions.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="label-field">Description</label>
                <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} className="input-field min-h-[80px]" required />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setFormOpen(false)} className="btn-secondary flex-1">Cancel</button>
                <button type="submit" className="btn-primary flex-1">{editId ? 'Update' : 'Create'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/20 backdrop-blur-sm" onClick={() => setDeleteId(null)}>
          <div className="w-full max-w-sm bg-card border border-border rounded-xl shadow-xl p-6 animate-fade-scale" onClick={e => e.stopPropagation()}>
            <h2 className="text-lg font-semibold text-foreground">Delete Event</h2>
            <p className="text-sm text-muted-foreground mt-2">Are you sure you want to delete this event? This action cannot be undone.</p>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setDeleteId(null)} className="btn-secondary flex-1">Cancel</button>
              <button onClick={handleDelete} className="btn-danger flex-1">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


export default UserEvents;
