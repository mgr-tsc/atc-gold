import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import LeadCapturePopup from '@/components/LeadCapturePopup';
import { CheckCircle, Zap, ShieldCheck, TrendingUp, Users, Award, Briefcase, HardHat, Rss, Settings, Building, Cloud, Rocket, Hand, HeartHandshake, Wifi, Server, Cable, Truck, MonitorCheck, Network } from 'lucide-react';

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
    },
  },
};

const HomePage = () => {
    const [hoveredCardId, setHoveredCardId] = useState(null);

    const whoWeArePoints = [
        { icon: <Rss className="h-8 w-8 text-secondary" />, text: "Delivers infrastructure solutions for utilities, pipelines, energy, and communications" },
        { icon: <Settings className="h-8 w-8 text-secondary" />, text: "Designs, builds, installs, repairs, and maintains critical infrastructure assets" },
        { icon: <Cloud className="h-8 w-8 text-secondary" />, text: "Operates across North America, supporting diverse clients and markets" },
        { icon: <Rocket className="h-8 w-8 text-secondary" />, text: "Provides rapid-response capabilities during natural disasters and emergencies" },
    ];

    const missionCards = [
        { 
            id: 1, 
            icon: <Wifi className="h-10 w-10" />, 
            title: "WIRELESS, IN BUILDING & EDGE NETWORKS", 
            desc: "Macro towers, small cells, Private LTE/5G, DAS, Wi-Fi, and mobile edge computing for dense venues, public safety, and resilient coverage." 
        },
        { 
            id: 2, 
            icon: <Server className="h-10 w-10" />, 
            title: "DATACENTERS & ADVANCED COMPUTE", 
            desc: "Hyperscale and micro edge facilities supporting AI, HPC, and quantum workloads with emphasis on power, cooling, and uptime." 
        },
        { 
            id: 3, 
            icon: <Cable className="h-10 w-10" />, 
            title: "FIBER & CONNECTIVITY", 
            desc: "OSP Construction, Micro trenching, Middle-mile, FTIX, FTTP, FTTH, FTTN and smart city backbones—aerial and underground deployments delivering scalable, future-proof networks." 
        },
        { 
            id: 4, 
            icon: <Truck className="h-10 w-10" />, 
            title: "SMART MOBILITY & ENERGY", 
            desc: "End-to-end EV infrastructure including vehicle-to-grid integration, utility interconnection, and fleet charging—navigating complex permitting and federal programs." 
        },
        { 
            id: 5, 
            icon: <MonitorCheck className="h-10 w-10" />, 
            title: "VENUES & DIGITAL SYSTEMS", 
            desc: "Integrated technology ecosystems for sports and entertainment campuses—broadcast, connectivity, security, converged networks, structured cabling, low-voltage cabling, and experimental technology." 
        },
    ];

    const showcaseCards = [
        { caption: "20+ Years at the Forefront of Wireless, Wireline & Engineering", image: "https://images.unsplash.com/photo-1471896486552-5dc315aa7ea3" },
        { caption: "Civil, Structural & Electrical Mastery — All Under One Roof", image: "https://images.unsplash.com/photo-1541888988410-490fd3e0171f" },
        { caption: "$2B+ in Career Large-Scale Infrastructure Projects", image: "https://images.unsplash.com/photo-1683537680852-4976138c8e79" },
        { caption: "Renowned Turnaround Leader — Driving Growth, Innovation & Value", image: "https://images.unsplash.com/photo-1693289083299-17d9dcf5af1c" },
        { caption: "Flagship Stadiums — Full Technology Buildouts", image: "https://images.unsplash.com/photo-1571135975368-7e3133a7e1b1" }
    ];
    
    const safetyCommitments = [
        { icon: <HardHat className="h-8 w-8 text-secondary" />, text: "Dedicated Safety Manager & Superintendent On-Site — ensuring QA oversight and driving schedule deliverables" },
        { icon: <ShieldCheck className="h-8 w-8 text-secondary" />, text: "Industry-Leading Safety Protocols with strict compliance and accountability" },
        { icon: <Award className="h-8 w-8 text-secondary" />, text: "Certified Crews On-Site delivering work to the highest standards" },
        { icon: <Briefcase className="h-8 w-8 text-secondary" />, text: "Pre-Mobilization Hazard Analysis conducted on every project" },
        { icon: <CheckCircle className="h-8 w-8 text-secondary" />, text: "Progress Photos & Reporting for full transparency and client confidence" },
        { icon: <HeartHandshake className="h-8 w-8 text-secondary" />, text: "Zero-Compromise Culture: safety, quality, and performance at the core of every build" },
    ];

    const whyAtcGoldPoints = [
        { title: "One Partner. End-to-End Delivery.", text: "From design to turn-up." },
        { title: "Proven Performance.", text: "$3B+ in infrastructure deployments." },
        { title: "Trusted by Industry Leaders.", text: "Carriers, ISPs, utilities, and developers." },
        { title: "Safety & Quality First.", text: "Zero-compromise culture." },
        { title: "National Reach, Local Execution.", text: "Operating across North America." },
        { title: "Agile + Responsive.", text: "Rapid mobilization, disaster response, and schedule acceleration." },
    ];

  return (
    <>
      <LeadCapturePopup />
      <Helmet>
        <title>ATC GOLD CONSTRUCTION | Home</title>
        <meta name="description" content="WE BUILD THE BACKBONE OF TOMORROW'S NETWORKS. Powering the nation's growth in broadband, energy, and mobility." />
      </Helmet>

      <div>
        {/* Hero Section */}
        <section className="relative h-[60vh] md:h-[80vh] flex items-center justify-center text-center text-white">
          <div className="absolute inset-0 bg-black/60 z-10"></div>
          <img className="absolute inset-0 w-full h-full object-cover" alt="Telecommunications towers at sunset" src="https://images.unsplash.com/photo-1554649756-cb725322c64b" />
          <div className="relative z-20 container px-4">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-6xl font-extrabold tracking-tight uppercase text-white"
            >
              WE BUILD THE BACKBONE OF TOMORROW'S NETWORKS
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-4 text-lg md:text-2xl max-w-3xl mx-auto text-white/90"
            >
              Powering the nation's growth in broadband, energy, and mobility
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button asChild size="lg" className="bg-secondary text-primary font-bold hover:bg-secondary/90 text-lg">
                <Link to="/contact">Get Started</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-secondary text-secondary font-bold hover:bg-secondary hover:text-primary text-lg bg-transparent">
                <Link to="/services">View Our Services</Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Who We Are */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
          className="py-16 md:py-24 bg-gray-50"
        >
          <div className="container px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12">WHO WE ARE</h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div variants={itemVariants} className="max-w-xl">
                <p className="text-lg text-gray-700 leading-relaxed">
                  ATC GOLD CONSTRUCTION is a licensed Plumbing & General Contractor, Professional Engineer, and Systems Integrator, providing turnkey design-build solutions across wireless, wireline, hyperscale, and emerging technologies. Our comprehensive, self-performed services span engineering, design, permitting, construction, I&C, testing, and turn-up, ensuring on-time, on-spec, and performance-ready project delivery.
                </p>
              </motion.div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {whoWeArePoints.map((point, index) => (
                  <motion.div key={index} variants={itemVariants} className="flex items-start gap-4">
                    {point.icon}
                    <p className="text-gray-600">{point.text}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Mission & Focus - Interactive Cards */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
          className="py-16 md:py-24 bg-white"
        >
            <div className="container px-4 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">OUR MISSION & FOCUS</h2>
                <p className="max-w-4xl mx-auto text-lg text-gray-700 mb-12">
                    We deliver mission-critical infrastructure that's safe, fast, and built to last—trusted by the nation's top carriers, ISPs, utilities, power companies, hyperscalers, OEMs, CPOs, EV manufacturers, developers, and construction companies.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 items-start">
                    {missionCards.map((card) => (
                        <motion.div 
                            key={card.id} 
                            variants={itemVariants} 
                            onMouseEnter={() => setHoveredCardId(card.id)}
                            onMouseLeave={() => setHoveredCardId(null)}
                            onTouchStart={() => setHoveredCardId(card.id)}
                            className={`relative rounded-xl shadow-lg border border-gray-100 hover:shadow-2xl transition-colors duration-300 p-6 flex flex-col items-center cursor-pointer ${
                                hoveredCardId === card.id ? 'bg-gray-100' : 'bg-white'
                            }`}
                        >
                            <div className={`transition-all duration-300 ease-in-out rounded-full flex items-center justify-center shrink-0 ${
                                hoveredCardId === card.id 
                                    ? 'h-24 w-24 bg-secondary text-primary scale-110 shadow-md mb-6' 
                                    : 'h-20 w-20 bg-gray-50 text-primary mb-4'
                            }`}>
                                {card.icon}
                            </div>
                            <h3 className={`font-bold text-primary text-center transition-all duration-300 ${
                                hoveredCardId === card.id ? 'mb-2 text-lg' : 'text-base'
                            }`}>
                                {card.title}
                            </h3>
                            
                            <AnimatePresence>
                                {hoveredCardId === card.id && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="overflow-hidden w-full"
                                    >
                                        <p className="text-sm text-gray-600 leading-relaxed text-center mt-2 pb-2">
                                            {card.desc}
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.section>

        {/* The Challenge We Solve */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
          className="py-16 md:py-24 bg-primary text-primary-foreground"
        >
            <div className="container px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-secondary mb-12">THE CHALLENGE WE SOLVE</h2>
                <div className="grid md:grid-cols-2 gap-8 md:gap-16">
                    <motion.div variants={itemVariants}>
                        <h3 className="text-2xl font-bold mb-6 border-b-2 border-secondary pb-2">THE OLD WAY</h3>
                        <ul className="space-y-4 text-lg">
                            <li className="flex items-start gap-3"><Users className="h-6 w-6 text-secondary mt-1 flex-shrink-0" /> <span>Multiple vendors (hundreds + in some cases)</span></li>
                            <li className="flex items-start gap-3"><Hand className="h-6 w-6 text-secondary mt-1 flex-shrink-0" /> <span>Unclear accountability → finger-pointing</span></li>
                            <li className="flex items-start gap-3"><TrendingUp className="h-6 w-6 text-secondary mt-1 flex-shrink-0 rotate-180" /> <span>Costly change orders & overruns</span></li>
                            <li className="flex items-start gap-3"><Hand className="h-6 w-6 text-secondary mt-1 flex-shrink-0" /> <span>Slow response times & delayed closeouts</span></li>
                            <li className="flex items-start gap-3"><TrendingUp className="h-6 w-6 text-secondary mt-1 flex-shrink-0 rotate-180" /> <span>Higher project management costs</span></li>
                        </ul>
                    </motion.div>
                     <motion.div variants={itemVariants}>
                        <h3 className="text-2xl font-bold mb-6 border-b-2 border-secondary pb-2">THE ATC GOLD CONSTRUCTION WAY</h3>
                        <ul className="space-y-4 text-lg">
                            <li className="flex items-start gap-3"><HeartHandshake className="h-6 w-6 text-secondary mt-1 flex-shrink-0" /> <span>One turnkey strategic partner from design → test-turnup</span></li>
                            <li className="flex items-start gap-3"><CheckCircle className="h-6 w-6 text-secondary mt-1 flex-shrink-0" /> <span>Reduced cycle time with integrated execution</span></li>
                            <li className="flex items-start gap-3"><ShieldCheck className="h-6 w-6 text-secondary mt-1 flex-shrink-0" /> <span>Trust built through consistency & reliability</span></li>
                            <li className="flex items-start gap-3"><TrendingUp className="h-6 w-6 text-secondary mt-1 flex-shrink-0" /> <span>Increased work volume capacity</span></li>
                            <li className="flex items-start gap-3"><Zap className="h-6 w-6 text-secondary mt-1 flex-shrink-0" /> <span>Volume-based pricing efficiencies</span></li>
                        </ul>
                    </motion.div>
                </div>
            </div>
        </motion.section>

        {/* The Differentiator */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
          className="py-16 md:py-24"
        >
            <div className="container px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12">THE DIFFERENTIATOR</h2>
                
                <motion.div variants={itemVariants} className="w-full bg-primary rounded-2xl md:rounded-3xl overflow-hidden shadow-xl px-4 py-6 md:px-6 md:py-8 lg:px-8">
                    <div className="flex flex-col md:flex-row h-auto md:h-72 w-full gap-3 md:gap-4">
                        {showcaseCards.map((card, index) => (
                            <div key={index} className="flex-1 flex flex-col h-64 md:h-full group overflow-hidden rounded-lg">
                                <div className="h-[65%] w-full overflow-hidden relative bg-slate-900">
                                    <img 
                                        src={card.image} 
                                        alt={card.caption} 
                                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" 
                                    />
                                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
                                </div>
                                <div className="h-[35%] w-full bg-primary/80 p-3 md:px-4 md:py-3 flex items-start justify-start border-t border-primary-foreground/10">
                                    <p className="text-primary-foreground text-xs sm:text-sm leading-snug font-medium text-left">
                                        {card.caption}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </motion.section>
        
        {/* Safety & Quality */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
          className="py-16 md:py-24 bg-gray-50"
        >
          <div className="container px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12">SAFETY & QUALITY COMMITMENT</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {safetyCommitments.map((item, index) => (
                <motion.div key={index} variants={itemVariants} className="flex items-start gap-4 p-6 bg-white rounded-lg shadow-md">
                  {item.icon}
                  <p className="text-gray-600">{item.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Why ATC Gold */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
          className="py-16 md:py-24"
        >
            <div className="container px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12">WHY ATC GOLD CONSTRUCTION?</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {whyAtcGoldPoints.map((point, index) => (
                        <motion.div key={index} variants={itemVariants}>
                            <Card className="h-full hover:shadow-xl transition-shadow duration-300">
                                <CardHeader>
                                    <CardTitle className="text-primary">{point.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-600">{point.text}</p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.section>

        {/* Contact CTA */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
          className="py-16 md:py-24 bg-primary text-primary-foreground"
        >
            <div className="container px-4 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">LET'S BUILD TOGETHER</h2>
                <p className="text-lg mb-8">Partner with ATC GOLD CONSTRUCTION to deliver projects that are:</p>
                <motion.div variants={itemVariants} className="grid sm:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
                    <div className="text-center">
                        <CheckCircle className="h-10 w-10 mx-auto text-secondary mb-2" />
                        <p className="font-bold text-xl">Safe by Design</p>
                        <p className="text-primary-foreground/80">Uncompromising safety protocols on every site</p>
                    </div>
                    <div className="text-center">
                        <Zap className="h-10 w-10 mx-auto text-secondary mb-2" />
                        <p className="font-bold text-xl">Fast to Market</p>
                        <p className="text-primary-foreground/80">Accelerated schedules, zero delays</p>
                    </div>
                    <div className="text-center">
                        <ShieldCheck className="h-10 w-10 mx-auto text-secondary mb-2" />
                        <p className="font-bold text-xl">Built to Last</p>
                        <p className="text-primary-foreground/80">Infrastructure engineered for performance and longevity</p>
                    </div>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <Button asChild size="lg" className="bg-secondary text-primary font-bold hover:bg-secondary/90 text-lg">
                      <Link to="/contact">Contact Us Now</Link>
                  </Button>
                </motion.div>
            </div>
        </motion.section>

      </div>
    </>
  );
};

export default HomePage;
