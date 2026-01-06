import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Shield, Store, Truck, ShoppingBag, Loader2 } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogging, setIsLogging] = useState(false);
  const { login, setDemoUser } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLogging(true);
    
    const success = await login(email, password);
    
    if (success) {
      toast({
        title: 'Login Successful',
        description: 'Welcome back!',
      });
      navigate(getRoleRedirect(email));
    } else {
      toast({
        title: 'Login Failed',
        description: 'Invalid email or password. Use demo123 as password.',
        variant: 'destructive',
      });
    }
    setIsLogging(false);
  };

  const handleDemoLogin = (role: 'admin' | 'vendor' | 'delivery' | 'customer') => {
    setDemoUser(role);
    toast({
      title: 'Demo Login',
      description: `Logged in as ${role}`,
    });
    
    const routes: Record<string, string> = {
      admin: '/admin',
      vendor: '/vendor',
      delivery: '/delivery',
      customer: '/shop',
    };
    navigate(routes[role]);
  };

  const getRoleRedirect = (email: string): string => {
    if (email.includes('admin')) return '/admin';
    if (email.includes('vendor')) return '/vendor';
    if (email.includes('delivery')) return '/delivery';
    return '/shop';
  };

  const demoAccounts = [
    { role: 'admin' as const, icon: Shield, label: 'Admin', email: 'admin@demo.com', color: 'bg-admin text-admin-foreground' },
    { role: 'vendor' as const, icon: Store, label: 'Vendor', email: 'vendor@demo.com', color: 'bg-vendor text-vendor-foreground' },
    { role: 'delivery' as const, icon: Truck, label: 'Delivery', email: 'delivery@demo.com', color: 'bg-delivery text-delivery-foreground' },
    { role: 'customer' as const, icon: ShoppingBag, label: 'Customer', email: 'customer@demo.com', color: 'bg-customer text-customer-foreground' },
  ];

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Enterprise Platform</h1>
          <p className="text-muted-foreground mt-2">Demo Login Portal</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Manual Login */}
          <Card>
            <CardHeader>
              <CardTitle>Manual Login</CardTitle>
              <CardDescription>
                Enter credentials to login. Password: demo123
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@demo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="demo123"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLogging}>
                  {isLogging && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Login
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Quick Demo Logins */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Demo Access</CardTitle>
              <CardDescription>
                One-click login for each role
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {demoAccounts.map(({ role, icon: Icon, label, email, color }) => (
                <Button
                  key={role}
                  variant="outline"
                  className="w-full justify-start h-auto py-3"
                  onClick={() => handleDemoLogin(role)}
                >
                  <div className={`p-2 rounded-md mr-3 ${color}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium">{label} Login</div>
                    <div className="text-xs text-muted-foreground">{email}</div>
                  </div>
                </Button>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>This is a demo prototype. All data is simulated.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
