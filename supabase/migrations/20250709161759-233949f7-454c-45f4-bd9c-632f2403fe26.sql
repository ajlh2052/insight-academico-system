
-- Eliminar las políticas restrictivas actuales y crear políticas más permisivas
-- para permitir inserción de datos desde el dashboard de Supabase

-- Políticas para la tabla chefs
DROP POLICY IF EXISTS "Permitir inserción temporal de datos" ON public.chefs;
CREATE POLICY "Permitir inserción de datos desde dashboard" ON public.chefs 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Permitir actualización de datos desde dashboard" ON public.chefs 
FOR UPDATE 
USING (true) 
WITH CHECK (true);

-- Políticas para la tabla estudiantes  
DROP POLICY IF EXISTS "Permitir inserción temporal de datos" ON public.estudiantes;
CREATE POLICY "Permitir inserción de datos desde dashboard" ON public.estudiantes 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Permitir actualización de datos desde dashboard" ON public.estudiantes 
FOR UPDATE 
USING (true) 
WITH CHECK (true);

-- Políticas para la tabla cursos_culinarios
DROP POLICY IF EXISTS "Permitir inserción temporal de datos" ON public.cursos_culinarios;
CREATE POLICY "Permitir inserción de datos desde dashboard" ON public.cursos_culinarios 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Permitir actualización de datos desde dashboard" ON public.cursos_culinarios 
FOR UPDATE 
USING (true) 
WITH CHECK (true);

-- Políticas para la tabla evaluaciones
DROP POLICY IF EXISTS "Permitir inserción temporal de datos" ON public.evaluaciones;
CREATE POLICY "Permitir inserción de datos desde dashboard" ON public.evaluaciones 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Permitir actualización de datos desde dashboard" ON public.evaluaciones 
FOR UPDATE 
USING (true) 
WITH CHECK (true);

-- Políticas para la tabla preguntas
DROP POLICY IF EXISTS "Permitir inserción temporal de datos" ON public.preguntas;
CREATE POLICY "Permitir inserción de datos desde dashboard" ON public.preguntas 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Permitir actualización de datos desde dashboard" ON public.preguntas 
FOR UPDATE 
USING (true) 
WITH CHECK (true);

-- Políticas para la tabla respuestas_evaluacion
DROP POLICY IF EXISTS "Permitir inserción temporal de datos" ON public.respuestas_evaluacion;
CREATE POLICY "Permitir inserción de datos desde dashboard" ON public.respuestas_evaluacion 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Permitir actualización de datos desde dashboard" ON public.respuestas_evaluacion 
FOR UPDATE 
USING (true) 
WITH CHECK (true);

-- Políticas para la tabla inscripciones (si necesitas agregar datos ahí también)
CREATE POLICY "Permitir inserción de datos desde dashboard" ON public.inscripciones 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Permitir actualización de datos desde dashboard" ON public.inscripciones 
FOR UPDATE 
USING (true) 
WITH CHECK (true);
