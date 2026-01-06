import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  Shield, 
  Store, 
  Truck, 
  ShoppingBag, 
  ShoppingCart, 
  User, 
  LogOut,
  LayoutDashboard,
  Package,
  FileText,
  Users,
  Briefcase,
  Search,
  Menu,
} from 'lucide-react';
import { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const Header = () => {
  const { user, isAuthenticated, logout, setDemoUser } = useAuth();
  const { itemCount } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleRoleSwitch = (role: 'admin' | 'vendor' | 'delivery' | 'customer') => {
    setDemoUser(role);
    const routes: Record<string, string> = {
      admin: '/admin',
      vendor: '/vendor',
      delivery: '/delivery',
      customer: '/shop',
    };
    navigate(routes[role]);
  };

  const getRoleIcon = (role?: string) => {
    switch (role) {
      case 'admin': return <Shield className="h-4 w-4" />;
      case 'vendor': return <Store className="h-4 w-4" />;
      case 'delivery': return <Truck className="h-4 w-4" />;
      case 'customer': return <ShoppingBag className="h-4 w-4" />;
      default: return <User className="h-4 w-4" />;
    }
  };

  const getRoleColor = (role?: string) => {
    switch (role) {
      case 'admin': return 'bg-admin text-admin-foreground';
      case 'vendor': return 'bg-vendor text-vendor-foreground';
      case 'delivery': return 'bg-delivery text-delivery-foreground';
      case 'customer': return 'bg-customer text-customer-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getNavLinks = () => {
    if (!isAuthenticated) return [];
    
    switch (user?.role) {
      case 'admin':
        return [
          { to: '/admin', label: 'Dashboard', icon: LayoutDashboard },
          { to: '/admin/products', label: 'Products', icon: Package },
          { to: '/admin/orders', label: 'Orders', icon: FileText },
          { to: '/admin/vendors', label: 'Vendors', icon: Users },
          { to: '/admin/deliveries', label: 'Deliveries', icon: Truck },
          { to: '/admin/careers', label: 'Careers', icon: Briefcase },
        ];
      case 'vendor':
        return [
          { to: '/vendor', label: 'Dashboard', icon: LayoutDashboard },
          { to: '/vendor/products', label: 'My Products', icon: Package },
        ];
      case 'delivery':
        return [
          { to: '/delivery', label: 'Dashboard', icon: LayoutDashboard },
          { to: '/delivery/orders', label: 'Deliveries', icon: Truck },
        ];
      case 'customer':
        return [
          { to: '/shop', label: 'Shop', icon: ShoppingBag },
          { to: '/orders', label: 'My Orders', icon: FileText },
        ];
      default:
        return [];
    }
  };

  const navLinks = getNavLinks();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container flex h-14 items-center">
        {/* Mobile Menu */}
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="mr-2">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64">
            <nav className="flex flex-col gap-2 mt-4">
              {navLinks.map(({ to, label, icon: Icon }) => (
                <Link
                  key={to}
                  to={to}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === to
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
            <Package className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="hidden sm:inline">Enterprise</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 ml-6">
          {navLinks.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                location.pathname === to
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}
        </nav>

        {/* Right side actions */}
        <div className="ml-auto flex items-center gap-2">
          {/* Track Order - Always visible */}
          <Button variant="ghost" size="sm" asChild>
            <Link to="/track">
              <Search className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Track Order</span>
            </Link>
          </Button>

          {/* Cart for customers */}
          {(!isAuthenticated || user?.role === 'customer') && (
            <Button variant="ghost" size="icon" className="relative" asChild>
              <Link to="/cart">
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                    {itemCount}
                  </Badge>
                )}
              </Link>
            </Button>
          )}

          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <div className={`p-1 rounded ${getRoleColor(user?.role)}`}>
                    {getRoleIcon(user?.role)}
                  </div>
                  <span className="hidden sm:inline">{user?.name}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col">
                    <span>{user?.name}</span>
                    <span className="text-xs text-muted-foreground font-normal">{user?.email}</span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuLabel className="text-xs text-muted-foreground font-normal">
                  Switch Role (Demo)
                </DropdownMenuLabel>
                <DropdownMenuItem onClick={() => handleRoleSwitch('admin')}>
                  <Shield className="mr-2 h-4 w-4" /> Admin
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleRoleSwitch('vendor')}>
                  <Store className="mr-2 h-4 w-4" /> Vendor
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleRoleSwitch('delivery')}>
                  <Truck className="mr-2 h-4 w-4" /> Delivery Partner
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleRoleSwitch('customer')}>
                  <ShoppingBag className="mr-2 h-4 w-4" /> Customer
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                  <LogOut className="mr-2 h-4 w-4" /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button size="sm" asChild>
              <Link to="/login">Login</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
