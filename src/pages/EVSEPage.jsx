import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { HardHat, Zap, Power, Check, Settings, ClipboardList } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';


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

const services = [
  {
    icon: <Settings className="w-10 h-10 text-secondary" />,
    title: "Pre-Construction & Site Prep",
    items: [
      "Site assessment and constructability review",
      "Permitting and jurisdictional coordination",
      "Utility coordination and service upgrades",
      "Traffic control planning and MOT (if needed)",
      "Demolition, clearing, and grading",
    ],
  },
  {
    icon: <HardHat className="w-10 h-10 text-secondary" />,
    title: "Civil Work",
    items: [
      "Trenching for conduit and drainage",
      "Conduit installation for power and communication",
      "Bollard installation for charger protection",
      "Concrete pad pours for chargers, switchgear, and cabinets",
      "Site restoration: paving, repaving, landscaping",
      "Pavement striping and ADA-compliant signage",
      "Installation of curbs, wheel stops, and barriers",
    ],
  },
  {
    icon: <Zap className="w-10 h-10 text-secondary" />,
    title: "Electrical Work",
    items: [
      "Electrical panel, switchgear, and transformer installation",
      "AC/DC wiring from service point to charger",
      "Grounding and bonding systems",
      "Lighting installation and photometric compliance",
      "Surge protection and breaker panel modifications",
      "Integration of battery storage or solar (if applicable)",
    ],
  },
  {
    icon: <Power className="w-10 h-10 text-secondary" />,
    title: "Charger Installation",
    items: [
      "Anchoring and mounting of Level 2 or Level 3-4 DC fast chargers",
      "Networked charger system setup (Wi-Fi, LTE, etc.)",
      "Integration of credit card readers and access control",
      "Labeling, QR codes, and branding application",
      "Testing and activation per OEM and utility standards",
    ],
  },
  {
    icon: <ClipboardList className="w-10 h-10 text-secondary" />,
    title: "Testing & Commissioning",
    items: [
      "System energization and utility coordination",
      "Inspection walk-throughs (QA/QC, punch list)",
      "Functional and load testing of all equipment",
      "Firmware/software updates and network configuration",
      "Closeout documentation, as-builts, and warranty handoff",
    ],
  },
];

const EVSEPage = () => {
  return (
    <>
      <Helmet>
        <title>EVSE Construction & Installation | ATC GOLD CONSTRUCTION</title>
        <meta name="description" content="End-to-end EVSE construction and installation services, from site prep and civil work to charger installation and commissioning." />
      </Helmet>
      
      <div className="bg-primary">
        <div className="container mx-auto px-4 py-16 text-center text-primary-foreground">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-5xl font-extrabold tracking-tight text-secondary uppercase"
          >
            EVSE Construction & Installation Services
          </motion.h1>
        </div>
      </div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="h-full hover:shadow-xl transition-shadow duration-300">
                  <CardHeader className="flex flex-row items-center gap-4">
                    {service.icon}
                    <CardTitle className="text-xl font-bold text-primary">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {service.items.map((item, i) => (
                        <li key={i} className="flex items-start">
                          <Check className="w-5 h-5 text-green-500 mt-1 mr-2 flex-shrink-0" />
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

export default EVSEPage;