import { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Layers, Image, Package, MessageSquare, HelpCircle, Inbox,
  LogOut, Menu, X, ChevronLeft,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { SITE_NAME } from '../lib/constants';

const SIDEBAR_LINKS = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { to: '/admin/services', label: 'Services', icon: Layers },
  { to: '/admin/gallery', label: 'Gallery', icon: Image },
  { to: '/admin/packages', label: 'Packages', icon: Package },
  { to: '/admin/testimonials', label: 'Testimonials', icon: MessageSquare },
  { to: '/admin/faqs', label: 'FAQs', icon: HelpCircle },
  { to: '/admin/inquiries', label: 'Inquiries', icon: Inbox },
];

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const { user, signOut } = useAuth();
  const location = useLocation();

  const isActive = (link) => {
    if (link.exact) return location.pathname === link.to;
    return location.pathname.startsWith(link.to);
  };

  return (
    <div className="min-h-screen bg-beige-50 flex">
      <aside
        className={`hidden lg:flex flex-col bg-maroon-700 text-beige-100 transition-all duration-300 ${
          collapsed ? 'w-20' : 'w-64'
        }`}
      >
        <div className="p-4 border-b border-maroon-600 flex items-center justify-between">
          {!collapsed && (
            <span className="font-cinzel text-sm font-bold truncate">Admin Panel</span>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1 hover:bg-maroon-600 rounded"
          >
            <ChevronLeft className={`w-4 h-4 transition-transform ${collapsed ? 'rotate-180' : ''}`} />
          </button>
        </div>

        <nav className="flex-1 py-4">
          {SIDEBAR_LINKS.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center gap-3 px-4 py-3 mx-2 rounded-lg font-lato text-sm transition-colors ${
                  isActive(link)
                    ? 'bg-maroon-800 text-gold-400'
                    : 'text-beige-200 hover:bg-maroon-600'
                }`}
              >
                <Icon className="w-5 h-5 shrink-0" />
                {!collapsed && link.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-maroon-600">
          <Link
            to="/"
            className="flex items-center gap-3 px-2 py-2 font-lato text-xs text-beige-300 hover:text-beige-100 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            {!collapsed && 'Back to Site'}
          </Link>
        </div>
      </aside>

      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed top-0 left-0 bottom-0 w-64 bg-maroon-700 text-beige-100 z-50 lg:hidden"
            >
              <div className="p-4 border-b border-maroon-600 flex items-center justify-between">
                <span className="font-cinzel text-sm font-bold">Admin Panel</span>
                <button onClick={() => setSidebarOpen(false)} className="p-1">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <nav className="py-4">
                {SIDEBAR_LINKS.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.to}
                      to={link.to}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 mx-2 rounded-lg font-lato text-sm transition-colors ${
                        isActive(link) ? 'bg-maroon-800 text-gold-400' : 'text-beige-200 hover:bg-maroon-600'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      {link.label}
                    </Link>
                  );
                })}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-beige-200 px-4 py-3 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 hover:bg-beige-100 rounded-lg"
            >
              <Menu className="w-5 h-5" />
            </button>
            <span className="font-cinzel text-sm font-bold text-maroon-700 hidden md:block">
              {SITE_NAME}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-lato text-xs text-neutral-500 hidden sm:block">
              {user?.email}
            </span>
            <button
              onClick={signOut}
              className="flex items-center gap-2 px-3 py-1.5 text-sm font-lato text-maroon-700 hover:bg-maroon-50 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
