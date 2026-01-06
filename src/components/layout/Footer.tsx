import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h4 className="font-semibold mb-3">Platform</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/shop" className="hover:text-foreground">Shop</Link></li>
              <li><Link to="/track" className="hover:text-foreground">Track Order</Link></li>
              <li><Link to="/careers" className="hover:text-foreground">Careers</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">For Business</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/login" className="hover:text-foreground">Vendor Portal</Link></li>
              <li><Link to="/login" className="hover:text-foreground">Partner with Us</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Support</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><span className="cursor-pointer hover:text-foreground">Help Center</span></li>
              <li><span className="cursor-pointer hover:text-foreground">Contact Us</span></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><span className="cursor-pointer hover:text-foreground">Privacy Policy</span></li>
              <li><span className="cursor-pointer hover:text-foreground">Terms of Service</span></li>
            </ul>
          </div>
        </div>
        <div className="border-t mt-8 pt-6 text-center text-sm text-muted-foreground">
          <p>Demo Prototype – For Testing Only</p>
          <p className="mt-1">© 2024 Enterprise Platform. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
