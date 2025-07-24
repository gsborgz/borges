import i18n from 'i18next';
import { title } from 'process';
import { initReactI18next } from 'react-i18next';

const resources = {
  pt: {
    translation: {
      role: 'Programador',
      summary: {
        title: 'Resumo Profissional',
        description: 'Trabalho na área de desenvolvimento web há 6 anos e estou sempre em busca de um conhecimento a mais, seja na área da programação ou até em áreas que possuem quase nenhuma relação com isso. Acumulo experiências com tecnologias diversas, apesar de algumas delas serem apenas em projetos pessoais que normalmente desenvolvo para aprender e desenvolver novos conhecimentos.',
      },
      contact: {
        title: 'Contato',
        phone: '+55 (47) 996482295',
        email: 'borgesgabrielsilva@gmail.com',
        address: 'Rua Júlia Teixeira Delmonego, 45 - João Costa, Joinville - SC, 89209-028',
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
      }
    },
  },
  en: {
    translation: {
      role: 'Programmer',
      summary: {
        title: 'Professional Summary',
        description: 'I have been working in web development for 6 years and I am always looking for more knowledge, whether in programming or in areas that have almost no relation to it. I accumulate experiences with various technologies, although some of them are only in personal projects that I usually develop to learn and develop new skills.',
      },
      contact: {
        title: 'Contact',
        phone: '+55 (47) 996482295',
        email: 'borgesgabrielsilva@gmail.com',
        address: '45 Júlia Teixeira Delmonego St., Joinville, SC, Brazil, 89209-028',
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
      }
    },
  },
  fr: {
    translation: {
      role: 'Programmeur',
      summary: {
        title: 'Résumé Professionnel',
        description: 'Je travaille dans le développement web depuis 6 ans et je suis toujours à la recherche de nouvelles connaissances, que ce soit dans la programmation ou dans des domaines qui ont presque aucune relation avec cela. J’accumule des expériences avec diverses technologies, bien que certaines d’entre elles ne soient que dans des projets personnels que je développe généralement pour apprendre et développer de nouvelles compétences.',
      },
      contact: {
        title: 'Contact',
        phone: '+55 (47) 996482295',
        email: 'borgesgabrielsilva@gmail.com',
        address: '45 Rue Júlia Teixeira Delmonego, Joinville, SC, Brésil, 89209-028',
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
