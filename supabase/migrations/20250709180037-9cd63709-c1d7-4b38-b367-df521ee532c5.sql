
-- Insertar 5 chefs aleatorios
INSERT INTO public.chefs (user_id, nombre, apellido, especialidad, experiencia_anos, biografia, certificaciones) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'Carlos', 'Rodríguez', 'Cocina Mediterránea', 8, 'Chef especializado en cocina mediterránea con enfoque en ingredientes frescos y técnicas tradicionales.', ARRAY['Diploma en Gastronomía', 'Certificación en Cocina Mediterránea']),
('550e8400-e29b-41d4-a716-446655440002', 'María', 'González', 'Repostería', 12, 'Maestra repostera con experiencia internacional en técnicas francesas y decoración artística.', ARRAY['Master en Pastelería', 'Certificación Le Cordon Bleu']),
('550e8400-e29b-41d4-a716-446655440003', 'Antonio', 'López', 'Cocina Asiática', 6, 'Chef especializado en cocina asiática fusion, combinando técnicas tradicionales con toques modernos.', ARRAY['Certificación en Cocina Japonesa', 'Diploma en Cocina Tailandesa']),
('550e8400-e29b-41d4-a716-446655440004', 'Isabella', 'Martínez', 'Cocina Vegana', 5, 'Chef vegana pionera en técnicas innovadoras de cocina plant-based y sostenible.', ARRAY['Certificación en Cocina Vegana', 'Diploma en Nutrición Culinaria']),
('550e8400-e29b-41d4-a716-446655440005', 'Roberto', 'Silva', 'Cocina Internacional', 15, 'Chef ejecutivo con amplia experiencia en cocina internacional y gestión de restaurantes.', ARRAY['Licenciatura en Gastronomía', 'MBA en Gestión Hotelera']);

-- Insertar 5 estudiantes aleatorios
INSERT INTO public.estudiantes (user_id, nombre, apellido, email, telefono, nivel_experiencia, intereses_culinarios) VALUES
('650e8400-e29b-41d4-a716-446655440001', 'Ana', 'Pérez', 'ana.perez@email.com', '+34 600 111 222', 'Principiante', ARRAY['Repostería', 'Cocina Mediterránea']),
('650e8400-e29b-41d4-a716-446655440002', 'José', 'García', 'jose.garcia@email.com', '+34 600 333 444', 'Intermedio', ARRAY['Cocina Asiática', 'Técnicas de Corte']),
('650e8400-e29b-41d4-a716-446655440003', 'Laura', 'Fernández', 'laura.fernandez@email.com', '+34 600 555 666', 'Avanzado', ARRAY['Cocina Vegana', 'Cocina Molecular']),
('650e8400-e29b-41d4-a716-446655440004', 'Miguel', 'Torres', 'miguel.torres@email.com', '+34 600 777 888', 'Principiante', ARRAY['Cocina Internacional', 'Panadería']),
('650e8400-e29b-41d4-a716-446655440005', 'Carmen', 'Ruiz', 'carmen.ruiz@email.com', '+34 600 999 000', 'Intermedio', ARRAY['Cocina Mediterránea', 'Enología']);

-- Insertar 5 cursos culinarios aleatorios
INSERT INTO public.cursos_culinarios (chef_id, codigo, nombre, descripcion, nivel, modalidad, duracion_horas, precio, cupo_maximo, horario) VALUES
((SELECT id FROM public.chefs WHERE nombre = 'Carlos' LIMIT 1), 'MED-001', 'Fundamentos de Cocina Mediterránea', 'Aprende las técnicas básicas y ingredientes esenciales de la cocina mediterránea tradicional.', 'Principiante', 'Presencial', 20, 150.00, 15, 'Lunes y Miércoles 18:00-21:00'),
((SELECT id FROM public.chefs WHERE nombre = 'María' LIMIT 1), 'REP-001', 'Repostería Francesa Clásica', 'Domina las técnicas fundamentales de la repostería francesa: croissants, macarons y más.', 'Intermedio', 'Presencial', 30, 200.00, 12, 'Sábados 09:00-15:00'),
((SELECT id FROM public.chefs WHERE nombre = 'Antonio' LIMIT 1), 'ASI-001', 'Cocina Asiática Fusion', 'Explora la fusión de sabores asiáticos con técnicas culinarias modernas.', 'Intermedio', 'Híbrido', 25, 180.00, 18, 'Martes y Jueves 19:00-21:30'),
((SELECT id FROM public.chefs WHERE nombre = 'Isabella' LIMIT 1), 'VEG-001', 'Cocina Vegana Innovadora', 'Descubre técnicas avanzadas para crear platos veganos deliciosos y nutritivos.', 'Avanzado', 'Online', 15, 120.00, 25, 'Flexible - Acceso 24/7'),
((SELECT id FROM public.chefs WHERE nombre = 'Roberto' LIMIT 1), 'INT-001', 'Gestión y Cocina Profesional', 'Curso integral para futuros chefs: técnicas culinarias y gestión de cocina.', 'Avanzado', 'Presencial', 40, 350.00, 10, 'Viernes 16:00-20:00 y Sábados 10:00-18:00');

-- Insertar 5 evaluaciones aleatorias
INSERT INTO public.evaluaciones (titulo, descripcion, tipo_evaluacion, curso_id, chef_id, fecha_inicio, fecha_fin, activa) VALUES
('Evaluación Curso Mediterráneo', 'Evalúa tu experiencia con el curso de cocina mediterránea', 'curso', (SELECT id FROM public.cursos_culinarios WHERE codigo = 'MED-001' LIMIT 1), NULL, '2024-01-15 00:00:00+00', '2024-02-15 23:59:59+00', true),
('Evaluación Chef María González', 'Comparte tu opinión sobre las clases de la Chef María', 'chef', NULL, (SELECT id FROM public.chefs WHERE nombre = 'María' LIMIT 1), '2024-01-20 00:00:00+00', '2024-02-20 23:59:59+00', true),
('Autoevaluación Repostería', 'Reflexiona sobre tu progreso en repostería francesa', 'autoevaluacion', NULL, NULL, '2024-01-25 00:00:00+00', '2024-02-25 23:59:59+00', true),
('Evaluación Cocina Asiática', 'Evalúa el curso de cocina asiática fusion', 'curso', (SELECT id FROM public.cursos_culinarios WHERE codigo = 'ASI-001' LIMIT 1), NULL, '2024-02-01 00:00:00+00', '2024-03-01 23:59:59+00', true),
('Evaluación Chef Antonio López', 'Valora la metodología de enseñanza del Chef Antonio', 'chef', NULL, (SELECT id FROM public.chefs WHERE nombre = 'Antonio' LIMIT 1), '2024-02-05 00:00:00+00', '2024-03-05 23:59:59+00', true);

-- Insertar 5 preguntas aleatorias para cada evaluación
INSERT INTO public.preguntas (evaluacion_id, texto, tipo, orden, obligatoria, opciones) VALUES
-- Preguntas para evaluación del curso mediterráneo
((SELECT id FROM public.evaluaciones WHERE titulo = 'Evaluación Curso Mediterráneo' LIMIT 1), '¿Cómo calificarías la calidad general del curso?', 'rating', 1, true, NULL),
((SELECT id FROM public.evaluaciones WHERE titulo = 'Evaluación Curso Mediterráneo' LIMIT 1), '¿Qué te pareció más útil del curso?', 'text', 2, true, NULL),
((SELECT id FROM public.evaluaciones WHERE titulo = 'Evaluación Curso Mediterráneo' LIMIT 1), '¿Recomendarías este curso?', 'multiple_choice', 3, true, ARRAY['Definitivamente sí', 'Probablemente sí', 'No estoy seguro', 'Probablemente no', 'Definitivamente no']),
((SELECT id FROM public.evaluaciones WHERE titulo = 'Evaluación Curso Mediterráneo' LIMIT 1), '¿Cómo evaluarías el nivel de dificultad?', 'rating', 4, false, NULL),
((SELECT id FROM public.evaluaciones WHERE titulo = 'Evaluación Curso Mediterráneo' LIMIT 1), 'Comentarios adicionales', 'text', 5, false, NULL),

-- Preguntas para evaluación de Chef María
((SELECT id FROM public.evaluaciones WHERE titulo = 'Evaluación Chef María González' LIMIT 1), '¿Cómo calificarías la claridad de las explicaciones?', 'rating', 1, true, NULL),
((SELECT id FROM public.evaluaciones WHERE titulo = 'Evaluación Chef María González' LIMIT 1), '¿El chef resolvió tus dudas de manera efectiva?', 'multiple_choice', 2, true, ARRAY['Siempre', 'Casi siempre', 'A veces', 'Pocas veces', 'Nunca']),
((SELECT id FROM public.evaluaciones WHERE titulo = 'Evaluación Chef María González' LIMIT 1), '¿Qué aspecto destacarías del chef?', 'text', 3, false, NULL),
((SELECT id FROM public.evaluaciones WHERE titulo = 'Evaluación Chef María González' LIMIT 1), '¿Cómo calificarías la paciencia del chef?', 'rating', 4, true, NULL),
((SELECT id FROM public.evaluaciones WHERE titulo = 'Evaluación Chef María González' LIMIT 1), '¿Volverías a tomar clases con este chef?', 'multiple_choice', 5, false, ARRAY['Definitivamente sí', 'Sí', 'Tal vez', 'No', 'Definitivamente no']),

-- Preguntas para autoevaluación
((SELECT id FROM public.evaluaciones WHERE titulo = 'Autoevaluación Repostería' LIMIT 1), '¿Cómo evalúas tu progreso actual?', 'rating', 1, true, NULL),
((SELECT id FROM public.evaluaciones WHERE titulo = 'Autoevaluación Repostería' LIMIT 1), '¿Qué técnica te resulta más difícil?', 'text', 2, true, NULL),
((SELECT id FROM public.evaluaciones WHERE titulo = 'Autoevaluación Repostería' LIMIT 1), '¿Cuál es tu nivel de confianza?', 'multiple_choice', 3, true, ARRAY['Muy alto', 'Alto', 'Medio', 'Bajo', 'Muy bajo']),
((SELECT id FROM public.evaluaciones WHERE titulo = 'Autoevaluación Repostería' LIMIT 1), '¿Cómo calificarías tu dedicación?', 'rating', 4, false, NULL),
((SELECT id FROM public.evaluaciones WHERE titulo = 'Autoevaluación Repostería' LIMIT 1), '¿Qué objetivos tienes para mejorar?', 'text', 5, false, NULL),

-- Preguntas para curso asiático
((SELECT id FROM public.evaluaciones WHERE titulo = 'Evaluación Cocina Asiática' LIMIT 1), '¿El contenido cumplió tus expectativas?', 'rating', 1, true, NULL),
((SELECT id FROM public.evaluaciones WHERE titulo = 'Evaluación Cocina Asiática' LIMIT 1), '¿Qué plato fue tu favorito?', 'text', 2, false, NULL),
((SELECT id FROM public.evaluaciones WHERE titulo = 'Evaluación Cocina Asiática' LIMIT 1), '¿Cómo evaluarías la organización del curso?', 'multiple_choice', 3, true, ARRAY['Excelente', 'Muy buena', 'Buena', 'Regular', 'Mala']),
((SELECT id FROM public.evaluaciones WHERE titulo = 'Evaluación Cocina Asiática' LIMIT 1), '¿Calificarías los materiales proporcionados?', 'rating', 4, true, NULL),
((SELECT id FROM public.evaluaciones WHERE titulo = 'Evaluación Cocina Asiática' LIMIT 1), 'Sugerencias para mejorar', 'text', 5, false, NULL),

-- Preguntas para Chef Antonio
((SELECT id FROM public.evaluaciones WHERE titulo = 'Evaluación Chef Antonio López' LIMIT 1), '¿Cómo calificarías su dominio técnico?', 'rating', 1, true, NULL),
((SELECT id FROM public.evaluaciones WHERE titulo = 'Evaluación Chef Antonio López' LIMIT 1), '¿Sus demostraciones fueron claras?', 'multiple_choice', 2, true, ARRAY['Siempre muy claras', 'Generalmente claras', 'A veces confusas', 'Frecuentemente confusas', 'Muy confusas']),
((SELECT id FROM public.evaluaciones WHERE titulo = 'Evaluación Chef Antonio López' LIMIT 1), '¿Qué mejorarías de su metodología?', 'text', 3, false, NULL),
((SELECT id FROM public.evaluaciones WHERE titulo = 'Evaluación Chef Antonio López' LIMIT 1), '¿Cómo evalúas su disponibilidad para consultas?', 'rating', 4, true, NULL),
((SELECT id FROM public.evaluaciones WHERE titulo = 'Evaluación Chef Antonio López' LIMIT 1), 'Comentario general sobre el chef', 'text', 5, false, NULL);

-- Insertar algunas inscripciones de muestra
INSERT INTO public.inscripciones (estudiante_id, curso_id, estado) VALUES
((SELECT id FROM public.estudiantes WHERE nombre = 'Ana' LIMIT 1), (SELECT id FROM public.cursos_culinarios WHERE codigo = 'MED-001' LIMIT 1), 'activo'),
((SELECT id FROM public.estudiantes WHERE nombre = 'José' LIMIT 1), (SELECT id FROM public.cursos_culinarios WHERE codigo = 'ASI-001' LIMIT 1), 'activo'),
((SELECT id FROM public.estudiantes WHERE nombre = 'Laura' LIMIT 1), (SELECT id FROM public.cursos_culinarios WHERE codigo = 'VEG-001' LIMIT 1), 'completado'),
((SELECT id FROM public.estudiantes WHERE nombre = 'Miguel' LIMIT 1), (SELECT id FROM public.cursos_culinarios WHERE codigo = 'INT-001' LIMIT 1), 'activo'),
((SELECT id FROM public.estudiantes WHERE nombre = 'Carmen' LIMIT 1), (SELECT id FROM public.cursos_culinarios WHERE codigo = 'REP-001' LIMIT 1), 'activo');

-- Insertar algunas respuestas de muestra
INSERT INTO public.respuestas_evaluacion (evaluacion_id, estudiante_id, pregunta_id, respuesta_rating, respuesta_texto) VALUES
-- Respuestas de Ana para el curso mediterráneo
((SELECT id FROM public.evaluaciones WHERE titulo = 'Evaluación Curso Mediterráneo' LIMIT 1), (SELECT id FROM public.estudiantes WHERE nombre = 'Ana' LIMIT 1), (SELECT id FROM public.preguntas WHERE texto = '¿Cómo calificarías la calidad general del curso?' AND evaluacion_id = (SELECT id FROM public.evaluaciones WHERE titulo = 'Evaluación Curso Mediterráneo' LIMIT 1) LIMIT 1), 5, NULL),
((SELECT id FROM public.evaluaciones WHERE titulo = 'Evaluación Curso Mediterráneo' LIMIT 1), (SELECT id FROM public.estudiantes WHERE nombre = 'Ana' LIMIT 1), (SELECT id FROM public.preguntas WHERE texto = '¿Qué te pareció más útil del curso?' AND evaluacion_id = (SELECT id FROM public.evaluaciones WHERE titulo = 'Evaluación Curso Mediterráneo' LIMIT 1) LIMIT 1), NULL, 'Las técnicas de preparación de aceites aromatizados fueron muy útiles'),

-- Respuestas de José para cocina asiática
((SELECT id FROM public.evaluaciones WHERE titulo = 'Evaluación Cocina Asiática' LIMIT 1), (SELECT id FROM public.estudiantes WHERE nombre = 'José' LIMIT 1), (SELECT id FROM public.preguntas WHERE texto = '¿El contenido cumplió tus expectativas?' AND evaluacion_id = (SELECT id FROM public.evaluaciones WHERE titulo = 'Evaluación Cocina Asiática' LIMIT 1) LIMIT 1), 4, NULL),
((SELECT id FROM public.evaluaciones WHERE titulo = 'Evaluación Cocina Asiática' LIMIT 1), (SELECT id FROM public.estudiantes WHERE nombre = 'José' LIMIT 1), (SELECT id FROM public.preguntas WHERE texto = '¿Qué plato fue tu favorito?' AND evaluacion_id = (SELECT id FROM public.evaluaciones WHERE titulo = 'Evaluación Cocina Asiática' LIMIT 1) LIMIT 1), NULL, 'El ramen fusion con ingredientes locales'),

-- Respuesta de Laura para autoevaluación
((SELECT id FROM public.evaluaciones WHERE titulo = 'Autoevaluación Repostería' LIMIT 1), (SELECT id FROM public.estudiantes WHERE nombre = 'Laura' LIMIT 1), (SELECT id FROM public.preguntas WHERE texto = '¿Cómo evalúas tu progreso actual?' AND evaluacion_id = (SELECT id FROM public.evaluaciones WHERE titulo = 'Autoevaluación Repostería' LIMIT 1) LIMIT 1), 4, NULL);
