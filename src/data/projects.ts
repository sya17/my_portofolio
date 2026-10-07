// Client and internal projects, newest first
export interface Project {
  year: string;
  client: string;
  work: string;
}

export const projects: Project[] = [
  {
    year: '2022–2023',
    client: 'PT Aplikanusa Lintasarta',
    work: 'Built and rolled out a complaint module, integrated with the CRM',
  },
  {
    year: '2022',
    client: 'PT. Pelindo Terminal Petikemas (PTP)',
    work: 'Implemented ESTIM SPTP',
  },
  {
    year: '2022',
    client: 'PT Aplikanusa Lintasarta',
    work: 'Developed the Ultima application',
  },
  {
    year: '2021',
    client: 'Internal project',
    work: 'Developed Rantaipasok, a supply chain application',
  },
  {
    year: '2021',
    client: 'Internal project',
    work: 'Developed ESTIM Dayak',
  },
  {
    year: '2021',
    client: 'Internal project',
    work: 'Developed a CRM module',
  },
  {
    year: '2021',
    client: 'Internal project',
    work: 'Built an Assessment Center application',
  },
  {
    year: '2021',
    client: 'Bank Syariah Mandiri (BSM)',
    work: 'Implemented the Incident and Request modules of an ITSM system',
  },
];
