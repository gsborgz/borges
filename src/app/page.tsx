'use client'

import Image from 'next/image';
import { useState } from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';
import Card, { CardTitle } from '@components/ui/Card';
import Badge from '@components/ui/Badge';
import Separator from '@components/ui/Separator'
import { useResume } from '@hooks/useResume';
import Link from 'next/link';

export default function Home() {
  const [currentImage, setCurrentImage] = useState('/borges.png');
  const {
    skills,
    languageSkills,
    experiences,
    courses,
    role,
    skillsTitle,
    languageSkillsTitle,
    contactTitle,
    contactPhone,
    contactEmail,
    contactAddress,
    studyTitle,
    summaryTitle,
    summaryDescription,
    experiencesTitle
  } = useResume();

  return (
    <div className='container max-w-4xl mx-auto py-8 space-y-8'>
      <div className='flex flex-col md:flex-row items-center justify-center gap-8 text-center'>
        <Image
          src={currentImage}
          alt='Gabriel da Silva Borges'
          width={300}
          height={300}
          className='rounded-full w-50 h-50 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1'
          onClick={() => setCurrentImage(currentImage === '/borges.png' ? '/borges_drawing.png' : '/borges.png')}
        />

        <div className='cursor-default flex flex-col space-y-2 justify-center md:justify-start items-center md:items-start'>
          <h1 className='text-4xl font-bold tracking-tight text-primary transition-all duration-300 hover:-translate-y-1'>GABRIEL DA SILVA BORGES</h1>
          <p className='text-xl text-muted-foreground font-medium text-secondary transition-all duration-300 hover:-translate-y-1 w-fit'>{role}</p>
        </div>
      </div>

      <div className='grid gap-8 md:grid-cols-3'>
        <div className='space-y-6'>
          <Card>
            <CardTitle>{contactTitle}</CardTitle>
            <div className='space-y-3 text-2xl'>
              <div className='flex items-center gap-3 text-sm'>
                <Phone className='h-3 w-3 text-muted-foreground' />
                <p className='text-primary'>{contactPhone}</p>
              </div>
              <div className='flex items-center gap-3 text-sm'>
                <Mail className='h-3 w-3 text-muted-foreground' />
                <p className='text-primary break-all'>{contactEmail}</p>
              </div>
              <div className='flex items-start gap-3 text-sm'>
                <MapPin className='h-3 w-3 text-muted-foreground mt-0.5' />
                <p className='leading-relaxed text-primary'>{contactAddress}</p>
              </div>
            
              <Separator />

              <div className='flex items-center justify-center gap-3 text-sm'>
                <Link href='https://linkedin.com/in/gsborgz' target='_blank' rel='noopener noreferrer' className='text-primary hover:underline'>LinkedIn</Link>
                <Link href='https://github.com/gsborgz' target='_blank' rel='noopener noreferrer' className='text-primary hover:underline'>GitHub</Link>
              </div>
            </div>
          </Card>

          <Card>
            <CardTitle>{skillsTitle}</CardTitle>
            <div className='flex flex-wrap gap-2'>
              {skills.map((skill) => (
                <Badge key={skill}>
                  {skill}
                </Badge>
              ))}
            </div>
          </Card>

          <Card>
            <CardTitle>{languageSkillsTitle}</CardTitle>
            <div className='flex flex-col space-y-2'>
              {languageSkills.map((language) => (
                <div key={language} className='text-sm text-primary'>{language}</div>
              ))}
            </div>
          </Card>

          <Card>
            <CardTitle>{studyTitle}</CardTitle>
            <div className='space-y-2'>
              {courses.map((course, index) => (
                <div key={index} className='space-y-1'>
                  <h3 className='font-semibold text-primary'>{course.course}</h3>
                  <p className='text-sm font-medium text-muted-foreground text-secondary'>{course.institution}</p>
                  <p className='text-sm leading-relaxed text-muted-foreground text-secondary'>{course.description}</p>
                  <span className='text-xs text-muted-foreground text-secondary'>{course.period}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className='md:col-span-2 space-y-6'>
          <Card>
            <CardTitle>{summaryTitle}</CardTitle>
            <p className='text-sm text-secondary'>{summaryDescription}</p>
          </Card>

          <Card>
            <CardTitle className='text-lg'>{experiencesTitle}</CardTitle>

            <div className='space-y-6'>
              {experiences.map((exp, index) => (
                <div key={index}>
                  <div className='space-y-2'>
                    <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1'>
                      <h3 className='font-semibold text-primary'>{exp.company}</h3>
                      <span className={`text-sm text-muted-foreground text-secondary`}>{exp.period}</span>
                    </div>
                    <p className={`text-sm font-medium text-muted-foreground text-secondary`}>{exp.role}</p>
                    <p className={`text-sm leading-relaxed text-muted-foreground text-secondary`}>
                      {exp.description}
                    </p>
                  </div>
                  {index < experiences.length - 1 && <Separator className='mt-6' />}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
