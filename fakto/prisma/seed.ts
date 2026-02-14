import { prisma } from '../lib/prisma';

async function main() {
  console.log('🌱 Starting seed...');

  // Clear existing data
  await prisma.evaluationAnswer.deleteMany();
  await prisma.evaluationQuestion.deleteMany();
  await prisma.evaluationDocument.deleteMany();
  await prisma.evaluation.deleteMany();
  await prisma.qcmAnswer.deleteMany();
  await prisma.qcmQuestion.deleteMany();
  await prisma.qcm.deleteMany();
  await prisma.course.deleteMany();
  await prisma.formationContent.deleteMany();
  await prisma.formationObjective.deleteMany();
  await prisma.formation.deleteMany();

  // Create formations with workflow elements
  const formation1 = await prisma.formation.create({
    data: {
      name: 'La LCB-FT dans le domaine de l\'assurance en 2026',
      type: 'Catalogue',
      modalities: ['E-learning', 'Distanciel'],
      status: 'Publié',
      description: 'La LCB FT dans le domaine de l\'assurance en 2026 | tout savoir en 1h',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop',
      progress: 20,
      elementsCount: 3,
      objectives: {
        create: [
          {
            text: 'Comprendre les enjeux, obligations légales et responsabilités liés à la LCB-FT en assurance',
            order: 0,
          },
          {
            text: 'Savoir appliquer les mesures de vigilance, détecter les situations à risque et réaliser les obligations déclaratives',
            order: 1,
          },
          {
            text: 'Intégrer les bons réflexes pour se conformer aux attentes de l\'ACPR et de TRACFIN',
            order: 2,
          },
        ],
      },
      content: {
        create: [
          {
            text: 'Vigilance et connaissance du client : KYC, vigilance initiale et renforcée, identification du bénéficiaire effectif.',
            order: 0,
          },
          {
            text: 'Détection et traitement : signaux d\'alerte, analyse des flux, obligations TRACFIN, gel des avoirs et documentation.',
            order: 1,
          },
          {
            text: 'Contrôles et responsabilités : attentes ACPR, organisation interne (procédures, formation, contrôles) et sanctions possibles.',
            order: 2,
          },
        ],
      },
      qcms: {
        create: [
          {
            title: 'QCM d\'entrée en formation',
            description: 'Évaluez vos connaissances avant de commencer',
            duration: '10 min',
            order: 0,
            questions: {
              create: [
                {
                  text: 'Que signifie LCB-FT ?',
                  order: 0,
                  answers: {
                    create: [
                      {
                        text: 'Lutte Contre le Blanchiment et le Financement du Terrorisme',
                        isCorrect: true,
                        detailedResponse: 'Correct ! La LCB-FT désigne bien la Lutte Contre le Blanchiment et le Financement du Terrorisme.',
                      },
                      {
                        text: 'Loi sur le Commerce et le Blanchiment Financier',
                        isCorrect: false,
                        detailedResponse: 'Incorrect. Il s\'agit de la Lutte Contre le Blanchiment et le Financement du Terrorisme.',
                      },
                      {
                        text: 'Législation sur les Contrôles Bancaires et Financiers',
                        isCorrect: false,
                        detailedResponse: 'Incorrect. LCB-FT signifie Lutte Contre le Blanchiment et le Financement du Terrorisme.',
                      },
                      {
                        text: 'Limite de Crédit Bancaire et Fiscal Territorial',
                        isCorrect: false,
                        detailedResponse: 'Incorrect. C\'est la Lutte Contre le Blanchiment et le Financement du Terrorisme.',
                      },
                    ],
                  },
                },
                {
                  text: 'Quelle autorité contrôle la LCB-FT en France ?',
                  order: 1,
                  answers: {
                    create: [
                      {
                        text: 'L\'ACPR (Autorité de Contrôle Prudentiel et de Résolution)',
                        isCorrect: true,
                        detailedResponse: 'Exact ! L\'ACPR est l\'autorité de contrôle en matière de LCB-FT.',
                      },
                      {
                        text: 'La Banque de France uniquement',
                        isCorrect: false,
                        detailedResponse: 'Incorrect. C\'est l\'ACPR qui contrôle la LCB-FT.',
                      },
                      {
                        text: 'Le Ministère de l\'Économie',
                        isCorrect: false,
                        detailedResponse: 'Non, c\'est l\'ACPR qui est l\'autorité de contrôle.',
                      },
                      {
                        text: 'L\'AMF (Autorité des Marchés Financiers)',
                        isCorrect: false,
                        detailedResponse: 'Incorrect. L\'ACPR est responsable du contrôle LCB-FT.',
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
      courses: {
        create: [
          {
            title: 'Commencer la formation',
            description: 'Formation complète sur la LCB-FT en assurance',
            videoUrl: 'https://example.com/video/lcb-ft',
            duration: '45 min',
            order: 1,
          },
        ],
      },
      evaluations: {
        create: [
          {
            title: 'Évaluation de compétences (Fin de formation)',
            description: 'Validez vos acquis',
            detailedDescription: 'Cette évaluation finale vous permettra de valider l\'ensemble des compétences acquises durant la formation.',
            duration: '15 min',
            order: 2,
            documents: {
              create: [
                {
                  title: 'Guide de référence LCB-FT',
                  url: 'https://example.com/docs/guide-lcb-ft.pdf',
                  order: 0,
                },
                {
                  title: 'Grille d\'analyse des risques',
                  url: 'https://example.com/docs/grille-risques.pdf',
                  order: 1,
                },
              ],
            },
            questions: {
              create: [
                {
                  text: 'Quelles sont les trois piliers de la LCB-FT ?',
                  order: 0,
                  answers: {
                    create: [
                      {
                        text: 'Vigilance, Détection, Déclaration',
                        isCorrect: true,
                        detailedResponse: 'Parfait ! Les trois piliers sont bien la vigilance, la détection et la déclaration.',
                      },
                      {
                        text: 'Contrôle, Sanction, Prévention',
                        isCorrect: false,
                        detailedResponse: 'Non, il s\'agit de Vigilance, Détection et Déclaration.',
                      },
                      {
                        text: 'Analyse, Reporting, Conformité',
                        isCorrect: false,
                        detailedResponse: 'Incorrect. Les piliers sont Vigilance, Détection et Déclaration.',
                      },
                      {
                        text: 'Documentation, Formation, Audit',
                        isCorrect: false,
                        detailedResponse: 'Non, les trois piliers sont Vigilance, Détection et Déclaration.',
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  });

  const formation2 = await prisma.formation.create({
    data: {
      name: 'Formation React Avancé',
      type: 'Catalogue',
      modalities: ['E-learning', 'Distanciel'],
      status: 'Publié',
      description: 'Maîtrisez React.js et ses concepts avancés',
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop',
      progress: 75,
      elementsCount: 2,
      objectives: {
        create: [
          {
            text: 'Maîtriser les hooks React avancés',
            order: 0,
          },
          {
            text: 'Comprendre les patterns de performance',
            order: 1,
          },
        ],
      },
      content: {
        create: [
          {
            text: 'Hooks personnalisés et optimisation',
            order: 0,
          },
          {
            text: 'Context API et state management',
            order: 1,
          },
        ],
      },
      courses: {
        create: [
          {
            title: 'Introduction à React',
            description: 'Bases de React',
            videoUrl: 'https://example.com/video/react-intro',
            duration: '30 min',
            order: 0,
          },
          {
            title: 'Hooks avancés',
            description: 'useCallback, useMemo, useReducer',
            videoUrl: 'https://example.com/video/react-hooks',
            duration: '45 min',
            order: 1,
          },
        ],
      },
    },
  });

  const formation3 = await prisma.formation.create({
    data: {
      name: 'Leadership & Management',
      type: 'Catalogue',
      modalities: ['Présentiel', 'Distanciel'],
      status: 'Publié',
      description: 'Développez vos compétences en leadership',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop',
      progress: 0,
      elementsCount: 1,
      objectives: {
        create: [
          {
            text: 'Développer son leadership personnel',
            order: 0,
          },
        ],
      },
      content: {
        create: [
          {
            text: 'Les fondamentaux du leadership',
            order: 0,
          },
        ],
      },
      courses: {
        create: [
          {
            title: 'Fondamentaux du leadership',
            description: 'Introduction au leadership',
            videoUrl: 'https://example.com/video/leadership',
            duration: '60 min',
            order: 0,
          },
        ],
      },
    },
  });

  const formation4 = await prisma.formation.create({
    data: {
      name: 'Formation React Personnalisée - Entreprise A',
      subtitle: 'Entreprise A',
      type: 'Sur-mesure',
      modalities: ['E-learning'],
      status: 'Publié',
      description: 'Formation personnalisée pour Entreprise A',
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop',
      progress: 100,
      elementsCount: 1,
      objectives: {
        create: [
          {
            text: 'Adapter React aux besoins de l\'entreprise',
            order: 0,
          },
        ],
      },
      content: {
        create: [
          {
            text: 'Architecture spécifique entreprise',
            order: 0,
          },
        ],
      },
      courses: {
        create: [
          {
            title: 'Module personnalisé',
            description: 'Contenu adapté aux besoins spécifiques',
            videoUrl: 'https://example.com/video/react-custom',
            duration: '120 min',
            order: 0,
          },
        ],
      },
    },
  });

  const formation5 = await prisma.formation.create({
    data: {
      name: 'Cybersécurité Entreprise',
      type: 'Catalogue',
      modalities: ['Présentiel'],
      status: 'Brouillon',
      description: 'Sécurisez votre infrastructure',
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=300&fit=crop',
      progress: 0,
      objectives: {
        create: [
          {
            text: 'Comprendre les menaces cybersécurité',
            order: 0,
          },
        ],
      },
      content: {
        create: [
          {
            text: 'Fondamentaux de la cybersécurité',
            order: 0,
          },
        ],
      },
    },
  });

  const formation6 = await prisma.formation.create({
    data: {
      name: 'Excel pour débutants',
      type: 'Catalogue',
      modalities: ['E-learning'],
      status: 'Publié',
      description: 'Maîtrisez Excel de A à Z',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
      progress: 50,
      elementsCount: 1,
      objectives: {
        create: [
          {
            text: 'Maîtriser les fonctions de base Excel',
            order: 0,
          },
        ],
      },
      content: {
        create: [
          {
            text: 'Formules et fonctions Excel',
            order: 0,
          },
        ],
      },
      courses: {
        create: [
          {
            title: 'Introduction à Excel',
            description: 'Prise en main du logiciel',
            videoUrl: 'https://example.com/video/excel-intro',
            duration: '20 min',
            order: 0,
          },
        ],
      },
    },
  });

  console.log('✅ Seed completed successfully!');
  console.log(`Created 6 formations with workflow elements`);
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:');
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
