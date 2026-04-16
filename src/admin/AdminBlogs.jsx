import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Plus, Pencil, Trash2, Upload, Image as ImageIcon, ExternalLink } from 'lucide-react';
import { getBlogs, createBlog, updateBlog, deleteBlog } from '../services/blogsService';
import { uploadImage } from '../lib/cloudinary';
import { Modal } from '../components/ui/Modal';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';

const BLOG_CATEGORIES = ['Weddings', 'Corporate', 'Birthdays', 'Event Tips', 'Behind the Scenes'];

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

function formatDate(dateStr) {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric',
  });
}

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');
  const fileInputRef = useRef(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const titleValue = watch('title', '');

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      setBlogs(await getBlogs({ limit: 100 }));
    } catch {
      toast.error('Failed to load blogs.');
    }
    setLoading(false);
  };

  const openAdd = () => {
    setEditing(null);
    setPreviewUrl('');
    reset({
      title: '',
      slug: '',
      category: 'Weddings',
      excerpt: '',
      content: '',
      cover_image_url: '',
      published_at: new Date().toISOString().slice(0, 10),
    });
    setModalOpen(true);
  };

  const openEdit = (item) => {
    setEditing(item);
    setPreviewUrl(item.cover_image_url || '');
    reset({
      ...item,
      published_at: item.published_at ? item.published_at.slice(0, 10) : new Date().toISOString().slice(0, 10),
    });
    setModalOpen(true);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const toastId = toast.loading('Uploading image…');
    try {
      const url = await uploadImage(file, 'agarwal-events/blogs');
      setValue('cover_image_url', url);
      setPreviewUrl(url);
      toast.dismiss(toastId);
      toast.success('Image uploaded.');
    } catch {
      toast.dismiss(toastId);
      toast.error('Upload failed. Please try again.');
    }
    setUploading(false);
    e.target.value = '';
  };

  const handleTitleChange = (e) => {
    const val = e.target.value;
    if (!editing) {
      setValue('slug', slugify(val));
    }
  };

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      const payload = {
        ...data,
        published_at: data.published_at
          ? new Date(data.published_at).toISOString()
          : new Date().toISOString(),
      };
      if (editing) {
        const updated = await updateBlog(editing.id, payload);
        setBlogs((prev) => prev.map((b) => (b.id === updated.id ? updated : b)));
      } else {
        const created = await createBlog(payload);
        setBlogs((prev) => [created, ...prev]);
      }
      toast.success(editing ? 'Blog updated.' : 'Blog created.');
      setModalOpen(false);
    } catch (err) {
      toast.error(err?.message || 'Action failed. Please try again.');
    }
    setSubmitting(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Permanently delete this blog post?')) return;
    try {
      await deleteBlog(id);
      setBlogs((prev) => prev.filter((b) => b.id !== id));
      toast.success('Blog deleted.');
    } catch {
      toast.error('Delete failed. Please try again.');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-cormorant text-2xl font-bold text-maroon-700">Blogs</h1>
          <p className="font-lato text-xs text-neutral-400 mt-0.5">{blogs.length} post{blogs.length !== 1 ? 's' : ''}</p>
        </div>
        <Button onClick={openAdd} size="sm">
          <Plus className="w-4 h-4" /> New Blog
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-beige-200 overflow-hidden">
        {loading ? (
          <div className="space-y-0">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center gap-4 px-5 py-4 border-b border-beige-100 animate-pulse">
                <div className="w-14 h-10 rounded-lg bg-beige-200 shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-3.5 bg-beige-200 rounded w-2/3" />
                  <div className="h-2.5 bg-beige-100 rounded w-1/4" />
                </div>
              </div>
            ))}
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-16">
            <ImageIcon className="w-10 h-10 text-beige-300 mx-auto mb-3" />
            <p className="font-cormorant text-xl text-neutral-400">No blogs yet</p>
            <p className="font-lato text-sm text-neutral-300 mt-1">Click "New Blog" to publish your first post.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-beige-50">
                  <th className="text-left px-5 py-3 font-lato text-xs text-neutral-500 uppercase tracking-wider">Post</th>
                  <th className="text-left px-5 py-3 font-lato text-xs text-neutral-500 uppercase tracking-wider hidden sm:table-cell">Category</th>
                  <th className="text-left px-5 py-3 font-lato text-xs text-neutral-500 uppercase tracking-wider hidden md:table-cell">Date</th>
                  <th className="text-right px-5 py-3 font-lato text-xs text-neutral-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {blogs.map((blog) => (
                  <tr key={blog.id} className="border-t border-beige-100 hover:bg-beige-50/50 transition-colors">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        {blog.cover_image_url ? (
                          <img
                            src={blog.cover_image_url}
                            alt={blog.title}
                            className="w-14 h-10 object-cover rounded-lg shrink-0"
                          />
                        ) : (
                          <div className="w-14 h-10 bg-beige-200 rounded-lg flex items-center justify-center shrink-0">
                            <ImageIcon className="w-4 h-4 text-beige-400" />
                          </div>
                        )}
                        <div className="min-w-0">
                          <p className="font-lato text-sm font-semibold text-neutral-700 truncate max-w-[200px] md:max-w-xs">
                            {blog.title}
                          </p>
                          <p className="font-lato text-xs text-neutral-400 truncate max-w-[200px]">
                            /{blog.slug}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3 hidden sm:table-cell">
                      <Badge variant="default">{blog.category || '—'}</Badge>
                    </td>
                    <td className="px-5 py-3 font-lato text-sm text-neutral-500 hidden md:table-cell">
                      {formatDate(blog.published_at)}
                    </td>
                    <td className="px-5 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <a
                          href={`/blogs/${blog.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 hover:bg-beige-100 rounded-lg"
                          title="View post"
                        >
                          <ExternalLink className="w-4 h-4 text-neutral-400" />
                        </a>
                        <button
                          onClick={() => openEdit(blog)}
                          className="p-1.5 hover:bg-beige-100 rounded-lg"
                        >
                          <Pencil className="w-4 h-4 text-neutral-500" />
                        </button>
                        <button
                          onClick={() => handleDelete(blog.id)}
                          className="p-1.5 hover:bg-red-50 rounded-lg"
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? 'Edit Blog Post' : 'New Blog Post'}
        size="lg"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="font-lato text-sm font-medium block mb-1">
              Title <span className="text-maroon-600">*</span>
            </label>
            <input
              {...register('title', { required: 'Title is required' })}
              onChange={(e) => { register('title').onChange(e); handleTitleChange(e); }}
              className="w-full px-3 py-2.5 border border-beige-300 rounded-lg font-lato text-sm focus:outline-none focus:border-maroon-700 focus:ring-1 focus:ring-maroon-700/20"
              placeholder="Enter blog title…"
            />
            {errors.title && <p className="text-maroon-600 text-xs mt-1">{errors.title.message}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-lato text-sm font-medium block mb-1">
                Slug <span className="text-maroon-600">*</span>
              </label>
              <input
                {...register('slug', { required: 'Slug is required' })}
                className="w-full px-3 py-2.5 border border-beige-300 rounded-lg font-lato text-sm focus:outline-none focus:border-maroon-700 focus:ring-1 focus:ring-maroon-700/20"
                placeholder="url-friendly-slug"
              />
              {errors.slug && <p className="text-maroon-600 text-xs mt-1">{errors.slug.message}</p>}
            </div>

            <div>
              <label className="font-lato text-sm font-medium block mb-1">Category</label>
              <select
                {...register('category')}
                className="w-full px-3 py-2.5 border border-beige-300 rounded-lg font-lato text-sm bg-white focus:outline-none focus:border-maroon-700 focus:ring-1 focus:ring-maroon-700/20"
              >
                {BLOG_CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="font-lato text-sm font-medium block mb-1">Published Date</label>
            <input
              type="date"
              {...register('published_at')}
              className="w-full px-3 py-2.5 border border-beige-300 rounded-lg font-lato text-sm focus:outline-none focus:border-maroon-700 focus:ring-1 focus:ring-maroon-700/20"
            />
          </div>

          <div>
            <label className="font-lato text-sm font-medium block mb-1">
              Cover Image
            </label>
            <div className="flex gap-3">
              <input
                {...register('cover_image_url')}
                className="flex-1 px-3 py-2.5 border border-beige-300 rounded-lg font-lato text-sm focus:outline-none focus:border-maroon-700 focus:ring-1 focus:ring-maroon-700/20"
                placeholder="https://… or upload below"
                onChange={(e) => { register('cover_image_url').onChange(e); setPreviewUrl(e.target.value); }}
              />
              <label className={`inline-flex items-center gap-2 px-4 py-2.5 bg-beige-100 border border-beige-300 text-neutral-700 rounded-lg font-lato text-sm cursor-pointer hover:bg-beige-200 transition-colors shrink-0 ${uploading ? 'opacity-60 pointer-events-none' : ''}`}>
                <Upload className="w-4 h-4" />
                {uploading ? 'Uploading…' : 'Upload'}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>
            {previewUrl && (
              <div className="mt-3">
                <img
                  src={previewUrl}
                  alt="Cover preview"
                  className="h-32 w-full object-cover rounded-lg border border-beige-200"
                />
              </div>
            )}
          </div>

          <div>
            <label className="font-lato text-sm font-medium block mb-1">
              Excerpt / Short Description
            </label>
            <textarea
              {...register('excerpt')}
              rows={2}
              className="w-full px-3 py-2.5 border border-beige-300 rounded-lg font-lato text-sm resize-none focus:outline-none focus:border-maroon-700 focus:ring-1 focus:ring-maroon-700/20"
              placeholder="A brief summary shown on the blog listing page…"
            />
          </div>

          <div>
            <label className="font-lato text-sm font-medium block mb-1">
              Content <span className="text-neutral-400 text-xs font-normal">(Use **text** for headings, blank line between paragraphs)</span>
            </label>
            <textarea
              {...register('content')}
              rows={12}
              className="w-full px-3 py-2.5 border border-beige-300 rounded-lg font-lato text-sm resize-y focus:outline-none focus:border-maroon-700 focus:ring-1 focus:ring-maroon-700/20 font-mono"
              placeholder="Write your blog content here…&#10;&#10;**Section Heading**&#10;&#10;Your paragraph text goes here."
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button
              variant="ghost"
              type="button"
              onClick={() => setModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" loading={submitting}>
              {editing ? 'Update Post' : 'Publish Post'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
