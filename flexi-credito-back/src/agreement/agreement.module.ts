import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AgreementService } from './agreement.service';
import { AgreementController } from './agreement.controller';
import { agreementSchema } from './model/agreement.model';


@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: 'Agreement', schema: agreementSchema, collection: 'agreements'}]
    )
  ],
  providers: [AgreementService],
  controllers: [AgreementController]
})
export class AgreementModule {}
