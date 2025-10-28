import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional } from 'class-validator';

export class CreateClientDto {
  @ApiProperty({
    description: 'Nom du client',
    example: 'Dupont',
  })
  @IsString()
  nom: string;

  @ApiPropertyOptional({
    description: 'Prénom du client',
    example: 'Jean',
  })
  @IsOptional()
  @IsString()
  prenom?: string;

  @ApiPropertyOptional({
    description: 'Nom de l\'entreprise',
    example: 'SARL Dupont',
  })
  @IsOptional()
  @IsString()
  entreprise?: string;

  @ApiProperty({
    description: 'Email du client',
    example: 'jean.dupont@example.com',
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
    description: 'Adresse',
    example: '123 rue de la Paix',
  })
  @IsOptional()
  @IsString()
  adresse?: string;

  @ApiPropertyOptional({
    description: 'Code postal',
    example: '75001',
  })
  @IsOptional()
  @IsString()
  code_postal?: string;

  @ApiPropertyOptional({
    description: 'Ville',
    example: 'Paris',
  })
  @IsOptional()
  @IsString()
  ville?: string;

  @ApiPropertyOptional({
    description: 'Pays',
    example: 'France',
    default: 'France',
  })
  @IsOptional()
  @IsString()
  pays?: string;

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
}
