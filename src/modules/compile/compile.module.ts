import { Module } from '@nestjs/common'
import { compileController} from "./controller/compile";

@Module({
    controllers: [ compileController ]
})
export class CompileModule {}