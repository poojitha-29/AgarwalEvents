import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Download } from 'lucide-react';
import { getInquiriesByStatus, updateInquiryStatus } from '../services/inquiriesService';
import { INQUIRY_STATUSES } from '../lib/constants';
import { useDebounce } from '../hooks/useDebounce';
import { Modal } from '../components/ui/Modal';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';

export default function AdminInquiries() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const debouncedFilter = useDebounce(activeFilter, 300);

  useEffect(() => {
    loadData();
  }, [debouncedFilter]);

  const loadData = async () => {
    setLoading(true);
    try {
      setInquiries(await getInquiriesByStatus(debouncedFilter));
    } catch { /* empty */ }
    setLoading(false);
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateInquiryStatus(id, newStatus);
      toast.success('Saved successfully.');
      if (selectedInquiry?.id === id) {
        setSelectedInquiry({ ...selectedInquiry, status: newStatus });
      }
      loadData();
    } catch {
      toast.error('Action failed. Please try again.');
    }
  };

  const exportCsv = () => {
    const headers = ['Name', 'Email', 'Phone', 'Event Type', 'Event Date', 'Guest Count', 'Budget', 'Message', 'Status', 'Created'];
    const rows = inquiries.map((i) => [
      i.name, i.email, i.phone, i.event_type, i.event_date, i.guest_count, i.budget_range, i.message?.replace(/,/g, ';'), i.status,
      new Date(i.created_at).toLocaleDateString(),
    ]);
    const csv = [headers.join(','), ...rows.map((r) => r.map((v) => `"${v || ''}"`).join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `inquiries-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const statusBadgeVariant = (s) => {
    if (s === 'new') return 'maroon';
    if (s === 'booked') return 'gold';
    if (s === 'contacted') return 'success';
    return 'default';
  };

  const filters = ['all', ...INQUIRY_STATUSES];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-cormorant text-2xl font-bold text-maroon-700">Inquiries</h1>
        <Button onClick={exportCsv} variant="outline-maroon" size="sm">
          <Download className="w-4 h-4" /> Export CSV
        </Button>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`font-lato text-sm px-4 py-1.5 rounded-full capitalize transition-all ${
              activeFilter === f
                ? 'bg-maroon-700 text-beige-100'
                : 'bg-white text-maroon-700 hover:bg-maroon-50 border border-beige-200'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-beige-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-beige-50">
                <th className="text-left px-5 py-3 font-lato text-xs text-neutral-500 uppercase">Name</th>
                <th className="text-left px-5 py-3 font-lato text-xs text-neutral-500 uppercase">Email</th>
                <th className="text-left px-5 py-3 font-lato text-xs text-neutral-500 uppercase">Phone</th>
                <th className="text-left px-5 py-3 font-lato text-xs text-neutral-500 uppercase">Event</th>
                <th className="text-left px-5 py-3 font-lato text-xs text-neutral-500 uppercase">Date</th>
                <th className="text-left px-5 py-3 font-lato text-xs text-neutral-500 uppercase">Status</th>
                <th className="text-left px-5 py-3 font-lato text-xs text-neutral-500 uppercase">Received</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={7} className="px-5 py-8 text-center font-lato text-sm text-neutral-400">Loading...</td></tr>
              ) : inquiries.length === 0 ? (
                <tr><td colSpan={7} className="px-5 py-8 text-center font-lato text-sm text-neutral-400">No inquiries</td></tr>
              ) : (
                inquiries.map((inq) => (
                  <tr
                    key={inq.id}
                    onClick={() => setSelectedInquiry(inq)}
                    className={`border-t border-beige-100 cursor-pointer hover:bg-beige-50/50 ${
                      inq.status === 'new' ? 'bg-maroon-50/30' : ''
                    }`}
                  >
                    <td className="px-5 py-3 font-lato text-sm font-medium">{inq.name}</td>
                    <td className="px-5 py-3 font-lato text-sm text-neutral-500">{inq.email}</td>
                    <td className="px-5 py-3 font-lato text-sm text-neutral-500">{inq.phone}</td>
                    <td className="px-5 py-3 font-lato text-sm text-neutral-500">{inq.event_type}</td>
                    <td className="px-5 py-3 font-lato text-sm text-neutral-500">
                      {inq.event_date ? new Date(inq.event_date).toLocaleDateString() : '—'}
                    </td>
                    <td className="px-5 py-3">
                      <Badge variant={statusBadgeVariant(inq.status)}>{inq.status}</Badge>
                    </td>
                    <td className="px-5 py-3 font-lato text-xs text-neutral-400">
                      {new Date(inq.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        isOpen={!!selectedInquiry}
        onClose={() => setSelectedInquiry(null)}
        title="Inquiry Details"
      >
        {selectedInquiry && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-lato text-xs text-neutral-500">Name</p>
                <p className="font-lato text-sm font-medium">{selectedInquiry.name}</p>
              </div>
              <div>
                <p className="font-lato text-xs text-neutral-500">Email</p>
                <p className="font-lato text-sm">{selectedInquiry.email}</p>
              </div>
              <div>
                <p className="font-lato text-xs text-neutral-500">Phone</p>
                <p className="font-lato text-sm">{selectedInquiry.phone || '—'}</p>
              </div>
              <div>
                <p className="font-lato text-xs text-neutral-500">Event Type</p>
                <p className="font-lato text-sm">{selectedInquiry.event_type || '—'}</p>
              </div>
              <div>
                <p className="font-lato text-xs text-neutral-500">Event Date</p>
                <p className="font-lato text-sm">{selectedInquiry.event_date ? new Date(selectedInquiry.event_date).toLocaleDateString() : '—'}</p>
              </div>
              <div>
                <p className="font-lato text-xs text-neutral-500">Guest Count</p>
                <p className="font-lato text-sm">{selectedInquiry.guest_count || '—'}</p>
              </div>
              <div>
                <p className="font-lato text-xs text-neutral-500">Budget</p>
                <p className="font-lato text-sm">{selectedInquiry.budget_range || '—'}</p>
              </div>
              <div>
                <p className="font-lato text-xs text-neutral-500">Source</p>
                <p className="font-lato text-sm capitalize">{selectedInquiry.source || 'contact'}</p>
              </div>
            </div>

            {(selectedInquiry.message || selectedInquiry.special_requests) && (
              <div>
                <p className="font-lato text-xs text-neutral-500">Message / Special Requests</p>
                <p className="font-lato text-sm bg-beige-50 rounded-lg p-3 mt-1">
                  {selectedInquiry.message || selectedInquiry.special_requests}
                </p>
              </div>
            )}

            <div>
              <p className="font-lato text-xs text-neutral-500 mb-1">Status</p>
              <select
                value={selectedInquiry.status}
                onChange={(e) => handleStatusChange(selectedInquiry.id, e.target.value)}
                className="px-3 py-2 border border-beige-300 rounded-lg font-lato text-sm bg-white focus:outline-none focus:border-maroon-700"
              >
                {INQUIRY_STATUSES.map((s) => (
                  <option key={s} value={s} className="capitalize">{s}</option>
                ))}
              </select>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
