
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Evaluacion {
  id: string;
  titulo: string;
  descripcion?: string;
  curso_id?: string;
  chef_id?: string;
  tipo_evaluacion: 'curso' | 'chef' | 'autoevaluacion';
  fecha_inicio: string;
  fecha_fin: string;
  activa: boolean;
  created_at: string;
  updated_at: string;
  // Relaciones
  cursos_culinarios?: {
    codigo: string;
    nombre: string;
    chef_id: string;
    chefs: {
      nombre: string;
      apellido: string;
      especialidad: string;
    };
  };
  chefs?: {
    nombre: string;
    apellido: string;
    especialidad: string;
  };
}

export interface Pregunta {
  id: string;
  evaluacion_id: string;
  texto: string;
  tipo: 'rating' | 'text' | 'multiple_choice';
  opciones?: string[];
  orden: number;
  obligatoria: boolean;
}

export const useEvaluaciones = () => {
  const [evaluaciones, setEvaluaciones] = useState<Evaluacion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEvaluaciones = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Fetching evaluaciones from Supabase...');
      
      const { data, error } = await supabase
        .from('evaluaciones')
        .select(`
          *,
          cursos_culinarios (
            codigo,
            nombre,
            chef_id,
            chefs (
              nombre,
              apellido,
              especialidad
            )
          ),
          chefs (
            nombre,
            apellido,
            especialidad
          )
        `)
        .eq('activa', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching evaluaciones:', error);
        throw error;
      }

      console.log('Fetched evaluaciones:', data);

      // Type assertion para asegurar que los datos coincidan con nuestra interfaz
      setEvaluaciones((data as any[])?.map(item => ({
        ...item,
        tipo_evaluacion: item.tipo_evaluacion as 'curso' | 'chef' | 'autoevaluacion'
      })) || []);
    } catch (err) {
      console.error('Error in fetchEvaluaciones:', err);
      setError(err instanceof Error ? err.message : 'Error al cargar evaluaciones');
    } finally {
      setLoading(false);
    }
  };

  const fetchPreguntasByEvaluacion = async (evaluacionId: string): Promise<Pregunta[]> => {
    console.log('Fetching preguntas for evaluacion:', evaluacionId);
    
    const { data, error } = await supabase
      .from('preguntas')
      .select('*')
      .eq('evaluacion_id', evaluacionId)
      .order('orden', { ascending: true });

    if (error) {
      console.error('Error fetching preguntas:', error);
      throw error;
    }

    console.log('Fetched preguntas:', data);

    // Type assertion para asegurar que los datos coincidan con nuestra interfaz
    return (data as any[])?.map(item => ({
      ...item,
      tipo: item.tipo as 'rating' | 'text' | 'multiple_choice'
    })) || [];
  };

  const submitRespuestas = async (
    evaluacionId: string,
    estudianteId: string,
    respuestas: { pregunta_id: string; respuesta_texto?: string; respuesta_rating?: number }[]
  ) => {
    console.log('Submitting respuestas:', { evaluacionId, estudianteId, respuestas });
    
    const { error } = await supabase
      .from('respuestas_evaluacion')
      .upsert(
        respuestas.map(respuesta => ({
          evaluacion_id: evaluacionId,
          estudiante_id: estudianteId,
          ...respuesta
        }))
      );

    if (error) {
      console.error('Error submitting respuestas:', error);
      throw error;
    }

    console.log('Respuestas submitted successfully');
  };

  useEffect(() => {
    fetchEvaluaciones();
  }, []);

  return {
    evaluaciones,
    loading,
    error,
    refetch: fetchEvaluaciones,
    fetchPreguntasByEvaluacion,
    submitRespuestas
  };
};
