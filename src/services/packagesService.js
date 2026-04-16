import { ensureClient } from '../lib/supabase';

export async function getPackages() {
  const client = ensureClient();
  const { data, error } = await client.from('packages').select('*').order('created_at');
  if (error) throw error;
  return data ?? [];
}

export async function getPackagesByCategory(category) {
  const client = ensureClient();
  let query = client.from('packages').select('*').order('created_at');
  if (category && category !== 'All') query = query.eq('category', category);
  const { data, error } = await query;
  if (error) throw error;
  return data ?? [];
}

export async function createPackage(values) {
  const client = ensureClient();
  const { data, error } = await client.from('packages').insert(values).select().single();
  if (error) throw error;
  return data;
}

export async function updatePackage(id, values) {
  const client = ensureClient();
  const { data, error } = await client.from('packages').update(values).eq('id', id).select().single();
  if (error) throw error;
  return data;
}

export async function deletePackage(id) {
  const client = ensureClient();
  const { error } = await client.from('packages').delete().eq('id', id);
  if (error) throw error;
}
