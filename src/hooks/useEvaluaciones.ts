
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
        throw error;
      }

      setEvaluaciones(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar evaluaciones');
    } finally {
      setLoading(false);
    }
  };

  const fetchPreguntasByEvaluacion = async (evaluacionId: string): Promise<Pregunta[]> => {
    const { data, error } = await supabase
      .from('preguntas')
      .select('*')
      .eq('evaluacion_id', evaluacionId)
      .order('orden', { ascending: true });

    if (error) {
      throw error;
    }

    return data || [];
  };

  const submitRespuestas = async (
    evaluacionId: string,
    estudianteId: string,
    respuestas: { pregunta_id: string; respuesta_texto?: string; respuesta_rating?: number }[]
  ) => {
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
      throw error;
    }
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
