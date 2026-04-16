import { ensureClient } from '../lib/supabase';

export async function getBlogs({ limit = 50, category } = {}) {
  const client = ensureClient();
  let query = client
    .from('blogs')
    .select('*')
    .order('published_at', { ascending: false })
    .limit(limit);
  if (category && category !== 'All') {
    query = query.eq('category', category);
  }
  const { data, error } = await query;
  if (error) throw error;
  return data ?? [];
}

export async function getBlogBySlug(slug) {
  const client = ensureClient();
  const { data, error } = await client
    .from('blogs')
    .select('*')
    .eq('slug', slug)
    .maybeSingle();
  if (error) throw error;
  return data; // null if not found
}

export async function createBlog(values) {
  const client = ensureClient();
  const { data, error } = await client.from('blogs').insert(values).select().single();
  if (error) throw error;
  return data;
}

export async function updateBlog(id, values) {
  const client = ensureClient();
  const { data, error } = await client
    .from('blogs')
    .update(values)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteBlog(id) {
  const client = ensureClient();
  const { error } = await client.from('blogs').delete().eq('id', id);
  if (error) throw error;
}
