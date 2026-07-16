export const profile = {
  name: 'Vitor Vieira Euzébio',
  title: 'Dev Frontend',
  bio: 'Desenvolvedor Frontend com foco em TypeScript e Angular, apaixonado por criar interfaces acessíveis e bem estruturadas. Nas horas vagas, me atualizo em filmes e séries, jogo videogame e, mais recentemente, estou aprendendo a pescar.',
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
      degree: 'Tecnólogo em Análise e Desenvolvimento de Sistemas',
      institution: 'UNIP — Universidade Paulista',
      year: 2014,
    },
  ],
  experience: [
    {
      company: 'Empresa Exemplo',
      role: 'Dev Frontend Sênior',
      period: '2022 – presente',
      description: 'Desenvolvimento de interfaces acessíveis com Angular e TypeScript.',
    },
  ],
} as const;
