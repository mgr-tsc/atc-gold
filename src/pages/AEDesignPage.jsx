import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Power, Wifi, Check } from 'lucide-react';
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

const designServices = {
    "EV Charging Infrastructure Design": {
        icon: <Power className="w-10 h-10 text-secondary" />,
        items: [
            "Site feasibility studies and utility load planning",
            "EVSE layout, charger placement, and traffic flow analysis",
            "Electrical system design (AC/DC, panels, switchgear, transformers)",
            "Civil site plans: grading, trenching, conduit routing, drainage",
            "Structural design for equipment pads, canopies, bollards, and enclosures",
            "Mechanical systems (HVAC, ventilation for battery/storage areas)",
            "Lighting plans, photometric analysis, and controls",
            "ADA, DOT, and local code compliance integration",
            "Permitting strategy and jurisdictional coordination",
            "Utility service planning and coordination with providers",
            "Environmental assessments (Phase I ESA, stormwater, erosion control)",
            "Value engineering, capital budgeting, and constructability review",
        ],
    },
    "Wireless Infrastructure Design": {
        icon: <Wifi className="w-10 h-10 text-secondary" />,
        items: [
            "Site acquisition support, leasing documentation, and zoning packages",
            "Structural engineering: tower loading, mount layouts, reinforcements",
            "Antenna, sector frame, and small cell layout and optimization",
            "Electrical design (AC/DC power, battery backup, grounding systems)",
            "Microwave path analysis, dish alignment, and backhaul planning",
            "Civil design for raw land and rooftop telecom sites (access roads, foundations, grading)",
            "Mechanical and enclosure systems (cooling, HVAC for shelters/cabinets)",
            "Coax, hybrid cable, and fiber routing schematics",
            "Grounding, surge protection, and lightning protection design",
            "Utility coordination and electrical permitting packages",
            "Environmental and geotechnical assessments",
            "Full construction document sets, redlines, and as-builts",
        ],
    },
};

const AEDesignPage = () => {
  return (
    <>
      <Helmet>
        <title>A&E Design Services | ATC GOLD CONSTRUCTION</title>
        <meta name="description" content="Specialized A&E design services for EV charging and wireless infrastructure, from feasibility and planning to full construction documentation." />
      </Helmet>
      
      <div className="bg-primary">
        <div className="container mx-auto px-4 py-16 text-center text-primary-foreground">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-5xl font-extrabold tracking-tight text-secondary uppercase"
          >
            A&E Design Services
          </motion.h1>
        </div>
      </div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {Object.entries(designServices).map(([title, { icon, items }]) => (
              <motion.div key={title} variants={itemVariants}>
                <Card className="h-full hover:shadow-2xl transition-shadow duration-300">
                  <CardHeader className="bg-gray-50">
                    <div className="flex items-center gap-4">
                        {icon}
                        <CardTitle className="text-2xl font-bold text-primary">{title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <ul className="space-y-3">
                      {items.map((item, i) => (
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

export default AEDesignPage;