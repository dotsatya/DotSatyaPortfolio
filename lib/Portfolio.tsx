import Image1 from "@/public/projectImages/sunMoon.png";
import Image2 from "@/public/projectImages/dotMusic.png";
import Image3 from "@/public/projectImages/ecomarse.png";
import Image4 from "@/public/projectImages/portfolio.png";
import Image5 from "@/public/projectImages/weather.png";
import Image6 from "@/public/projectImages/cryptoChecker.png";
import Image7 from "@/public/projectImages/dotNotes.png";
import Image8 from "@/public/projectImages/ems.png";

import photo1 from "@/public/photoImages/image1.png";
import photo2 from "@/public/photoImages/image2.png";
import photo3 from "@/public/photoImages/image3.png";
import photo4 from "@/public/photoImages/image4.png";
import photo5 from "@/public/photoImages/image5.png";

export const Portfolio = {
  fullName: "Satya Sundar Dey",
  userName: "dotsatya",
  title: "Software Engineer",
  tagline:
    "Specializing in full-stack web development, cloud deployment, and AI-driven automation.",
  bio: "Software engineer skilled in React, Next.js, and TypeScript, focused on building scalable, production-ready products. I love solving problems, taking ownership end-to-end, and working in fast-paced, product-driven teams.",
  skills: [
    {
      id: 1,
      partName: "Frontend",
      items: [
        { subPartName: "JavaScript", percentage: 70 },
        { subPartName: "React.js", percentage: 66 },
        { subPartName: "Next.js", percentage: 65 },
        { subPartName: "TypeScript", percentage: 62 },
        { subPartName: "Tailwind CSS", percentage: 90 },
        // { subPartName: "Zustand", percentage: 75 },
      ],
    },
    {
      id: 2,
      partName: "Backend",
      items: [
        { subPartName: "Node.js", percentage: 65 },
        { subPartName: "Express.js", percentage: 62 },
        { subPartName: "MySQL", percentage: 60 },
        // { subPartName: "PostgreSQL", percentage: 76 },
        // { subPartName: "Prisma ORM", percentage: 76 },
        // { subPartName: "Hono", percentage: 70 },
        { subPartName: "Socket.io", percentage: 62 },
      ],
    },
    // {
    //   id: 3,
    //   partName: "Cloud & DevOps",
    //   items: [
    //     { subPartName: "AWS", percentage: 72 },
    //     { subPartName: "Docker", percentage: 75 },
    //     { subPartName: "Cloudflare Workers", percentage: 70 },
    //   ],
    // },
    // {
    //   id: 4,
    //   partName: "Realtime & Communication",
    //   items: [
    //     { subPartName: "WebSockets", percentage: 60 },
    //     { subPartName: "Socket.io", percentage: 62 },
    //     { subPartName: "WebRTC", percentage: 75 },
    //   ],
    // },
    {
      id: 5,
      partName: "Programming & Tools",
      items: [
        // { subPartName: "Python", percentage: 76 },
        { subPartName: "C++", percentage: 70 },
        { subPartName: "Git", percentage: 80 },
        { subPartName: "GitHub", percentage: 88 },
      ],
    },
    {
      id: 6,
      partName: "Design Tools",
      items: [
        { subPartName: "Figma", percentage: 85 },
        { subPartName: "Canva", percentage: 85 },
        { subPartName: "Adobe Photoshop", percentage: 85 },
        { subPartName: "Adobe Illustrator", percentage: 80 },
        { subPartName: "Adobe Premiere Pro", percentage: 70 },
        { subPartName: "Adobe After Effects", percentage: 65 },
      ],
    },
  ],

  socialLinks: {
    github: "https://github.com/dotsatya",
    linkedin: "https://www.linkedin.com/in/satya-sundar-dey",
    email: "satyasundardey4@gmail.com",
    twitter: "https://www.twitter.com/satya_sundar_dey",
    resume:
      "https://drive.google.com/uc?export=download&id=1rNsjd2KM8hv2P6rd1KE1Xy6lAWYyXmY1",
    website: "https://dotsatyaportfolio.vercel.app/",
  },

  experience: [
    // {
    //   id: "1",
    //   company: "",
    //   position: " Intern",
    //   duration: "Oct'25 - Nov'25",
    //   description:
    //     "Built and enhanced features for Transformik.com using Next.js, Supabase, and TypeScript, including AI tools like a content repurposer, a Google Calendar–integrated content manager etc. Also automated workflows with Python for tool listing, dataset handling, controlled extraction, and LLM-based content generation, while maintaining structured tool records for smooth platform operations.",
    // },
    {
      id: "2",
      company: "Das Solutions",
      position: "Web Dev Intern",
      duration: "July'25 - Aug'25",
      description:
        "Worked on an Agentic AI project on IBM Cloud, integrating Retrieval-Augmented Generation (RAG) with foundation models to solve digital financial literacy problem.",
    },
    {
      id: "3",
      company: "Kaalyani Government Engineering College",
      position: "Student",
      duration: "June'25 - July'25",
      description:
        "Designed and developed the official Resonance Music Club website with Next.js, Tailwind, Canvas-based dynamic background, and shadcn-UI. Integrated Cloudinary and Next.js for optimized media storage and image performance..",
    },
  ],

  education: [
    {
      id: "1",
      institution: "Kalyaani Government Engineering College",
      degree: "B.Tech in IT",
      duration: "2022 - 2026",
      description: "",
    },
    {
      id: "2",
      institution: "Dum Dum Kishore Bharti High School",
      degree: "Higher Secondary Education (Class 12th)",
      duration: "2021 - 2022",
      description: "",
    },
  ],

  projects: [
    {
      id: 1,
      title: "Sun Earth Moon",
      description: "A pioneering project in the field of quantum computing.",
      tags: ["HTML", "Js", "Vanilla CSS"],
      featured: false,
      imageUrl: Image1,
      imageWidth: 400,
      imageHeight: 300,
      // dataAiHint: "quantum computing",
      githubUrl: "https://github.com/dotsatya/Sun-Earth-Moon",
      liveUrl: "https://dotsatya.github.io/Sun-Earth-Moon/",
    },
    {
      id: 2,
      title: "Web Music Player",
      description: "Developing next-generation AI for personalized medicine.",
      tags: ["HTML", "Js", "Vanilla CSS"],
      featured: true,
      imageUrl: Image4,
      imageWidth: 400,
      imageHeight: 500,
      // dataAiHint: "personalized medicine",
      githubUrl: "https://github.com/dotsatya/Music-Website",
      liveUrl: "https://dotsatya.github.io/Music-Website/",
    },
    {
      id: 3,
      title: "Employee Management System",
      description:
        "Exploring sustainable energy solutions for urban environments.",
      tags: ["React", "Js", "WebSockets", "Express.js", "TailwindCSS"],
      featured: true,
      imageUrl: Image3,
      imageWidth: 400,
      imageHeight: 400,
      // dataAiHint: "sustainable energy",
      githubUrl: "https://github.com/dotsatya/Employee-Management-System",
      liveUrl: "https://dot-employee-management-system.vercel.app/",
    },
    {
      id: 4,
      title: "DotNotesNow📝",
      description: "Login and keep notes with after edit support...",
      tags: ["React", "Js", "Express.js", "TailwindCSS"],
      featured: true,
      imageUrl: Image5,
      imageWidth: 400,
      imageHeight: 350,
      // dataAiHint: "augmented reality",
      githubUrl: "https://github.com/dotsatya/DotNotesNow/",
      liveUrl: "https://dotnotesnow.vercel.app/",
    },
    {
      id: 5,
      title: "DotSkyNow🌤️ ",
      description:
        "Weather app with real-time forecasts, geolocation, and smooth animated theme switching.",
      tags: ["React", "Ts", "OpenWeather API", "Node.js", "TailwindCSS"],
      featured: true,
      imageUrl: Image2,
      imageWidth: 400,
      imageHeight: 600,
      // dataAiHint: "secure network",
      githubUrl: "https://github.com/dotsatya/DotSkyNow",
      liveUrl: "https://dotskynow.vercel.app/",
    },
    {
      id: 6,
      title: "📈 DotCryptoChecker",
      description:
        "A comprehensive Next.js cryptocurrency dashboard that provides real-time price updates, market insights, and interactive coin analysis.",
      tags: ["Next", "Ts", "CoinGecko API", "TailwindCSS"],
      featured: false,
      imageUrl: Image6,
      imageWidth: 400,
      imageHeight: 450,
      // dataAiHint: "carbon capture",
      githubUrl: "https://github.com/dotsatya/DotCryptoChecker",
      liveUrl: "https://dotcryptochecker.vercel.app/",
    },
    {
      id: 7,
      title: "Satya // Portfolio",
      description: "My portfolio website.",
      tags: ["React", "Js", "Email.js", "TailwindCSS"],
      featured: true,
      imageUrl: Image7,
      imageWidth: 400,
      imageHeight: 550,
      // dataAiHint: "financial tools",
      githubUrl: "https://github.com/dotsatya/Formal-Portfolio",
      liveUrl: "https://satyasundardey-portfolio.vercel.app/",
    },
    {
      id: 8,
      title: "Ecomarse🛒",
      description: "A ecomarse website using next js.",
      tags: ["Next.js", "Js", "Node.js", "TailwindCSS"],
      featured: false,
      imageUrl: Image8,
      imageWidth: 400,
      imageHeight: 250,
      // dataAiHint: "ecommerce platform",
      githubUrl: "https://github.com/dotsatya/ecomarse",
      liveUrl: "https://ecomarse-rust.vercel.app/",
    },
  ],

  blogs: [
    {
      id: "1",
      title: "How the Javascript Engine Works",
      description: "Read more ...",
      link: "https://medium.com/@kashyaap.a/how-the-javascript-engine-works-c56e9536d808",
      date: "2025",
    },
    {
      id: "2",
      title: "Behind the Scenes of Javascript Asynchronous Magic",
      description: "Read more ...",
      link: "https://medium.com/@kashyaap.a/behind-the-scenes-of-javascript-asynchronous-magic-b257a74c5bb5",
      date: "2025",
    },
    {
      id: "3",
      title: "Making My App Faster and Scalable: What I Learned About Redis",
      description: "Read more ...",
      link: "https://medium.com/@kashyaap.a/making-my-app-faster-and-scalable-what-i-learned-about-redis-ac1256b8a68f",
      date: "2026",
    },
  ],

  photography: [
    {
      id: 1,
      imageUrl: photo1,
    },
    {
      id: 2,
      imageUrl: photo2,
    },
    {
      id: 3,
      imageUrl: photo3,
    },
    {
      id: 4,
      imageUrl: photo4,
    },
    {
      id: 5,
      imageUrl: photo5,
    },
  ],
};
