
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

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const userRole = localStorage.getItem('userRole') || 'estudiante';
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

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

  if (!isLoggedIn) {
    return null; // Don't render if not logged in
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
                  title={userRole === 'docente' ? 'Evaluaciones completadas' : 'Cursos aprobados'}
                  value={userRole === 'docente' ? 8 : 4}
                  maxValue={userRole === 'docente' ? 12 : 5}
                />
                
                <StatCard
                  title="Asistencia"
                  value={92}
                  percentageText="92%"
                />
                
                <StatCard
                  title={userRole === 'docente' ? 'Calificación promedio' : 'Promedio académico'}
                  value={userRole === 'docente' ? 4.8 : 4.2}
                  maxValue={5}
                />
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Evaluaciones pendientes</CardTitle>
                    <CardDescription>Evaluaciones que requieren tu atención</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {userRole === 'docente' ? (
                      <>
                        <SurveyCard 
                          id="1"
                          title="Evaluación de desempeño estudiantil"
                          courseCode="MAT101"
                          courseName="Matemáticas Avanzadas"
                          dueDate="28/05/2025"
                          status="pendiente"
                          type="estudiante"
                        />
                        <SurveyCard 
                          id="2"
                          title="Reporte de calificaciones finales"
                          courseCode="FIS202"
                          courseName="Física Cuántica"
                          dueDate="30/05/2025"
                          status="pendiente"
                          type="estudiante"
                        />
                      </>
                    ) : (
                      <>
                        <SurveyCard 
                          id="3"
                          title="Evaluación del curso"
                          courseCode="PROG303"
                          courseName="Programación Avanzada"
                          dueDate="25/05/2025"
                          status="pendiente"
                          type="curso"
                        />
                        <SurveyCard 
                          id="4"
                          title="Evaluación docente"
                          courseCode="BIO404"
                          courseName="Biología Molecular"
                          dueDate="27/05/2025"
                          status="pendiente"
                          type="docente"
                        />
                      </>
                    )}
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Evaluaciones recientes</CardTitle>
                    <CardDescription>Últimas evaluaciones completadas</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {userRole === 'docente' ? (
                      <>
                        <SurveyCard 
                          id="5"
                          title="Evaluación del curso"
                          courseCode="PROG303"
                          courseName="Programación Avanzada"
                          dueDate="15/05/2025"
                          status="completado"
                          type="curso"
                        />
                        <SurveyCard 
                          id="6"
                          title="Retroalimentación estudiantil"
                          courseCode="BIO404"
                          courseName="Biología Molecular"
                          dueDate="10/05/2025"
                          status="completado"
                          type="estudiante"
                        />
                      </>
                    ) : (
                      <>
                        <SurveyCard 
                          id="7"
                          title="Evaluación docente"
                          courseCode="MAT101"
                          courseName="Matemáticas Avanzadas"
                          dueDate="12/05/2025"
                          status="completado"
                          type="docente"
                        />
                        <SurveyCard 
                          id="8"
                          title="Evaluación del curso"
                          courseCode="HIS505"
                          courseName="Historia Contemporánea"
                          dueDate="05/05/2025"
                          status="vencido"
                          type="curso"
                        />
                      </>
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
                      : 'Desempeño académico por curso'}
                  </CardTitle>
                  <CardDescription>
                    {userRole === 'docente'
                      ? 'Comparativa de tus evaluaciones frente al promedio institucional'
                      : 'Comparativa de tus calificaciones frente al promedio del curso'}
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={userRole === 'docente' ? teacherChartData : studentChartData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis domain={userRole === 'docente' ? [0, 5] : [0, 100]} />
                      <Tooltip />
                      <Legend />
                      <Bar
                        dataKey={userRole === 'docente' ? 'evaluacion' : 'calificacion'}
                        name={userRole === 'docente' ? 'Tu evaluación' : 'Tu calificación'}
                        fill="hsl(var(--primary))"
                      />
                      <Bar
                        dataKey="promedio"
                        name="Promedio"
                        fill="hsl(var(--secondary))"
                      />
                    </BarChart>
                  </ResponsiveContainer>
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
