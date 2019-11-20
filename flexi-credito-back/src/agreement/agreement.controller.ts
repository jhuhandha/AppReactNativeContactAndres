import { Controller, Get, Query, Param, HttpException, HttpStatus, Patch, Body, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from  'multer';
import { AgreementService } from './agreement.service';
import { IAgreement } from './model/agreement.model';
import { agreementUpdateDto } from './dto/agreement.dto';
import { editFileName } from '../functions/agreement.functions';

@Controller('agreement')
export class AgreementController {

    constructor(
        private readonly _agreementService: AgreementService
    ){}

    @Get()
    async getAgreements(
        @Query() query: any
    ): Promise<any>{
        const data = await this._agreementService.getAllAgreement(query)
        const { agreements, totalAgreements } = data;
        return { agreements, totalAgreements }
    }

    @Get(':id')
    async getAgreement(
        @Param('id') id: string,
    ): Promise<IAgreement>{
        const agreement = await this._agreementService.getAgreement(id)
        if (!agreement) throw new HttpException("Ocurrio un error al consultar el convenio", HttpStatus.INTERNAL_SERVER_ERROR)
        return agreement
    }

    @Patch(':id')
    @UseInterceptors(FileInterceptor('image', {
        storage: diskStorage({
            destination: './files/agreements',
            filename: editFileName,
        }),
    }))
    async updateAgreement(
        @Param('id') id: string,
        @Body() agreementDto: agreementUpdateDto,
        @UploadedFile() file,
    ): Promise<any>{
        if (file){
            const filename = file.filename
            Object.assign(agreementDto, {'image':filename})
        }
        const agreement = this._agreementService.updateAgreement(id, agreementDto)
        if(!agreement) throw new HttpException("Ocurrio un error al actualizar el convenio", HttpStatus.INTERNAL_SERVER_ERROR)
        return agreement
    }

}
