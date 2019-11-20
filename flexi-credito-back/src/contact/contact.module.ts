import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {ContactController} from './contact.controller';
import {ContactService} from './contact.service';
import {contactSchema} from './model/contact.model';


@Module({
  imports: [
    MongooseModule.forFeature([
      {name: 'Contact', schema: contactSchema, collection: 'contacts'},
    ]),
  ],
  providers: [ContactService],
  controllers: [ContactController],
})
export class ContactModule {}
