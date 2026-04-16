import { ensureClient } from '../lib/supabase';

export async function getFaqs() {
  const client = ensureClient();
  const { data, error } = await client.from('faqs').select('*').order('sort_order');
  if (error) throw error;
  return data ?? [];
}

export async function getFaqsByCategory(category) {
  const client = ensureClient();
  let query = client.from('faqs').select('*').order('sort_order');
  if (category && category !== 'All') query = query.eq('category', category);
  const { data, error } = await query;
  if (error) throw error;
  return data ?? [];
}

export async function createFaq(values) {
  const client = ensureClient();
  const { data, error } = await client.from('faqs').insert(values).select().single();
  if (error) throw error;
  return data;
}

export async function updateFaq(id, values) {
  const client = ensureClient();
  const { data, error } = await client.from('faqs').update(values).eq('id', id).select().single();
  if (error) throw error;
  return data;
}

export async function deleteFaq(id) {
  const client = ensureClient();
  const { error } = await client.from('faqs').delete().eq('id', id);
  if (error) throw error;
}
