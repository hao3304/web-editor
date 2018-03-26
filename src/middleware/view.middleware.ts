import { Middleware, NestMiddleware, ExpressMiddleware } from '@nestjs/common';
import * as nunjucks from 'nunjucks'

@Middleware()
export class ViewMiddleware implements NestMiddleware {
    resolve(...args: any[]): ExpressMiddleware {
        var env = new nunjucks.Environment(new nunjucks.FileSystemLoader('view'));
        return (req, res, next) => {
            res.test = env.render;
            req.test = env.render;
            console.log('Request...');
            next();
        };
    }
}

function createEnv(path,opts){
    //nunjucks配置项
    var
        autoescape = autoescape = opts.autoescape && true,
        noCache = opts.noCache || false,
        watch = opts.watch || false,
        throwOnUndefined = opts.throwOnUndefined || false,
        env = new nunjucks.Environment(
            new nunjucks.FileSystemLoader(path,{
                noCache:noCache,
                watch:watch
            }),{
                autoescape:autoescape,
                throwOnUndefined:throwOnUndefined
            });

    //自定义过滤器
    if(opts.filters){
        for(var f in opts.filters){
            env.addFilter(f,opts.filters[f]);     //如果一个对象的属性名存储在变量中，通过object[var] 方式遍历
        }
    }

    return env;
}
