'use client'

import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import { Mail, MapPin, Phone } from 'lucide-react';
import Card, { CardTitle } from '@components/ui/Card';
import Badge from '@components/ui/Badge';
import Separator from '@components/ui/Separator';

export default function Home() {
  const { t } = useTranslation();
  const skills = [
    t('skills.typescript'),
    t('skills.python'),
    t('skills.nextjs'),
    t('skills.csharp'),
    t('skills.angular'),
    t('skills.mysql'),
    t('skills.react'),
    t('skills.postgres'),
  ];
  const experiences = [
    {
      company: t('experiences.baseb.company'),
      role: t('experiences.baseb.role'),
      period: t('experiences.baseb.period'),
      description: t('experiences.baseb.description'),
    },
    {
      company: t('experiences.sofit.company'),
      role: t('experiences.sofit.role'),
      period: t('experiences.sofit.period'),
      description: t('experiences.sofit.description'),
    },
    {
      company: t('experiences.rotaexata.company'),
      role: t('experiences.rotaexata.role'),
      period: t('experiences.rotaexata.period'),
      description: t('experiences.rotaexata.description'),
    },
  ];

  return (
    <div className='container max-w-4xl mx-auto py-8 space-y-8'>
      <div className='flex items-center justify-center space-y-4 gap-8'>
        <Image
          src='/borges.png'
          alt='Gabriel da Silva Borges'
          width={300}
          height={300}
          className='rounded-full w-50 h-50 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105'
        />

        <div className='flex flex-col space-y-2'>
          <h1 className='text-4xl font-bold tracking-tight text-primary'>GABRIEL DA SILVA BORGES</h1>
          <p className='text-xl text-muted-foreground font-medium text-secondary'>{t('role')}</p>
        </div>
      </div>

      <div className='grid gap-8 md:grid-cols-3'>
        <div className='space-y-6'>
          <Card>
            <CardTitle>{t('contact.title')}</CardTitle>
            <div className='space-y-3'>
              <div className='flex items-center gap-3 text-sm'>
                <Phone className='h-4 w-4 text-muted-foreground' />
                <p className='text-primary'>{t('contact.phone')}</p>
              </div>
              <div className='flex items-center gap-3 text-sm'>
                <Mail className='h-4 w-4 text-muted-foreground' />
                <p className='break-all text-primary'>{t('contact.email')}</p>
              </div>
              <div className='flex items-start gap-3 text-sm'>
                <MapPin className='h-4 w-4 text-muted-foreground mt-0.5' />
                <p className='leading-relaxed text-primary'>{t('contact.address')}</p>
              </div>
            </div>
          </Card>

          <Card>
            <CardTitle>{t('skills.title')}</CardTitle>
            <div className='flex flex-wrap gap-2'>
              {skills.map((skill) => (
                <Badge key={skill}>
                  {skill}
                </Badge>
              ))}
            </div>
          </Card>

          <Card>
            <CardTitle>{t('languageSkills.title')}</CardTitle>
            <div className='flex flex-col space-y-2'>
              <div className='text-sm text-primary'>{t('languageSkills.portuguese')}</div>
              <div className='text-sm text-primary'>{t('languageSkills.english')}</div>
              <div className='text-sm text-primary'>{t('languageSkills.french')}</div>
            </div>
          </Card>
        </div>

        <div className='md:col-span-2 space-y-6'>
          <Card>
            <CardTitle>{t('summary.title')}</CardTitle>
            <p className='text-secondary'>{t('summary.description')}</p>
          </Card>

          <Card>
            <CardTitle className='text-lg'>{t('experiences.title')}</CardTitle>

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
