import type { Profile } from './profile.types';

export const profileEnUs: Profile = {
  name: 'Vitor Euzébio',
  title: 'Frontend Dev',
  bio: `I'm a solutions engineer focused on frontend. My technical profile is my strongest asset: I identify with new project architecture, feature development, and process improvement.

  I've worked across the financial, logistics, and retail sectors. With that experience, I aim to contribute to the growth of those around me.

  Lately I've been exploring AI with agents and workflows, because I believe it's changing the way we build software.`,
  links: [
    { label: 'GitHub', url: 'https://github.com/veuzebio', icon: 'github' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/veuzebio/', icon: 'linkedin' },
  ],
  skills: [
    { name: 'TypeScript', level: 'advanced' },
    { name: 'JavaScript', level: 'advanced' },
    { name: 'Angular', level: 'advanced' },
    { name: 'RxJS', level: 'advanced' },
    { name: 'HTML & CSS', level: 'advanced' },
    { name: 'Scrum & Kanban', level: 'advanced' },
    { name: 'React.js', level: 'intermediate' },
    { name: 'Generative AI', level: 'exploring' },
    { name: 'C#', level: 'intermediate' },
    { name: 'Docker', level: 'intermediate' },
    { name: 'SQL', level: 'intermediate' },
  ],
  education: [
    {
      degree: "MBA in Software Engineering",
      institution: 'FIAP',
      year: 2021,
    },
    {
      degree: 'Associate Degree in Systems Analysis and Development',
      institution: 'Fatec Sorocaba',
      year: 2017,
    },
    {
      degree: 'Technical Degree in Internet Information Technology',
      institution: 'ETEC Fernando Prestes',
      year: 2012,
    },
  ],
  experience: [
    {
      company: 'CI&T',
      role: 'Senior Software Engineer',
      period: 'Sep 2023 – present',
      description:
        'Planning and development of frontend applications with Angular. Working with Web Components and WebView for mobile apps, following SOLID principles and design patterns. Focus on accessibility, observability with Datadog, and deployment on AWS.',
    },
    {
      company: 'Opus Software',
      role: 'Software Engineer',
      period: 'Apr 2019 – Jul 2023',
      description:
        'Development of solutions for the financial and food industry sectors. APIs in .NET 6 with C# in microservices, Docker containers on Linux. Web applications with Angular, modularization via Webpack, and PWA techniques.',
    },
    {
      company: 'HBSIS Soluções em TI',
      role: 'Systems Analyst',
      period: 'May 2018 – Apr 2019',
      description:
        'Solutions for route management and vehicle tracking. Distributed services with .NET Core and C#, messaging, CQRS pattern, and ORMs for SQL and NoSQL. Responsive web applications with React.',
    },
    {
      company: 'CECAM Consultoria',
      role: 'Systems Analyst',
      period: 'Nov 2014 – May 2018',
      description:
        'Integrated systems for municipal public administration. ASP.NET MVC with layered architecture and SQL Server. Implementation of Scrum methodology for greater transparency and agility in development.',
    },
    {
      company: 'Agiw Sistemas',
      role: 'Systems Analyst',
      period: 'Apr 2014 – Nov 2014',
      description:
        'Development of solutions for analyzing and converting large payroll and business management data structures with Microsoft SQL Server and Delphi.',
    },
    {
      company: 'Sodapop Comunicação Convergente',
      role: 'Web Developer',
      period: 'Apr 2013 – Sep 2013',
      description:
        'Development of responsive web applications with HTML, CSS, and JavaScript for various market sectors, including e-commerce implementation with the VTEX platform.',
    },
  ],
};
