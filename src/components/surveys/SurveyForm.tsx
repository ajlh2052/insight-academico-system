
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';

interface Question {
  id: number;
  text: string;
  type: 'rating' | 'text';
}

interface SurveyFormProps {
  title: string;
  description: string;
  questions: Question[];
  onComplete?: () => void;
}

const SurveyForm: React.FC<SurveyFormProps> = ({
  title,
  description,
  questions,
  onComplete,
}) => {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleAnswerChange = (questionId: number, value: string) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Evaluación completada",
        description: "Tu retroalimentación ha sido enviada con éxito.",
      });
      
      setIsSubmitting(false);
      if (onComplete) {
        onComplete();
      } else {
        navigate('/surveys');
      }
    }, 1500);
  };

  const currentQuestion = questions[currentStep];
  const isLastQuestion = currentStep === questions.length - 1;

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <div className="w-full bg-gray-200 h-2 rounded-full mt-4">
          <div 
            className="bg-primary h-full rounded-full transition-all duration-300 ease-in-out" 
            style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
          />
        </div>
        <p className="text-sm text-gray-500 mt-2">
          Pregunta {currentStep + 1} de {questions.length}
        </p>
      </CardHeader>
      
      <CardContent>
        {currentQuestion && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">{currentQuestion.text}</h3>
            
            {currentQuestion.type === 'rating' && (
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
            
            {currentQuestion.type === 'text' && (
              <Textarea
                value={answers[currentQuestion.id] || ''}
                onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                placeholder="Escribe tu respuesta aquí..."
                className="min-h-[120px]"
              />
            )}
          </div>
        )}
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
            disabled={isSubmitting}
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

export default SurveyForm;
