import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsOptional,
  IsNumber,
  IsDecimal,
  IsEnum,
  Min,
} from 'class-validator';
import { ModePaiement } from '@prisma/client';

export class CreateParametresDto {
  @ApiProperty({
    description: 'Nom de l\'entreprise',
    example: 'SARL TechSolutions',
  })
  @IsString()
  nom_entreprise: string;

  @ApiPropertyOptional({
    description: 'Forme juridique de l\'entreprise',
    example: 'SARL',
  })
  @IsOptional()
  @IsString()
  forme_juridique?: string;

  @ApiPropertyOptional({
    description: 'Numéro SIRET',
    example: '12345678901234',
  })
  @IsOptional()
  @IsString()
  siret?: string;

  @ApiPropertyOptional({
    description: 'Numéro de TVA intracommunautaire',
    example: 'FR12345678901',
  })
  @IsOptional()
  @IsString()
  tva_intra?: string;

  @ApiPropertyOptional({ description: 'Adresse', example: '123 rue de la Paix' })
  @IsOptional()
  @IsString()
  adresse?: string;

  @ApiPropertyOptional({ description: 'Code postal', example: '75001' })
  @IsOptional()
  @IsString()
  code_postal?: string;

  @ApiPropertyOptional({ description: 'Ville', example: 'Paris' })
  @IsOptional()
  @IsString()
  ville?: string;

  @ApiPropertyOptional({ description: 'Pays', example: 'France', default: 'France' })
  @IsOptional()
  @IsString()
  pays?: string;

  @ApiProperty({
    description: 'Email de contact',
    example: 'contact@techsolutions.fr',
  })
  @IsEmail()
  email: string;

  @ApiPropertyOptional({
    description: 'Numéro de téléphone',
    example: '+33123456789',
  })
  @IsOptional()
  @IsString()
  telephone?: string;

  @ApiPropertyOptional({
    description: 'Site web',
    example: 'https://www.techsolutions.fr',
  })
  @IsOptional()
  @IsString()
  site_web?: string;

  @ApiPropertyOptional({
    description: 'Taux journalier moyen (TJM) par défaut',
    example: 500.0,
  })
  @IsOptional()
  @IsNumber()
  tjm_defaut?: number;

  @ApiPropertyOptional({
    description: 'Taux de TVA par défaut (%)',
    example: 20.0,
    default: 20.0,
  })
  @IsOptional()
  @IsNumber()
  tva_taux_defaut?: number;

  @ApiPropertyOptional({
    description: 'Délai de validité des devis (jours)',
    example: 30,
    default: 30,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  delai_validite_devis?: number;

  @ApiPropertyOptional({
    description: 'Délai de paiement des factures (jours)',
    example: 30,
    default: 30,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  delai_paiement?: number;

  @ApiPropertyOptional({
    description: 'Pourcentage d\'acompte par défaut (%)',
    example: 30.0,
    default: 30.0,
  })
  @IsOptional()
  @IsNumber()
  acompte_pourcentage_defaut?: number;

  @ApiPropertyOptional({
    description: 'Délai de paiement de l\'acompte (jours)',
    example: 7,
    default: 7,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  delai_paiement_acompte?: number;

  @ApiPropertyOptional({
    description: 'Mode de paiement par défaut',
    enum: ModePaiement,
    example: ModePaiement.VIREMENT,
    default: ModePaiement.VIREMENT,
  })
  @IsOptional()
  @IsEnum(ModePaiement)
  mode_paiement_defaut?: ModePaiement;

  @ApiPropertyOptional({
    description: 'Préfixe pour les numéros de devis',
    example: 'DEV',
    default: 'DEV',
  })
  @IsOptional()
  @IsString()
  prefixe_devis?: string;

  @ApiPropertyOptional({
    description: 'Préfixe pour les numéros de factures finales',
    example: 'FF',
    default: 'FF',
  })
  @IsOptional()
  @IsString()
  prefixe_facture_finale?: string;

  @ApiPropertyOptional({
    description: 'Préfixe pour les numéros de factures d\'acompte',
    example: 'FA',
    default: 'FA',
  })
  @IsOptional()
  @IsString()
  prefixe_facture_acompte?: string;

  @ApiPropertyOptional({
    description: 'Prochain numéro de devis',
    example: 1,
    default: 1,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  prochain_numero_devis?: number;

  @ApiPropertyOptional({
    description: 'Prochain numéro de facture finale',
    example: 1,
    default: 1,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  prochain_numero_facture_finale?: number;

  @ApiPropertyOptional({
    description: 'Prochain numéro de facture d\'acompte',
    example: 1,
    default: 1,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  prochain_numero_facture_acompte?: number;

  @ApiPropertyOptional({
    description: 'Conditions générales de vente',
    example: 'Les présentes conditions générales...',
  })
  @IsOptional()
  @IsString()
  conditions_generales?: string;

  @ApiPropertyOptional({
    description: 'Mentions légales',
    example: 'SARL au capital de...',
  })
  @IsOptional()
  @IsString()
  mentions_legales?: string;
}
