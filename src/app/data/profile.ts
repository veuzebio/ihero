export const profile = {
  name: 'Vitor Euzébio',
  title: 'Dev Frontend',
  bio: 'A curiosidade me leva a entender melhor como o mundo funciona. Sou apaixonado por tecnologia, programação e inovação. Estou sempre em busca de aprender coisas novas e explorar diferentes áreas do conhecimento.',
  links: [
    { label: 'GitHub', url: 'https://github.com/veuzebio', icon: 'github' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/veuzebio/', icon: 'linkedin' },
  ],
  skills: [
    { name: 'JavaScript', level: 'avançado' },
    { name: 'TypeScript', level: 'avançado' },
    { name: 'Inteligência Artificial', level: 'explorando' },
  ],
  education: [
    {
      degree: 'MBA em Engenharia de Software',
      institution: 'FIAP',
      year: 2021,
    },
    {
      degree: 'Tecnólogo em Análise e Desenvolvimento de Sistemas',
      institution: 'FATEC - Faculdade de Tecnologia de Sorocaba',
      year: 2017,
    },
  ],
  experience: [
    {
      company: 'CI&T',
      role: 'Engenheiro Frontend Sênior',
      period: '2023 – presente',
      description: 'Desenvolvimento de interfaces acessíveis com Angular e TypeScript.',
    },
    {
      company: 'Opus Software',
      role: 'Engenheiro Frontend Pleno',
      period: '2019 – 2023',
      description: 'Desenvolvimento de interfaces acessíveis com Angular e TypeScript.',
    },
  ],
} as const;
