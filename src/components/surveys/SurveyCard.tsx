
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, ChefHat, User, Star } from 'lucide-react';

interface SurveyCardProps {
  id: string;
  title: string;
  courseCode: string;
  courseName: string;
  dueDate: string;
  status: 'pendiente' | 'completado' | 'vencido';
  type: 'curso' | 'docente' | 'estudiante';
}

const SurveyCard: React.FC<SurveyCardProps> = ({
  id,
  title,
  courseCode,
  courseName,
  dueDate,
  status,
  type,
}) => {
  const navigate = useNavigate();

  const getStatusColor = () => {
    switch (status) {
      case 'pendiente':
        return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
      case 'completado':
        return 'bg-green-100 text-green-800 hover:bg-green-200';
      case 'vencido':
        return 'bg-red-100 text-red-800 hover:bg-red-200';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  };

  const getTypeIcon = () => {
    switch (type) {
      case 'curso':
        return <ChefHat className="h-4 w-4" />;
      case 'docente':
        return <User className="h-4 w-4" />;
      case 'estudiante':
        return <Star className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const handleClick = () => {
    if (status !== 'vencido') {
      navigate(`/surveys/${id}`);
    }
  };

  return (
    <Card className="card-hover">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <Badge variant="outline" className="mb-2">
              {courseCode}
            </Badge>
            <CardTitle className="text-lg">{title}</CardTitle>
            <p className="text-sm text-gray-500 mt-1">{courseName}</p>
          </div>
          <Badge className={`${getStatusColor()} uppercase text-xs font-semibold`}>
            {status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center text-sm text-gray-600">
          <Calendar className="h-4 w-4 mr-1" /> 
          <span>Vence: {dueDate}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleClick} 
          variant="outline"
          className="w-full"
          disabled={status === 'vencido' || status === 'completado'}
        >
          {status === 'pendiente' ? 'Completar evaluación' : 
           status === 'completado' ? 'Ver respuestas' : 'Evaluación vencida'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SurveyCard;
