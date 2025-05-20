
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SurveyCard from '@/components/surveys/SurveyCard';
import SurveyForm from '@/components/surveys/SurveyForm';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';

const Surveys = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedSurvey, setSelectedSurvey] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  const userRole = localStorage.getItem('userRole') || 'estudiante';
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  useEffect(() => {
    // For non-authenticated users, still allow viewing surveys but show limited info
    if (!isLoggedIn) {
      toast({
        description: "Inicia sesión para acceder a todas las evaluaciones y funcionalidades.",
      });
    }
  }, [isLoggedIn, toast]);

  const mockSurveys = [
    {
      id: "survey1",
      title: "Evaluación de curso - Matemáticas Avanzadas",
      courseCode: "MAT101",
      courseName: "Matemáticas Avanzadas",
      dueDate: "28/05/2025",
      status: "pendiente",
      type: "curso",
      for: "estudiante",
    },
    {
      id: "survey2",
      title: "Evaluación docente - Dr. González",
      courseCode: "FIS202",
      courseName: "Física Cuántica",
      dueDate: "30/05/2025",
      status: "pendiente",
      type: "docente",
      for: "estudiante",
    },
    {
      id: "survey3",
      title: "Evaluación de desempeño estudiantil",
      courseCode: "PROG303",
      courseName: "Programación Avanzada",
      dueDate: "25/05/2025",
      status: "pendiente",
      type: "estudiante",
      for: "docente",
    },
    {
      id: "survey4",
      title: "Evaluación de curso - Biología Molecular",
      courseCode: "BIO404",
      courseName: "Biología Molecular",
      dueDate: "15/05/2025",
      status: "completado",
      type: "curso", 
      for: "estudiante",
    },
    {
      id: "survey5",
      title: "Evaluación docente - Dra. Martínez",
      courseCode: "HIS505",
      courseName: "Historia Contemporánea",
      dueDate: "05/05/2025",
      status: "vencido",
      type: "docente",
      for: "estudiante",
    },
    {
      id: "survey6",
      title: "Evaluación de metodología del curso",
      courseCode: "MAT101",
      courseName: "Matemáticas Avanzadas",
      dueDate: "12/05/2025",
      status: "completado",
      type: "curso",
      for: "docente",
    },
  ];

  const handleSurveyClick = (surveyId: string) => {
    setSelectedSurvey(surveyId);
  };

  const handleCompleteSurvey = () => {
    setSelectedSurvey(null);
    toast({
      title: "Evaluación completada",
      description: "Tu retroalimentación ha sido enviada con éxito.",
    });
  };

  const filteredSurveys = mockSurveys.filter(survey => {
    const matchesSearch = survey.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        survey.courseCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        survey.courseName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || survey.status === statusFilter;
    
    const matchesTab = activeTab === 'all' || 
                    (activeTab === 'courses' && survey.type === 'curso') ||
                    (activeTab === 'teachers' && survey.type === 'docente') ||
                    (activeTab === 'students' && survey.type === 'estudiante');

    const matchesRole = !isLoggedIn || survey.for === userRole || survey.status === 'completado';
    
    return matchesSearch && matchesStatus && matchesTab && matchesRole;
  });

  const sampleQuestions = [
    { id: 1, text: "¿Cómo calificarías la calidad general del curso?", type: "rating" },
    { id: 2, text: "¿El contenido del curso fue relevante y útil para tu formación?", type: "rating" },
    { id: 3, text: "¿Los materiales didácticos fueron adecuados y de buena calidad?", type: "rating" },
    { id: 4, text: "¿Las evaluaciones fueron justas y acordes al contenido?", type: "rating" },
    { id: 5, text: "¿Qué aspectos del curso consideras que podrían mejorarse?", type: "text" },
  ];

  if (selectedSurvey) {
    const survey = mockSurveys.find(s => s.id === selectedSurvey);
    
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        
        <main className="flex-grow bg-gray-50 py-8 px-4">
          <div className="max-w-7xl mx-auto">
            <Button 
              variant="outline" 
              className="mb-6"
              onClick={() => setSelectedSurvey(null)}
            >
              ← Volver a evaluaciones
            </Button>
            
            <SurveyForm
              title={survey?.title || "Evaluación"}
              description={`Curso: ${survey?.courseName} (${survey?.courseCode})`}
              questions={sampleQuestions}
              onComplete={handleCompleteSurvey}
            />
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
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Evaluaciones</h1>
              <p className="text-gray-600">
                {isLoggedIn 
                  ? `Gestiona y completa tus evaluaciones ${userRole === 'docente' ? 'académicas.' : 'de cursos y docentes.'}`
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
                      <SelectItem value="completado">Completados</SelectItem>
                      <SelectItem value="vencido">Vencidos</SelectItem>
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
              <TabsTrigger value="teachers">Docentes</TabsTrigger>
              <TabsTrigger value="students">Estudiantes</TabsTrigger>
            </TabsList>
            
            <TabsContent value={activeTab} className="animate-fade-in">
              {filteredSurveys.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredSurveys.map((survey) => (
                    <div key={survey.id} onClick={() => isLoggedIn && survey.status === 'pendiente' && handleSurveyClick(survey.id)}>
                      <SurveyCard
                        id={survey.id}
                        title={survey.title}
                        courseCode={survey.courseCode}
                        courseName={survey.courseName}
                        dueDate={survey.dueDate}
                        status={survey.status as any}
                        type={survey.type as any}
                      />
                    </div>
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
