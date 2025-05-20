
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Radio, RadioGroup } from '@/components/ui/radio-group';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('estudiante');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      
      if (email && password) {
        // Store role in localStorage for demo purposes
        localStorage.setItem('userRole', role);
        localStorage.setItem('isLoggedIn', 'true');
        
        toast({
          title: "Inicio de sesión exitoso",
          description: `Bienvenido de nuevo, has ingresado como ${role}.`,
        });
        
        navigate('/dashboard');
      } else {
        toast({
          title: "Error de inicio de sesión",
          description: "Por favor verifica tus credenciales e intenta de nuevo.",
          variant: "destructive",
        });
      }
    }, 1500);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Iniciar sesión</CardTitle>
        <CardDescription>
          Ingresa tus credenciales para acceder al sistema
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Correo electrónico</Label>
            <Input
              id="email"
              type="email"
              placeholder="correo@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Contraseña</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label>Tipo de usuario</Label>
            <RadioGroup value={role} onValueChange={setRole} className="flex space-x-4">
              <div className="flex items-center space-x-2">
                <Radio value="estudiante" id="estudiante" />
                <Label htmlFor="estudiante">Estudiante</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Radio value="docente" id="docente" />
                <Label htmlFor="docente">Docente</Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Cargando..." : "Iniciar sesión"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default LoginForm;
