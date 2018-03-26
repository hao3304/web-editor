import { Module, NestModule, MiddlewaresConsumer } from '@nestjs/common'
import { compileController} from "./controller/compile";
import { ViewMiddleware } from "../../middleware/view.middleware";

@Module({
    controllers: [ compileController ]
})
export class CompileModule implements NestModule {
    configure(consumer: MiddlewaresConsumer): void {
        consumer.apply(ViewMiddleware).forRoutes(compileController);
    }

}