
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Book, GraduationCap, MessageSquare, Star } from 'lucide-react';

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-16 md:py-24 px-4 gradient-bg">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Sistema Integral de Evaluación y Retroalimentación Académica
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              Recopila y analiza de forma automatizada las opiniones de estudiantes y docentes sobre cursos y desempeño académico.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/login">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                  Iniciar sesión
                </Button>
              </Link>
              <Link to="/surveys">
                <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
                  Ver evaluaciones
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Características principales</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="card-hover">
                <CardContent className="pt-6">
                  <div className="rounded-full bg-primary/10 p-3 w-12 h-12 flex items-center justify-center mb-4">
                    <GraduationCap className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Evaluación de cursos</h3>
                  <p className="text-gray-600">
                    Recolecta opiniones detalladas sobre los cursos, materiales y metodologías utilizadas.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="card-hover">
                <CardContent className="pt-6">
                  <div className="rounded-full bg-primary/10 p-3 w-12 h-12 flex items-center justify-center mb-4">
                    <Star className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Evaluación docente</h3>
                  <p className="text-gray-600">
                    Permite a los estudiantes evaluar el desempeño, metodología y atención de los docentes.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="card-hover">
                <CardContent className="pt-6">
                  <div className="rounded-full bg-primary/10 p-3 w-12 h-12 flex items-center justify-center mb-4">
                    <Book className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Evaluación estudiantil</h3>
                  <p className="text-gray-600">
                    Facilita a los docentes evaluar el rendimiento y participación de los estudiantes.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="card-hover">
                <CardContent className="pt-6">
                  <div className="rounded-full bg-primary/10 p-3 w-12 h-12 flex items-center justify-center mb-4">
                    <MessageSquare className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Retroalimentación personalizada</h3>
                  <p className="text-gray-600">
                    Genera informes personalizados con sugerencias de mejora para docentes y estudiantes.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="card-hover">
                <CardContent className="pt-6">
                  <div className="rounded-full bg-primary/10 p-3 w-12 h-12 flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 text-primary">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Análisis estadístico</h3>
                  <p className="text-gray-600">
                    Visualiza tendencias y patrones para identificar áreas de mejora en el proceso educativo.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="card-hover">
                <CardContent className="pt-6">
                  <div className="rounded-full bg-primary/10 p-3 w-12 h-12 flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 text-primary">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Seguimiento continuo</h3>
                  <p className="text-gray-600">
                    Monitorea el progreso a lo largo del tiempo para verificar la efectividad de las mejoras implementadas.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-accent">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Mejora la calidad educativa con datos precisos
            </h2>
            <p className="text-lg text-gray-700 mb-8 max-w-3xl mx-auto">
              Únete a cientos de instituciones educativas que ya utilizan InsightAcademico para mejorar sus procesos de enseñanza y aprendizaje.
            </p>
            <Link to="/login">
              <Button size="lg" className="gradient-bg">
                Comenzar ahora
              </Button>
            </Link>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
