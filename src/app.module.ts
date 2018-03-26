import { Module } from '@nestjs/common'

import { CompileModule } from "./modules/compile/compile.module";

@Module({
    modules: [ CompileModule ]
})
export class AppModule {}