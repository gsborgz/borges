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
        csharp: 'C#',
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
        description: "I've been working in web development for six years, and I'm always looking for something new to learn, whether it's related to programming or not. I've gained experience with a variety of technologies, including some from personal projects that I do to learn and develop skills.",
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
        csharp: 'C#',
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
          description: "Working with implementations on the Base-B system using frameworks like NestJS and Angular. I've worked on the development of important projects like BI, Bidding Management and Public Documents Consulting. I also implemented unit and e2e tests using node native test runner.",
        },
        sofit: {
          company: 'Sofit',
          role: 'Full Stack Developer',
          period: 'Jan 2021 - Sep 2021',
          description: 'Worked in bug fixes for both back-end and front-end projects, built with NestJS and Ember.js',
        },
        rotaexata: {
          company: 'RotaExata',
          role: 'Full Stack Developer',
          period: 'Mar 2019 - Dec 2020',
          description: 'Worked on the front-end of a new version for the RotaExata system, built with Vuejs and Vuetify. Also worked a little bit on the back-end for this new version, built with technologies like Node.js,Postgres and MongoDB.',
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
        description: "Je travaille dans le développement web depuis six ans et je suis constamment à la recherche de nouveles connaissances, que ce soit en programmation ou dans d'autres domaines. J’ai acquis de l’expérience avec diverses technologies, notamment à travers des projets personnels que je réalise pour apprendre et progresser.",
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
        csharp: 'C#',
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
          role: 'Développeur Full Stack',
          period: 'Oct. 2021 - Présent',
          description: "Participation au développement de fonctionnalités clés du système Base-B à l’aide de NestJS et Angular, incluant la BI, la gestion des appels d’offres et la consultation de documents publics. Mise en place de tests unitaires et end-to-end avec le test runner natif de Node.js.",
        },
        sofit: {
          company: 'Sofit',
          role: 'Développeur Full Stack',
          period: 'Janv. 2021 - Sept. 2021',
          description: 'Participation au développement backend et frontend du système SofitView avec NestJS et Ember.js, incluant correction de bugs et amélioration des fonctionnalités.',
        },
        rotaexata: {
          company: 'RotaExata',
          role: 'Développeur Full Stack',
          period: 'Mars 2019 - Déc. 2020',
          description: "Travail sur le front-end d’une nouvelle version du système RotaExata avec Vue.js et Vuetify, ainsi qu’un peu sur le back-end utilisant Node.js, Postgres et MongoDB.",
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
