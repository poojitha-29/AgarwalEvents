import { ensureClient } from '../lib/supabase';

export async function getServices() {
  const client = ensureClient();
  const { data, error } = await client.from('services').select('*').order('sort_order');
  if (error) throw error;
  return data ?? [];
}

export async function getServicesByCategory(category) {
  const client = ensureClient();
  let query = client.from('services').select('*').order('sort_order');
  if (category && category !== 'All') query = query.eq('category', category);
  const { data, error } = await query;
  if (error) throw error;
  return data ?? [];
}

export async function getWeddingServices() {
  const client = ensureClient();
  const { data, error } = await client.from('services').select('*').eq('is_wedding', true).order('sort_order');
  if (error) throw error;
  return data ?? [];
}

export async function getFeaturedServices() {
  const client = ensureClient();
  const { data, error } = await client.from('services').select('*').eq('is_featured', true).order('sort_order');
  if (error) throw error;
  return data ?? [];
}

export async function createService(values) {
  const client = ensureClient();
  const { data, error } = await client.from('services').insert(values).select().single();
  if (error) throw error;
  return data;
}

export async function updateService(id, values) {
  const client = ensureClient();
  const { data, error } = await client.from('services').update(values).eq('id', id).select().single();
  if (error) throw error;
  return data;
}

export async function deleteService(id) {
  const client = ensureClient();
  const { error } = await client.from('services').delete().eq('id', id);
  if (error) throw error;
}
