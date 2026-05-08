import React from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Facebook, Twitter } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

const Footer = () => {
    const { toast } = useToast();
    const handleSocialClick = (e) => {
        e.preventDefault();
        toast({
            title: "Coming Soon!",
            description: "This feature isn't implemented yet.",
        });
    }

  return (
    <footer className="bg-primary text-primary-foreground/80">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1 flex flex-col items-start">
                        <Link to="/" className="flex items-center gap-2 mb-4">
                            <svg width="50" height="60" viewBox="0 0 40 40" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <polygon points="35,0 15,0 0,35 10,35 21,8 35,8"
                                         style={{fill: '#FDB913', stroke: 'none', strokeWidth: 1}}/>
                                <polygon points="35,9.66 25,9.66 25,35 35,35"
                                         style={{fill: '#FDB913', stroke: 'none', strokeWidth: 1}}/>
                            </svg>
                            <span className="text-primary-foreground inline-flex h-[55px] w-max flex-col">
                                <span className="block w-full text-3xl font-extrabold leading-none tracking-[0.02em] whitespace-nowrap">ATC GOLD</span>
                                <span className="block w-full text-base font-light leading-none tracking-[0.16em] whitespace-nowrap">CONSTRUCTION</span>
                            </span>
                        </Link>
            <p className="text-sm">Building Tomorrow's Infrastructure, Today</p>
          </div>
          
          <div>
            <p className="font-bold text-primary-foreground mb-4">Quick Links</p>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-secondary transition-colors">Home</Link></li>
              <li><Link to="/services" className="hover:text-secondary transition-colors">Services</Link></li>
              <li><Link to="/markets" className="hover:text-secondary transition-colors">Markets</Link></li>
              <li><Link to="/safety-quality" className="hover:text-secondary transition-colors">Safety & Quality</Link></li>
              <li><Link to="/about" className="hover:text-secondary transition-colors">About / Vision</Link></li>
              <li><Link to="/contact" className="hover:text-secondary transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <p className="font-bold text-primary-foreground mb-4">Contact Information</p>
            <ul className="space-y-2 text-sm">
              <li><p>Miami, Florida</p></li>
              <li><a href="tel:786-612-4565" className="hover:text-secondary transition-colors">786-612-4565</a></li>
              <li><a href="mailto:Alejandro.Talavera@atcgoldllc.com" className="hover:text-secondary transition-colors">Alejandro.Talavera@atcgoldllc.com</a></li>
            </ul>
          </div>

          <div>
            <p className="font-bold text-primary-foreground mb-4">Follow Us</p>
            <div className="flex space-x-4">
              <a href="#" onClick={handleSocialClick} className="hover:text-secondary transition-colors text-primary-foreground"><Linkedin size={24} /></a>
              <a href="#" onClick={handleSocialClick} className="hover:text-secondary transition-colors text-primary-foreground"><Facebook size={24} /></a>
              <a href="#" onClick={handleSocialClick} className="hover:text-secondary transition-colors text-primary-foreground"><Twitter size={24} /></a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-primary-foreground/20 text-center text-sm">
          <p>© 2025 ATC GOLD CONSTRUCTION. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;