import React, { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Text3D,
  Float,
  Environment,
  MeshDistortMaterial,
  Stars,
} from "@react-three/drei";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowDown,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code,
  Smartphone,
  Server,
} from "lucide-react";
import {
  FloatingAndroid,
  FloatingCode,
  FloatingGeometry,
  ParticleField,
} from "@/components/3D/FloatingElements";
import {
  SpaceStation,
  FloatingVideoScreen,
  OrbitingPlanet,
  SpaceNebula,
  HolographicUI,
  AsteroidField,
} from "@/components/3D/SpaceElements";
import InteractiveCursor from "@/components/InteractiveCursor";
import SpaceBackground from "@/components/SpaceBackground";

const Scene3D = () => {
  return (
    <>
      {/* Enhanced Lighting for Space Theme */}
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#3DDC84" />
      <pointLight position={[-10, -10, -10]} intensity={0.8} color="#4285F4" />
      <pointLight position={[0, 5, 5]} intensity={1} color="#FF6B6B" />
      <pointLight position={[5, -5, -5]} intensity={0.6} color="#00ffff" />
      <directionalLight
        position={[20, 20, 20]}
        intensity={0.5}
        color="#ffffff"
        castShadow
      />

      {/* Space Nebula Background */}
      <SpaceNebula />

      {/* Main Android Character - Enhanced */}
      <FloatingAndroid position={[0, 0, 0]} />

      {/* Space Station */}
      <SpaceStation position={[8, 3, -5]} />

      {/* Floating Video Screens */}
      <FloatingVideoScreen
        position={[-6, 2, -3]}
        content="Android\nDeveloper"
      />
      <FloatingVideoScreen position={[6, -2, -4]} content="Mobile\nExpert" />
      <FloatingVideoScreen position={[-4, -3, 2]} content="Kotlin\nMaster" />

      {/* Orbiting Planets */}
      <OrbitingPlanet
        radius={12}
        speed={0.5}
        planetSize={0.8}
        color="#3DDC84"
        orbitOffset={0}
      />
      <OrbitingPlanet
        radius={15}
        speed={0.3}
        planetSize={0.6}
        color="#4285F4"
        orbitOffset={Math.PI}
      />
      <OrbitingPlanet
        radius={18}
        speed={0.2}
        planetSize={0.4}
        color="#FF6B6B"
        orbitOffset={Math.PI / 2}
      />
      <OrbitingPlanet
        radius={10}
        speed={0.8}
        planetSize={0.3}
        color="#00ffff"
        orbitOffset={Math.PI * 1.5}
      />

      {/* Holographic UI Elements */}
      <HolographicUI position={[4, 4, -2]} />
      <HolographicUI position={[-5, -2, 3]} />
      <HolographicUI position={[2, -4, -1]} />

      {/* Asteroid Field */}
      <AsteroidField />

      {/* Enhanced Code Elements */}
      <FloatingCode position={[-8, 4, -1]} />
      <FloatingCode position={[7, 1, -6]} />
      <FloatingCode position={[-3, -4, 4]} />
      <FloatingCode position={[5, 3, 2]} />

      {/* Floating Geometric Shapes - More distributed */}
      <FloatingGeometry position={[9, 5, -4]} shape="cube" />
      <FloatingGeometry position={[-7, 2, -8]} shape="sphere" />
      <FloatingGeometry position={[3, -5, 5]} shape="torus" />
      <FloatingGeometry position={[-6, 4, 6]} shape="cone" />
      <FloatingGeometry position={[8, -3, -7]} shape="cube" />
      <FloatingGeometry position={[-9, -1, 3]} shape="sphere" />

      {/* Original Particle Field */}
      <ParticleField />

      {/* Enhanced Stars Background */}
      <Stars
        radius={150}
        depth={80}
        count={8000}
        factor={6}
        saturation={0}
        fade
        speed={0.5}
      />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.2}
        maxPolarAngle={Math.PI / 1.8}
        minPolarAngle={Math.PI / 3}
      />
      <Environment preset="night" />
    </>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <motion.section
      id="home"
      style={{ y, opacity }}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background 3D Scene */}
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 2, 15], fov: 65 }}
          gl={{ antialias: true, alpha: true }}
          shadows
        >
          <Scene3D />
          <fog attach="fog" args={["#0a0a0a", 50, 200]} />
        </Canvas>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/80 to-background z-10" />

      {/* Hero Content */}
      <div className="relative z-20 text-center px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6"
        >
          <Badge
            variant="outline"
            className="mb-4 px-4 py-2 text-sm border-android-green text-android-green"
          >
            Android Developer
          </Badge>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
        >
          Building <span className="gradient-text">Android</span>
          <br />
          Experiences
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed"
        >
          Crafting innovative mobile applications with clean code, intuitive
          design, and cutting-edge technology
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button
            size="lg"
            className="bg-android-green hover:bg-android-green-dark text-white px-8 py-6 text-lg"
            asChild
          >
            <a
              href="https://drive.google.com/file/d/11X_U9GzzoYZeh2yvL_-Lpsw99z69APMc/view?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
            >
              View My Work
              <ExternalLink className="ml-2 h-5 w-5" />
            </a>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-android-green text-android-green hover:bg-android-green hover:text-white px-8 py-6 text-lg"
            asChild
          >
            <a
              href="mailto:HarTan9124@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Get In Touch
              <Mail className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <ArrowDown className="h-6 w-6 text-muted-foreground animate-bounce" />
        </motion.div>
      </div>
    </motion.section>
  );
};

const About = () => {
  const skills = [
    { name: "Kotlin", level: 95, icon: "📱" },
    { name: "Java", level: 90, icon: "☕" },
    { name: "Android SDK", level: 95, icon: "🤖" },
    { name: "XML", level: 88, icon: "🎨" },
    { name: "MVVM/MVP", level: 92, icon: "🏗️" },
    { name: "Room Database", level: 85, icon: "🗄️" },
    { name: "Retrofit", level: 90, icon: "🌐" },
    { name: "Firebase", level: 88, icon: "🔥" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  return (
    <SpaceBackground variant="nebula">
      <section id="about" className="py-20 px-6 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-5">
          <motion.div
            className="absolute top-20 left-10 w-32 h-32 bg-android-green rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-24 h-24 bg-android-blue rounded-full"
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [360, 180, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.h2
              className="text-4xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              About{" "}
              <motion.span
                className="gradient-text"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                Me
              </motion.span>
            </motion.h2>
            <motion.p
              className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              I’m a passionate Android Developer with expertise in Java, Kotlin, and Firebase, dedicated to building clean, responsive, and impactful mobile applications. With a strong focus on modern UI/UX design and real-time functionality, I craft user-centric solutions that are both scalable and intuitive. My work reflects a commitment to solving real-world problems through innovative mobile technology, ensuring seamless experiences across Android devices.
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.h3
                className="text-2xl font-bold mb-6"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Technical Skills
              </motion.h3>
              <motion.div
                className="space-y-4"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    className="space-y-2 group"
                    // variants={itemVariants}
                    // whileHover={{ scale: 1.02, x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <motion.span
                          className="text-lg"
                          animate={{ rotate: [0, 10, -10, 0] }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: index * 0.2,
                          }}
                        >
                          {skill.icon}
                        </motion.span>
                        <span className="font-medium group-hover:text-android-green transition-colors">
                          {skill.name}
                        </span>
                      </div>
                      <motion.span
                        className="text-muted-foreground font-mono"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 1 + index * 0.1 }}
                        viewport={{ once: true }}
                      >
                        {skill.level}%
                      </motion.span>
                    </div>
                    <div className="h-3 bg-secondary rounded-full overflow-hidden relative">
                      <motion.div
                        initial={{ width: 0, opacity: 0 }}
                        whileInView={{ width: `${skill.level}%`, opacity: 1 }}
                        transition={{
                          duration: 1.2,
                          delay: index * 0.15,
                          ease: "easeOut",
                        }}
                        viewport={{ once: true }}
                        className="h-full bg-gradient-to-r from-android-green to-android-blue relative"
                      >
                        <motion.div
                          className="absolute inset-0 bg-white/20"
                          animate={{ x: ["-100%", "100%"] }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: 2 + index * 0.2,
                            ease: "linear",
                          }}
                        />
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              {[
                {
                  icon: Code,
                  title: "Clean Code",
                  description:
                    "Writing maintainable, scalable code following SOLID principles and best practices.",
                  delay: 0.1,
                },
                {
                  icon: Smartphone,
                  title: "Modern UI/UX",
                  description:
                    "Creating intuitive interfaces with Jetpack Compose and Material Design.",
                  delay: 0.2,
                },
                {
                  icon: Server,
                  title: "Backend Integration",
                  description:
                    "Seamless API integration with Retrofit, Room, and modern networking libraries.",
                  delay: 0.3,
                },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30, rotateX: -15 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: item.delay,
                    type: "spring",
                    stiffness: 100,
                  }}
                  viewport={{ once: true }}
                  whileHover={{
                    scale: 1.02,
                    rotateY: 5,
                    transition: { duration: 0.2 },
                  }}
                  className="perspective-1000"
                >
                  <Card className="glass-effect android-glow group hover:bg-android-green/5 transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <motion.div
                          whileHover={{
                            rotate: 360,
                            scale: 1.2,
                          }}
                          transition={{ duration: 0.6 }}
                        >
                          <item.icon className="h-8 w-8 text-android-green mr-3 group-hover:text-android-green-dark transition-colors" />
                        </motion.div>
                        <motion.h4
                          className="text-xl font-bold group-hover:text-android-green transition-colors"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: item.delay + 0.2 }}
                          viewport={{ once: true }}
                        >
                          {item.title}
                        </motion.h4>
                      </div>
                      <motion.p
                        className="text-muted-foreground group-hover:text-foreground transition-colors"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: item.delay + 0.4 }}
                        viewport={{ once: true }}
                      >
                        {item.description}
                      </motion.p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </SpaceBackground>
  );
};

const Projects = () => {
  const projects = [
    {
      title: "Suraksha",
      description:
        "Suraksha is a women's safety application that enables instant emergency alerts and location sharing via WhatsApp, with community support and wearable integration.",
      image: "/suraksha.jpeg",
      tech: ["Kotlin", "XML", "Android", "Firebase"],
      github: "https://github.com/HArTan9124/Suraksha",
      demo: "#",
      color: "from-green-500/20 to-emerald-500/20",
    },
    {
      title: "Ravya ",
      description:
        "Ravya is an AI-powered assistant that enables real-time screen sharing, multilingual voice communication, and intelligent camera assessment for seamless interaction and support.",
      image: "/Screenshot from 2025-07-19 12-00-04.png",
      tech: ["Kotlin", "Python", "Livekit", "Web3"],
      github: "https://github.com/HArTan9124/Ravya",
      demo: "#",
      color: "from-orange-500/20 to-red-500/20",
    },
    {
      title: "Suraksha WearOS",
      description:
        "Suraksha WearOS is a smartwatch companion app that allows women to quickly send emergency alerts and share their live location with trusted contacts directly from their wrist.",
      image: "/suraksha.jpeg",
      tech: ["Kotlin", "XML", "Firebase", "Java"],
      github: "https://github.com/HArTan9124/SurakshaWearOS",
      demo: "#",
      color: "from-purple-500/20 to-pink-500/20",
    },
    
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, rotateX: -15 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <SpaceBackground variant="galaxy">
      <section
        id="projects"
        className="py-20 px-6 bg-secondary/30 relative overflow-hidden"
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-5">
          <motion.div
            className="absolute top-40 left-20 w-40 h-40 bg-android-green rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              rotate: [0, 360],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          <motion.div
            className="absolute bottom-40 right-20 w-32 h-32 bg-android-blue rounded-full"
            animate={{
              scale: [1.5, 1, 1.5],
              rotate: [360, 0],
              opacity: [0.3, 0.1, 0.3],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.h2
              className="text-4xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Featured{" "}
              <motion.span
                className="gradient-text"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                Projects
              </motion.span>
            </motion.h2>
            <motion.p
              className="text-xl text-muted-foreground max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              Showcasing my latest Android applications built with modern
              technologies and best practices
            </motion.p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                variants={cardVariants}
                whileHover={{
                  scale: 1.05,
                  rotateY: 5,
                  transition: { duration: 0.3 },
                }}
                className="perspective-1000"
              >
                <Card className="glass-effect hover:android-glow transition-all duration-300 group overflow-hidden">
                  <CardContent className="p-0">
                    <div
                      className={`aspect-video bg-gradient-to-br ${project.color} relative overflow-hidden`}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-tr from-android-green/10 to-android-blue/10"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                      <motion.img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.4 }}
                      />
                      <motion.div
                        className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        initial={{ scale: 0 }}
                        whileHover={{ scale: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.div
                          className="text-white text-sm font-medium"
                          initial={{ y: 20, opacity: 0 }}
                          whileHover={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.1 }}
                        >
                          View Details
                        </motion.div>
                      </motion.div>
                    </div>
                    <div className="p-6">
                      <motion.h3
                        className="text-xl font-bold mb-2 group-hover:text-android-green transition-colors"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        viewport={{ once: true }}
                      >
                        {project.title}
                      </motion.h3>
                      <motion.p
                        className="text-muted-foreground mb-4"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        viewport={{ once: true }}
                      >
                        {project.description}
                      </motion.p>
                      <motion.div
                        className="flex flex-wrap gap-2 mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        viewport={{ once: true }}
                      >
                        {project.tech.map((tech, techIndex) => (
                          <motion.div
                            key={tech}
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            transition={{ delay: 0.4 + techIndex * 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{ scale: 1.1 }}
                          >
                            <Badge
                              variant="outline"
                              className="text-xs hover:bg-android-green hover:text-white hover:border-android-green transition-all"
                            >
                              {tech}
                            </Badge>
                          </motion.div>
                        ))}
                      </motion.div>
                      <motion.div
                        className="flex gap-2"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        viewport={{ once: true }}
                      >
                        <motion.div
                          className="flex-1"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Button
                            size="sm"
                            variant="outline"
                            className="w-full group/btn"
                            asChild
                          >
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <motion.div
                                animate={{ rotate: [0, 360] }}
                                transition={{
                                  duration: 2,
                                  repeat: Infinity,
                                  ease: "linear"
                                }}
                                className="group-hover/btn:animate-spin"
                              >
                                <Github className="h-4 w-4 mr-2" />
                              </motion.div>
                              Code
                            </a>
                          </Button>
                        </motion.div>
                        <motion.div
                          className="flex-1"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Button
                            size="sm"
                            className="w-full bg-android-green hover:bg-android-green-dark group/btn"
                            onClick={() => window.alert('For a demo, please contact me at 8528909000.')}
                          >
                            <motion.div
                              whileHover={{ x: 2 }}
                              transition={{ duration: 0.2 }}
                            >
                              <ExternalLink className="h-4 w-4 mr-2" />
                            </motion.div>
                            Demo
                          </Button>
                        </motion.div>
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </SpaceBackground>
  );
};

const Contact = () => {
  const contactButtons = [
    {
      icon: Mail,
      label: "Send Email",
      href: "mailto:HarTan9124@gmail.com",
      primary: true,
      hoverColor: "hover:shadow-android-green",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://linkedin.com/in/hartan9124/",
      primary: false,
      hoverColor: "hover:shadow-blue-500",
    },
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com/HArTan9124",
      primary: false,
      hoverColor: "hover:shadow-gray-500",
    },
  ];

  return (
    <SpaceBackground variant="stars">
      <section id="contact" className="py-20 px-6 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-5">
          <motion.div
            className="absolute top-10 left-10 w-64 h-64 bg-android-green rounded-full"
            animate={{
              scale: [1, 1.3, 1],
              rotate: [0, 180, 360],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          <motion.div
            className="absolute bottom-10 right-10 w-48 h-48 bg-android-blue rounded-full"
            animate={{
              scale: [1.3, 1, 1.3],
              rotate: [360, 180, 0],
              opacity: [0.2, 0.1, 0.2],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-r from-android-green to-android-blue rounded-full"
            style={{ transform: "translate(-50%, -50%)" }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.05, 0.1, 0.05],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.h2
              className="text-4xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Let's{" "}
              <motion.span
                className="gradient-text"
                initial={{ opacity: 0, rotateY: -90 }}
                whileInView={{ opacity: 1, rotateY: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                Connect
              </motion.span>
            </motion.h2>

            <motion.p
              className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              Ready to bring your Android app idea to life? Let's collaborate
              and create something amazing together.
            </motion.p>

            {/* Floating icons animation */}
            <motion.div
              className="flex justify-center items-center gap-8 mb-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              viewport={{ once: true }}
            >
              {[Code, Smartphone, Server].map((Icon, index) => (
                <motion.div
                  key={index}
                  className="p-4 rounded-full bg-android-green/10 border border-android-green/20"
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: index * 0.5,
                    ease: "easeInOut",
                  }}
                  whileHover={{ scale: 1.2, rotate: 360 }}
                >
                  <Icon className="h-6 w-6 text-android-green" />
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
            >
              {contactButtons.map((button, index) => (
                <motion.div
                  key={button.label}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 10,
                    delay: 0.8 + index * 0.2,
                  }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="lg"
                    className={`px-8 py-6 text-lg group relative overflow-hidden ${button.primary
                        ? "bg-android-green hover:bg-android-green-dark text-white"
                        : "border-android-green text-android-green hover:bg-android-green hover:text-white"
                      }`}
                    variant={button.primary ? "default" : "outline"}
                    asChild
                  >
                    <a
                      href={button.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {/* Ripple effect */}
                      <motion.div
                        className="absolute inset-0 bg-white/20 rounded-full scale-0"
                        whileHover={{ scale: 4 }}
                        transition={{ duration: 0.6 }}
                      />

                      <motion.div
                        className="flex items-center relative z-10"
                        whileHover={{ x: button.primary ? 0 : 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <motion.div
                          animate={{
                            rotate: button.primary ? [0, 360] : 0,
                          }}
                          transition={{
                            duration: 2,
                            repeat: button.primary ? Infinity : 0,
                            ease: "linear",
                          }}
                        >
                          <button.icon className="mr-2 h-5 w-5" />
                        </motion.div>
                        {button.label}
                      </motion.div>
                    </a>
                  </Button>
                </motion.div>
              ))}
            </motion.div>

            {/* Animated availability indicator */}
            <motion.div
              className="flex items-center justify-center gap-3 text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="w-3 h-3 bg-android-green rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [1, 0.7, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.4 }}
                viewport={{ once: true }}
              >
                Available for new projects
              </motion.span>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </SpaceBackground>
  );
};

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <InteractiveCursor />
      <Hero />
      <About />
      <Projects />
      <Contact />
    </div>
  );
};

export default Index;
