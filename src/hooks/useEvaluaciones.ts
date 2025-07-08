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
      
      console.log('=== DEBUGGING DATABASE CONNECTION ===');
      console.log('Fetching evaluaciones from Supabase...');
      
      // Test database connection first
      const { data: testData, error: testError } = await supabase
        .from('evaluaciones')
        .select('count', { count: 'exact' });
      
      console.log('Database connection test:', { testData, testError });
      
      // Check current user
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      console.log('Current user:', user?.id, userError);
      
      // Intentar obtener evaluaciones básicas primero
      console.log('Fetching basic evaluaciones...');
      const { data: basicData, error: basicError } = await supabase
        .from('evaluaciones')
        .select('*')
        .order('created_at', { ascending: false });

      console.log('Basic evaluaciones result:', { 
        count: basicData?.length || 0, 
        data: basicData, 
        error: basicError 
      });
      
      if (basicError) {
        console.error('Error fetching basic evaluaciones:', basicError);
        throw basicError;
      }

      // Si tenemos datos básicos, usarlos
      if (basicData && basicData.length > 0) {
        console.log('Using basic data, found', basicData.length, 'evaluaciones');
        setEvaluaciones(basicData.map(item => ({
          ...item,
          tipo_evaluacion: item.tipo_evaluacion as 'curso' | 'chef' | 'autoevaluacion'
        })));
        return;
      }

      // Si no hay datos básicos, intentar con joins
      console.log('No basic data found, trying with joins...');
      const { data: joinData, error: joinError } = await supabase
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
        .order('created_at', { ascending: false });

      console.log('Join data result:', { 
        count: joinData?.length || 0, 
        data: joinData, 
        error: joinError 
      });

      if (joinError) {
        console.error('Error fetching evaluaciones with joins:', joinError);
        throw joinError;
      }

      // Type assertion para asegurar que los datos coincidan con nuestra interfaz
      setEvaluaciones((joinData as any[])?.map(item => ({
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
    
    // Create a mock student entry if needed (for demo purposes)
    const { data: existingStudent } = await supabase
      .from('estudiantes')
      .select('id')
      .eq('id', estudianteId)
      .single();
    
    if (!existingStudent) {
      console.log('Creating mock student for demo');
      const { error: studentError } = await supabase
        .from('estudiantes')
        .insert({
          id: estudianteId,
          user_id: estudianteId,
          nombre: 'Usuario',
          apellido: 'Demo',
          email: 'demo@example.com'
        });
      
      if (studentError) {
        console.error('Error creating mock student:', studentError);
      }
    }
    
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
