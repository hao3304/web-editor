import { Controller, Post, Get, Body, Res } from '@nestjs/common'
import { CompileDto} from "../dto/compile"
import * as nunjucks from 'nunjucks'
import * as path from 'path'
const compiler = require('compilex');
var env = new nunjucks.Environment(new nunjucks.FileSystemLoader(path.resolve(__dirname,'../view')),{noCache:true});

@Controller()
export class compileController {

    @Post('compile')
    public async root(@Body() compileDto: CompileDto):string {
        if(!compileDto.code) {
            return 'code is invalid'
        }
        return await this.compile(compileDto.code);
    }

    @Get("/")
    public  index() {
        return env.render('index.html')
    }

    private compile( code ) {
        var options = {stats : true}; //prints stats on console
        compiler.init(options);
        var envData = { OS : "linux" , cmd : "gcc" };
        return new Promise((resolve,reject)=>{
            compiler.compileCPP(envData , code, function (rep) {
                resolve(rep);
            });
        })
    }
}