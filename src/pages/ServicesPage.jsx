import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Zap, Building, Lightbulb, ChevronsRight, Network, Radio, Server } from 'lucide-react';
import { Card } from '@/components/ui/card';

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

const serviceCategories = [
    {
        icon: <Radio className="w-10 h-10" />,
        title: 'Wireless, In Building & Edge Networks',
        description: 'Macro towers, small cells, Private LTE/5G, DAS, Wi-Fi, and mobile edge computing for dense venues, public safety, and resilient coverage.',
    },
    {
        icon: <Server className="w-10 h-10" />,
        title: 'Datacenters & Advanced Compute',
        description: 'Hyperscale and micro edge facilities supporting AI, HPC, and quantum workloads with emphasis on power, cooling, and uptime.',
    },
    {
        icon: <Network className="w-10 h-10" />,
        title: 'Fiber & Connectivity',
        description: 'OSP Construction, Micro trenching, Middle-mile, FTIX, FTTP, FTTH, FTTN and smart city backbones—aerial and underground deployments delivering scalable, future-proof networks.',
    },
    {
        icon: <Zap className="w-10 h-10" />,
        title: 'Smart Mobility & Energy',
        description: 'End-to-end EV infrastructure including vehicle-to-grid integration, utility interconnection, and fleet charging—navigating complex permitting and federal programs.',
    },
    {
        icon: <Building className="w-10 h-10" />,
        title: 'Venues & Digital Systems',
        description: 'Integrated technology ecosystems for sports and entertainment campuses—broadcast, connectivity, security, converged networks, structured cabling, low-voltage cabling, and experimental technology.',
    }
];

const valueProps = [
    { icon: <Lightbulb className="w-8 h-8 text-primary" />, title: "Innovation", description: "Transforming challenges into solutions" },
    { icon: <Zap className="w-8 h-8 text-primary" />, title: "Competitiveness", description: "Driving cost and speed advantages" },
    { icon: <Network className="w-8 h-8 text-primary" />, title: "Efficiency", description: "Optimizing execution at every level" },
    { icon: <ChevronsRight className="w-8 h-8 text-primary" />, title: "Flexibility", description: "Scaling seamlessly with your needs" },
];

const ServicesPage = () => {
  return (
    <>
      <Helmet>
        <title>Service Portfolio | ATC GOLD CONSTRUCTION</title>
        <meta name="description" content="Unlocking Opportunities Across Our Portfolio. Delivering Outcomes for Lasting Success" />
      </Helmet>
      
      <div className="bg-primary">
        <div className="container mx-auto px-4 py-16 text-center text-primary-foreground">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-5xl font-extrabold tracking-tight text-secondary uppercase"
          >
            SERVICE PORTFOLIO
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-4 text-2xl md:text-3xl font-light"
          >
            UNLOCK. ACCELERATE. ACHIEVE.
          </motion.p>
        </div>
      </div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
            <motion.div variants={itemVariants} className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-2xl font-bold text-primary mb-4">Unlocking Opportunities Across Our Portfolio. Delivering Outcomes for Lasting Success</h2>
                <p className="text-lg text-gray-600">
                    ATC GOLD CONSTRUCTION is your premium partner — bringing value, quality, and certainty while de-risking your programs and amplifying your workforce to achieve sustainable growth.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
                {valueProps.map((prop, index) => (
                    <motion.div key={index} variants={itemVariants} className="text-center p-6 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex justify-center items-center mb-4">{prop.icon}</div>
                        <h3 className="text-xl font-semibold text-primary mb-2">{prop.title}</h3>
                        <p className="text-gray-600">{prop.description}</p>
                    </motion.div>
                ))}
            </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
            {serviceCategories.map((category, index) => (
              <motion.div 
                key={index} 
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={index === 3 ? "lg:col-start-1 lg:col-end-2 lg:translate-x-1/2" : index === 4 ? "lg:col-start-2 lg:col-end-3 lg:translate-x-1/2" : ""}
              >
                <Card className="relative h-full overflow-hidden group hover:shadow-2xl hover:bg-gray-100 transition-all duration-300 border-gray-200 cursor-pointer flex flex-col items-center text-center p-8">
                  
                  {/* Circular Icon Background */}
                  <div className="w-24 h-24 rounded-full bg-gray-100 text-primary group-hover:bg-secondary group-hover:text-primary flex items-center justify-center transition-colors duration-300 shadow-md">
                    {category.icon}
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-primary mt-6">{category.title}</h3>

                  {/* Expandable Description */}
                  <div className="max-h-0 group-hover:max-h-96 overflow-hidden transition-all duration-300 ease-in-out">
                    <p className="text-base text-gray-600 leading-relaxed pt-4">
                      {category.description}
                    </p>
                  </div>
                  
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default ServicesPage;