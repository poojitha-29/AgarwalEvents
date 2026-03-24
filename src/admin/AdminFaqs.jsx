import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { getFaqs, createFaq, updateFaq, deleteFaq } from '../services/faqsService';
import { FAQ_CATEGORIES } from '../lib/constants';
import { Modal } from '../components/ui/Modal';
import { Button } from '../components/ui/Button';

const categories = FAQ_CATEGORIES.filter((c) => c !== 'All');

export default function AdminFaqs() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    setLoading(true);
    try { setFaqs(await getFaqs()); } catch { /* empty */ }
    setLoading(false);
  };

  const openAdd = () => {
    setEditing(null);
    reset({ question: '', answer: '', category: '', sort_order: 0 });
    setModalOpen(true);
  };

  const openEdit = (item) => {
    setEditing(item);
    reset(item);
    setModalOpen(true);
  };

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      if (editing) {
        await updateFaq(editing.id, data);
      } else {
        await createFaq(data);
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
    if (!window.confirm('Delete this FAQ?')) return;
    try {
      await deleteFaq(id);
      toast.success('Deleted successfully.');
      loadData();
    } catch {
      toast.error('Action failed. Please try again.');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-cormorant text-2xl font-bold text-maroon-700">FAQs</h1>
        <Button onClick={openAdd} size="sm"><Plus className="w-4 h-4" /> Add FAQ</Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-beige-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-beige-50">
                <th className="text-left px-5 py-3 font-lato text-xs text-neutral-500 uppercase">Question</th>
                <th className="text-left px-5 py-3 font-lato text-xs text-neutral-500 uppercase">Category</th>
                <th className="text-left px-5 py-3 font-lato text-xs text-neutral-500 uppercase">Order</th>
                <th className="text-right px-5 py-3 font-lato text-xs text-neutral-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={4} className="px-5 py-8 text-center font-lato text-sm text-neutral-400">Loading...</td></tr>
              ) : faqs.length === 0 ? (
                <tr><td colSpan={4} className="px-5 py-8 text-center font-lato text-sm text-neutral-400">No FAQs yet</td></tr>
              ) : (
                faqs.map((f) => (
                  <tr key={f.id} className="border-t border-beige-100 hover:bg-beige-50/50">
                    <td className="px-5 py-3 font-lato text-sm max-w-xs truncate">{f.question}</td>
                    <td className="px-5 py-3 font-lato text-sm text-neutral-500">{f.category}</td>
                    <td className="px-5 py-3 font-lato text-sm text-neutral-500">{f.sort_order}</td>
                    <td className="px-5 py-3 text-right space-x-2">
                      <button onClick={() => openEdit(f)} className="p-1.5 hover:bg-beige-100 rounded-lg"><Pencil className="w-4 h-4 text-neutral-500" /></button>
                      <button onClick={() => handleDelete(f.id)} className="p-1.5 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4 text-red-500" /></button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit FAQ' : 'Add FAQ'}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="font-lato text-sm font-medium block mb-1">Question *</label>
            <input {...register('question', { required: 'This field is required' })} className="w-full px-3 py-2 border border-beige-300 rounded-lg font-lato text-sm focus:outline-none focus:border-maroon-700" />
            {errors.question && <p className="text-maroon-600 text-xs mt-1">{errors.question.message}</p>}
          </div>

          <div>
            <label className="font-lato text-sm font-medium block mb-1">Answer *</label>
            <textarea {...register('answer', { required: 'This field is required' })} rows={4} className="w-full px-3 py-2 border border-beige-300 rounded-lg font-lato text-sm resize-none focus:outline-none focus:border-maroon-700" />
            {errors.answer && <p className="text-maroon-600 text-xs mt-1">{errors.answer.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-lato text-sm font-medium block mb-1">Category</label>
              <select {...register('category')} className="w-full px-3 py-2 border border-beige-300 rounded-lg font-lato text-sm bg-white focus:outline-none focus:border-maroon-700">
                <option value="">Select</option>
                {categories.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="font-lato text-sm font-medium block mb-1">Sort Order</label>
              <input type="number" {...register('sort_order', { valueAsNumber: true })} className="w-full px-3 py-2 border border-beige-300 rounded-lg font-lato text-sm focus:outline-none focus:border-maroon-700" />
            </div>
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
