import { Middleware, NestMiddleware, ExpressMiddleware } from '@nestjs/common';


@Middleware()
export class ViewMiddleware implements NestMiddleware {
    resolve(...args: any[]): ExpressMiddleware {
        return (req, res, next) => {
            next();
        };
    }
}

