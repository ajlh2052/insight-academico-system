
import React from 'react';
import { Book, MessageSquare, Star, Users } from 'lucide-react';

interface DashboardHeaderProps {
  userType: string;
  userName?: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ userType, userName = "Usuario" }) => {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        Dashboard {userType === 'docente' ? 'del Docente' : 'del Estudiante'}
      </h1>
      <p className="text-gray-600">
        Bienvenido, {userName}. Aquí puedes ver un resumen de tus {userType === 'docente' ? 'evaluaciones y retroalimentaciones.' : 'cursos y evaluaciones pendientes.'}
      </p>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        <div className="bg-white p-4 rounded-lg shadow-sm border flex items-center">
          <div className="rounded-full bg-blue-100 p-3 mr-4">
            <Book className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <div className="text-sm text-gray-500">Cursos</div>
            <div className="text-xl font-bold">{userType === 'docente' ? '4' : '5'}</div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm border flex items-center">
          <div className="rounded-full bg-purple-100 p-3 mr-4">
            <MessageSquare className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <div className="text-sm text-gray-500">Evaluaciones</div>
            <div className="text-xl font-bold">{userType === 'docente' ? '12' : '1'}</div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm border flex items-center">
          <div className="rounded-full bg-yellow-100 p-3 mr-4">
            <Star className="h-6 w-6 text-yellow-600" />
          </div>
          <div>
            <div className="text-sm text-gray-500">Calificación</div>
            <div className="text-xl font-bold">{userType === 'docente' ? '4.8' : '4.2'}</div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm border flex items-center">
          <div className="rounded-full bg-green-100 p-3 mr-4">
            <Users className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <div className="text-sm text-gray-500">{userType === 'docente' ? 'Estudiantes' : 'Compañeros'}</div>
            <div className="text-xl font-bold">{userType === 'docente' ? '87' : '32'}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
