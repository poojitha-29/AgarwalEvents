import { ensureClient } from '../lib/supabase';

export async function getTestimonials() {
  const client = ensureClient();
  const { data, error } = await client.from('testimonials').select('*').order('created_at', { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function getFeaturedTestimonials() {
  const client = ensureClient();
  const { data, error } = await client.from('testimonials').select('*').eq('is_featured', true).order('created_at', { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function createTestimonial(values) {
  const client = ensureClient();
  const { data, error } = await client.from('testimonials').insert(values).select().single();
  if (error) throw error;
  return data;
}

export async function updateTestimonial(id, values) {
  const client = ensureClient();
  const { data, error } = await client.from('testimonials').update(values).eq('id', id).select().single();
  if (error) throw error;
  return data;
}

export async function deleteTestimonial(id) {
  const client = ensureClient();
  const { error } = await client.from('testimonials').delete().eq('id', id);
  if (error) throw error;
}
