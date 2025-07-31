
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface CourseStats {
  name: string;
  evaluacion: number;
  promedio: number;
}

export const useEvaluacionStats = () => {
  const [courseStats, setCourseStats] = useState<CourseStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log('Fetching evaluation statistics...');

      // Obtener estadísticas de evaluaciones de cursos con respuestas
      const { data, error: fetchError } = await supabase
        .from('respuestas_evaluacion')
        .select(`
          respuesta_rating,
          evaluaciones!inner (
            tipo_evaluacion,
            cursos_culinarios (
              codigo,
              nombre
            )
          )
        `)
        .eq('evaluaciones.tipo_evaluacion', 'curso')
        .not('respuesta_rating', 'is', null);

      if (fetchError) {
        console.error('Error fetching stats:', fetchError);
        throw fetchError;
      }

      console.log('Raw stats data:', data);

      // Procesar datos para obtener promedios por curso
      const courseData: { [key: string]: { ratings: number[]; courseName: string } } = {};

      data?.forEach((item) => {
        const courseCode = item.evaluaciones?.cursos_culinarios?.codigo;
        const courseName = item.evaluaciones?.cursos_culinarios?.nombre;
        const rating = item.respuesta_rating;

        if (courseCode && courseName && rating) {
          if (!courseData[courseCode]) {
            courseData[courseCode] = { ratings: [], courseName };
          }
          courseData[courseCode].ratings.push(rating);
        }
      });

      // Calcular promedios
      const stats: CourseStats[] = Object.entries(courseData).map(([code, data]) => {
        const average = data.ratings.reduce((sum, rating) => sum + rating, 0) / data.ratings.length;
        // Simular promedio general (en una app real esto vendría de más datos)
        const generalAverage = 4.2;

        return {
          name: code,
          evaluacion: parseFloat(average.toFixed(1)),
          promedio: generalAverage
        };
      });

      console.log('Processed course stats:', stats);
      setCourseStats(stats);

    } catch (err) {
      console.error('Error in fetchStats:', err);
      setError(err instanceof Error ? err.message : 'Error al cargar estadísticas');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return {
    courseStats,
    loading,
    error,
    refetch: fetchStats
  };
};
