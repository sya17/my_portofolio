// Personal Information
export const PERSONAL_INFO = {
  name: 'Sarip Hidayatullah',
  title: 'Software Developer',
  email: 'sariphidayatullah170701@gmail.com',
  location: {
    city: 'Jakarta',
    country: 'Indonesia',
  },
  birthYear: 2001, // Calculate age dynamically
  citizenship: 'Indonesia',
} as const;

// Social Links
export const SOCIAL_LINKS = {
  github: 'https://github.com/sya17',
  linkedin: 'https://www.linkedin.com/in/sarip-hidayatullah-75a3231aa/',
  facebook: 'https://web.facebook.com/syrf17/',
  instagram: 'https://www.instagram.com/srp_hdyt/?igshid=ZDdkNTZiNTM=',
} as const;

// Work Experience
export const WORK_EXPERIENCE = [
  {
    id: 'lemurian',
    company: 'PT. Lemurian Inovasi Teknologi',
    position: 'Java Developer',
    period: '2021-2023',
    technologies: ['ZK Framework (Monolith)'],
  },
  {
    id: 'prawathiya',
    company: 'PT. Prawathiya Karsa Pradiptha',
    position: 'Java Developer',
    period: '2023-Now',
    technologies: ['ZK Framework', 'Vue Framework', 'Spring Framework (Microservice)'],
  },
] as const;

// Education
export const EDUCATION = [
  {
    id: 'smkn1',
    institution: 'SMKN 1 Cikaum',
    major: 'Rekayasa Perangkat Lunak',
    period: '2017-2020',
  },
] as const;

// Helper Functions
export const calculateAge = (birthYear: number): number => {
  return new Date().getFullYear() - birthYear;
};

export const getCurrentYear = (): number => {
  return new Date().getFullYear();
};
