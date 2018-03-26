import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import * as path from 'path';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.use("/static",express.static(path.join(__dirname, 'public')))
	app.listen(3000);
}

bootstrap();