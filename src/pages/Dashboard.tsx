import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import StatCard from '@/components/dashboard/StatCard';
import SurveyCard from '@/components/surveys/SurveyCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { useDashboardData } from '@/hooks/useDashboardData';
import { useEvaluacionStats } from '@/hooks/useEvaluacionStats';

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const userRole = localStorage.getItem('userRole') || 'estudiante';
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const { evaluaciones, loading, error } = useDashboardData();
  const { courseStats, loading: statsLoading, error: statsError } = useEvaluacionStats();

  useEffect(() => {
    if (!isLoggedIn) {
      toast({
        title: "Acceso denegado",
        description: "Por favor inicia sesión para acceder al dashboard.",
        variant: "destructive",
      });
      navigate('/login');
    }
  }, [isLoggedIn, navigate, toast]);

  const studentChartData = [
    { name: 'Mat101', calificacion: 85, promedio: 78 },
    { name: 'Fis202', calificacion: 72, promedio: 75 },
    { name: 'Prog303', calificacion: 90, promedio: 82 },
    { name: 'Bio404', calificacion: 88, promedio: 80 },
    { name: 'His505', calificacion: 76, promedio: 72 },
  ];

  const teacherChartData = [
    { name: 'Mat101', evaluacion: 4.5, promedio: 4.2 },
    { name: 'Fis202', evaluacion: 4.7, promedio: 4.2 },
    { name: 'Prog303', evaluacion: 4.3, promedio: 4.2 },
    { name: 'Bio404', evaluacion: 4.8, promedio: 4.2 },
  ];

  // Filtrar evaluaciones por estado
  const evaluacionesPendientes = evaluaciones.filter(ev => ev.status === 'pendiente');
  const evaluacionesCompletadas = evaluaciones.filter(ev => ev.status === 'completado');
  const evaluacionesVencidas = evaluaciones.filter(ev => ev.status === 'vencido');

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getDisplayName = (evaluacion: any) => {
    if (evaluacion.tipo_evaluacion === 'curso' && evaluacion.curso_nombre) {
      return evaluacion.curso_nombre;
    } else if (evaluacion.tipo_evaluacion === 'chef' && evaluacion.chef_nombre) {
      return `${evaluacion.chef_nombre} ${evaluacion.chef_apellido || ''}`.trim();
    }
    return 'Autoevaluación';
  };

  const getDisplayCode = (evaluacion: any) => {
    if (evaluacion.tipo_evaluacion === 'curso' && evaluacion.curso_codigo) {
      return evaluacion.curso_codigo;
    } else if (evaluacion.tipo_evaluacion === 'chef') {
      return 'CHEF';
    }
    return 'AUTO';
  };

  const getSurveyType = (tipoEvaluacion: string): "curso" | "docente" | "estudiante" => {
    switch (tipoEvaluacion) {
      case 'curso':
        return 'curso';
      case 'chef':
        return 'docente';
      case 'autoevaluacion':
        return 'estudiante';
      default:
        return 'curso';
    }
  };

  if (!isLoggedIn) {
    return null;
  }

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow bg-gray-50 py-8 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-lg">Cargando datos del dashboard...</p>
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
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
                <p className="text-lg text-red-600 mb-4">Error al cargar datos</p>
                <p className="text-sm text-red-500">{error}</p>
              </div>
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
          <DashboardHeader userType={userRole} userName={userRole === 'docente' ? 'Prof. López' : 'Alex Rodríguez'} />
          
          <Tabs defaultValue="overview" className="mb-8">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="overview">Resumen</TabsTrigger>
              <TabsTrigger value="statistics">Estadísticas</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="mt-6 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <StatCard
                  title={userRole === 'docente' ? 'Evaluaciones completadas' : 'Evaluaciones pendientes'}
                  value={userRole === 'docente' ? evaluacionesCompletadas.length : evaluacionesPendientes.length}
                  maxValue={evaluaciones.length || 1}
                />
                
                <StatCard
                  title="Total evaluaciones"
                  value={evaluaciones.length}
                  percentageText={`${evaluaciones.length} disponibles`}
                />
                
                <StatCard
                  title="Evaluaciones vencidas"
                  value={evaluacionesVencidas.length}
                  maxValue={evaluaciones.length || 1}
                />
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Evaluaciones pendientes</CardTitle>
                    <CardDescription>Evaluaciones que requieren tu atención</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {evaluacionesPendientes.length > 0 ? (
                      evaluacionesPendientes.slice(0, 3).map((evaluacion) => (
                        <SurveyCard 
                          key={evaluacion.id}
                          id={evaluacion.id}
                          title={evaluacion.titulo}
                          courseCode={getDisplayCode(evaluacion)}
                          courseName={getDisplayName(evaluacion)}
                          dueDate={formatDate(evaluacion.fecha_fin)}
                          status="pendiente"
                          type={getSurveyType(evaluacion.tipo_evaluacion)}
                        />
                      ))
                    ) : (
                      <p className="text-gray-500 text-center py-4">
                        No hay evaluaciones pendientes
                      </p>
                    )}
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Evaluaciones recientes</CardTitle>
                    <CardDescription>Últimas evaluaciones disponibles</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {evaluaciones.length > 0 ? (
                      evaluaciones.slice(0, 3).map((evaluacion) => (
                        <SurveyCard 
                          key={evaluacion.id}
                          id={evaluacion.id}
                          title={evaluacion.titulo}
                          courseCode={getDisplayCode(evaluacion)}
                          courseName={getDisplayName(evaluacion)}
                          dueDate={formatDate(evaluacion.fecha_fin)}
                          status={evaluacion.status}
                          type={getSurveyType(evaluacion.tipo_evaluacion)}
                        />
                      ))
                    ) : (
                      <p className="text-gray-500 text-center py-4">
                        No hay evaluaciones disponibles
                      </p>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="statistics" className="mt-6 animate-fade-in">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {userRole === 'docente' 
                      ? 'Evaluaciones de cursos por materia'
                      : 'Calificaciones de cursos por promedio'}
                  </CardTitle>
                  <CardDescription>
                    {userRole === 'docente'
                      ? 'Comparativa de evaluaciones de tus cursos'
                      : 'Evaluaciones promedio de cursos culinarios completados'}
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  {statsLoading ? (
                    <div className="flex items-center justify-center h-full">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                      <span className="ml-2">Cargando estadísticas...</span>
                    </div>
                  ) : statsError ? (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center text-red-600">
                        <p>Error al cargar estadísticas</p>
                        <p className="text-sm">{statsError}</p>
                      </div>
                    </div>
                  ) : courseStats.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={courseStats}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis domain={[0, 5]} />
                        <Tooltip />
                        <Legend />
                        <Bar
                          dataKey="evaluacion"
                          name="Calificación del curso"
                          fill="hsl(var(--primary))"
                        />
                        <Bar
                          dataKey="promedio"
                          name="Promedio general"
                          fill="hsl(var(--secondary))"
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center text-gray-500">
                        <p>No hay estadísticas disponibles</p>
                        <p className="text-sm">Complete algunas evaluaciones para ver los datos</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
