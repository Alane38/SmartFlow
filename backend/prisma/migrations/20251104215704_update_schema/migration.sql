/*
  Warnings:

  - You are about to alter the column `montant_ht` on the `devis` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `tva_taux` on the `devis` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(5,2)`.
  - You are about to alter the column `tva_montant` on the `devis` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `montant_ttc` on the `devis` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `acompte_pourcentage` on the `devis` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(5,2)`.
  - You are about to alter the column `montant_ht` on the `factures` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `tva_taux` on the `factures` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(5,2)`.
  - You are about to alter the column `tva_montant` on the `factures` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `montant_ttc` on the `factures` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `montant_paye` on the `factures` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `acompte_deduit` on the `factures` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `quantite` on the `lignes_devis` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `prix_unitaire` on the `lignes_devis` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `total_ht` on the `lignes_devis` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `quantite` on the `lignes_facture` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `prix_unitaire` on the `lignes_facture` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `total_ht` on the `lignes_facture` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `montant` on the `paiements` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `tjm_defaut` on the `parametres` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `tva_taux_defaut` on the `parametres` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(5,2)`.
  - You are about to alter the column `acompte_pourcentage_defaut` on the `parametres` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(5,2)`.

*/
-- AlterTable
ALTER TABLE "devis" ALTER COLUMN "montant_ht" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "tva_taux" SET DATA TYPE DECIMAL(5,2),
ALTER COLUMN "tva_montant" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "montant_ttc" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "acompte_pourcentage" SET DATA TYPE DECIMAL(5,2);

-- AlterTable
ALTER TABLE "factures" ALTER COLUMN "montant_ht" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "tva_taux" SET DATA TYPE DECIMAL(5,2),
ALTER COLUMN "tva_montant" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "montant_ttc" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "montant_paye" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "acompte_deduit" SET DATA TYPE DECIMAL(10,2);

-- AlterTable
ALTER TABLE "lignes_devis" ALTER COLUMN "quantite" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "prix_unitaire" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "total_ht" SET DATA TYPE DECIMAL(10,2);

-- AlterTable
ALTER TABLE "lignes_facture" ALTER COLUMN "quantite" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "prix_unitaire" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "total_ht" SET DATA TYPE DECIMAL(10,2);

-- AlterTable
ALTER TABLE "paiements" ALTER COLUMN "montant" SET DATA TYPE DECIMAL(10,2);

-- AlterTable
ALTER TABLE "parametres" ALTER COLUMN "tjm_defaut" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "tva_taux_defaut" SET DATA TYPE DECIMAL(5,2),
ALTER COLUMN "acompte_pourcentage_defaut" SET DATA TYPE DECIMAL(5,2);
