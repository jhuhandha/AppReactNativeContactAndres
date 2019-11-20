import {
  Controller,
  Get,
  HttpException,
  Post,
  HttpStatus,
  UseInterceptors,
  UploadedFile,
  Body,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { writeFileSync } from 'fs';
import { join } from 'path';
import { Client, Notification } from 'onesignal-node';

import { diskStorage } from 'multer';
import { IContact } from './model/contact.model';
import { ContactService } from './contact.service';
import { ContactCreateDto } from './dto/contact-create-dto';
import { editFileName } from '../functions/agreement.functions';

@Controller('contact')
export class ContactController {
  constructor(private readonly _contactService: ContactService) {}

  @Get()
  async getContacts(): Promise<IContact[]> {
    var myClient = new Client({
      userAuthKey: 'Y2JiYzdhNTEtNDdmZi00ZDQxLTg5MTItMDYzMTk2NTk5ZTc5',
      // note that "app" must have "appAuthKey" and "appId" keys
      app: {
        appAuthKey: 'NTE4NTY1ZGMtZmZmMS00MTRiLTk1OGMtNGVhY2M0ZDc3YjVh',
        appId: 'e60ff514-98e1-473c-bcf9-9104ea271768',
      },
    });

    var firstNotification = new Notification({
      contents: {
        en: 'Test notification',
        tr: 'Test mesajı',
      },
      included_segments: ['Active Users', 'Inactive Users'],
    });
    firstNotification.postBody['data'] = { abc: '123', foo: 'bar' };

    // myClient.sendNotification(firstNotification, (err, httpResponse,data) => {
    //     if (err) {
    //         console.log('Something went wrong...');
    //     } else {
    //         console.log(data, httpResponse.statusCode);
    //     }
    // });

    const contact = await this._contactService.getContacts();
    return contact;
  }

  @Post()
  async createContact(@Body() datos): Promise<any> {
    await writeFileSync(
      join(__dirname, '..', 'files') + '/contacts/' + datos.name + '.png',
      datos.img,
      { encoding: 'base64' },
    );

    datos.img = datos.name + '.png';
    const contact = await this._contactService.createContact(datos);
    if (!contact) {
      throw new HttpException(
        'Ocurrio un error al crear el contacto',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return contact;
  }
}
