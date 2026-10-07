// Client and internal projects, newest first. Titles follow the original
// resume; they name the project, not its outcome.
export interface Project {
  year: string;
  client: string;
  work: string;
}

export const projects: Project[] = [
  {
    year: '2022–2023',
    client: 'PT Aplikanusa Lintasarta',
    work: 'Complaint module and CRM integration',
  },
  {
    year: '2022',
    client: 'PT. Pelindo Terminal Petikemas (PTP)',
    work: 'ESTIM SPTP implementation',
  },
  {
    year: '2022',
    client: 'PT Aplikanusa Lintasarta',
    work: 'Ultima application',
  },
  {
    year: '2021',
    client: 'Internal project',
    work: 'Rantaipasok',
  },
  {
    year: '2021',
    client: 'Internal project',
    work: 'ESTIM Dayak',
  },
  {
    year: '2021',
    client: 'Internal project',
    work: 'CRM module',
  },
  {
    year: '2021',
    client: 'Internal project',
    work: 'Assessment Center application',
  },
  {
    year: '2021',
    client: 'Bank Syariah Mandiri (BSM)',
    work: 'Incident and Request modules for ITSM',
  },
];
