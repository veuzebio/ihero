export const profile = {
  name: 'Vitor Vieira Euzébio',
  title: 'Dev Frontend',
  bio: 'Estou sempre em busca de entender melhor o mundo, costumo usar meu tempo livre para me atualizar daqueles filmes e séries que estão atrasados, jogar video-games e mais recentemente aprender a pescar.',
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
} as const;
