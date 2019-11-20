import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IAgreement } from './model/agreement.model';
import { agreementUpdateDto } from './dto/agreement.dto';

@Injectable()
export class AgreementService {

    constructor(
        @InjectModel('Agreement') readonly agreementModel : Model<IAgreement>
    ){}

    async getAllAgreement(query): Promise<any>{
        let startRow = Number(query.startRow)
        let pageSize = Number(query.pageSize)
        const agreements = await this.agreementModel.find({})
                                    .skip(startRow)
                                    .limit(pageSize).exec()
        const totalAgreements = await this.agreementModel.countDocuments()
        return { agreements, totalAgreements }
    }

    async getAgreement(id): Promise<IAgreement>{
        try{
            return await this.agreementModel.findById({ _id: id }).exec()
        }catch(Exception){
            return null
        }
    }

    async updateAgreement(
        id: string,
        agreementUpdateDto: agreementUpdateDto
    ): Promise<IAgreement>{
        try{
            return await this.agreementModel.findByIdAndUpdate({ _id: id}, agreementUpdateDto, { new: true})
        }catch(Exception){
            return null
        }
    }
}
