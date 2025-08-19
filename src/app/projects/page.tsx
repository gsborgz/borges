'use client'

import Card from '@components/ui/Card';
import Image from 'next/image';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface ProjectCardProps {
  title: string;
  description: string;
  link: string;
  imageSrc: string;
}

export default function Home() {
  const { t } = useTranslation();
  const inProgressProjects: ProjectCardProps[] = [
    {
      title: t('projects.pokedex.title'),
      description: t('projects.pokedex.description'),
      link: 'https://pokedex.gabrielborges.dev/',
      imageSrc: '/projects/pokedex.png',
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

  return (
    <Card
      onClick={() => window.open(project.link, '_blank')}
      className={`cursor-pointer transition-all duration-300 ${hovered ? 'scale-105 shadow-xl' : ''} `}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <h3 className={`font-semibold text-center transition-all duration-300 ${hovered ? 'text-lg' : 'text-base'}`}>
        {project.title}
      </h3>

      <div className='flex items-center justify-center my-3'>
        <Image
          src={project.imageSrc}
          alt={project.title}
          width={hovered ? 330 : 300}
          height={hovered ? 330 : 300}
          className={`rounded-md transition-all duration-300
            ${hovered ? 'w-[110px] h-[110px]' : 'w-[100px] h-[100px]'}
          `}
        />
      </div>

      <p className={`text-sm text-secondary text-justify transition-all duration-300 ${hovered ? 'opacity-100 max-h-40' : 'opacity-0 max-h-0'} overflow-hidden`}>
        {project.description}
      </p>
    </Card>
  );
}
