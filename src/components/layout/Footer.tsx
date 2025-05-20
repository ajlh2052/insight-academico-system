
import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <Link to="/" className="flex items-center">
              <GraduationCap className="h-8 w-8 text-primary" />
              <span className="ml-2 text-xl font-semibold text-gray-900">InsightAcademico</span>
            </Link>
            <p className="mt-4 text-sm text-gray-600">
              Sistema integral de evaluación y retroalimentación académica.
            </p>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Recursos</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link to="/surveys" className="text-sm text-gray-600 hover:text-primary">
                  Evaluaciones
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-sm text-gray-600 hover:text-primary">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/" className="text-sm text-gray-600 hover:text-primary">
                  Ayuda
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Legal</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link to="/" className="text-sm text-gray-600 hover:text-primary">
                  Privacidad
                </Link>
              </li>
              <li>
                <Link to="/" className="text-sm text-gray-600 hover:text-primary">
                  Términos
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Contacto</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a href="mailto:contacto@insightacademico.edu" className="text-sm text-gray-600 hover:text-primary">
                  contacto@insightacademico.edu
                </a>
              </li>
              <li className="text-sm text-gray-600">
                Tel: +123 456 7890
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-8">
          <p className="text-sm text-gray-400 text-center">
            &copy; {new Date().getFullYear()} InsightAcademico. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
