import { ensureClient } from '../lib/supabase';

export async function getGallery({ category, offset = 0, limit = 12 } = {}) {
  const client = ensureClient();
  let query = client.from('gallery').select('*', { count: 'exact' }).order('sort_order');
  if (category && category !== 'All') query = query.eq('category', category);
  query = query.range(offset, offset + limit - 1);
  const { data, count, error } = await query;
  if (error) throw error;
  return { data: data ?? [], count: count ?? 0 };
}

export async function getFeaturedGallery() {
  const client = ensureClient();
  const { data, error } = await client.from('gallery').select('*').eq('is_featured', true).order('sort_order').limit(8);
  if (error) throw error;
  return data ?? [];
}

export async function createGalleryImage(values) {
  const client = ensureClient();
  const { data, error } = await client.from('gallery').insert(values).select().single();
  if (error) throw error;
  return data;
}

export async function updateGalleryImage(id, values) {
  const client = ensureClient();
  const { data, error } = await client.from('gallery').update(values).eq('id', id).select().single();
  if (error) throw error;
  return data;
}

export async function deleteGalleryImage(id) {
  const client = ensureClient();
  const { error } = await client.from('gallery').delete().eq('id', id);
  if (error) throw error;
}
