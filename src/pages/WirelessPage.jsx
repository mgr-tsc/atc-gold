import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
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

const ServiceSection = ({ title, items }) => (
  <motion.div variants={itemVariants} className="mb-12">
    <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6 border-l-4 border-secondary pl-4">{title}</h2>
    <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
      {items.map((item, index) => (
        <li key={index} className="flex items-start">
          <Check className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
          <span className="text-gray-700 text-lg">{item}</span>
        </li>
      ))}
    </ul>
  </motion.div>
);

const WirelessPage = () => {
    const services = {
        "Site Acquisition & Preconstruction": [
            "Site acquisition coordination and leasing support",
            "Zoning and land use permitting",
            "Environmental assessments (Phase I ESA, NEPA, SHPO, wetlands)",
            "Geotechnical soil testing and boring analysis",
            "Topographical and boundary surveying",
            "Utility load planning and make-ready coordination",
            "GPRS Services",
        ],
        "Tower & Structural Work": [
            "Raw land tower builds: monopole, self-support, lattice, guyed",
            "Tower stacking and structural modifications",
            "Antenna and sector frame installations (low, mid, high mounts)",
            "Tower foundation construction and helical pier installations",
            "Steel platform installs and grounding systems",
            "Tower lighting systems: installation, upgrades, FAA compliance",
            "Safety climb systems, ladders, platforms, anchor points",
            "Tower mapping, tagging, and inspections (TIA/EIA standards)",
            "Macro mods, relocations, decommissions",
        ],
        "RF & Equipment Installation": [
            "Antenna and radio installation (LTE, 5G, CBRS, CBAND)",
            "RRU/RRH deployment and configuration",
            "Triplexer, duplexer, TMA, and coax installation",
            "RET (Remote Electrical Tilt) system setup and cabling",
            "Microwave dish installation, alignment, and path testing",
            "Small Cell and DAS installation (indoor/outdoor)",
            "BBU, power, and fiber cabinet installations",
        ],
        "Power & Electrical Systems": [
            "Generator installation (permanent and temporary/COW/COLT)",
            "ATS, load centers, switchgear, and transformer installs",
            "DC plant and battery backup system installation and retrofits",
            "Power meter setup and utility service connection",
            "Grounding, bonding, surge, and lightning protection",
            "Ground ring installation (NEC/NESC-compliant)",
            "Conduit stub-ups and cathodic protection systems",
            "Load testing and ATS failover commissioning",
        ],
        "Civil & Site Construction": [
            "Site development: grading, fencing, access roads, erosion control",
            "Concrete pads and plynth foundations for towers, shelters, and equipment",
            "Shelter installation: prefab concrete, steel, or hybrid",
            "Utility trenching and conduit installation",
            "Retaining wall, drainage, culvert, and swale construction",
            "Driveway and access road paving or gravel laydown",
            "Environmental restoration and landscaping",
        ],
        "Shelter & Enclosure Systems": [
            "Shelter Procurement and landing",
            "HVAC installation and climate control systems",
            "Alarm panel systems (fire, intrusion, smoke, humidity)",
            "Interior AC power wiring, lighting, and receptacle installation",
            "Rack installation and cable management",
            "Generator enclosure and canopy installations",
        ],
        "RF Path Assurance & Cabling": [
            "Coax sweep and line testing",
            "Hybrid fiber coax (HFC) layout and weatherproofing",
            "Custom assemblies, sealing, and PIM mitigation",
            "Fiber jumpers, patch cords, and cross-connect configuration",
        ],
        "Integration & Testing": [
            "RAN integration (eNodeB, gNodeB, OEM configuration)",
            "Fiber splicing, OTDR, and light loss testing",
            "RF performance testing: PIM, VSWR, and sweep",
            "Microwave alignment, tuning, and certification",
            "Full system commissioning and ATP closeout",
        ],
        "Documentation & Project Closeout": [
            "RFDS verification and compliance reporting",
            "Full sweep, PIM, OTDR, and commissioning reports",
            "Photo documentation and QA/QC checklist",
            "As-builts, redlines (PDF/CAD), and GIS updates",
            "Operations & Maintenance handoff (manuals, warranties, diagrams)",
        ],
    };

    return (
        <>
            <Helmet>
                <title>Wireless Construction Services | ATC GOLD CONSTRUCTION</title>
                <meta name="description" content="Comprehensive wireless construction services including site acquisition, tower work, RF installation, power systems, and more." />
            </Helmet>
            
            <div className="bg-primary">
                <div className="container mx-auto px-4 py-16 text-center text-primary-foreground">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        className="text-4xl md:text-5xl font-extrabold tracking-tight text-secondary uppercase"
                    >
                        Wireless Construction Services
                    </motion.h1>
                </div>
            </div>

            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="py-16 md:py-24">
                <div className="container mx-auto px-4">
                    {Object.entries(services).map(([title, items]) => (
                        <ServiceSection key={title} title={title} items={items} />
                    ))}
                </div>
            </motion.div>
        </>
    );
};

export default WirelessPage;