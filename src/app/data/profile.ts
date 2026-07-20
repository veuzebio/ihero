export const profile = {
  name: 'Vitor Euzébio',
  title: 'Dev Frontend',
  bio: `Sou engenheiro de soluções com o foco em frontend. Tenho perfil técnico como ponto forte: me identifico com arquitetura de novos projetos, desenvolvimento de funcionalidades e melhoria de processos.

  Já passei pelos setores financeiro, logístico e de varejo. Com isso procuro trazer minha experiência para contribuir com o crescimento de quem está ao redor.
  
  Ultimamente estou explorando o uso de IA com agentes e workflows, porque acredito que isso tem mudado a forma como desenvolvemos software.`,
  links: [
    { label: 'GitHub', url: 'https://github.com/veuzebio', icon: 'github' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/veuzebio/', icon: 'linkedin' },
  ],
  skills: [
    { name: 'TypeScript', level: 'avançado' },
    { name: 'JavaScript', level: 'avançado' },
    { name: 'Angular', level: 'avançado' },
    { name: 'RxJS', level: 'avançado' },
    { name: 'HTML & CSS', level: 'avançado' },
    { name: 'Scrum & Kanban', level: 'avançado' },
    { name: 'React.js', level: 'intermediário' },
    { name: 'IA Generativa', level: 'explorando' },
    { name: 'C#', level: 'intermediário' },
    { name: 'Docker', level: 'intermediário' },
    { name: 'SQL', level: 'intermediário' },
  ],
  education: [
    {
      degree: 'MBA em Engenharia de Software',
      institution: 'FIAP',
      year: 2021,
    },
    {
      degree: 'Tecnólogo em Análise e Desenvolvimento de Sistemas',
      institution: 'Fatec Sorocaba',
      year: 2017,
    },
    {
      degree: 'Técnico em Informática para Internet',
      institution: 'ETEC Fernando Prestes',
      year: 2012,
    },
  ],
  experience: [
    {
      company: 'CI&T',
      role: 'Engenheiro de Software Sênior',
      period: 'set 2023 – presente',
      description:
        'Planejamento e desenvolvimento de aplicações frontend com Angular. Atuação com Web Components e WebView para apps mobile, seguindo princípios SOLID e design patterns. Foco em acessibilidade, observabilidade com Datadog e publicação na AWS.',
    },
    {
      company: 'Opus Software',
      role: 'Engenheiro de Software',
      period: 'abr 2019 – jul 2023',
      description:
        'Desenvolvimento de soluções para os setores financeiro e alimentício. APIs em .NET 6 com C# em microsserviços, contêineres Docker no Linux. Aplicações web com Angular, modularização via Webpack e técnicas de PWA.',
    },
    {
      company: 'HBSIS Soluções em TI',
      role: 'Analista de Sistemas',
      period: 'mai 2018 – abr 2019',
      description:
        'Soluções para gerenciamento de rotas e rastreamento de veículos. Serviços distribuídos com .NET Core e C#, mensageria, padrão CQRS e ORMs para SQL e NoSQL. Aplicações web responsivas com React.',
    },
    {
      company: 'CECAM Consultoria',
      role: 'Analista de Sistemas',
      period: 'nov 2014 – mai 2018',
      description:
        'Sistemas integrados para administração pública municipal. ASP.NET MVC com arquitetura em camadas e SQL Server. Implementação de metodologia Scrum para maior transparência e agilidade no desenvolvimento.',
    },
    {
      company: 'Agiw Sistemas',
      role: 'Analista de Sistemas',
      period: 'abr 2014 – nov 2014',
      description:
        'Desenvolvimento de soluções para análise e conversão de grandes estruturas de dados de folha de pagamento e gerenciamento empresarial com Microsoft SQL Server e Delphi.',
    },
    {
      company: 'Sodapop Comunicação Convergente',
      role: 'Desenvolvedor Web',
      period: 'abr 2013 – set 2013',
      description:
        'Desenvolvimento de aplicações web responsivas com HTML, CSS e JavaScript para diversos setores do mercado, incluindo implementação de e-commerce com a plataforma VTEX.',
    },
  ],
} as const;
