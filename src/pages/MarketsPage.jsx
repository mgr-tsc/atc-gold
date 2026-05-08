import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Power, Wifi, Briefcase, Building2, Hotel as Hospital, Plane, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } },
};

const markets = [
    {
        icon: <Power className="w-10 h-10 text-secondary" />,
        title: "Emerging Tech – EV Charging",
        items: [
            "Commercial Properties (Retail, Office, Mixed-Use)",
            "Multifamily / MDUs (Apartments, Condos)",
            "Municipal & Public Infrastructure (Parks, Parking Decks, Government Facilities)",
            "Hospitality & Entertainment Venues (Hotels, Casinos, Stadiums)",
            "Fleet & Logistics Facilities (Warehouses, Distribution Centers)",
        ],
        image: "https://images.unsplash.com/photo-1627992499243-714de135d30f?q=80&w=2070&auto=format&fit=crop",
    },
    {
        icon: <Wifi className="w-10 h-10 text-secondary" />,
        title: "Wireless – Cell Towers & Infrastructure",
        items: [
            "Rooftops & High-Rises",
            "Raw Land / Greenfield Sites",
            "Utility & Transmission Structures",
            "Small Cells & In-Building DAS",
            "Rural, Suburban & Urban Deployments",
        ],
        image: "https://images.unsplash.com/photo-1609603839935-855c7a5225d3?q=80&w=1939&auto=format&fit=crop",
    },
    {
        icon: <Briefcase className="w-10 h-10 text-secondary" />,
        title: "Professional Services",
        items: [
            "Stadiums & Large Venues",
            "High-Rise & Commercial Buildings",
            "Healthcare Facilities & Hospitals",
            "Corporate Campuses & Data Centers",
            "Institutional & Government Facilities",
        ],
        image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop",
    },
    {
        icon: <Building2 className="w-10 h-10 text-secondary" />,
        title: "Additional Markets",
        items: [
            "Utilities & Energy Infrastructure",
            "Pipelines & Civil Works",
            "Communications Networks",
            "Transportation Hubs (Airports, Ports, Rail)",
        ],
        image: "https://images.unsplash.com/photo-1517498495033-1a4b1c435e84?q=80&w=2070&auto=format&fit=crop",
    }
];

const MarketsPage = () => {
  return (
    <>
      <Helmet>
        <title>Markets We Serve | ATC GOLD CONSTRUCTION</title>
        <meta name="description" content="Serving diverse markets including EV charging, wireless infrastructure, professional services for large venues, and more." />
      </Helmet>
      
      <div className="bg-primary">
        <div className="container mx-auto px-4 py-16 text-center text-primary-foreground">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-5xl font-extrabold tracking-tight text-secondary uppercase"
          >
            Markets We Serve
          </motion.h1>
        </div>
      </div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {markets.map((market, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="h-full overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                  <img className="w-full h-56 object-cover" alt={market.title} src="https://images.unsplash.com/photo-1631935357154-0f80fb72d8fe" />
                  <CardHeader>
                    <div className="flex items-center gap-4">
                        {market.icon}
                        <CardTitle className="text-2xl font-bold text-primary">{market.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {market.items.map((item, i) => (
                        <li key={i} className="flex items-center">
                          <Zap className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default MarketsPage;