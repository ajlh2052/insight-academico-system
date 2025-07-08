
-- Primero crear algunos chefs de ejemplo
INSERT INTO public.chefs (id, user_id, nombre, apellido, especialidad, experiencia_anos, certificaciones, biografia) VALUES
('550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', 'María', 'González', 'Repostería Francesa', 8, ARRAY['Certificación Le Cordon Bleu', 'Especialista en Macarons'], 'Chef especializada en repostería francesa con 8 años de experiencia internacional.'),
('550e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440002', 'Carlos', 'Rodríguez', 'Cocina Italiana', 12, ARRAY['Certificación Alma La Scuola', 'Master en Pasta Artesanal'], 'Chef con amplia experiencia en cocina italiana tradicional y moderna.'),
('550e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440003', 'Ana', 'Martínez', 'Cocina Mediterránea', 6, ARRAY['Certificación Basque Culinary Center'], 'Especialista en cocina mediterránea con enfoque en ingredientes locales.'),
('550e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440004', 'Luis', 'García', 'Panadería Artesanal', 10, ARRAY['Master Panadero Artesanal', 'Certificación en Fermentación'], 'Maestro panadero con técnicas tradicionales y modernas de fermentación.'),
('550e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440005', 'Isabella', 'López', 'Cocina Asiática', 7, ARRAY['Certificación en Cocina Japonesa', 'Especialista en Sushi'], 'Chef especializada en cocina asiática, particularmente japonesa y tailandesa.');

-- Crear cursos culinarios
INSERT INTO public.cursos_culinarios (id, codigo, nombre, descripcion, chef_id, nivel, duracion_horas, precio, modalidad, cupo_maximo, fecha_inicio, fecha_fin, horario) VALUES
('660e8400-e29b-41d4-a716-446655440001', 'REPO101', 'Técnicas Básicas de Repostería', 'Aprende las técnicas fundamentales de la repostería francesa, desde cremas básicas hasta decoración con manga pastelera.', '550e8400-e29b-41d4-a716-446655440001', 'principiante', 20, 299.99, 'presencial', 15, '2025-02-01', '2025-02-28', 'Sábados 9:00-13:00'),
('660e8400-e29b-41d4-a716-446655440002', 'PASTA201', 'Pasta Artesanal Italiana', 'Domina el arte de hacer pasta fresca desde cero, incluyendo diferentes formas y salsas tradicionales.', '550e8400-e29b-41d4-a716-446655440002', 'intermedio', 16, 399.99, 'presencial', 12, '2025-01-15', '2025-02-15', 'Martes y Jueves 18:00-20:00'),
('660e8400-e29b-41d4-a716-446655440003', 'MEDITE301', 'Cocina Mediterránea Avanzada', 'Explora los sabores del mediterráneo con técnicas avanzadas y presentaciones profesionales.', '550e8400-e29b-41d4-a716-446655440003', 'avanzado', 24, 549.99, 'hibrido', 10, '2025-03-01', '2025-04-15', 'Viernes 16:00-20:00'),
('660e8400-e29b-41d4-a716-446655440004', 'BREAD101', 'Panadería Artesanal para Principiantes', 'Introducción a la panadería artesanal: masa madre, panes básicos y técnicas de fermentación.', '550e8400-e29b-41d4-a716-446655440004', 'principiante', 18, 349.99, 'presencial', 8, '2025-01-20', '2025-02-20', 'Domingos 10:00-14:00'),
('660e8400-e29b-41d4-a716-446655440005', 'SUSHI202', 'Arte del Sushi y Sashimi', 'Aprende las técnicas tradicionales japonesas para preparar sushi y sashimi de calidad profesional.', '550e8400-e29b-41d4-a716-446655440005', 'intermedio', 12, 499.99, 'presencial', 6, '2025-02-10', '2025-03-10', 'Sábados 14:00-18:00');

-- Crear algunas evaluaciones para los cursos
INSERT INTO public.evaluaciones (id, titulo, descripcion, curso_id, tipo_evaluacion, fecha_inicio, fecha_fin) VALUES
('770e8400-e29b-41d4-a716-446655440001', 'Evaluación del Curso de Repostería', 'Comparte tu experiencia con el curso de técnicas básicas de repostería', '660e8400-e29b-41d4-a716-446655440001', 'curso', '2025-02-25', '2025-03-10'),
('770e8400-e29b-41d4-a716-446655440002', 'Evaluación del Chef Carlos Rodríguez', 'Evalúa las habilidades de enseñanza del chef Carlos', '770e8400-e29b-41d4-a716-446655440002', 'chef', '2025-02-10', '2025-02-20'),
('770e8400-e29b-41d4-a716-446655440003', 'Autoevaluación - Cocina Mediterránea', 'Reflexiona sobre tu progreso en el curso de cocina mediterránea', '660e8400-e29b-41d4-a716-446655440003', 'autoevaluacion', '2025-03-15', '2025-04-20');

-- Corregir la evaluación del chef para que use chef_id en lugar de curso_id
UPDATE public.evaluaciones 
SET chef_id = '550e8400-e29b-41d4-a716-446655440002', curso_id = NULL 
WHERE id = '770e8400-e29b-41d4-a716-446655440002';

-- Crear preguntas para las evaluaciones
INSERT INTO public.preguntas (evaluacion_id, texto, tipo, orden) VALUES
-- Preguntas para evaluación del curso de repostería
('770e8400-e29b-41d4-a716-446655440001', '¿Cómo calificarías la calidad del contenido del curso?', 'rating', 1),
('770e8400-e29b-41d4-a716-446655440001', '¿Qué fue lo que más te gustó del curso?', 'text', 2),
('770e8400-e29b-41d4-a716-446655440001', '¿Recomendarías este curso a otros estudiantes?', 'rating', 3),

-- Preguntas para evaluación del chef
('770e8400-e29b-41d4-a716-446655440002', '¿Cómo calificarías las habilidades de enseñanza del chef?', 'rating', 1),
('770e8400-e29b-41d4-a716-446655440002', '¿El chef respondió claramente a tus preguntas?', 'rating', 2),
('770e8400-e29b-41d4-a716-446655440002', 'Comparte un comentario sobre el estilo de enseñanza del chef', 'text', 3),

-- Preguntas para autoevaluación
('770e8400-e29b-41d4-a716-446655440003', '¿Cómo evaluarías tu progreso en las técnicas aprendidas?', 'rating', 1),
('770e8400-e29b-41d4-a716-446655440003', '¿Qué área sientes que necesitas mejorar más?', 'text', 2),
('770e8400-e29b-41d4-a716-446655440003', '¿Te sientes confiado para aplicar lo aprendido?', 'rating', 3);
