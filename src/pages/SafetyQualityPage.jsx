import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ShieldCheck, HardHat, Award, Briefcase, CheckCircle, HeartHandshake } from 'lucide-react';
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

const commitments = [
  {
    icon: <HardHat className="h-10 w-10 text-secondary" />,
    title: "On-Site Leadership",
    text: "Dedicated Safety Manager & Superintendent On-Site — ensuring QA oversight and driving schedule deliverables.",
  },
  {
    icon: <ShieldCheck className="h-10 w-10 text-secondary" />,
    title: "Industry-Leading Protocols",
    text: "Strict compliance and accountability with our industry-leading safety protocols.",
  },
  {
    icon: <Award className="h-10 w-10 text-secondary" />,
    title: "Certified Crews",
    text: "Certified Crews On-Site delivering work to the highest standards.",
  },
  {
    icon: <Briefcase className="h-10 w-10 text-secondary" />,
    title: "Proactive Hazard Analysis",
    text: "Pre-Mobilization Hazard Analysis conducted on every project.",
  },
  {
    icon: <CheckCircle className="h-10 w-10 text-secondary" />,
    title: "Full Transparency",
    text: "Progress Photos & Reporting for full transparency and client confidence.",
  },
  {
    icon: <HeartHandshake className="h-10 w-10 text-secondary" />,
    title: "Zero-Compromise Culture",
    text: "Safety, quality, and performance are at the core of every build.",
  },
];

const SafetyQualityPage = () => {
  return (
    <>
      <Helmet>
        <title>Safety & Quality | ATC GOLD CONSTRUCTION</title>
        <meta name="description" content="Our zero-compromise commitment to safety and quality, with on-site leadership, certified crews, and industry-leading protocols." />
      </Helmet>
      
      <div className="relative bg-primary text-primary-foreground">
        <img className="absolute inset-0 w-full h-full object-cover opacity-20" alt="Construction worker with safety gear" src="https://images.unsplash.com/photo-1685631188070-e5d4c9b2df6d" />
        <div className="relative container mx-auto px-4 py-24 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-5xl font-extrabold tracking-tight text-secondary uppercase"
          >
            Safety & Quality Commitment
          </motion.h1>
           <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-4 text-xl md:text-2xl font-light max-w-3xl mx-auto"
          >
            A zero-compromise culture where safety, quality, and performance are at the core of every build.
          </motion.p>
        </div>
      </div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {commitments.map((commitment, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="h-full text-center hover:shadow-xl transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex justify-center mb-4">{commitment.icon}</div>
                    <CardTitle className="text-xl font-bold text-primary">{commitment.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{commitment.text}</p>
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

export default SafetyQualityPage;