
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import EvaluacionCard from '@/components/surveys/EvaluacionCard';
import EvaluacionForm from '@/components/surveys/EvaluacionForm';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { useEvaluaciones, Evaluacion } from '@/hooks/useEvaluaciones';

const Surveys = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedEvaluacion, setSelectedEvaluacion] = useState<Evaluacion | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { evaluaciones, loading, error } = useEvaluaciones();
  const userRole = localStorage.getItem('userRole') || 'estudiante';
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  const handleEvaluacionClick = (evaluacion: Evaluacion) => {
    setSelectedEvaluacion(evaluacion);
  };

  const handleCompleteEvaluacion = () => {
    setSelectedEvaluacion(null);
    toast({
      title: "Evaluación completada",
      description: "Tu retroalimentación ha sido enviada con éxito.",
    });
  };

  const getStatusFromDates = (evaluacion: Evaluacion) => {
    const now = new Date();
    const fechaInicio = new Date(evaluacion.fecha_inicio);
    const fechaFin = new Date(evaluacion.fecha_fin);
    
    if (now < fechaInicio) return 'proximamente';
    if (now > fechaFin) return 'vencido';
    return 'pendiente';
  };

  const filteredEvaluaciones = evaluaciones.filter(evaluacion => {
    const matchesSearch = evaluacion.titulo.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        (evaluacion.cursos_culinarios?.codigo || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                        (evaluacion.cursos_culinarios?.nombre || '').toLowerCase().includes(searchQuery.toLowerCase());
    
    const status = getStatusFromDates(evaluacion);
    const matchesStatus = statusFilter === 'all' || status === statusFilter;
    
    const matchesTab = activeTab === 'all' || 
                    (activeTab === 'courses' && evaluacion.tipo_evaluacion === 'curso') ||
                    (activeTab === 'teachers' && evaluacion.tipo_evaluacion === 'chef') ||
                    (activeTab === 'students' && evaluacion.tipo_evaluacion === 'autoevaluacion');
    
    return matchesSearch && matchesStatus && matchesTab;
  });

  if (selectedEvaluacion) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        
        <main className="flex-grow bg-gray-50 py-8 px-4">
          <div className="max-w-7xl mx-auto">
            <Button 
              variant="outline" 
              className="mb-6"
              onClick={() => setSelectedEvaluacion(null)}
            >
              ← Volver a evaluaciones
            </Button>
            
            <EvaluacionForm
              evaluacion={selectedEvaluacion}
              onComplete={handleCompleteEvaluacion}
            />
          </div>
        </main>
        
        <Footer />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow bg-gray-50 py-8 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center py-12">
              <p className="text-lg">Cargando evaluaciones...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow bg-gray-50 py-8 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center py-12">
              <p className="text-lg text-red-600">Error: {error}</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow bg-gray-50 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Evaluaciones Culinarias</h1>
              <p className="text-gray-600">
                {isLoggedIn 
                  ? `Gestiona y completa tus evaluaciones de cursos culinarios y chefs.`
                  : 'Explora las evaluaciones disponibles. Inicia sesión para acceder a todas las funciones.'}
              </p>
            </div>
            
            {isLoggedIn && (
              <Button className="mt-4 md:mt-0" onClick={() => navigate('/dashboard')}>
                Ver Dashboard
              </Button>
            )}
          </div>
          
          <Card className="mb-8">
            <CardHeader className="pb-3">
              <CardTitle>Filtros</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <Input
                    placeholder="Buscar por título o código"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full"
                  />
                </div>
                <div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos los estados</SelectItem>
                      <SelectItem value="pendiente">Pendientes</SelectItem>
                      <SelectItem value="vencido">Vencidos</SelectItem>
                      <SelectItem value="proximamente">Próximamente</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="all">Todas</TabsTrigger>
              <TabsTrigger value="courses">Cursos</TabsTrigger>
              <TabsTrigger value="teachers">Chefs</TabsTrigger>
              <TabsTrigger value="students">Autoevaluación</TabsTrigger>
            </TabsList>
            
            <TabsContent value={activeTab} className="animate-fade-in">
              {filteredEvaluaciones.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredEvaluaciones.map((evaluacion) => (
                    <EvaluacionCard
                      key={evaluacion.id}
                      evaluacion={evaluacion}
                      onStartEvaluacion={handleEvaluacionClick}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-lg text-gray-500">No se encontraron evaluaciones con los filtros seleccionados.</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Surveys;
