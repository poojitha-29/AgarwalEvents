import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Upload, Pencil, Trash2 } from 'lucide-react';
import { getGallery, createGalleryImage, updateGalleryImage, deleteGalleryImage } from '../services/galleryService';
import { uploadImage } from '../lib/cloudinary';
import { GALLERY_CATEGORIES } from '../lib/constants';
import { Modal } from '../components/ui/Modal';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { LazyImage } from '../components/ui/LazyImage';

export default function AdminGallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const { data } = await getGallery({ limit: 100 });
      setImages(data);
    } catch { /* empty */ }
    setLoading(false);
  };

  const handleMultiUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setUploading(true);
    const toastId = toast.loading('Uploading image...');
    let count = 0;
    for (const file of files) {
      try {
        const url = await uploadImage(file, 'agarwal-events/gallery');
        await createGalleryImage({ image_url: url, category: 'Weddings', caption: '' });
        count++;
      } catch { /* skip failed */ }
    }
    toast.dismiss(toastId);
    toast.success(`${count} image${count !== 1 ? 's' : ''} uploaded.`);
    setUploading(false);
    loadData();
    e.target.value = '';
  };

  const openEdit = (item) => {
    setEditing(item);
    reset(item);
    setModalOpen(true);
  };

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      await updateGalleryImage(editing.id, data);
      toast.success('Saved successfully.');
      setModalOpen(false);
      loadData();
    } catch {
      toast.error('Action failed. Please try again.');
    }
    setSubmitting(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this image?')) return;
    try {
      await deleteGalleryImage(id);
      toast.success('Deleted successfully.');
      loadData();
    } catch {
      toast.error('Action failed. Please try again.');
    }
  };

  const categories = GALLERY_CATEGORIES.filter((c) => c !== 'All');

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-cormorant text-2xl font-bold text-maroon-700">Gallery</h1>
        <label className={`inline-flex items-center gap-2 px-4 py-2 bg-maroon-700 text-beige-100 rounded-lg font-lato text-sm cursor-pointer hover:bg-maroon-800 transition-colors ${uploading ? 'opacity-60 pointer-events-none' : ''}`}>
          <Upload className="w-4 h-4" /> Upload Images
          <input type="file" accept="image/*" multiple onChange={handleMultiUpload} className="hidden" />
        </label>
      </div>

      {loading ? (
        <p className="font-lato text-sm text-neutral-400 text-center py-8">Loading...</p>
      ) : images.length === 0 ? (
        <p className="font-lato text-sm text-neutral-400 text-center py-8">No images yet. Upload some!</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((img) => (
            <div key={img.id} className="group relative bg-white rounded-xl overflow-hidden shadow-sm border border-beige-200">
              <LazyImage src={img.image_url} alt={img.caption || 'Gallery'} className="w-full h-40" />
              <div className="p-3">
                <Badge variant="default">{img.category || 'Uncategorized'}</Badge>
                {img.caption && <p className="font-lato text-xs text-neutral-500 mt-1 truncate">{img.caption}</p>}
              </div>
              <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => openEdit(img)} className="p-1.5 bg-white/90 rounded-lg hover:bg-white shadow"><Pencil className="w-3.5 h-3.5 text-neutral-600" /></button>
                <button onClick={() => handleDelete(img.id)} className="p-1.5 bg-white/90 rounded-lg hover:bg-white shadow"><Trash2 className="w-3.5 h-3.5 text-red-500" /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Edit Image">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="font-lato text-sm font-medium block mb-1">Caption</label>
            <input {...register('caption')} className="w-full px-3 py-2 border border-beige-300 rounded-lg font-lato text-sm focus:outline-none focus:border-maroon-700" />
          </div>
          <div>
            <label className="font-lato text-sm font-medium block mb-1">Category</label>
            <select {...register('category')} className="w-full px-3 py-2 border border-beige-300 rounded-lg font-lato text-sm bg-white focus:outline-none focus:border-maroon-700">
              {categories.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="flex gap-6">
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
            <Button type="submit" loading={submitting}>Update</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
