export default function PersonSchema() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",

    name: "Satya Sundar Dey",

    alternateName: "dotsatya",

    url: "https://dotsatya.vercel.app",

    jobTitle: [
      "Software Engineer",
      "Full-Stack Developer",
      "UI/UX Designer"
    ],

    description:
      "Official portfolio of Satya Sundar Dey, also known as dotsatya — Software Engineer, Full-Stack Developer, and UI/UX Designer specializing in modern web applications and digital experiences.",

    sameAs: [
      "https://github.com/dotsatya",
      "https://www.linkedin.com/in/satya-sundar-dey",
      "https://www.behance.net/satyasundardey"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  );
}