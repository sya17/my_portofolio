// Personal Information
export const PERSONAL_INFO = {
  name: 'Sarip Hidayatullah',
  title: 'Full-stack Developer',
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

// Skills. The last group is lighter experience and is shown that way.
export const SKILLS = [
  { label: 'Languages', items: ['Java', 'TypeScript', 'Dart'] },
  {
    label: 'Frameworks',
    items: ['Spring (microservices)', 'ZK Framework', 'Vue.js', 'Next.js', 'Flutter'],
  },
  { label: 'Databases', items: ['Oracle', 'PostgreSQL'] },
  { label: 'Some experience', items: ['Python', 'Go', 'Rust'] },
] as const;

// Education
export const EDUCATION = [
  {
    id: 'pelita-bangsa',
    institution: 'Universitas Pelita Bangsa',
    major: 'Informatics (Teknik Informatika), one semester',
    period: '2024',
  },
  {
    id: 'smkn1',
    institution: 'SMKN 1 Cikaum',
    major: 'Software Engineering (Rekayasa Perangkat Lunak)',
    period: '2017–2020',
  },
] as const;

// Helper Functions

// The address split at '@', so narrow screens break the line there.
export const EMAIL_PARTS = PERSONAL_INFO.email.split('@');

export const calculateAge = (birthYear: number): number => {
  return new Date().getFullYear() - birthYear;
};

export const getCurrentYear = (): number => {
  return new Date().getFullYear();
};
