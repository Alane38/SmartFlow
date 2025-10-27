import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ParametresModule } from './parametres/parametres.module';

@Module({
  imports: [PrismaModule, ParametresModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
