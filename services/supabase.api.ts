import { supabase } from '@/config/supabase';
import { useQuery } from '@tanstack/react-query';

export async function getVehicles() {
  const { data, error } = await supabase.from('Vehicles').select('*');
  if (error) {
    throw error;
  }
  return data;
}

export const useVehicles = () => {
  return useQuery({
    queryKey: ['vehicles'],
    queryFn: getVehicles,
  });
};
