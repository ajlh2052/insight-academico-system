
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Evaluacion, Pregunta, useEvaluaciones } from '@/hooks/useEvaluaciones';

interface EvaluacionFormProps {
  evaluacion: Evaluacion;
  onComplete?: () => void;
}

const EvaluacionForm: React.FC<EvaluacionFormProps> = ({
  evaluacion,
  onComplete,
}) => {
  const [preguntas, setPreguntas] = useState<Pregunta[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { fetchPreguntasByEvaluacion, submitRespuestas } = useEvaluaciones();

  useEffect(() => {
    const loadPreguntas = async () => {
      try {
        const preguntasData = await fetchPreguntasByEvaluacion(evaluacion.id);
        setPreguntas(preguntasData);
      } catch (error) {
        console.error('Error loading preguntas:', error);
        toast({
          title: "Error",
          description: "No se pudieron cargar las preguntas de la evaluación.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    loadPreguntas();
  }, [evaluacion.id, fetchPreguntasByEvaluacion, toast]);

  const handleAnswerChange = (preguntaId: string, value: string) => {
    setAnswers({ ...answers, [preguntaId]: value });
  };

  const handleNext = () => {
    if (currentStep < preguntas.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Convert answers to the format expected by the API
      const respuestas = Object.entries(answers).map(([preguntaId, valor]) => {
        const pregunta = preguntas.find(p => p.id === preguntaId);
        if (pregunta?.tipo === 'rating') {
          return {
            pregunta_id: preguntaId,
            respuesta_rating: parseInt(valor)
          };
        } else {
          return {
            pregunta_id: preguntaId,
            respuesta_texto: valor
          };
        }
      });

      // For now, using a mock student ID - in real app this would come from auth
      await submitRespuestas(evaluacion.id, 'mock-student-id', respuestas);
      
      toast({
        title: "Evaluación completada",
        description: "Tu retroalimentación ha sido enviada con éxito.",
      });
      
      if (onComplete) {
        onComplete();
      } else {
        navigate('/surveys');
      }
    } catch (error) {
      console.error('Error submitting evaluation:', error);
      toast({
        title: "Error",
        description: "Hubo un problema al enviar tu evaluación. Inténtalo de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Card className="w-full max-w-3xl mx-auto">
        <CardContent className="p-8">
          <div className="text-center">Cargando evaluación...</div>
        </CardContent>
      </Card>
    );
  }

  if (preguntas.length === 0) {
    return (
      <Card className="w-full max-w-3xl mx-auto">
        <CardContent className="p-8">
          <div className="text-center">No hay preguntas disponibles para esta evaluación.</div>
        </CardContent>
      </Card>
    );
  }

  const currentQuestion = preguntas[currentStep];
  const isLastQuestion = currentStep === preguntas.length - 1;

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>{evaluacion.titulo}</CardTitle>
        <CardDescription>{evaluacion.descripcion}</CardDescription>
        <div className="w-full bg-gray-200 h-2 rounded-full mt-4">
          <div 
            className="bg-primary h-full rounded-full transition-all duration-300 ease-in-out" 
            style={{ width: `${((currentStep + 1) / preguntas.length) * 100}%` }}
          />
        </div>
        <p className="text-sm text-gray-500 mt-2">
          Pregunta {currentStep + 1} de {preguntas.length}
        </p>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          <h3 className="text-lg font-medium">{currentQuestion.texto}</h3>
          
          {currentQuestion.tipo === 'rating' && (
            <RadioGroup
              value={answers[currentQuestion.id] || ''}
              onValueChange={(value) => handleAnswerChange(currentQuestion.id, value)}
              className="flex flex-col space-y-1"
            >
              <div className="flex justify-between px-1">
                <span className="text-xs text-gray-500">Muy insatisfecho</span>
                <span className="text-xs text-gray-500">Muy satisfecho</span>
              </div>
              <div className="flex justify-between">
                {[1, 2, 3, 4, 5].map((value) => (
                  <div key={value} className="flex flex-col items-center space-y-1">
                    <RadioGroupItem value={value.toString()} id={`rating-${value}`} className="scale-125" />
                    <Label htmlFor={`rating-${value}`} className="text-xs">{value}</Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          )}
          
          {currentQuestion.tipo === 'text' && (
            <Textarea
              value={answers[currentQuestion.id] || ''}
              onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
              placeholder="Escribe tu respuesta aquí..."
              className="min-h-[120px]"
            />
          )}

          {currentQuestion.tipo === 'multiple_choice' && currentQuestion.opciones && (
            <RadioGroup
              value={answers[currentQuestion.id] || ''}
              onValueChange={(value) => handleAnswerChange(currentQuestion.id, value)}
              className="flex flex-col space-y-2"
            >
              {currentQuestion.opciones.map((opcion, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem value={opcion} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`}>{opcion}</Label>
                </div>
              ))}
            </RadioGroup>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={handlePrevious} 
          disabled={currentStep === 0}
        >
          Anterior
        </Button>
        
        {isLastQuestion ? (
          <Button 
            onClick={handleSubmit} 
            disabled={isSubmitting || !answers[currentQuestion?.id]}
          >
            {isSubmitting ? "Enviando..." : "Finalizar"}
          </Button>
        ) : (
          <Button 
            onClick={handleNext} 
            disabled={!answers[currentQuestion?.id]}
          >
            Siguiente
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default EvaluacionForm;
