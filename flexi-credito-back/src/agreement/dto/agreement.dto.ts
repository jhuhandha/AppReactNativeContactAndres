export class agreementUpdateDto {
    readonly name: string;
    readonly image?: string;
    readonly description: string;
    readonly address: Array<Object>;
    readonly phones: Array<Object>;
    readonly owner: string;
}