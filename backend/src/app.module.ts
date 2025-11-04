import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ParametresModule } from './parametres/parametres.module';
import { ClientsModule } from './clients/clients.module';
import { DevisModule } from './devis/devis.module';
import { FacturesModule } from './factures/factures.module';

@Module({
  imports: [PrismaModule, ParametresModule, ClientsModule, DevisModule, FacturesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
