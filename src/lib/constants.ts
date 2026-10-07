// Personal Information
export const PERSONAL_INFO = {
  name: 'Sarip Hidayatullah',
  title: 'Java Developer',
  email: 'sariphidayatullah170701@gmail.com',
  location: {
    city: 'Jakarta',
    country: 'Indonesia',
  },
  birthYear: 2001, // Calculate age dynamically
  citizenship: 'Indonesia',
  careerStart: 2021,
} as const;

// Social Links
export const SOCIAL_LINKS = {
  github: 'https://github.com/sya17',
  linkedin: 'https://www.linkedin.com/in/sarip-hidayatullah-75a3231aa/',
  instagram: 'https://www.instagram.com/srp_hdyt/',
} as const;

// Work Experience, newest first
export const WORK_EXPERIENCE = [
  {
    id: 'prawathiya',
    company: 'PT. Prawathiya Karsa Pradiptha',
    position: 'Java Developer',
    period: '2023–now',
    technologies: ['ZK Framework', 'Vue.js', 'Spring (microservices)'],
  },
  {
    id: 'lemurian',
    company: 'PT. Lemurian Inovasi Teknologi',
    position: 'Java Developer',
    period: '2021–2023',
    technologies: ['ZK Framework (monolith)'],
  },
] as const;

// Education
export const EDUCATION = [
  {
    id: 'smkn1',
    institution: 'SMKN 1 Cikaum',
    major: 'Software Engineering (Rekayasa Perangkat Lunak)',
    period: '2017–2020',
  },
] as const;

// Helper Functions
export const calculateAge = (birthYear: number): number => {
  return new Date().getFullYear() - birthYear;
};

export const getCurrentYear = (): number => {
  return new Date().getFullYear();
};
