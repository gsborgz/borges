import { useTranslation } from "react-i18next";

export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
}

export interface Course {
  institution: string;
  course: string;
  period: string;
  description: string;
}

export interface ResumeData {
  skills: string[];
  languageSkills: string[];
  experiences: Experience[];
  courses: Course[];
  role: string;
  skillsTitle: string;
  languageSkillsTitle: string;
  contactTitle: string;
  contactPhone: string;
  contactEmail: string;
  contactAddress: string;
  studyTitle: string;
  summaryTitle: string;
  summaryDescription: string;
  experiencesTitle: string;
}

export function useResume() {
  const { t } = useTranslation();
  const role = t('role');
  const skillsTitle = t('skills.title');
  const languageSkillsTitle = t('languageSkills.title');
  const portugueseLanguage = t('languageSkills.portuguese');
  const englishLanguage = t('languageSkills.english');
  const frenchLanguage = t('languageSkills.french');
  const contactTitle = t('contact.title');
  const contactPhone = t('contact.phone');
  const contactEmail = t('contact.email');
  const contactAddress = t('contact.address');
  const studyTitle = t('study.title');
  const summaryTitle = t('summary.title');
  const summaryDescription = t('summary.description');
  const experiencesTitle = t('experiences.title');
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
  const languageSkills = [
    t('languageSkills.portuguese'),
    t('languageSkills.english'),
    t('languageSkills.french'),
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
  const courses = [
    {
      institution: t('study.tads.institution'),
      course: t('study.tads.course'),
      period: t('study.tads.period'),
      description: t('study.tads.description'),
    },
    {
      institution: t('study.tecInfo.institution'),
      course: t('study.tecInfo.course'),
      period: t('study.tecInfo.period'),
      description: t('study.tecInfo.description'),
    },
  ];

  return {
    role,
    skillsTitle,
    languageSkillsTitle,
    portugueseLanguage,
    englishLanguage,
    frenchLanguage,
    contactTitle,
    contactPhone,
    contactEmail,
    contactAddress,
    studyTitle,
    summaryTitle,
    summaryDescription,
    experiencesTitle,
    skills,
    languageSkills,
    experiences,
    courses,
  }
}
