import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

function numberToText(num: number, locale: string): string {
  const formatters: Record<string, Record<number, string>> = {
    pt: {
      0: 'zero', 1: 'um', 2: 'dois', 3: 'três', 4: 'quatro', 5: 'cinco',
      6: 'seis', 7: 'sete', 8: 'oito', 9: 'nove', 10: 'dez',
      11: 'onze', 12: 'doze', 13: 'treze', 14: 'quatorze', 15: 'quinze',
      16: 'dezesseis', 17: 'dezessete', 18: 'dezoito', 19: 'dezenove', 20: 'vinte'
    },
    en: {
      0: 'zero', 1: 'one', 2: 'two', 3: 'three', 4: 'four', 5: 'five',
      6: 'six', 7: 'seven', 8: 'eight', 9: 'nine', 10: 'ten',
      11: 'eleven', 12: 'twelve', 13: 'thirteen', 14: 'fourteen', 15: 'fifteen',
      16: 'sixteen', 17: 'seventeen', 18: 'eighteen', 19: 'nineteen', 20: 'twenty'
    },
    fr: {
      0: 'zéro', 1: 'un', 2: 'deux', 3: 'trois', 4: 'quatre', 5: 'cinq',
      6: 'six', 7: 'sept', 8: 'huit', 9: 'neuf', 10: 'dix',
      11: 'onze', 12: 'douze', 13: 'treize', 14: 'quatorze', 15: 'quinze',
      16: 'seize', 17: 'dix-sept', 18: 'dix-huit', 19: 'dix-neuf', 20: 'vingt'
    }
  };

  return formatters[locale]?.[num] || num.toString();
}

const currentDate = new Date();
const workStartDate = new Date('2019-02-01');
const remoteWorkStartDate = new Date('2020-03-01');
const yearsOfExperience = Math.floor((currentDate.getTime() - workStartDate.getTime()) / (1000 * 60 * 60 * 24 * 365.25));
const yearsOfRemoteExperience = Math.floor((currentDate.getTime() - remoteWorkStartDate.getTime()) / (1000 * 60 * 60 * 24 * 365.25));
const yearsOfExperiencePT = numberToText(yearsOfExperience, 'pt');
const yearsOfExperienceEN = numberToText(yearsOfExperience, 'en');
const yearsOfExperienceFR = numberToText(yearsOfExperience, 'fr');
const yearsOfRemoteExperiencePT = numberToText(yearsOfRemoteExperience, 'pt');
const yearsOfRemoteExperienceEN = numberToText(yearsOfRemoteExperience, 'en');
const yearsOfRemoteExperienceFR = numberToText(yearsOfRemoteExperience, 'fr');

const city = process.env.CONTACT_ADDRESS_CITY || '';
const state = process.env.CONTACT_ADDRESS_STATE || '';
const countryPT = process.env.CONTACT_ADDRESS_COUNTRY_PT || '';
const countryEN = process.env.CONTACT_ADDRESS_COUNTRY_EN || '';
const countryFR = process.env.CONTACT_ADDRESS_COUNTRY_FR || '';

const resources = {
  pt: {
    translation: {
      home: 'Início',
      role: 'Programador',
      chat: {
        title: 'Converse com Borgez',
        send: 'Enviar',
        welcomeMessage: 'Olá! Como posso ajudar você hoje?',
        errorMessage: 'Desculpe, ocorreu um erro ao processar sua solicitação.',
        typeMessage: 'Digite sua mensagem...',
        cancel: 'Cancelar',
      },
      summary: {
        title: 'Resumo Profissional',
        description: `Trabalho na área de desenvolvimento web há ${yearsOfExperiencePT} anos e estou sempre em busca de conhecimentos a mais. Acumulo experiências com tecnologias diversas, apesar de algumas delas serem em projetos pessoais que normalmente desenvolvo para aprender e desenvolver novos conhecimentos. Atualmente, moro em ${city}, ${state}, ${countryPT} e trabalho remotamente há ${yearsOfRemoteExperiencePT} anos.`,
      },
      contact: {
        title: 'Contato',
        phone: `${process.env.CONTACT_PHONE}`,
        email: `${process.env.CONTACT_EMAIL}`,
        address: `${city}, ${state}, ${countryPT}`,
        linkedin: 'linkedin.com/in/gsborgz',
        github: 'github.com/gsborgz',
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
        nestjs: 'NestJS',
        unity: 'Unity',
        docker: 'Docker',
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
          company: 'Base-B',
          role: 'Desenvolvedor Full Stack',
          period: 'Out 2021 - Presente',
          description: 'Realizando implementações no sistema Base-B utilizando principalmente frameworks como NestJS e Angular. Atuei no desenvolvimento de projetos importantes como Gestão de Licitação e Consulta de Documentos Públicos. Também realizei a implementação de testes unitários e e2e utilizando o test runner nativo do Node.',
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
          description: 'Atuei no desenvolvimento de parte da nova versão do sistema RotaExata, utilizando diversas tecnologias como Node, Vue, Postgres, Mongo etc. Também realizei atividades no sistema interno da empresa, desenvolvido em PHP.',
        }
      },
      study: {
        title: 'Formação',
        tads: {
          institution: 'Unisenai Santa Catarina',
          course: 'Tecnólogo em Análise e Desenvolvimento de Sistemas',
          description: 'Curso superior focado no desenvolvimento de aplicações web.',
          period: 'Fev 2019 - Nov 2021',
        },
        tecInfo: {
          course: 'Técnico em Informática',
          institution: 'SENAI/SC',
          description: 'Curso técnico focado em desenvolvimento de aplicações web e desktop.',
          period: 'Fev 2017 - Nov 2018',
        }
      },
      downloadResume: 'Baixar Currículo',
      toggleLanguage: 'Alternar Idioma',
      toggleTheme: 'Alternar Tema',
      projects: {
        title: 'Projetos',
        inProgress: 'Em Andamento',
        websites: 'Sites',
        pokedex: {
          title: 'Pokedex',
          description: 'Uma simples pokedex com um construtor de times, construída com Next.js e TypeScript.',
        },
        portfolio: {
          title: 'Portfólio (Este site aqui)',
          description: 'Meu portfólio pessoal, construído com Next.js e TypeScript.',
        }
      },
    },
  },
  en: {
    translation: {
      home: 'Home',
      role: 'Programmer',
      chat: {
        title: 'Talk to Borgez',
        send: 'Send',
        welcomeMessage: 'Hello! How can I assist you today?',
        errorMessage: 'Sorry, there was an error processing your request.',
        typeMessage: 'Type your message...',
        cancel: 'Cancel',
      },
      summary: {
        title: 'Professional Summary',
        description: `I've been working with web development for ${yearsOfExperienceEN} years, and I'm always looking for something new to learn. I've gained experience with a variety of technologies, including some from personal projects that I do to learn and develop skills. Currently, I live in ${city}, a large city in the south of ${countryEN} and have been working remotely for ${yearsOfRemoteExperienceEN} years.`,
      },
      contact: {
        title: 'Contact',
        phone: `${process.env.CONTACT_PHONE}`,
        email: `${process.env.CONTACT_EMAIL}`,
        address: `${city}, ${state}, ${countryEN}`,
        linkedin: 'linkedin.com/in/gsborgz',
        github: 'github.com/gsborgz',
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
        nestjs: 'NestJS',
        unity: 'Unity',
        docker: 'Docker',
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
          company: 'Base-B',
          role: 'Full Stack Developer',
          period: 'Oct 2021 - Present',
          description: "Working with implementations on the Base-B system using frameworks like NestJS and Angular. I've worked on the development of important projects like Bidding Management and Public Documents Consulting. I also implemented unit and e2e tests using node native test runner.",
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
          description: 'Worked on the front-end of a new version for the RotaExata system, built with Vuejs and Vuetify. Also worked a little bit on the back-end for this new version, built with technologies like Node.js, Postgres and MongoDB.',
        }
      },
      study: {
        title: 'Education',
        tads: {
          institution: 'Unisenai Santa Catarina',
          course: 'Technologist in Systems Analysis and Development',
          description: 'Higher education course with a focus on web applications development.',
          period: 'Feb 2019 - Nov 2021',
        },
        tecInfo: {
          course: 'Technical Course in Information Technology',
          institution: 'SENAI/SC',
          description: 'Technical course with a focus on desktop and web applications development.',
          period: 'Feb 2017 - Nov 2018',
        }
      },
      downloadResume: 'Download Resume',
      toggleLanguage: 'Toggle Language',
      toggleTheme: 'Toggle Theme',
      projects: {
        title: 'Projects',
        inProgress: 'In Progress',
        websites: 'Websites',
        pokedex: {
          title: 'Pokedex',
          description: 'A simple pokedex with a team builder, built with Next.js and TypeScript.',
        },
        portfolio: {
          title: 'Portfolio (This site)',
          description: 'My personal portfolio, built with Next.js and TypeScript.',
        }
      },
    },
  },
  fr: {
    translation: {
      home: 'Accueil',
      role: 'Programmeur',
      chat: {
        title: 'Discuter avec Borgez',
        send: 'Envoyer',
        welcomeMessage: 'Bonjour! Comment puis-je vous aider aujourd\'hui?',
        errorMessage: 'Désolé, une erreur est survenue lors du traitement de votre demande.',
        typeMessage: 'Tapez votre message...',
        cancel: 'Annuler',
      },
      summary: {
        title: 'Résumé Professionnel',
        description: `Je travaille dans le développement web depuis ${yearsOfExperienceFR} ans et je suis constamment à la recherche de nouvelles connaissances. J’ai acquis de l’expérience avec diverses technologies, notamment à travers des projets personnels que je réalise pour apprendre et progresser. Actuellement, je vis à ${city}, une grande ville au sud de ${countryFR} et je travaille à distance depuis ${yearsOfRemoteExperienceFR} ans.`,
      },
      contact: {
        title: 'Contact',
        phone: `${process.env.CONTACT_PHONE}`,
        email: `${process.env.CONTACT_EMAIL}`,
        address: `${city}, ${state}, ${countryFR}`,
        linkedin: 'linkedin.com/in/gsborgz',
        github: 'github.com/gsborgz',
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
        nestjs: 'NestJS',
        unity: 'Unity',
        docker: 'Docker',
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
          company: 'Base-B',
          role: 'Développeur Full Stack',
          period: 'Oct. 2021 - Présent',
          description: "Participation au développement de fonctionnalités clés du système Base-B à l’aide de NestJS et Angular, incluant la gestion des appels d’offres et la consultation de documents publics. Mise en place de tests unitaires et end-to-end avec le test runner natif de Node.js.",
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
      },
      study: {
        title: 'Formation',
        tads: {
          institution: 'Unisenai Santa Catarina',
          course: 'Technologue en Analyse et Développement des Systèmes',
          description: 'Diplôme de technicien supérieur en Analyse et Développement de Systèmes, avec une spécialisation dans le développement d’applications web.',
          period: 'Fév. 2019 - Nov. 2021',
        },
        tecInfo: {
          course: 'Technicien en Informatique',
          institution: 'SENAI/SC',
          description: 'Formation technique avec une spécialisation dans le développement d’applications desktop et web.',
          period: 'Fév. 2017 - Nov. 2018',
        }
      },
      downloadResume: 'Télécharger le CV',
      toggleLanguage: 'Changer de Langue',
      toggleTheme: 'Changer de Thème',
      projects: {
        title: 'Projets',
        inProgress: 'En cours',
        websites: 'Sites Web',
        pokedex: {
          title: 'Pokedex',
          description: 'Une simple pokedex avec un constructeur de teams, construite avec Next.js et TypeScript.',
        },
        portfolio: {
          title: 'Portfolio (Ce site)',
          description: 'Mon portfolio personnel, construit avec Next.js et TypeScript.',
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
