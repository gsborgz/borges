'use client'

import Card from '@components/ui/Card';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

interface ProjectCardProps {
  title: string;
  description: string;
  link: string;
  src: string;
  skills: { title: string; src: string }[];
}

export default function Home() {
  const { t } = useTranslation();
  const inProgressProjects: ProjectCardProps[] = [
    {
      title: t('projects.portfolio.title'),
      description: t('projects.portfolio.description'),
      link: 'https://gabrielborges.dev/',
      src: '/borges_icon.png',
      skills: [
        { title: 'Next.js', src: '/icons/nextjs.svg' },
        { title: 'React', src: '/icons/react.svg' },
        { title: 'TypeScript', src: '/icons/typescript.svg' }
      ]
    },
    {
      title: t('projects.pokedex.title'),
      description: t('projects.pokedex.description'),
      link: 'https://pokedex.gabrielborges.dev/',
      src: '/projects/pokedex.png',
      skills: [
        { title: 'Next.js', src: '/icons/nextjs.svg' },
        { title: 'React', src: '/icons/react.svg' },
        { title: 'TypeScript', src: '/icons/typescript.svg' }
      ]
    },
  ];

  return (
    <section className='container max-w-4xl mx-auto py-8 space-y-8'>
      <div className='flex flex-col h-full'>
        <ProjectsSection title={t('projects.inProgress')}>
          {inProgressProjects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </ProjectsSection>
      </div>
    </section>
  );
}

function ProjectsSection({ title, children }) {
  return (
    <div className='flex flex-col gap-6'>
      <span className='cursor-default text-2xl font-bold tracking-tight text-primary transition-all duration-300 hover:-translate-y-1'>{title}</span>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {children}
      </div>
    </div>
  );
}

function ProjectCard({ project }: { project: ProjectCardProps }) {
  return (
    <Card
      onClick={() => window.open(project.link, '_blank')}
      className='flex flex-col justify-between cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl'
    >
      <h3 className='font-semibold text-center transition-all duration-300 text-lg mb-2'>
        {project.title}
      </h3>

      <div className='flex items-center justify-center mb-2'>
        <Image
          src={project.src}
          alt={project.title}
          width={300}
          height={300}
          className={`rounded-md transition-all duration-300 w-30 h-30`}
        />
      </div>

      {!!project.skills.length && (
        <div className='flex flex-wrap items-center justify-center gap-2 mb-2'>
          {project.skills.map((skill, index) => (
            <div key={index} className='rounded-xs p-0.5 bg-slate-100' title={skill.title}>
              <Image
                unoptimized
                src={skill.src}
                alt={skill.title}
                width={25}
                height={25}
              />
            </div>
          ))}
        </div>
      )}

      <p className='text-sm text-secondary text-justify transition-all duration-300 opacity-100 max-h-40 overflow-hidden'>
        {project.description}
      </p>
    </Card>
  );
}
