import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CreditoService } from './credito.service';
import { CreditoController } from './credito.controller';
import { creditSchema, creditStatus } from './model/credito.model';

@Module({
  imports:[
    MongooseModule.forFeature([
      {
        name: 'Credit', schema: creditSchema, collection: 'credits',
      },
      {
        name: 'CreditStatus', schema: creditStatus, collection: 'CreditStatus'
      }
    ])
  ],
  providers: [CreditoService],
  controllers: [CreditoController]
})
export class CreditoModule {}
