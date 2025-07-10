
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, AlertCircle, XCircle } from 'lucide-react';

interface DatabaseStatusProps {
  isConnected: boolean;
  isLoading: boolean;
  error?: string | null;
  recordCount?: number;
}

const DatabaseStatus: React.FC<DatabaseStatusProps> = ({
  isConnected,
  isLoading,
  error,
  recordCount = 0
}) => {
  if (isLoading) {
    return (
      <Card className="mb-4">
        <CardContent className="flex items-center p-4">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500 mr-3"></div>
          <span className="text-sm text-gray-600">Conectando con la base de datos...</span>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="mb-4 border-red-200 bg-red-50">
        <CardContent className="flex items-center p-4">
          <XCircle className="h-4 w-4 text-red-500 mr-3" />
          <div>
            <p className="text-sm font-medium text-red-800">Error de conexión</p>
            <p className="text-xs text-red-600">{error}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!isConnected) {
    return (
      <Card className="mb-4 border-yellow-200 bg-yellow-50">
        <CardContent className="flex items-center p-4">
          <AlertCircle className="h-4 w-4 text-yellow-500 mr-3" />
          <span className="text-sm text-yellow-800">Desconectado de la base de datos</span>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mb-4 border-green-200 bg-green-50">
      <CardContent className="flex items-center p-4">
        <CheckCircle className="h-4 w-4 text-green-500 mr-3" />
        <span className="text-sm text-green-800">
          ✓ Conectado a Supabase - {recordCount} evaluaciones cargadas
        </span>
      </CardContent>
    </Card>
  );
};

export default DatabaseStatus;
