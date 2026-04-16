import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { getServices, createService, updateService, deleteService } from '../services/servicesService';
import { uploadImage } from '../lib/cloudinary';
import { EVENT_TYPES } from '../lib/constants';
import { Modal } from '../components/ui/Modal';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { LazyImage } from '../components/ui/LazyImage';

export default function AdminServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState('');
  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm();
  const title = watch('title');

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (title && !editing) {
      setValue('slug', title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, ''));
    }
  }, [title, editing, setValue]);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await getServices();
      setServices(data);
    } catch { /* empty */ }
    setLoading(false);
  };

  const openAdd = () => {
    setEditing(null);
    reset({ title: '', slug: '', category: '', description: '', is_wedding: false, is_featured: false, sort_order: 0 });
    setImagePreview('');
    setModalOpen(true);
  };

  const openEdit = (item) => {
    setEditing(item);
    reset(item);
    setImagePreview(item.cover_image_url || '');
    setModalOpen(true);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const toastId = toast.loading('Uploading image...');
    try {
      const url = await uploadImage(file, 'agarwal-events/services');
      setValue('cover_image_url', url);
      setImagePreview(url);
      toast.dismiss(toastId);
      toast.success('Image uploaded.');
    } catch {
      toast.dismiss(toastId);
      toast.error('Action failed. Please try again.');
    }
  };

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      if (editing) {
        await updateService(editing.id, data);
      } else {
        await createService(data);
      }
      toast.success('Saved successfully.');
      setModalOpen(false);
      loadData();
    } catch {
      toast.error('Action failed. Please try again.');
    }
    setSubmitting(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this service?')) return;
    try {
      await deleteService(id);
      toast.success('Deleted successfully.');
      loadData();
    } catch {
      toast.error('Action failed. Please try again.');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-cormorant text-2xl font-bold text-maroon-700">Services</h1>
        <Button onClick={openAdd} size="sm"><Plus className="w-4 h-4" /> Add Service</Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-beige-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-beige-50">
                <th className="text-left px-5 py-3 font-lato text-xs text-neutral-500 uppercase">Title</th>
                <th className="text-left px-5 py-3 font-lato text-xs text-neutral-500 uppercase">Category</th>
                <th className="text-left px-5 py-3 font-lato text-xs text-neutral-500 uppercase">Tags</th>
                <th className="text-right px-5 py-3 font-lato text-xs text-neutral-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={4} className="px-5 py-8 text-center font-lato text-sm text-neutral-400">Loading...</td></tr>
              ) : services.length === 0 ? (
                <tr><td colSpan={4} className="px-5 py-8 text-center font-lato text-sm text-neutral-400">No services yet</td></tr>
              ) : (
                services.map((s) => (
                  <tr key={s.id} className="border-t border-beige-100 hover:bg-beige-50/50">
                    <td className="px-5 py-3 font-lato text-sm font-medium">{s.title}</td>
                    <td className="px-5 py-3 font-lato text-sm text-neutral-500">{s.category}</td>
                    <td className="px-5 py-3 space-x-1">
                      {s.is_wedding && <Badge variant="maroon">Wedding</Badge>}
                      {s.is_featured && <Badge variant="gold">Featured</Badge>}
                    </td>
                    <td className="px-5 py-3 text-right space-x-2">
                      <button onClick={() => openEdit(s)} className="p-1.5 hover:bg-beige-100 rounded-lg transition-colors"><Pencil className="w-4 h-4 text-neutral-500" /></button>
                      <button onClick={() => handleDelete(s.id)} className="p-1.5 hover:bg-red-50 rounded-lg transition-colors"><Trash2 className="w-4 h-4 text-red-500" /></button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Service' : 'Add Service'}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="font-lato text-sm font-medium block mb-1">Title *</label>
              <input {...register('title', { required: 'This field is required' })} className="w-full px-3 py-2 border border-beige-300 rounded-lg font-lato text-sm focus:outline-none focus:border-maroon-700" />
              {errors.title && <p className="text-maroon-600 text-xs mt-1">{errors.title.message}</p>}
            </div>
            <div>
              <label className="font-lato text-sm font-medium block mb-1">Slug *</label>
              <input {...register('slug', { required: true, pattern: { value: /^[a-z0-9-]+$/, message: 'Lowercase letters, numbers, hyphens only' } })} className="w-full px-3 py-2 border border-beige-300 rounded-lg font-lato text-sm focus:outline-none focus:border-maroon-700" />
              {errors.slug && <p className="text-maroon-600 text-xs mt-1">{errors.slug.message}</p>}
            </div>
          </div>

          <div>
            <label className="font-lato text-sm font-medium block mb-1">Category *</label>
            <select {...register('category', { required: true })} className="w-full px-3 py-2 border border-beige-300 rounded-lg font-lato text-sm focus:outline-none focus:border-maroon-700 bg-white">
              <option value="">Select</option>
              {EVENT_TYPES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div>
            <label className="font-lato text-sm font-medium block mb-1">Description</label>
            <textarea {...register('description')} rows={3} className="w-full px-3 py-2 border border-beige-300 rounded-lg font-lato text-sm focus:outline-none focus:border-maroon-700 resize-none" />
          </div>

          <div>
            <label className="font-lato text-sm font-medium block mb-1">Cover Image</label>
            <input type="file" accept="image/*" onChange={handleImageUpload} className="font-lato text-sm" />
            {imagePreview && <LazyImage src={imagePreview} alt="Preview" className="w-32 h-20 rounded-lg mt-2" />}
            <input type="hidden" {...register('cover_image_url')} />
          </div>

          <div className="flex flex-wrap gap-6">
            <label className="flex items-center gap-2 font-lato text-sm">
              <input type="checkbox" {...register('is_wedding')} className="rounded border-beige-300" /> Wedding service
            </label>
            <label className="flex items-center gap-2 font-lato text-sm">
              <input type="checkbox" {...register('is_featured')} className="rounded border-beige-300" /> Featured
            </label>
          </div>

          <div>
            <label className="font-lato text-sm font-medium block mb-1">Sort Order</label>
            <input type="number" {...register('sort_order', { valueAsNumber: true })} className="w-24 px-3 py-2 border border-beige-300 rounded-lg font-lato text-sm focus:outline-none focus:border-maroon-700" />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button variant="ghost" type="button" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button type="submit" loading={submitting}>{editing ? 'Update' : 'Create'}</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
