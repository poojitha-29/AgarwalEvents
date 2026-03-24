import { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Plus, Pencil, Trash2, X } from 'lucide-react';
import { getPackages, createPackage, updatePackage, deletePackage } from '../services/packagesService';
import { EVENT_TYPES } from '../lib/constants';
import { Modal } from '../components/ui/Modal';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';

export default function AdminPackages() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const { register, handleSubmit, reset, control, formState: { errors } } = useForm({
    defaultValues: { features: [{ value: '' }] },
  });
  const { fields, append, remove } = useFieldArray({ control, name: 'features' });

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    setLoading(true);
    try { setPackages(await getPackages()); } catch { /* empty */ }
    setLoading(false);
  };

  const openAdd = () => {
    setEditing(null);
    reset({ name: '', category: '', description: '', price_display: '', features: [{ value: '' }], is_popular: false });
    setModalOpen(true);
  };

  const openEdit = (item) => {
    setEditing(item);
    const feat = (item.features || []).map((f) => ({ value: f }));
    reset({ ...item, features: feat.length ? feat : [{ value: '' }] });
    setModalOpen(true);
  };

  const onSubmit = async (data) => {
    setSubmitting(true);
    const payload = { ...data, features: data.features.map((f) => f.value).filter(Boolean) };
    try {
      if (editing) {
        await updatePackage(editing.id, payload);
      } else {
        await createPackage(payload);
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
    if (!window.confirm('Delete this package?')) return;
    try {
      await deletePackage(id);
      toast.success('Deleted successfully.');
      loadData();
    } catch {
      toast.error('Action failed. Please try again.');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-cormorant text-2xl font-bold text-maroon-700">Packages</h1>
        <Button onClick={openAdd} size="sm"><Plus className="w-4 h-4" /> Add Package</Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-beige-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-beige-50">
                <th className="text-left px-5 py-3 font-lato text-xs text-neutral-500 uppercase">Name</th>
                <th className="text-left px-5 py-3 font-lato text-xs text-neutral-500 uppercase">Category</th>
                <th className="text-left px-5 py-3 font-lato text-xs text-neutral-500 uppercase">Price</th>
                <th className="text-left px-5 py-3 font-lato text-xs text-neutral-500 uppercase">Tags</th>
                <th className="text-right px-5 py-3 font-lato text-xs text-neutral-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={5} className="px-5 py-8 text-center font-lato text-sm text-neutral-400">Loading...</td></tr>
              ) : packages.length === 0 ? (
                <tr><td colSpan={5} className="px-5 py-8 text-center font-lato text-sm text-neutral-400">No packages yet</td></tr>
              ) : (
                packages.map((p) => (
                  <tr key={p.id} className="border-t border-beige-100 hover:bg-beige-50/50">
                    <td className="px-5 py-3 font-lato text-sm font-medium">{p.name}</td>
                    <td className="px-5 py-3 font-lato text-sm text-neutral-500">{p.category}</td>
                    <td className="px-5 py-3 font-lato text-sm text-neutral-500">{p.price_display}</td>
                    <td className="px-5 py-3">{p.is_popular && <Badge variant="gold">Popular</Badge>}</td>
                    <td className="px-5 py-3 text-right space-x-2">
                      <button onClick={() => openEdit(p)} className="p-1.5 hover:bg-beige-100 rounded-lg"><Pencil className="w-4 h-4 text-neutral-500" /></button>
                      <button onClick={() => handleDelete(p.id)} className="p-1.5 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4 text-red-500" /></button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Package' : 'Add Package'}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="font-lato text-sm font-medium block mb-1">Name *</label>
              <input {...register('name', { required: 'This field is required' })} className="w-full px-3 py-2 border border-beige-300 rounded-lg font-lato text-sm focus:outline-none focus:border-maroon-700" placeholder="e.g. Premium" />
              {errors.name && <p className="text-maroon-600 text-xs mt-1">{errors.name.message}</p>}
            </div>
            <div>
              <label className="font-lato text-sm font-medium block mb-1">Category *</label>
              <select {...register('category', { required: true })} className="w-full px-3 py-2 border border-beige-300 rounded-lg font-lato text-sm bg-white focus:outline-none focus:border-maroon-700">
                <option value="">Select</option>
                {EVENT_TYPES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="font-lato text-sm font-medium block mb-1">Description</label>
            <textarea {...register('description')} rows={2} className="w-full px-3 py-2 border border-beige-300 rounded-lg font-lato text-sm resize-none focus:outline-none focus:border-maroon-700" />
          </div>

          <div>
            <label className="font-lato text-sm font-medium block mb-1">Price Display</label>
            <input {...register('price_display')} className="w-full px-3 py-2 border border-beige-300 rounded-lg font-lato text-sm focus:outline-none focus:border-maroon-700" placeholder="e.g. ₹5,00,000 onwards" />
          </div>

          <div>
            <label className="font-lato text-sm font-medium block mb-2">Features</label>
            {fields.map((field, index) => (
              <div key={field.id} className="flex gap-2 mb-2">
                <input {...register(`features.${index}.value`)} className="flex-1 px-3 py-2 border border-beige-300 rounded-lg font-lato text-sm focus:outline-none focus:border-maroon-700" placeholder="Feature..." />
                {fields.length > 1 && (
                  <button type="button" onClick={() => remove(index)} className="p-2 hover:bg-red-50 rounded-lg"><X className="w-4 h-4 text-red-500" /></button>
                )}
              </div>
            ))}
            <button type="button" onClick={() => append({ value: '' })} className="font-lato text-sm text-maroon-700 hover:text-maroon-800">
              + Add feature
            </button>
          </div>

          <label className="flex items-center gap-2 font-lato text-sm">
            <input type="checkbox" {...register('is_popular')} className="rounded border-beige-300" /> Most Popular
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
