export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      chefs: {
        Row: {
          apellido: string
          biografia: string | null
          certificaciones: string[] | null
          created_at: string
          especialidad: string
          experiencia_anos: number | null
          foto_url: string | null
          id: string
          nombre: string
          updated_at: string
          user_id: string
        }
        Insert: {
          apellido: string
          biografia?: string | null
          certificaciones?: string[] | null
          created_at?: string
          especialidad: string
          experiencia_anos?: number | null
          foto_url?: string | null
          id?: string
          nombre: string
          updated_at?: string
          user_id: string
        }
        Update: {
          apellido?: string
          biografia?: string | null
          certificaciones?: string[] | null
          created_at?: string
          especialidad?: string
          experiencia_anos?: number | null
          foto_url?: string | null
          id?: string
          nombre?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      cursos_culinarios: {
        Row: {
          activo: boolean
          chef_id: string
          codigo: string
          created_at: string
          cupo_maximo: number
          descripcion: string | null
          duracion_horas: number
          fecha_fin: string | null
          fecha_inicio: string | null
          horario: string | null
          id: string
          modalidad: string
          nivel: string
          nombre: string
          precio: number | null
          updated_at: string
        }
        Insert: {
          activo?: boolean
          chef_id: string
          codigo: string
          created_at?: string
          cupo_maximo?: number
          descripcion?: string | null
          duracion_horas: number
          fecha_fin?: string | null
          fecha_inicio?: string | null
          horario?: string | null
          id?: string
          modalidad: string
          nivel: string
          nombre: string
          precio?: number | null
          updated_at?: string
        }
        Update: {
          activo?: boolean
          chef_id?: string
          codigo?: string
          created_at?: string
          cupo_maximo?: number
          descripcion?: string | null
          duracion_horas?: number
          fecha_fin?: string | null
          fecha_inicio?: string | null
          horario?: string | null
          id?: string
          modalidad?: string
          nivel?: string
          nombre?: string
          precio?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "cursos_culinarios_chef_id_fkey"
            columns: ["chef_id"]
            isOneToOne: false
            referencedRelation: "chefs"
            referencedColumns: ["id"]
          },
        ]
      }
      estudiantes: {
        Row: {
          apellido: string
          created_at: string
          email: string
          fecha_nacimiento: string | null
          id: string
          intereses_culinarios: string[] | null
          nivel_experiencia: string | null
          nombre: string
          telefono: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          apellido: string
          created_at?: string
          email: string
          fecha_nacimiento?: string | null
          id?: string
          intereses_culinarios?: string[] | null
          nivel_experiencia?: string | null
          nombre: string
          telefono?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          apellido?: string
          created_at?: string
          email?: string
          fecha_nacimiento?: string | null
          id?: string
          intereses_culinarios?: string[] | null
          nivel_experiencia?: string | null
          nombre?: string
          telefono?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      evaluaciones: {
        Row: {
          activa: boolean
          chef_id: string | null
          created_at: string
          curso_id: string | null
          descripcion: string | null
          fecha_fin: string
          fecha_inicio: string
          id: string
          tipo_evaluacion: string
          titulo: string
          updated_at: string
        }
        Insert: {
          activa?: boolean
          chef_id?: string | null
          created_at?: string
          curso_id?: string | null
          descripcion?: string | null
          fecha_fin: string
          fecha_inicio: string
          id?: string
          tipo_evaluacion: string
          titulo: string
          updated_at?: string
        }
        Update: {
          activa?: boolean
          chef_id?: string | null
          created_at?: string
          curso_id?: string | null
          descripcion?: string | null
          fecha_fin?: string
          fecha_inicio?: string
          id?: string
          tipo_evaluacion?: string
          titulo?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "evaluaciones_chef_id_fkey"
            columns: ["chef_id"]
            isOneToOne: false
            referencedRelation: "chefs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "evaluaciones_curso_id_fkey"
            columns: ["curso_id"]
            isOneToOne: false
            referencedRelation: "cursos_culinarios"
            referencedColumns: ["id"]
          },
        ]
      }
      inscripciones: {
        Row: {
          calificacion_final: number | null
          curso_id: string
          estado: string
          estudiante_id: string
          fecha_inscripcion: string
          id: string
        }
        Insert: {
          calificacion_final?: number | null
          curso_id: string
          estado?: string
          estudiante_id: string
          fecha_inscripcion?: string
          id?: string
        }
        Update: {
          calificacion_final?: number | null
          curso_id?: string
          estado?: string
          estudiante_id?: string
          fecha_inscripcion?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "inscripciones_curso_id_fkey"
            columns: ["curso_id"]
            isOneToOne: false
            referencedRelation: "cursos_culinarios"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inscripciones_estudiante_id_fkey"
            columns: ["estudiante_id"]
            isOneToOne: false
            referencedRelation: "estudiantes"
            referencedColumns: ["id"]
          },
        ]
      }
      preguntas: {
        Row: {
          evaluacion_id: string
          id: string
          obligatoria: boolean
          opciones: string[] | null
          orden: number
          texto: string
          tipo: string
        }
        Insert: {
          evaluacion_id: string
          id?: string
          obligatoria?: boolean
          opciones?: string[] | null
          orden: number
          texto: string
          tipo: string
        }
        Update: {
          evaluacion_id?: string
          id?: string
          obligatoria?: boolean
          opciones?: string[] | null
          orden?: number
          texto?: string
          tipo?: string
        }
        Relationships: [
          {
            foreignKeyName: "preguntas_evaluacion_id_fkey"
            columns: ["evaluacion_id"]
            isOneToOne: false
            referencedRelation: "evaluaciones"
            referencedColumns: ["id"]
          },
        ]
      }
      respuestas_evaluacion: {
        Row: {
          created_at: string
          estudiante_id: string
          evaluacion_id: string
          id: string
          pregunta_id: string
          respuesta_rating: number | null
          respuesta_texto: string | null
        }
        Insert: {
          created_at?: string
          estudiante_id: string
          evaluacion_id: string
          id?: string
          pregunta_id: string
          respuesta_rating?: number | null
          respuesta_texto?: string | null
        }
        Update: {
          created_at?: string
          estudiante_id?: string
          evaluacion_id?: string
          id?: string
          pregunta_id?: string
          respuesta_rating?: number | null
          respuesta_texto?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "respuestas_evaluacion_estudiante_id_fkey"
            columns: ["estudiante_id"]
            isOneToOne: false
            referencedRelation: "estudiantes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "respuestas_evaluacion_evaluacion_id_fkey"
            columns: ["evaluacion_id"]
            isOneToOne: false
            referencedRelation: "evaluaciones"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "respuestas_evaluacion_pregunta_id_fkey"
            columns: ["pregunta_id"]
            isOneToOne: false
            referencedRelation: "preguntas"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
