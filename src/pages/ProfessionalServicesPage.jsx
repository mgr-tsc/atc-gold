import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Network, Server, Zap, CheckCircle } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 100 },
  },
};

const ServiceSection = ({ icon, title, items }) => (
  <motion.div variants={itemVariants} className="mb-12 bg-white p-8 rounded-lg shadow-lg">
    <div className="flex items-center mb-6">
      <div className="bg-secondary p-3 rounded-full mr-4">{icon}</div>
      <h2 className="text-2xl md:text-3xl font-bold text-primary">{title}</h2>
    </div>
    <ul className="space-y-4">
      {items.map((item, index) => (
        <li key={index} className="flex items-start text-lg">
          <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
          <span className="text-gray-700">{item}</span>
        </li>
      ))}
    </ul>
  </motion.div>
);

const ProfessionalServicesPage = () => {
    const services = [
        {
            icon: <Network className="h-8 w-8 text-primary" />,
            title: "Inside Plant (ISP) Infrastructure",
            items: [
                "Design and installation of ISP fiber and copper networks",
                "Backbone and horizontal structured cabling (CAT6, fiber, coax)",
                "High-density patch panel and cable tray systems",
                "Fiber distribution frames (FDF), splice panels, and cable management",
                "OTDR and power meter testing for all installed links",
            ],
        },
        {
            icon: <Server className="h-8 w-8 text-primary" />,
            title: "Equipment Installation & Infrastructure",
            items: [
                "Rack and stack of network, server, and telecom equipment",
                "Relay racks, 2-post/4-post, wall-mount, and seismic-rated racks",
                "Cabinet layout and hot/cold aisle containment setup",
                "Equipment grounding and bus bar systems (central and peripheral)",
                "Overhead or underfloor grounding grid installation",
                "Raised floor systems: design, installation, and static mitigation",
            ],
        },
        {
            icon: <Zap className="h-8 w-8 text-primary" />,
            title: "Power & Environmental Support",
            items: [
                "DC power systems installation and power plant integration",
                "Battery string installs and testing (VRLA, Li-ion, etc.)",
                "Cable ladder, fiber trays, and basket routing systems",
                "HVAC integration, monitoring sensors, and cable cooling planning",
            ],
        },
        {
            icon: <CheckCircle className="h-8 w-8 text-primary" />,
            title: "Testing, Labeling & Documentation",
            items: [
                "Circuit labeling and ID per TIA/EIA standards",
                "Cable certification, mapping, and documentation",
                "As-built drawings and redline updates",
                "Site audits and remediation services",
            ],
        },
    ];

    return (
        <>
            <Helmet>
                <title>Professional Services | ATC GOLD CONSTRUCTION</title>
                <meta name="description" content="Expert professional services for inside plant infrastructure, equipment installation, power systems, and complete documentation." />
            </Helmet>
            
            <div className="bg-primary">
                <div className="container mx-auto px-4 py-16 text-center text-primary-foreground">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        className="text-4xl md:text-5xl font-extrabold tracking-tight text-secondary uppercase"
                    >
                        Professional Services
                    </motion.h1>
                </div>
            </div>

            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="py-16 md:py-24 bg-gray-50">
                <div className="container mx-auto px-4">
                    {services.map((service) => (
                        <ServiceSection key={service.title} {...service} />
                    ))}
                </div>
            </motion.div>
        </>
    );
};

export default ProfessionalServicesPage;