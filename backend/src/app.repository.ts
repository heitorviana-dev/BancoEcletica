/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";

@Injectable()
export class AppRepository{
    async getProcesso() {
        return { status: 'ok' };
    }
}