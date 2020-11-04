import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config/dist';
import { ConfigModule } from '@nestjs/config/dist/config.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: config.get('MONGO_URI'),
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule { }



