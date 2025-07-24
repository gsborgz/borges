import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  pt: {
    translation: {
      home: 'Início',
      projects: 'Projetos',
      role: 'Programador',
      summary: {
        title: 'Resumo Profissional',
        description: 'Trabalho na área de desenvolvimento web há 6 anos e estou sempre em busca de um conhecimento a mais, seja na área da programação ou até em áreas que possuem quase nenhuma relação com isso. Acumulo experiências com tecnologias diversas, apesar de algumas delas serem apenas em projetos pessoais que normalmente desenvolvo para aprender e desenvolver novos conhecimentos.',
      },
      contact: {
        title: 'Contato',
        phone: `${process.env.CONTACT_PHONE}`,
        email: `${process.env.CONTACT_EMAIL}`,
        address: `${process.env.CONTACT_ADDRESS_CITY}, ${process.env.CONTACT_ADDRESS_STATE}, ${process.env.CONTACT_ADDRESS_COUNTRY_PT}`,
      },
      skills: {
        title: 'Habilidades',
        typescript: 'TypeScript',
        python: 'Python',
        nextjs: 'Next.js',
        csharp: 'CSharp',
        angular: 'Angular',
        mysql: 'MySQL',
        react: 'React',
        postgres: 'Postgres',
      },
      languageSkills: {
        title: 'Idiomas',
        portuguese: 'Português (Nativo)',
        english: 'Inglês (Avançado)',
        french: 'Francês (Básico)',
      },
      experiences: {
        title: 'Experiências de Trabalho',
        baseb: {
          company: 'BaseB',
          role: 'Desenvolvedor Full Stack',
          period: 'Out 2021 - Presente',
          description: 'Realizando implementações no sistema Base-B utilizando principalmente frameworks como NestJS e Angular. Pude atuar no desenvolvimento de projetos importantes como Gestão de Licitação e Consulta de Documentos Públicos. Também realizei a implementação de testes unitários e e2e utilizando o test runner nativo do Node.',
        },
        sofit: {
          company: 'Sofit',
          role: 'Desenvolvedor Full Stack',
          period: ' Jan 2021 - Set 2021',
          description: 'Realizei atividades no back-end e no front-end do sistema SofitView com os frameworks Ember.js e NestJS.',
        },
        rotaexata: {
          company: 'RotaExata',
          role: 'Desenvolvedor Full Stack',
          period: 'Mar 2019 - Dez 2020',
          description: 'Atuei no desenvolvimento de parte da nova versão do sistema RotaExata, utilizando diversas tecnologias como Node, Vue, Postgres, Mongo etc. Também realizei pequenas atividades no sistema interno da empresa, desenvolvido em PHP.',
        }
      }
    },
  },
  en: {
    translation: {
      home: 'Home',
      projects: 'Projects',
      role: 'Programmer',
      summary: {
        title: 'Professional Summary',
        description: 'I have been working in web development for 6 years and I am always looking for more knowledge, whether in programming or in areas that have almost no relation to it. I accumulate experience with various technologies, although some of them are only in personal projects that I usually develop to learn and develop new skills.',
      },
      contact: {
        title: 'Contact',
        phone: `${process.env.CONTACT_PHONE}`,
        email: `${process.env.CONTACT_EMAIL}`,
        address: `${process.env.CONTACT_ADDRESS_CITY}, ${process.env.CONTACT_ADDRESS_STATE}, ${process.env.CONTACT_ADDRESS_COUNTRY_EN}`,
      },
      skills: {
        title: 'Skills',
        typescript: 'TypeScript',
        python: 'Python',
        nextjs: 'Next.js',
        csharp: 'CSharp',
        angular: 'Angular',
        mysql: 'MySQL',
        react: 'React',
        postgres: 'Postgres',
      },
      languageSkills: {
        title: 'Languages',
        portuguese: 'Portuguese (Native)',
        english: 'English (Advanced)',
        french: 'French (Basic)',
      },
      experiences: {
        title: 'Work Experiences',
        baseb: {
          company: 'BaseB',
          role: 'Full Stack Developer',
          period: 'Oct 2021 - Present',
          description: 'I have been working on the development of part of the new version of the Base-B system, mainly using frameworks like NestJS and Angular. I have contributed to important projects such as Bid Management and Public Document Consultation. I also implemented unit and e2e tests using the native Node test runner.',
        },
        sofit: {
          company: 'Sofit',
          role: 'Full Stack Developer',
          period: 'Jan 2021 - Sep 2021',
          description: 'I worked on both the back-end and front-end of the SofitView system using the Ember.js and NestJS frameworks.',
        },
        rotaexata: {
          company: 'RotaExata',
          role: 'Full Stack Developer',
          period: 'Mar 2019 - Dec 2020',
          description: 'I worked on the development of part of the new version of the RotaExata system, using various technologies such as Node, Vue, Postgres, Mongo, etc. I also performed small tasks on the company\'s internal system, developed in PHP.',
        }
      }
    },
  },
  fr: {
    translation: {
      home: 'Accueil',
      projects: 'Projets',
      role: 'Programmeur',
      summary: {
        title: 'Résumé Professionnel',
        description: 'Je travaille dans le développement web depuis 6 ans et je suis toujours à la recherche de nouvelles connaissances, que ce soit dans la programmation ou dans des domaines qui ont presque aucune relation avec cela. J’accumule des expériences avec diverses technologies, bien que certaines d’entre elles ne soient que dans des projets personnels que je développe généralement pour apprendre et développer de nouvelles compétences.',
      },
      contact: {
        title: 'Contact',
        phone: `${process.env.CONTACT_PHONE}`,
        email: `${process.env.CONTACT_EMAIL}`,
        address: `${process.env.CONTACT_ADDRESS_CITY}, ${process.env.CONTACT_ADDRESS_STATE}, ${process.env.CONTACT_ADDRESS_COUNTRY_FR}`,
      },
      skills: {
        title: 'Compétences',
        typescript: 'TypeScript',
        python: 'Python',
        nextjs: 'Next.js',
        csharp: 'CSharp',
        angular: 'Angular',
        mysql: 'MySQL',
        react: 'React',
        postgres: 'Postgres',
      },
      languageSkills: {
        title: 'Langues',
        portuguese: 'Portugais (Natif)',
        english: 'Anglais (Avancé)',
        french: 'Français (Basique)',
      },
      experiences: {
        title: 'Expériences de Travail',
        baseb: {
          company: 'BaseB',
          role: 'Full Stack Developer',
          period: 'Oct. 2021 - Présent',
          description: 'Je travaille sur le développement de la nouvelle version du système Base-B, principalement en utilisant des frameworks comme NestJS et Angular. J’ai contribué à des projets importants tels que la Gestion des Appels d’Offres et la Consultation de Documents Publics. J’ai également mis en œuvre des tests unitaires et e2e en utilisant le test runner natif de Node.',
        },
        sofit: {
          company: 'Sofit',
          role: 'Full Stack Developer',
          period: 'Janv. 2021 - Sept. 2021',
          description: 'Je travaille sur le développement de la nouvelle version du système SofitView, en utilisant les frameworks Ember.js et NestJS.',
        },
        rotaexata: {
          company: 'RotaExata',
          role: 'Full Stack Developer',
          period: 'Mars 2019 - Déc. 2020',
          description: 'J’ai travaillé sur le développement de partie de la nouvelle version du système RotaExata, en utilisant diverses technologies telles que Node, Vue, Postgres, Mongo, etc. J’ai également effectué de petites tâches sur le système interne de l’entreprise, développé en PHP.',
        }
      }
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'pt',
  fallbackLng: 'pt',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
