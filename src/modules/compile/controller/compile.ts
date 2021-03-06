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
        return await this.compile(compileDto);
    }


    @Get("/")
    public  index() {
        return env.render('index.html')
    }

    private compile( compileDto: CompileDto ) {
        var options = {stats : true}; //prints stats on console
        compiler.init(options);
        var envData = { OS : "linux" , cmd : "gcc" };
        return new Promise((resolve,reject)=>{
            if(compileDto.input == 'true') {
                compiler.compileCPPWithInput(envData ,compileDto.code, compileDto.val, function (rep) {
                    resolve(rep);
                });
            }else{
                compiler.compileCPPWithInput(envData , compileDto.code,' ', function (rep) {
                    resolve(rep);
                });
            }

        })
    }
}