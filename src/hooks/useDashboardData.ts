
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface DashboardEvaluacion {
  id: string;
  titulo: string;
  tipo_evaluacion: 'curso' | 'chef' | 'autoevaluacion';
  fecha_fin: string;
  curso_codigo?: string;
  curso_nombre?: string;
  chef_nombre?: string;
  chef_apellido?: string;
  status: 'pendiente' | 'completado' | 'vencido';
}

export const useDashboardData = () => {
  const [evaluaciones, setEvaluaciones] = useState<DashboardEvaluacion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Fetching dashboard data...');
      
      const { data, error: fetchError } = await supabase
        .from('evaluaciones')
        .select(`
          id,
          titulo,
          tipo_evaluacion,
          fecha_fin,
          cursos_culinarios (
            codigo,
            nombre
          ),
          chefs (
            nombre,
            apellido
          )
        `)
        .eq('activa', true)
        .order('fecha_fin', { ascending: true });

      if (fetchError) {
        console.error('Error fetching dashboard data:', fetchError);
        throw fetchError;
      }

      console.log('Dashboard raw data:', data);

      const now = new Date();
      const evaluacionesFormateadas: DashboardEvaluacion[] = (data || []).map(item => {
        const fechaFin = new Date(item.fecha_fin);
        let status: 'pendiente' | 'completado' | 'vencido' = 'pendiente';
        
        if (now > fechaFin) {
          status = 'vencido';
        }

        return {
          id: item.id,
          titulo: item.titulo,
          tipo_evaluacion: item.tipo_evaluacion as 'curso' | 'chef' | 'autoevaluacion',
          fecha_fin: item.fecha_fin,
          curso_codigo: item.cursos_culinarios?.codigo,
          curso_nombre: item.cursos_culinarios?.nombre,
          chef_nombre: item.chefs?.nombre,
          chef_apellido: item.chefs?.apellido,
          status
        };
      });

      console.log('Formatted dashboard data:', evaluacionesFormateadas);
      setEvaluaciones(evaluacionesFormateadas);

    } catch (err) {
      console.error('Error in fetchDashboardData:', err);
      setError(err instanceof Error ? err.message : 'Error al cargar datos del dashboard');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return {
    evaluaciones,
    loading,
    error,
    refetch: fetchDashboardData
  };
};
