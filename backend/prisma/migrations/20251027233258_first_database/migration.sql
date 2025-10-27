-- CreateEnum
CREATE TYPE "TypeTarification" AS ENUM ('FORFAIT', 'FONCTIONNALITE', 'TJM', 'MIXTE');

-- CreateEnum
CREATE TYPE "TypeLigne" AS ENUM ('FORFAIT', 'FONCTIONNALITE', 'TJM', 'AUTRE');

-- CreateEnum
CREATE TYPE "StatutDevis" AS ENUM ('BROUILLON', 'ENVOYE', 'ACCEPTE', 'REFUSE', 'EXPIRE');

-- CreateEnum
CREATE TYPE "StatutFacture" AS ENUM ('EN_ATTENTE', 'PAYEE', 'PAYEE_PARTIELLEMENT', 'EN_RETARD', 'ANNULEE');

-- CreateEnum
CREATE TYPE "TypeFacture" AS ENUM ('ACOMPTE', 'FINALE');

-- CreateEnum
CREATE TYPE "ModePaiement" AS ENUM ('VIREMENT', 'CHEQUE', 'ESPECES', 'CARTE_BANCAIRE', 'PAYPAL', 'STRIPE', 'AUTRE');

-- CreateTable
CREATE TABLE "clients" (
    "id" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "prenom" TEXT,
    "entreprise" TEXT,
    "email" TEXT NOT NULL,
    "telephone" TEXT,
    "adresse" TEXT,
    "code_postal" TEXT,
    "ville" TEXT,
    "pays" TEXT NOT NULL DEFAULT 'France',
    "siret" TEXT,
    "tva_intra" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "clients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "devis" (
    "id" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "client_id" TEXT NOT NULL,
    "objet" TEXT NOT NULL,
    "type_tarification" "TypeTarification" NOT NULL DEFAULT 'MIXTE',
    "date_creation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date_validite" TIMESTAMP(3) NOT NULL,
    "date_signature" TIMESTAMP(3),
    "statut" "StatutDevis" NOT NULL DEFAULT 'BROUILLON',
    "signe_par" TEXT,
    "signature_ip" TEXT,
    "signature_data" TEXT,
    "notes" TEXT,
    "conditions" TEXT,
    "montant_ht" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "tva_taux" DECIMAL(5,2) NOT NULL DEFAULT 20,
    "tva_montant" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "montant_ttc" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "acompte_requis" BOOLEAN NOT NULL DEFAULT true,
    "acompte_pourcentage" DECIMAL(5,2) NOT NULL DEFAULT 30,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "devis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lignes_devis" (
    "id" TEXT NOT NULL,
    "devis_id" TEXT NOT NULL,
    "ordre" INTEGER NOT NULL DEFAULT 0,
    "type_ligne" "TypeLigne" NOT NULL,
    "description" TEXT NOT NULL,
    "quantite" DECIMAL(10,2) NOT NULL,
    "unite" TEXT NOT NULL,
    "prix_unitaire" DECIMAL(10,2) NOT NULL,
    "total_ht" DECIMAL(10,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "lignes_devis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "factures" (
    "id" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "client_id" TEXT NOT NULL,
    "devis_id" TEXT NOT NULL,
    "type_facture" "TypeFacture" NOT NULL DEFAULT 'FINALE',
    "objet" TEXT NOT NULL,
    "date_emission" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date_echeance" TIMESTAMP(3) NOT NULL,
    "statut" "StatutFacture" NOT NULL DEFAULT 'EN_ATTENTE',
    "notes" TEXT,
    "conditions" TEXT,
    "montant_ht" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "tva_taux" DECIMAL(5,2) NOT NULL DEFAULT 20,
    "tva_montant" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "montant_ttc" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "montant_paye" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "acompte_deduit" DECIMAL(10,2),
    "facture_acompte_id" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "factures_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lignes_facture" (
    "id" TEXT NOT NULL,
    "facture_id" TEXT NOT NULL,
    "ordre" INTEGER NOT NULL DEFAULT 0,
    "type_ligne" "TypeLigne" NOT NULL,
    "description" TEXT NOT NULL,
    "quantite" DECIMAL(10,2) NOT NULL,
    "unite" TEXT NOT NULL,
    "prix_unitaire" DECIMAL(10,2) NOT NULL,
    "total_ht" DECIMAL(10,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "lignes_facture_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "paiements" (
    "id" TEXT NOT NULL,
    "facture_id" TEXT NOT NULL,
    "date_paiement" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "montant" DECIMAL(10,2) NOT NULL,
    "mode_paiement" "ModePaiement" NOT NULL DEFAULT 'VIREMENT',
    "reference" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "paiements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "parametres" (
    "id" TEXT NOT NULL,
    "nom_entreprise" TEXT NOT NULL,
    "forme_juridique" TEXT,
    "siret" TEXT,
    "tva_intra" TEXT,
    "adresse" TEXT,
    "code_postal" TEXT,
    "ville" TEXT,
    "pays" TEXT NOT NULL DEFAULT 'France',
    "email" TEXT NOT NULL,
    "telephone" TEXT,
    "site_web" TEXT,
    "tjm_defaut" DECIMAL(10,2),
    "tva_taux_defaut" DECIMAL(5,2) NOT NULL DEFAULT 20,
    "delai_validite_devis" INTEGER NOT NULL DEFAULT 30,
    "delai_paiement" INTEGER NOT NULL DEFAULT 30,
    "acompte_pourcentage_defaut" DECIMAL(5,2) NOT NULL DEFAULT 30,
    "delai_paiement_acompte" INTEGER NOT NULL DEFAULT 7,
    "mode_paiement_defaut" "ModePaiement" NOT NULL DEFAULT 'VIREMENT',
    "prefixe_devis" TEXT NOT NULL DEFAULT 'DEV',
    "prefixe_facture_finale" TEXT NOT NULL DEFAULT 'FF',
    "prefixe_facture_acompte" TEXT NOT NULL DEFAULT 'FA',
    "prochain_numero_devis" INTEGER NOT NULL DEFAULT 1,
    "prochain_numero_facture_finale" INTEGER NOT NULL DEFAULT 1,
    "prochain_numero_facture_acompte" INTEGER NOT NULL DEFAULT 1,
    "conditions_generales" TEXT,
    "mentions_legales" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "parametres_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "clients_email_key" ON "clients"("email");

-- CreateIndex
CREATE UNIQUE INDEX "devis_numero_key" ON "devis"("numero");

-- CreateIndex
CREATE UNIQUE INDEX "factures_numero_key" ON "factures"("numero");

-- AddForeignKey
ALTER TABLE "devis" ADD CONSTRAINT "devis_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lignes_devis" ADD CONSTRAINT "lignes_devis_devis_id_fkey" FOREIGN KEY ("devis_id") REFERENCES "devis"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "factures" ADD CONSTRAINT "factures_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "factures" ADD CONSTRAINT "factures_devis_id_fkey" FOREIGN KEY ("devis_id") REFERENCES "devis"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lignes_facture" ADD CONSTRAINT "lignes_facture_facture_id_fkey" FOREIGN KEY ("facture_id") REFERENCES "factures"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "paiements" ADD CONSTRAINT "paiements_facture_id_fkey" FOREIGN KEY ("facture_id") REFERENCES "factures"("id") ON DELETE CASCADE ON UPDATE CASCADE;
