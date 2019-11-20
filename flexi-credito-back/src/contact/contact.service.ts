import { Injectable } from '@nestjs/common';
import { IContact } from './model/contact.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ContactCreateDto } from './dto/contact-create-dto';


@Injectable()
export class ContactService {

    constructor(
        @InjectModel('Contact') readonly contactModel : Model<IContact>
    ){}

    async getContacts(): Promise<IContact[]>{
        try{
            return await this.contactModel.find().exec();
        }catch(Exception){
            return null
        }
    }

    async createContact(
        contactCreateDto: ContactCreateDto
    ): Promise<any>{
        const contact = this.contactModel(contactCreateDto)
        try{
            return await contact.save()
        }catch(Exception){
            return null
        }
    }

}
