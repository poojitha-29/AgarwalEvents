import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Inbox, Layers, Image, Plus, Upload, Eye } from 'lucide-react';
import { getInquiryStats } from '../services/inquiriesService';
import { getServices } from '../services/servicesService';
import { getGallery } from '../services/galleryService';
import { getInquiries } from '../services/inquiriesService';
import { FadeInUp } from '../components/ui/FadeInUp';
import { Badge } from '../components/ui/Badge';

export default function Dashboard() {
  const [stats, setStats] = useState({ total: 0, new: 0 });
  const [serviceCount, setServiceCount] = useState(0);
  const [galleryCount, setGalleryCount] = useState(0);
  const [recentInquiries, setRecentInquiries] = useState([]);

  useEffect(() => {
    getInquiryStats().then(setStats).catch(() => {});
    getServices().then((d) => setServiceCount(d.length)).catch(() => {});
    getGallery({ limit: 1 }).then(({ count }) => setGalleryCount(count)).catch(() => {});
    getInquiries().then((d) => setRecentInquiries(d.slice(0, 10))).catch(() => {});
  }, []);

  const statCards = [
    { label: 'Total Inquiries', value: stats.total, icon: Inbox, color: 'bg-maroon-700' },
    { label: 'New Inquiries', value: stats.new, icon: Inbox, color: 'bg-gold-500' },
    { label: 'Services', value: serviceCount, icon: Layers, color: 'bg-maroon-600' },
    { label: 'Gallery Images', value: galleryCount, icon: Image, color: 'bg-maroon-500' },
  ];

  return (
    <div>
      <FadeInUp>
        <h1 className="font-cormorant text-2xl font-bold text-maroon-700 mb-6">Dashboard</h1>
      </FadeInUp>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((s, i) => {
          const Icon = s.icon;
          return (
            <FadeInUp key={s.label} delay={i * 0.05}>
              <div className="bg-white rounded-xl p-5 shadow-sm border border-beige-200">
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-10 h-10 ${s.color} rounded-lg flex items-center justify-center`}>
                    <Icon className="w-5 h-5 text-beige-100" />
                  </div>
                </div>
                <p className="font-cinzel text-2xl font-bold text-maroon-700">{s.value}</p>
                <p className="font-lato text-xs text-neutral-500">{s.label}</p>
              </div>
            </FadeInUp>
          );
        })}
      </div>

      <FadeInUp delay={0.1}>
        <div className="flex flex-wrap gap-3 mb-8">
          <Link to="/admin/services" className="flex items-center gap-2 px-4 py-2 bg-maroon-700 text-beige-100 rounded-lg font-lato text-sm hover:bg-maroon-800 transition-colors">
            <Plus className="w-4 h-4" /> Add Service
          </Link>
          <Link to="/admin/gallery" className="flex items-center gap-2 px-4 py-2 bg-maroon-700 text-beige-100 rounded-lg font-lato text-sm hover:bg-maroon-800 transition-colors">
            <Upload className="w-4 h-4" /> Upload Images
          </Link>
          <Link to="/admin/inquiries" className="flex items-center gap-2 px-4 py-2 bg-gold-500 text-maroon-900 rounded-lg font-lato text-sm hover:bg-gold-400 transition-colors">
            <Eye className="w-4 h-4" /> View Inquiries
          </Link>
        </div>
      </FadeInUp>

      <FadeInUp delay={0.15}>
        <div className="bg-white rounded-xl shadow-sm border border-beige-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-beige-200">
            <h2 className="font-cormorant text-lg font-bold text-maroon-700">Recent Inquiries</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-beige-50">
                  <th className="text-left px-5 py-3 font-lato text-xs text-neutral-500 uppercase">Name</th>
                  <th className="text-left px-5 py-3 font-lato text-xs text-neutral-500 uppercase">Event</th>
                  <th className="text-left px-5 py-3 font-lato text-xs text-neutral-500 uppercase">Date</th>
                  <th className="text-left px-5 py-3 font-lato text-xs text-neutral-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentInquiries.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-5 py-8 text-center font-lato text-sm text-neutral-400">
                      No inquiries yet
                    </td>
                  </tr>
                ) : (
                  recentInquiries.map((inq) => (
                    <tr key={inq.id} className={`border-t border-beige-100 ${inq.status === 'new' ? 'bg-maroon-50/50' : ''}`}>
                      <td className="px-5 py-3 font-lato text-sm">{inq.name}</td>
                      <td className="px-5 py-3 font-lato text-sm text-neutral-500">{inq.event_type}</td>
                      <td className="px-5 py-3 font-lato text-sm text-neutral-500">
                        {inq.event_date ? new Date(inq.event_date).toLocaleDateString() : '—'}
                      </td>
                      <td className="px-5 py-3">
                        <Badge variant={inq.status === 'new' ? 'maroon' : inq.status === 'booked' ? 'gold' : 'default'}>
                          {inq.status}
                        </Badge>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </FadeInUp>
    </div>
  );
}
