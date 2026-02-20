import Image1 from "@/public/projectImages/sunMoon.png";
import Image2 from "@/public/projectImages/dotMusic.png";
import Image3 from "@/public/projectImages/ems.png";
import Image4 from "@/public/projectImages/dotNotes.png";
import Image5 from "@/public/projectImages/weather.png";
import Image6 from "@/public/projectImages/cryptoChecker.png";
import Image7 from "@/public/projectImages/portfolio.png";
import Image8 from "@/public/projectImages/ecomarse.png";

import photo1 from "@/public/photoImages/image1.png";
import photo2 from "@/public/photoImages/image2.png";
import photo3 from "@/public/photoImages/image3.png";
import photo4 from "@/public/photoImages/image4.png";
import photo5 from "@/public/photoImages/image5.png";

export const Portfolio = {
  fullName: "Satya Sundar Dey",
  userName: "dotsatya",
  title: "Software Engineer",
  tagline: "Specializing in web development and UI/UX design.",
  bio: " I’m a passionate web developer who loves building dynamic, responsive web applications and UI/UX design with a focus on user experience.",
  skills: [
    {
      id: 1,
      partName: "Frontend",
      items: [
        { subPartName: "JavaScript", percentage: 70 },
        { subPartName: "React", percentage: 66 },
        { subPartName: "Next JS", percentage: 65 },
        { subPartName: "TypeScript", percentage: 62 },
        { subPartName: "Tailwind", percentage: 90 },
      ],
    },
    {
      id: 2,
      partName: "Backend",
      items: [
        { subPartName: "Node JS", percentage: 65 },
        { subPartName: "Express", percentage: 62 },
        { subPartName: "MySQL", percentage: 60 },
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
        { subPartName: "Cpp", percentage: 70 },
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
    behance: "https://www.behance.net/satyasundardey",
    resume:
      "https://drive.google.com/uc?export=download&id=1rNsjd2KM8hv2P6rd1KE1Xy6lAWYyXmY1",
    website: "https://dotsatya.vercel.app/",
  },

  experience: [
    {
      id: "1",
      company: "Kalyani Government Engineering College",
      position: "Student",
      duration: "June 2022 – July 2026",
      description:
        "Built the official Resonance Music Club website using Next.js and Tailwind CSS with responsive layouts and optimized media handling.",
    },
    {
      id: "2",
      company: "DAS SOLUTIONS",
      position: "Web Development Intern",
      duration: "July 2025 – Nov 2025",
      description:
        "Developed responsive web interfaces using HTML, CSS, JavaScript, and React while collaborating in agile development workflows.",
    },
    {
      id: "3",
      company: "Self / Academic",
      position: "Frontend Developer",
      duration: "June 2025 – Oct 2025",
      description:
        "Created modern, mobile-first user interfaces with React, Next.js, Tailwind CSS, and reusable components.",
    },
    {
      id: "4",
      company: "Self / Academic",
      position: "UI/UX Designer",
      duration: "Oct 2025 – Nov 2025",
      description:
        "Designed clean and intuitive user interfaces in Figma with a focus on usability and visual consistency.",
    },
    {
      id: "5",
      company: "Self / Academic",
      position: "Full-Stack Developer",
      duration: "Dec 2025 – Jan 2026",
      description:
        "Built full-stack applications using React, Node.js, and MySQL with REST APIs and authentication.",
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
    // {
    //   id: 1,
    //   title: "Sun–Earth–Moon Simulation",
    //   description:
    //     "An interactive visualization demonstrating the orbital motion of the Sun, Earth, and Moon using pure web technologies.",
    //   tags: ["HTML", "JavaScript", "CSS"],
    //   featured: false,
    //   imageUrl: Image1,
    //   // imageWidth: 400,
    //   // imageHeight: 300,
    //   githubUrl: "https://github.com/dotsatya/Sun-Earth-Moon",
    //   liveUrl: "https://dotsatya.github.io/Sun-Earth-Moon/",
    // },

    {
      id: 1,
      title: "Web Music Player",
      description:
        "A responsive web-based music player with playlist support and smooth UI interactions.",
      tags: ["HTML", "JavaScript", "CSS"],
      featured: true,
      imageUrl: Image2,
      githubUrl: "https://github.com/dotsatya/Music-Website",
      liveUrl: "https://dotsatya.github.io/Music-Website/",
    },

    {
      id: 2,
      title: "Employee Management System",
      description:
        "A full-stack employee management system with real-time updates and role-based data handling.",
      tags: [
        "React",
        "JavaScript",
        "Express.js",
        "Socket.io",
        "MySQL",
        "Tailwind CSS",
      ],
      featured: true,
      imageUrl: Image3,
      githubUrl: "https://github.com/dotsatya/Employee-Management-System",
      liveUrl: "https://dotems.vercel.app/",
    },

    {
      id: 3,
      title: "DotNotesNow 📝",
      description:
        "A secure note-taking application with login, edit, and real-time update support.",
      tags: ["React", "JavaScript", "Express.js", "Tailwind CSS"],
      featured: true,
      imageUrl: Image4,
      githubUrl: "https://github.com/dotsatya/DotNotesNow/",
      linkedInUrl:
        "https://www.linkedin.com/posts/satya-sundar-dey_webdevelopment-fullstackdeveloper-reactjs-activity-7422524332570034179-iK0Y/",
    },

    {
      id: 4,
      title: "DotSkyNow 🌤️",
      description:
        "A modern weather app providing real-time forecasts, geolocation, and animated theme transitions.",
      tags: [
        "React",
        "TypeScript",
        "OpenWeather API",
        "Node.js",
        "Tailwind CSS",
      ],
      featured: true,
      imageUrl: Image5,
      githubUrl: "https://github.com/dotsatya/DotSkyNow",
      liveUrl: "https://dotskynow.vercel.app/",
    },

    {
      id: 5,
      title: "DotCryptoChecker 📈",
      description:
        "A Next.js cryptocurrency dashboard with live prices, market insights, and interactive coin analysis.",
      tags: ["Next.js", "TypeScript", "CoinGecko API", "Tailwind CSS"],
      featured: false,
      imageUrl: Image6,
      githubUrl: "https://github.com/dotsatya/DotCryptoChecker",
      liveUrl: "https://dotcryptochecker.vercel.app/",
    },

    {
      id: 6,
      title: "Satya // Portfolio",
      description:
        "My personal portfolio showcasing projects, skills, and contact functionality.",
      tags: ["React", "JavaScript", "EmailJS", "CSS Modules"],
      featured: true,
      imageUrl: Image7,
      githubUrl: "https://github.com/dotsatya/Formal-Portfolio",
      liveUrl: "https://satyasundardey-portfolio.vercel.app/",
    },

    {
      id: 7,
      title: "E-commerce Platform 🛒",
      description:
        "A scalable e-commerce web application built with Next.js and modern UI practices.",
      tags: ["Next.js", "JavaScript", "Node.js", "Tailwind CSS"],
      featured: false,
      imageUrl: Image8,
      githubUrl: "https://github.com/dotsatya/E-commerce_Next",
      liveUrl: "https://dotecommerce.vercel.app/",
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

  servicesData: [
    {
      title: "Full-Stack Development",
      description:
        "I build complete web applications from frontend to backend using modern frameworks and scalable architectures.",

      items: [
        {
          title: "Frontend Development",
          description: "(React, Next.js, TypeScript, Tailwind CSS)",
        },
        {
          title: "Backend Development",
          description: "(Node.js, Express, REST APIs, MySQL)",
        },
        {
          title: "Database Design",
          description: "(SQL optimization, schema design, data handling)",
        },
      ],
    },

    {
      title: "UI / UX & Design",
      description:
        "I design clean, user-friendly interfaces that focus on usability, consistency, and modern visuals.",

      items: [
        {
          title: "UI Design",
          description: "(Figma, Canva, responsive layouts)",
        },
        {
          title: "Visual Design",
          description: "(Photoshop, Illustrator, branding assets)",
        },
        {
          title: "Motion & Media",
          description: "(After Effects, Premiere Pro)",
        },
      ],
    },

    {
      title: "Projects & Applications",
      description:
        "Hands-on experience building real-world projects that solve practical problems.",

      items: [
        {
          title: "Web Music Player",
          description: "(HTML, CSS, JavaScript)",
        },
        {
          title: "Employee Management System",
          description: "(React, Express, MySQL, Socket.io)",
        },
        {
          title: "Weather & Crypto Apps",
          description: "(React, Next.js, APIs)",
        },
      ],
    },

    {
      title: "Professional Experience",
      description:
        "Experience gained through internships, academic projects, and independent development.",

      items: [
        {
          title: "Web Development Intern",
          description: "DAS SOLUTIONS (July 2025 – Nov 2025)",
        },
        {
          title: "Student Developer",
          description: "Kalyani Government Engineering College",
        },
        {
          title: "Freelance / Academic Projects",
          description: "Frontend & Full-Stack Development",
        },
      ],
    },
  ],

   S_ASCII_ART : `
.
                                   ...
                               ,x;,;
                          .O.           
                    ..cX              
                ..'Wd                 
            dM.
          0X
          ,xOdc;,...
               ..',;:clo!od::,.
                         .:&k;lc,'.
                             'o''j;y.
                           ..',c..
                        .';:..
                  .,:ld;.'
                .Q.
           .:⁠-
         '''
`
};


// Mock File System Structure representing the "home" directory
export type FileSystemNode =
  | { type: "file"; content: string }
  | { type: "directory"; children: { [key: string]: FileSystemNode } };

export const ABOUT_TEXT = `${Portfolio.fullName}\n${Portfolio.title}\n\n${Portfolio.bio}`;
export const SOCIALS = Portfolio.socialLinks;
export const PROJECTS = Portfolio.projects.map((project) => ({
  name: project.title,
  description: project.description,
  tech: project.tags,
}));
export const SKILLS = Portfolio.skills.map((section) => ({
  category: section.partName,
  skills: section.items.map((item) => item.subPartName),
}));
export const EXPERIENCE = Portfolio.experience.map((item) => ({
  role: item.position,
  company: item.company,
  period: item.duration,
  description: item.description,
}));



const slugify = (text: string) =>
  text
    .normalize("NFKD")               // handle emojis/unicode
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();

export const FILE_SYSTEM: { [key: string]: FileSystemNode } = {
  'about.txt': { type: 'file', content: ABOUT_TEXT },
  'contact.txt': { type: 'file', content: `Email: ${SOCIALS.email}\nGitHub: ${SOCIALS.github}\nLinkedIn: ${SOCIALS.linkedin}\nTwitter: ${SOCIALS.twitter}` },
  'projects': {
    type: 'directory',
    children: PROJECTS.reduce((acc, proj) => ({
      ...acc,
      [slugify(proj.name) + '.txt']: {
        type: 'file',
        content: `Name: ${proj.name}\nDescription: ${proj.description}\nTech Stack: ${proj.tech.join(', ')}`
      }
    }), {} as { [key: string]: FileSystemNode })
  },
  'skills': {
    type: 'directory',
    children: SKILLS.reduce((acc, skill) => ({
      ...acc,
      [slugify(skill.category) + '.txt']: {
        type: 'file',
        content: skill.skills.join('\n')
      }
    }), {} as { [key: string]: FileSystemNode })
  },
  'experience.txt': {
    type: 'file',
    content: EXPERIENCE.map(e => `${e.role} @ ${e.company} (${e.period})\n${e.description}`).join('\n\n')
  },
  'secret': {
    type: 'directory',
    children: {
        'plan.txt': { type: 'file', content: '1. Build cool things.\n2. ???\n3. Profit.' }
    }
  }
};