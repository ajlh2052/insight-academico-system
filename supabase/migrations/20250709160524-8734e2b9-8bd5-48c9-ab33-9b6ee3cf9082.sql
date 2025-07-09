
-- Insertar datos de muestra para chefs
INSERT INTO public.chefs (id, user_id, nombre, apellido, especialidad, experiencia_anos, biografia, certificaciones) VALUES
('550e8400-e29b-41d4-a716-446655440001', '302dd1c7-44fc-49e1-ba16-92b08fea8694', 'Carlos', 'Mendoza', 'Cocina Italiana', 15, 'Chef especializado en cocina italiana con 15 años de experiencia', ARRAY['Certificado en Cocina Italiana', 'Diploma Cordon Bleu']),
('550e8400-e29b-41d4-a716-446655440002', '302dd1c7-44fc-49e1-ba16-92b08fea8694', 'María', 'González', 'Repostería', 12, 'Especialista en repostería francesa y decoración de pasteles', ARRAY['Certificado en Repostería Francesa', 'Especialización en Fondant']),
('550e8400-e29b-41d4-a716-446655440003', '302dd1c7-44fc-49e1-ba16-92b08fea8694', 'José', 'Rodríguez', 'Cocina Fusión', 10, 'Chef innovador especializado en cocina fusión asiática-latina', ARRAY['Certificado en Cocina Asiática', 'Diploma en Innovación Culinaria']);

-- Insertar datos de muestra para cursos culinarios
INSERT INTO public.cursos_culinarios (id, chef_id, codigo, nombre, descripcion, nivel, modalidad, duracion_horas, precio, cupo_maximo, fecha_inicio, fecha_fin, horario, activo) VALUES
('650e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', 'ITAL001', 'Fundamentos de Cocina Italiana', 'Aprende los fundamentos de la auténtica cocina italiana', 'Principiante', 'Presencial', 40, 299.99, 15, '2024-02-01', '2024-02-28', 'Martes y Jueves 18:00-20:00', true),
('650e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440002', 'REPO001', 'Repostería Francesa Básica', 'Domina las técnicas básicas de la repostería francesa', 'Principiante', 'Presencial', 32, 249.99, 12, '2024-02-05', '2024-02-26', 'Lunes y Miércoles 16:00-18:00', true),
('650e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440003', 'FUSI001', 'Cocina Fusión Creativa', 'Explora la innovadora fusión entre cocina asiática y latina', 'Intermedio', 'Híbrida', 36, 349.99, 10, '2024-02-10', '2024-03-03', 'Viernes 17:00-20:00', true);

-- Insertar datos de muestra para estudiantes
INSERT INTO public.estudiantes (id, user_id, nombre, apellido, email, telefono, fecha_nacimiento, nivel_experiencia, intereses_culinarios) VALUES
('750e8400-e29b-41d4-a716-446655440001', '302dd1c7-44fc-49e1-ba16-92b08fea8694', 'Ana', 'Martínez', 'ana.martinez@example.com', '+1234567890', '1990-05-15', 'Principiante', ARRAY['Cocina Italiana', 'Repostería']),
('750e8400-e29b-41d4-a716-446655440002', '302dd1c7-44fc-49e1-ba16-92b08fea8694', 'Luis', 'García', 'luis.garcia@example.com', '+1234567891', '1985-08-22', 'Intermedio', ARRAY['Cocina Fusión', 'Cocina Asiática']);

-- Insertar datos de muestra para evaluaciones
INSERT INTO public.evaluaciones (id, titulo, descripcion, tipo_evaluacion, curso_id, chef_id, fecha_inicio, fecha_fin, activa) VALUES
('850e8400-e29b-41d4-a716-446655440001', 'Evaluación del Curso de Cocina Italiana', 'Evalúa tu experiencia en el curso de fundamentos de cocina italiana', 'curso', '650e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', '2024-01-15 00:00:00+00', '2024-03-15 23:59:59+00', true),
('850e8400-e29b-41d4-a716-446655440002', 'Evaluación del Chef Carlos Mendoza', 'Evalúa la calidad de enseñanza del Chef Carlos Mendoza', 'chef', NULL, '550e8400-e29b-41d4-a716-446655440001', '2024-01-15 00:00:00+00', '2024-12-31 23:59:59+00', true),
('850e8400-e29b-41d4-a716-446655440003', 'Autoevaluación de Progreso Culinario', 'Evalúa tu propio progreso y habilidades culinarias', 'autoevaluacion', NULL, NULL, '2024-01-01 00:00:00+00', '2024-12-31 23:59:59+00', true);

-- Insertar datos de muestra para preguntas
INSERT INTO public.preguntas (id, evaluacion_id, texto, tipo, opciones, orden, obligatoria) VALUES
-- Preguntas para evaluación de curso
('950e8400-e29b-41d4-a716-446655440001', '850e8400-e29b-41d4-a716-446655440001', '¿Cómo calificarías la calidad general del curso?', 'rating', NULL, 1, true),
('950e8400-e29b-41d4-a716-446655440002', '850e8400-e29b-41d4-a716-446655440001', '¿Qué aspecto del curso te gustó más?', 'text', NULL, 2, false),
('950e8400-e29b-41d4-a716-446655440003', '850e8400-e29b-41d4-a716-446655440001', '¿Recomendarías este curso a otros estudiantes?', 'multiple_choice', ARRAY['Definitivamente sí', 'Probablemente sí', 'No estoy seguro', 'Probablemente no', 'Definitivamente no'], 3, true),
-- Preguntas para evaluación de chef
('950e8400-e29b-41d4-a716-446655440004', '850e8400-e29b-41d4-a716-446655440002', '¿Cómo calificarías la claridad de las explicaciones del chef?', 'rating', NULL, 1, true),
('950e8400-e29b-41d4-a716-446655440005', '850e8400-e29b-41d4-a716-446655440002', '¿Qué mejorarías en el estilo de enseñanza del chef?', 'text', NULL, 2, false),
-- Preguntas para autoevaluación
('950e8400-e29b-41d4-a716-446655440006', '850e8400-e29b-41d4-a716-446655440003', '¿Cómo evalúas tu nivel actual de habilidades culinarias?', 'rating', NULL, 1, true),
('950e8400-e29b-41d4-a716-446655440007', '850e8400-e29b-41d4-a716-446655440003', '¿En qué área sientes que necesitas más práctica?', 'multiple_choice', ARRAY['Técnicas básicas de corte', 'Manejo del tiempo en cocina', 'Presentación de platos', 'Combinación de sabores', 'Técnicas de cocción'], 2, true);

-- Actualizar políticas RLS para permitir inserción de datos de prueba
-- Política temporal para permitir inserción de datos (se puede ajustar después)
CREATE POLICY "Permitir inserción temporal de datos" ON public.chefs FOR INSERT WITH CHECK (true);
CREATE POLICY "Permitir inserción temporal de datos" ON public.estudiantes FOR INSERT WITH CHECK (true);
CREATE POLICY "Permitir inserción temporal de datos" ON public.cursos_culinarios FOR INSERT WITH CHECK (true);
CREATE POLICY "Permitir inserción temporal de datos" ON public.evaluaciones FOR INSERT WITH CHECK (true);
CREATE POLICY "Permitir inserción temporal de datos" ON public.preguntas FOR INSERT WITH CHECK (true);
CREATE POLICY "Permitir inserción temporal de datos" ON public.respuestas_evaluacion FOR INSERT WITH CHECK (true);
