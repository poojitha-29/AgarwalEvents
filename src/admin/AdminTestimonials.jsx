import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Plus, Pencil, Trash2, Star } from 'lucide-react';
import { getTestimonials, createTestimonial, updateTestimonial, deleteTestimonial } from '../services/testimonialsService';
import { uploadImage } from '../lib/cloudinary';
import { EVENT_TYPES } from '../lib/constants';
import { Modal } from '../components/ui/Modal';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { LazyImage } from '../components/ui/LazyImage';

function StarSelector({ value, onChange }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <button key={s} type="button" onClick={() => onChange(s)}>
          <Star className={`w-6 h-6 ${s <= value ? 'fill-gold-400 text-gold-400' : 'text-beige-300'}`} />
        </button>
      ))}
    </div>
  );
}

export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [rating, setRating] = useState(5);
  const [imagePreview, setImagePreview] = useState('');
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    setLoading(true);
    try { setTestimonials(await getTestimonials()); } catch { /* empty */ }
    setLoading(false);
  };

  const openAdd = () => {
    setEditing(null);
    reset({ client_name: '', event_type: '', review_text: '', is_featured: false });
    setRating(5);
    setImagePreview('');
    setModalOpen(true);
  };

  const openEdit = (item) => {
    setEditing(item);
    reset(item);
    setRating(item.rating || 5);
    setImagePreview(item.couple_image_url || '');
    setModalOpen(true);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const toastId = toast.loading('Uploading image...');
    try {
      const url = await uploadImage(file, 'agarwal-events/testimonials');
      setValue('couple_image_url', url);
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
    const payload = { ...data, rating };
    try {
      if (editing) {
        await updateTestimonial(editing.id, payload);
      } else {
        await createTestimonial(payload);
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
    if (!window.confirm('Delete this testimonial?')) return;
    try {
      await deleteTestimonial(id);
      toast.success('Deleted successfully.');
      loadData();
    } catch {
      toast.error('Action failed. Please try again.');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-cormorant text-2xl font-bold text-maroon-700">Testimonials</h1>
        <Button onClick={openAdd} size="sm"><Plus className="w-4 h-4" /> Add Testimonial</Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-beige-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-beige-50">
                <th className="text-left px-5 py-3 font-lato text-xs text-neutral-500 uppercase">Client</th>
                <th className="text-left px-5 py-3 font-lato text-xs text-neutral-500 uppercase">Event</th>
                <th className="text-left px-5 py-3 font-lato text-xs text-neutral-500 uppercase">Rating</th>
                <th className="text-left px-5 py-3 font-lato text-xs text-neutral-500 uppercase">Tags</th>
                <th className="text-right px-5 py-3 font-lato text-xs text-neutral-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={5} className="px-5 py-8 text-center font-lato text-sm text-neutral-400">Loading...</td></tr>
              ) : testimonials.length === 0 ? (
                <tr><td colSpan={5} className="px-5 py-8 text-center font-lato text-sm text-neutral-400">No testimonials yet</td></tr>
              ) : (
                testimonials.map((t) => (
                  <tr key={t.id} className="border-t border-beige-100 hover:bg-beige-50/50">
                    <td className="px-5 py-3 font-lato text-sm font-medium">{t.client_name}</td>
                    <td className="px-5 py-3 font-lato text-sm text-neutral-500">{t.event_type}</td>
                    <td className="px-5 py-3">
                      <div className="flex gap-0.5">
                        {Array.from({ length: t.rating || 5 }).map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-gold-400 text-gold-400" />
                        ))}
                      </div>
                    </td>
                    <td className="px-5 py-3">{t.is_featured && <Badge variant="gold">Featured</Badge>}</td>
                    <td className="px-5 py-3 text-right space-x-2">
                      <button onClick={() => openEdit(t)} className="p-1.5 hover:bg-beige-100 rounded-lg"><Pencil className="w-4 h-4 text-neutral-500" /></button>
                      <button onClick={() => handleDelete(t.id)} className="p-1.5 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4 text-red-500" /></button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Testimonial' : 'Add Testimonial'}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="font-lato text-sm font-medium block mb-1">Client Name *</label>
              <input {...register('client_name', { required: 'This field is required' })} className="w-full px-3 py-2 border border-beige-300 rounded-lg font-lato text-sm focus:outline-none focus:border-maroon-700" />
              {errors.client_name && <p className="text-maroon-600 text-xs mt-1">{errors.client_name.message}</p>}
            </div>
            <div>
              <label className="font-lato text-sm font-medium block mb-1">Event Type</label>
              <select {...register('event_type')} className="w-full px-3 py-2 border border-beige-300 rounded-lg font-lato text-sm bg-white focus:outline-none focus:border-maroon-700">
                <option value="">Select</option>
                {EVENT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="font-lato text-sm font-medium block mb-1">Review *</label>
            <textarea {...register('review_text', { required: 'This field is required' })} rows={4} className="w-full px-3 py-2 border border-beige-300 rounded-lg font-lato text-sm resize-none focus:outline-none focus:border-maroon-700" />
            {errors.review_text && <p className="text-maroon-600 text-xs mt-1">{errors.review_text.message}</p>}
          </div>

          <div>
            <label className="font-lato text-sm font-medium block mb-2">Rating</label>
            <StarSelector value={rating} onChange={setRating} />
          </div>

          <div>
            <label className="font-lato text-sm font-medium block mb-1">Couple Photo</label>
            <input type="file" accept="image/*" onChange={handleImageUpload} className="font-lato text-sm" />
            {imagePreview && <LazyImage src={imagePreview} alt="Preview" className="w-16 h-16 rounded-full mt-2" />}
            <input type="hidden" {...register('couple_image_url')} />
          </div>

          <label className="flex items-center gap-2 font-lato text-sm">
            <input type="checkbox" {...register('is_featured')} className="rounded border-beige-300" /> Featured
          </label>

          <div className="flex justify-end gap-3 pt-2">
            <Button variant="ghost" type="button" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button type="submit" loading={submitting}>{editing ? 'Update' : 'Create'}</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
