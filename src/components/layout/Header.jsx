import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const ListItem = React.forwardRef(({ className, title, children, href, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          to={href}
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-800 hover:text-primary-foreground focus:bg-slate-800 focus:text-primary-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none text-primary-foreground">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-primary-foreground/70">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export function Header() {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  const navLinks = [
    { href: "/", label: "Home" },
    {
      label: "Services",
      dropdown: [
        { href: "/services/wireless", title: "Wireless" },
        { href: "/services/ev-charging", title: "EVSE/EV Charging" },
        { href: "/services/professional-services", title: "Professional Services" },
        { href: "/services/ae-design", title: "A&E Design" },
      ]
    },
    { href: "/markets", label: "Markets We Serve" },
    { href: "/safety-quality", label: "Safety & Quality" },
    { href: "/about", label: "About / Vision" },
    { href: "/contact", label: "Contact" },
  ];

  const customTriggerStyle = cn(
    navigationMenuTriggerStyle(),
    "bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground focus:bg-primary-foreground/10 focus:text-primary-foreground data-[active]:bg-primary-foreground/10 data-[state=open]:bg-primary-foreground/10"
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary-foreground/10 bg-primary text-primary-foreground">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 mb-2 mt-2">
          <svg width="50" height="60" viewBox="0 0 40 40" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <polygon points="35,0 15,0 0,35 10,35 21,8 35,8"
              style={{ fill: '#FDB913', stroke: 'none', strokeWidth: 1 }} />
            <polygon points="35,9.66 25,9.66 25,35 35,35"
              style={{ fill: '#FDB913', stroke: 'none', strokeWidth: 1 }} />
          </svg>
          <span className="text-white inline-flex h-[55px] w-max flex-col">
            <span className="block w-full text-3xl font-extrabold leading-none tracking-[0.02em] whitespace-nowrap">ATC GOLD</span>
            <span className="block w-full text-base font-light leading-none tracking-[0.16em] whitespace-nowrap">CONSTRUCTION</span>
          </span>
        </Link>
        <nav className="hidden md:flex">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/">
                  <NavigationMenuLink className={customTriggerStyle}>Home</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger className={customTriggerStyle}>Services</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-primary border border-primary-foreground/10">
                    {navLinks.find(l => l.label === "Services").dropdown.map((component) => (
                      <ListItem key={component.title} title={component.title} href={component.href} />
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/markets">
                  <NavigationMenuLink className={customTriggerStyle}>Markets</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/safety-quality">
                  <NavigationMenuLink className={customTriggerStyle}>Safety & Quality</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/about">
                  <NavigationMenuLink className={customTriggerStyle}>About</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
               <NavigationMenuItem>
                <Link to="/contact">
                  <NavigationMenuLink className={customTriggerStyle}>Contact</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={toggleMenu} className="text-primary-foreground hover:bg-primary-foreground/10">
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>
      
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden absolute top-16 left-0 w-full bg-primary border-b border-primary-foreground/10 overflow-hidden"
        >
          <nav className="flex flex-col items-center gap-4 py-6">
            {navLinks.map((link) => (
              link.dropdown ? (
                link.dropdown.map(d_link => (
                   <Link 
                    key={d_link.href} 
                    to={d_link.href} 
                    onClick={toggleMenu} 
                    className={cn(
                      "font-medium transition-colors",
                      location.pathname === d_link.href ? "text-secondary" : "text-primary-foreground hover:text-secondary"
                    )}
                   >
                    {d_link.title}
                   </Link>
                ))
              ) : (
                <Link 
                  key={link.href} 
                  to={link.href} 
                  onClick={toggleMenu} 
                  className={cn(
                    "font-medium transition-colors",
                    location.pathname === link.href ? "text-secondary" : "text-primary-foreground hover:text-secondary"
                  )}
                >
                  {link.label}
                </Link>
              )
            ))}
          </nav>
        </motion.div>
      )}
    </header>
  );
}