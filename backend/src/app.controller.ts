import { Controller, Get } from "@nestjs/common";

@Controller()
export class AppController {

    @Get('/healthz')
    async getHealth() {
        return { status : 'ok' }
    }

}