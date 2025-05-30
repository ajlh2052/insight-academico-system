
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, ChefHat, User, Star } from 'lucide-react';
import { Evaluacion } from '@/hooks/useEvaluaciones';

interface EvaluacionCardProps {
  evaluacion: Evaluacion;
  onStartEvaluacion: (evaluacion: Evaluacion) => void;
}

const EvaluacionCard: React.FC<EvaluacionCardProps> = ({
  evaluacion,
  onStartEvaluacion,
}) => {
  const getStatusFromDates = () => {
    const now = new Date();
    const fechaInicio = new Date(evaluacion.fecha_inicio);
    const fechaFin = new Date(evaluacion.fecha_fin);
    
    if (now < fechaInicio) return 'proximamente';
    if (now > fechaFin) return 'vencido';
    return 'pendiente';
  };

  const status = getStatusFromDates();

  const getStatusColor = () => {
    switch (status) {
      case 'pendiente':
        return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
      case 'vencido':
        return 'bg-red-100 text-red-800 hover:bg-red-200';
      case 'proximamente':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  };

  const getTypeIcon = () => {
    switch (evaluacion.tipo_evaluacion) {
      case 'curso':
        return <ChefHat className="h-4 w-4" />;
      case 'chef':
        return <User className="h-4 w-4" />;
      case 'autoevaluacion':
        return <Star className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const getDisplayInfo = () => {
    if (evaluacion.cursos_culinarios) {
      return {
        codigo: evaluacion.cursos_culinarios.codigo,
        nombre: evaluacion.cursos_culinarios.nombre,
        instructor: `${evaluacion.cursos_culinarios.chefs.nombre} ${evaluacion.cursos_culinarios.chefs.apellido}`,
        especialidad: evaluacion.cursos_culinarios.chefs.especialidad
      };
    } else if (evaluacion.chefs) {
      return {
        codigo: 'CHEF',
        nombre: `${evaluacion.chefs.nombre} ${evaluacion.chefs.apellido}`,
        instructor: evaluacion.chefs.especialidad,
        especialidad: ''
      };
    }
    return {
      codigo: 'EVAL',
      nombre: 'Autoevaluación',
      instructor: '',
      especialidad: ''
    };
  };

  const displayInfo = getDisplayInfo();

  const handleClick = () => {
    if (status === 'pendiente') {
      onStartEvaluacion(evaluacion);
    }
  };

  return (
    <Card className="card-hover">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2 mb-2">
            {getTypeIcon()}
            <Badge variant="outline">
              {displayInfo.codigo}
            </Badge>
          </div>
          <Badge className={`${getStatusColor()} uppercase text-xs font-semibold`}>
            {status}
          </Badge>
        </div>
        <CardTitle className="text-lg">{evaluacion.titulo}</CardTitle>
        <p className="text-sm text-gray-500 mt-1">{displayInfo.nombre}</p>
        {displayInfo.instructor && (
          <p className="text-xs text-gray-400">Instructor: {displayInfo.instructor}</p>
        )}
      </CardHeader>
      <CardContent>
        <div className="flex items-center text-sm text-gray-600 mb-2">
          <Calendar className="h-4 w-4 mr-1" /> 
          <span>Vence: {new Date(evaluacion.fecha_fin).toLocaleDateString('es-ES')}</span>
        </div>
        {evaluacion.descripcion && (
          <p className="text-sm text-gray-600">{evaluacion.descripcion}</p>
        )}
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleClick} 
          variant="outline"
          className="w-full"
          disabled={status === 'vencido' || status === 'proximamente'}
        >
          {status === 'pendiente' ? 'Completar evaluación' : 
           status === 'vencido' ? 'Evaluación vencida' : 'Próximamente'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EvaluacionCard;
