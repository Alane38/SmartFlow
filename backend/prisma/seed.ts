import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Nettoyer la base de données
  await prisma.paiement.deleteMany();
  await prisma.ligneFacture.deleteMany();
  await prisma.ligneDevis.deleteMany();
  await prisma.facture.deleteMany();
  await prisma.devis.deleteMany();
  await prisma.client.deleteMany();
  await prisma.parametres.deleteMany();

  // 1. Créer les paramètres de l'entreprise
  const parametres = await prisma.parametres.create({
    data: {
      nom_entreprise: 'SmartFlow Dev',
      forme_juridique: 'SASU',
      siret: '12345678901234',
      tva_intra: 'FR12345678901',
      adresse: '123 Rue de la République',
      code_postal: '75001',
      ville: 'Paris',
      pays: 'France',
      email: 'contact@smartflow.dev',
      telephone: '+33612345678',
      site_web: 'https://smartflow.dev',
      tjm_defaut: 450,
      tva_taux_defaut: 20,
      delai_validite_devis: 30,
      delai_paiement: 30,
      acompte_pourcentage_defaut: 30,
      delai_paiement_acompte: 7,
      mode_paiement_defaut: 'VIREMENT',
      prefixe_devis: 'DEV',
      prefixe_facture_finale: 'FF',
      prefixe_facture_acompte: 'FA',
      prochain_numero_devis: 1,
      prochain_numero_facture_finale: 1,
      prochain_numero_facture_acompte: 1,
      conditions_generales:
        'Conditions générales de vente...\n1. Paiement à 30 jours\n2. Pénalités de retard applicables\n3. Propriété intellectuelle réservée',
      mentions_legales:
        'Mentions légales...\nSASU au capital de 1000€\nRCS Paris 123456789\nN° TVA: FR12345678901',
    },
  });

  console.log('✅ Paramètres créés:', parametres.nom_entreprise);

  // 2. Créer des clients fictifs
  const clients = await Promise.all([
    prisma.client.create({
      data: {
        nom: 'Martin',
        prenom: 'Sophie',
        entreprise: 'Tech Innovations SARL',
        email: 's.martin@tech-innovations.fr',
        telephone: '+33612345678',
        adresse: '45 Avenue des Champs-Élysées',
        code_postal: '75008',
        ville: 'Paris',
        siret: '12345678901234',
        tva_intra: 'FR12345678901',
      },
    }),
    prisma.client.create({
      data: {
        nom: 'Dubois',
        prenom: 'Pierre',
        entreprise: 'Digital Agency',
        email: 'p.dubois@digital-agency.com',
        telephone: '+33623456789',
        adresse: '12 Rue de la Paix',
        code_postal: '75002',
        ville: 'Paris',
        siret: '98765432109876',
        tva_intra: 'FR98765432109',
      },
    }),
    prisma.client.create({
      data: {
        nom: 'Bernard',
        prenom: 'Marie',
        entreprise: 'StartUp Lab',
        email: 'm.bernard@startup-lab.io',
        telephone: '+33634567890',
        adresse: '78 Boulevard Saint-Germain',
        code_postal: '75006',
        ville: 'Paris',
        siret: '45678901234567',
        tva_intra: 'FR45678901234',
      },
    }),
    prisma.client.create({
      data: {
        nom: 'Petit',
        prenom: 'Lucas',
        entreprise: 'E-commerce Solutions',
        email: 'l.petit@ecommerce-solutions.fr',
        telephone: '+33645678901',
        adresse: '234 Rue Nationale',
        code_postal: '69002',
        ville: 'Lyon',
        siret: '78901234567890',
        tva_intra: 'FR78901234567',
      },
    }),
    prisma.client.create({
      data: {
        nom: 'Rousseau',
        prenom: 'Emma',
        entreprise: 'Marketing Pro',
        email: 'e.rousseau@marketing-pro.fr',
        telephone: '+33656789012',
        adresse: '56 Place Bellecour',
        code_postal: '69002',
        ville: 'Lyon',
        siret: '23456789012345',
        tva_intra: 'FR23456789012',
      },
    }),
  ]);

  console.log(`✅ ${clients.length} clients créés`);

  // 3. Créer des devis
  const devis = await Promise.all([
    // Devis 1 - Pour Tech Innovations (FORFAIT)
    prisma.devis.create({
      data: {
        numero: 'DEV-2025-001',
        client_id: clients[0].id,
        objet: 'Développement site web e-commerce',
        type_tarification: 'FORFAIT',
        date_validite: new Date('2025-12-15'),
        statut: 'ACCEPTE',
        date_signature: new Date('2025-11-10'),
        signe_par: 'Sophie Martin',
        signature_ip: '192.168.1.100',
        notes: 'Projet complet avec intégration paiement',
        conditions: 'Acompte 30% à la signature',
        montant_ht: 5000,
        tva_taux: 20,
        tva_montant: 1000,
        montant_ttc: 6000,
        acompte_requis: true,
        acompte_pourcentage: 30,
        lignes: {
          create: [
            {
              ordre: 1,
              type_ligne: 'FORFAIT',
              description: 'Design UI/UX complet',
              quantite: 1,
              unite: 'lot',
              prix_unitaire: 1500,
              total_ht: 1500,
            },
            {
              ordre: 2,
              type_ligne: 'FORFAIT',
              description: 'Développement frontend React',
              quantite: 1,
              unite: 'lot',
              prix_unitaire: 2000,
              total_ht: 2000,
            },
            {
              ordre: 3,
              type_ligne: 'FORFAIT',
              description: 'Développement backend Node.js',
              quantite: 1,
              unite: 'lot',
              prix_unitaire: 1500,
              total_ht: 1500,
            },
          ],
        },
      },
    }),
    // Devis 2 - Pour Digital Agency (TJM)
    prisma.devis.create({
      data: {
        numero: 'DEV-2025-002',
        client_id: clients[1].id,
        objet: 'Mission de consulting technique',
        type_tarification: 'TJM',
        date_validite: new Date('2025-12-20'),
        statut: 'ENVOYE',
        notes: 'Mission de 10 jours sur site',
        montant_ht: 4500,
        tva_taux: 20,
        tva_montant: 900,
        montant_ttc: 5400,
        acompte_requis: false,
        acompte_pourcentage: 0,
        lignes: {
          create: [
            {
              ordre: 1,
              type_ligne: 'TJM',
              description: 'Consultant senior - Architecture cloud',
              quantite: 10,
              unite: 'jours',
              prix_unitaire: 450,
              total_ht: 4500,
            },
          ],
        },
      },
    }),
    // Devis 3 - Pour StartUp Lab (MIXTE)
    prisma.devis.create({
      data: {
        numero: 'DEV-2025-003',
        client_id: clients[2].id,
        objet: 'Application mobile de livraison',
        type_tarification: 'MIXTE',
        date_validite: new Date('2025-12-31'),
        statut: 'BROUILLON',
        notes: 'Application iOS et Android',
        montant_ht: 8500,
        tva_taux: 20,
        tva_montant: 1700,
        montant_ttc: 10200,
        acompte_requis: true,
        acompte_pourcentage: 30,
        lignes: {
          create: [
            {
              ordre: 1,
              type_ligne: 'FORFAIT',
              description: 'Design UI/UX complet',
              quantite: 1,
              unite: 'lot',
              prix_unitaire: 1500,
              total_ht: 1500,
            },
            {
              ordre: 2,
              type_ligne: 'TJM',
              description: 'Développement React Native',
              quantite: 15,
              unite: 'jours',
              prix_unitaire: 400,
              total_ht: 6000,
            },
          ],
        },
      },
    }),
    // Devis 4 - Pour E-commerce Solutions (FONCTIONNALITE)
    prisma.devis.create({
      data: {
        numero: 'DEV-2025-004',
        client_id: clients[3].id,
        objet: 'Module de gestion des stocks',
        type_tarification: 'FONCTIONNALITE',
        date_validite: new Date('2025-11-30'),
        statut: 'REFUSE',
        notes: 'Intégration avec ERP existant',
        montant_ht: 3200,
        tva_taux: 20,
        tva_montant: 640,
        montant_ttc: 3840,
        acompte_requis: true,
        acompte_pourcentage: 30,
        lignes: {
          create: [
            {
              ordre: 1,
              type_ligne: 'FONCTIONNALITE',
              description: 'Module inventaire',
              quantite: 1,
              unite: 'module',
              prix_unitaire: 1200,
              total_ht: 1200,
            },
            {
              ordre: 2,
              type_ligne: 'FONCTIONNALITE',
              description: 'Module approvisionnement',
              quantite: 1,
              unite: 'module',
              prix_unitaire: 1000,
              total_ht: 1000,
            },
            {
              ordre: 3,
              type_ligne: 'FONCTIONNALITE',
              description: 'Module rapports',
              quantite: 1,
              unite: 'module',
              prix_unitaire: 1000,
              total_ht: 1000,
            },
          ],
        },
      },
    }),
  ]);

  console.log(`✅ ${devis.length} devis créés`);

  // 4. Créer des factures
  const factures = await Promise.all([
    // Facture acompte pour Devis 1
    prisma.facture.create({
      data: {
        numero: 'FA-2025-001',
        client_id: clients[0].id,
        devis_id: devis[0].id,
        type_facture: 'ACOMPTE',
        objet: 'Acompte - Développement site web e-commerce',
        date_emission: new Date('2025-11-11'),
        date_echeance: new Date('2025-11-18'),
        statut: 'PAYEE',
        notes: 'Acompte 30% sur devis DEV-2025-001',
        montant_ht: 1500,
        tva_taux: 20,
        tva_montant: 300,
        montant_ttc: 1800,
        montant_paye: 1800,
        lignes: {
          create: [
            {
              ordre: 1,
              type_ligne: 'FORFAIT',
              description: 'Acompte 30% - Développement site web e-commerce',
              quantite: 1,
              unite: 'lot',
              prix_unitaire: 1500,
              total_ht: 1500,
            },
          ],
        },
        paiements: {
          create: [
            {
              date_paiement: new Date('2025-11-15'),
              montant: 1800,
              mode_paiement: 'VIREMENT',
              reference: 'VIR20251115001',
              notes: 'Paiement acompte reçu',
            },
          ],
        },
      },
    }),
    // Facture finale pour Devis 1
    prisma.facture.create({
      data: {
        numero: 'FF-2025-001',
        client_id: clients[0].id,
        devis_id: devis[0].id,
        type_facture: 'FINALE',
        objet: 'Facture finale - Développement site web e-commerce',
        date_emission: new Date('2025-11-25'),
        date_echeance: new Date('2025-12-25'),
        statut: 'EN_ATTENTE',
        notes: 'Solde - Déduction acompte 1800€',
        montant_ht: 5000,
        tva_taux: 20,
        tva_montant: 1000,
        montant_ttc: 6000,
        montant_paye: 1800,
        acompte_deduit: 1800,
        facture_acompte_id: 'FA-2025-001',
        lignes: {
          create: [
            {
              ordre: 1,
              type_ligne: 'FORFAIT',
              description: 'Design UI/UX complet',
              quantite: 1,
              unite: 'lot',
              prix_unitaire: 1500,
              total_ht: 1500,
            },
            {
              ordre: 2,
              type_ligne: 'FORFAIT',
              description: 'Développement frontend React',
              quantite: 1,
              unite: 'lot',
              prix_unitaire: 2000,
              total_ht: 2000,
            },
            {
              ordre: 3,
              type_ligne: 'FORFAIT',
              description: 'Développement backend Node.js',
              quantite: 1,
              unite: 'lot',
              prix_unitaire: 1500,
              total_ht: 1500,
            },
          ],
        },
      },
    }),
    // Facture pour Devis 2 (pas d'acompte)
    prisma.facture.create({
      data: {
        numero: 'FF-2025-002',
        client_id: clients[1].id,
        devis_id: devis[1].id,
        type_facture: 'FINALE',
        objet: 'Facture - Mission consulting technique',
        date_emission: new Date('2025-11-20'),
        date_echeance: new Date('2025-12-20'),
        statut: 'PAYEE_PARTIELLEMENT',
        notes: 'Mission 10 jours consulting',
        montant_ht: 4500,
        tva_taux: 20,
        tva_montant: 900,
        montant_ttc: 5400,
        montant_paye: 2700,
        lignes: {
          create: [
            {
              ordre: 1,
              type_ligne: 'TJM',
              description: 'Consultant senior - Architecture cloud (10 jours)',
              quantite: 10,
              unite: 'jours',
              prix_unitaire: 450,
              total_ht: 4500,
            },
          ],
        },
        paiements: {
          create: [
            {
              date_paiement: new Date('2025-11-22'),
              montant: 2700,
              mode_paiement: 'VIREMENT',
              reference: 'VIR20251122001',
              notes: 'Paiement partiel (50%)',
            },
          ],
        },
      },
    }),
  ]);

  console.log(`✅ ${factures.length} factures créées`);

  // Mettre à jour les numéros suivants dans les paramètres
  await prisma.parametres.update({
    where: { id: parametres.id },
    data: {
      prochain_numero_devis: 5,
      prochain_numero_facture_finale: 3,
      prochain_numero_facture_acompte: 2,
    },
  });

  console.log('✅ Numéros suivants mis à jour');

  console.log('\n🎉 Database seeding completed successfully!');
  console.log('\n📊 Summary:');
  console.log(`\n- Paramètres: 1`);
  console.log(`\n- Clients: ${clients.length}`);
  console.log(`\n- Devis: ${devis.length}`);
  console.log(`\n- Factures: ${factures.length}`);
  // console.log(
  //   `\n- Lignes devis: ${devis.reduce((sum, d) => sum + ((d as any).lignes?.length || 0), 0)}`,
  // );
  // console.log(
  //   `\n- Lignes factures: ${factures.reduce((sum, f) => sum + ((f as any).lignes?.length || 0), 0)}`,
  // );
  // console.log(
  //   `\n- Paiements: ${factures.reduce((sum, f) => sum + ((f as any).paiements?.length || 0), 0)}`,
  // );
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
