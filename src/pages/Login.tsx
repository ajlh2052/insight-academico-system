
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import LoginForm from '@/components/auth/LoginForm';

const Login = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center py-16 px-4 bg-gray-50">
        <div className="w-full max-w-4xl">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="hidden md:block">
              <div className="text-center md:text-left">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Bienvenido a InsightAcademico</h1>
                <p className="text-gray-600 mb-6">
                  Inicia sesión para acceder a todas las funcionalidades de evaluación y retroalimentación académica.
                </p>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-primary mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Realiza o completa evaluaciones de cursos</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-primary mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Accede a estadísticas y reportes detallados</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-primary mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Visualiza retroalimentación personalizada</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-primary mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Identifica áreas de mejora en el proceso educativo</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div>
              <LoginForm />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Login;
