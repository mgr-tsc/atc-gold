import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ArrowDown, Rocket, Club as Partnership, BarChart } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { x: -50, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 50 },
  },
};

const timelinePhases = [
  {
    phase: "Phase 1 - Strengthen The Core (Now)",
    icon: <Rocket className="w-8 h-8 text-primary" />,
    items: [
      "Deliver excellence in Wireless, EV, and Professional Services",
      "Secure recurring revenues through self-performed design-build",
      "De-risk CAPEX via debentures, project finance, and private placements",
    ],
  },
  {
    phase: "Phase 2 - Strategic Partnerships (Near Term)",
    icon: <Partnership className="w-8 h-8 text-primary" />,
    items: [
      "Form JVs and LOIs with hyperscalers, utilities, and municipalities",
      "Use subscription capital and SAFEs to fund frontier projects",
      "Gain early exposure to: AI edge data centers, Quantum-ready networks, Space ground stations",
    ],
  },
  {
    phase: "Phase 3 - Platform & Exponential Growth (Future)",
    icon: <BarChart className="w-8 h-8 text-primary" />,
    items: [
      "Transition from contractor to systems integrator and IP-driven platform",
      "Capture upside via: Equity stakes, Managed services, IP/software integration",
      "Position for public markets or strategic exit through scalable, non-linear growth",
    ],
  },
];

const AboutPage = () => {
  return (
    <>
      <Helmet>
        <title>About / Vision | ATC GOLD CONSTRUCTION</title>
        <meta name="description" content="Our vision for the future, moving from a builder to a platform for exponential growth at the intersection of telecom and emerging infrastructure." />
      </Helmet>
      
      <div className="bg-primary">
        <div className="container mx-auto px-4 py-16 text-center text-primary-foreground">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-5xl font-extrabold tracking-tight text-secondary uppercase"
          >
            The Road Ahead
          </motion.h1>
        </div>
      </div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
            <motion.div variants={itemVariants}>
              <h2 className="text-3xl font-bold text-primary mb-4">Constraints Today</h2>
              <p className="text-lg text-gray-700">
                Construction and telecom are essential but capital-intensive and scale linearly. This traditional model cannot unlock exponential growth on its own.
              </p>
            </motion.div>
            <motion.div variants={itemVariants}>
              <h2 className="text-3xl font-bold text-primary mb-4">Opportunity Tomorrow</h2>
              <p className="text-lg text-gray-700 mb-4">
                ATC GOLD CONSTRUCTION is positioned at the intersection of telecom and emerging infrastructure — the backbone for the next wave of global revolutions in:
              </p>
              <ul className="list-disc list-inside space-y-2 text-lg text-gray-700">
                <li><span className="font-semibold">AI:</span> Edge compute, low-latency data transport</li>
                <li><span className="font-semibold">Quantum:</span> Secure networks, precision infrastructure</li>
                <li><span className="font-semibold">Space:</span> Ground stations, communication nodes, energy systems</li>
                <li><span className="font-semibold">Biotech:</span> High-density, high-reliability power and connectivity environments</li>
              </ul>
            </motion.div>
          </div>

          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Our Roadmap: From Builder to Platform</h2>
            <ArrowDown className="w-12 h-12 text-secondary mx-auto animate-bounce" />
          </motion.div>
          
          <div className="relative">
             <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gray-200 -translate-x-1/2 hidden md:block"></div>
              <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-16">
                {timelinePhases.map((phase, index) => (
                   <motion.div key={index} variants={itemVariants} className="md:grid md:grid-cols-2 md:gap-8 items-start relative">
                      <div className={`md:flex items-center gap-4 ${index % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}>
                          <div className="hidden md:flex bg-secondary p-4 rounded-full items-center justify-center">
                              {phase.icon}
                          </div>
                          <h3 className="text-2xl font-bold text-primary mb-4 md:mb-0">{phase.phase}</h3>
                      </div>
                      <div className={`p-6 bg-gray-50 rounded-lg shadow-md border-l-4 border-secondary ${index % 2 === 0 ? 'md:order-2' : 'md:order-1'}`}>
                          <ul className="space-y-2 text-gray-700">
                              {phase.items.map((item, i) => (
                                  <li key={i} className="flex items-start">
                                      <Rocket className="w-4 h-4 text-secondary mt-1 mr-2 flex-shrink-0" />
                                      {item}
                                  </li>
                              ))}
                          </ul>
                      </div>
                  </motion.div>
                ))}
              </motion.div>
          </div>

        </div>
      </motion.div>
    </>
  );
};

export default AboutPage;