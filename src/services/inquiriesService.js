import { ensureClient } from '../lib/supabase';

export async function submitInquiry(values) {
  const client = ensureClient();
  const { data, error } = await client.from('inquiries').insert(values).select().single();
  if (error) throw error;
  return data;
}

export async function getInquiries() {
  const client = ensureClient();
  const { data, error } = await client.from('inquiries').select('*').order('created_at', { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function getInquiriesByStatus(status) {
  const client = ensureClient();
  let query = client.from('inquiries').select('*').order('created_at', { ascending: false });
  if (status && status !== 'all') query = query.eq('status', status);
  const { data, error } = await query;
  if (error) throw error;
  return data ?? [];
}

export async function updateInquiryStatus(id, status) {
  const client = ensureClient();
  const { data, error } = await client.from('inquiries').update({ status }).eq('id', id).select().single();
  if (error) throw error;
  return data;
}

export async function getInquiryStats() {
  const client = ensureClient();
  const { data, error } = await client.from('inquiries').select('status');
  if (error) throw error;
  const all = data ?? [];
  return { total: all.length, new: all.filter((i) => i.status === 'new').length, contacted: all.filter((i) => i.status === 'contacted').length, booked: all.filter((i) => i.status === 'booked').length };
}
