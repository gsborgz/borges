'use client'

import Card from '@components/ui/Card';
import Image from 'next/image';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useIsMobile } from '@hooks/useMobile';
import Badge from '../../components/ui/Badge';

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
      link: 'https://portfolio.gabrielborges.dev/',
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
      <div className='flex flex-col'>
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
  const [hovered, setHovered] = useState(false);
  const isMobile = useIsMobile();

  return (
    <Card
      onClick={() => window.open(project.link, '_blank')}
      className={`flex flex-col gap-4 cursor-pointer transition-all duration-300 ${hovered && !isMobile ? 'scale-105 shadow-xl' : ''} `}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <h3 className={`font-semibold text-center transition-all duration-300 ${hovered && !isMobile ? 'text-lg' : 'text-base'}`}>
        {project.title}
      </h3>

      <div className='flex items-center justify-center'>
        <Image
          src={project.src}
          alt={project.title}
          width={hovered && !isMobile ? 330 : 300}
          height={hovered && !isMobile ? 330 : 300}
          className={`rounded-md transition-all duration-300
            ${hovered && !isMobile ? 'w-[110px] h-[110px]' : 'w-[100px] h-[100px]'}
          `}
        />
      </div>

      {!!project.skills.length && (
        <div className={`flex flex-wrap items-center justify-center gap-2 ${!hovered ? '-mb-4' : ''}`}>
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

      {!isMobile && (
        <p className={`text-sm text-secondary text-justify transition-all duration-300 ${hovered ? 'opacity-100 max-h-40' : 'opacity-0 max-h-0'} overflow-hidden`}>
          {project.description}
        </p>
      )}
    </Card>
  );
}
