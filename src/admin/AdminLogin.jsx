import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { SITE_NAME } from '../lib/constants';
import { Button } from '../components/ui/Button';

export default function AdminLogin() {
  const [loading, setLoading] = useState(false);
  const { signIn, user } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  if (user) {
    navigate('/admin', { replace: true });
    return null;
  }

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await signIn(data.email, data.password);
      navigate('/admin');
    } catch {
      toast.error('Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-beige-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="font-cinzel text-xl font-bold text-maroon-700 mb-1">{SITE_NAME}</h1>
          <p className="font-lato text-sm text-neutral-500">Admin Login</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="font-lato text-sm font-medium text-neutral-700 block mb-1">Email</label>
            <input
              type="email"
              {...register('email', { required: 'Email is required' })}
              className="w-full px-4 py-3 border border-beige-300 rounded-lg font-lato text-sm focus:outline-none focus:border-maroon-700 transition-colors"
              placeholder="admin@example.com"
            />
            {errors.email && <p className="text-maroon-600 text-xs mt-1 font-lato">{errors.email.message}</p>}
          </div>

          <div>
            <label className="font-lato text-sm font-medium text-neutral-700 block mb-1">Password</label>
            <input
              type="password"
              {...register('password', { required: 'Password is required' })}
              className="w-full px-4 py-3 border border-beige-300 rounded-lg font-lato text-sm focus:outline-none focus:border-maroon-700 transition-colors"
              placeholder="••••••••"
            />
            {errors.password && <p className="text-maroon-600 text-xs mt-1 font-lato">{errors.password.message}</p>}
          </div>

          <Button type="submit" loading={loading} disabled={loading} className="w-full">
            Sign In
          </Button>
        </form>
      </div>
    </div>
  );
}
