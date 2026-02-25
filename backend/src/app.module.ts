// // import { Module } from '@nestjs/common';
// // import { AppController } from './app.controller';
// // import { AppService } from './app.service';

// // @Module({
// //   imports: [],
// //   controllers: [AppController],
// //   providers: [AppService],
// // })
// // export class AppModule {}
// import { Module } from '@nestjs/common';

// import { ConfigModule, ConfigService } from '@nestjs/config';

// import { MongooseModule } from '@nestjs/mongoose';
// import { ProductsModule } from './products/products.module';
// import { ServeStaticModule } from '@nestjs/serve-static';
// import { join } from 'path';

// import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';

// import { APP_GUARD } from '@nestjs/core';

// import { UsersModule } from './users/users.module';
// import { AuthModule } from './auth/auth.module';

// @Module({
//   imports: [
//     ServeStaticModule.forRoot({
//       rootPath: join(__dirname, '..', 'uploads'),
//       serveRoot: '/uploads',
//     }),

//     // โหลดไฟล์ .env

//     ConfigModule.forRoot({ isGlobal: true }),

//     ThrottlerModule.forRoot([
//       {
//         ttl: 60_000, // 1 minute

//         limit: 100, // 100 requests per minute
//       },
//     ]),

//     MongooseModule.forRootAsync({
//       imports: [ConfigModule],

//       useFactory: async (configService: ConfigService) => ({
//         uri: configService.get<string>('MONGO_URI'),
//       }),

//       inject: [ConfigService],
//     }),

//     ProductsModule,

//   ],
// })
// export class AppModule {}

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

import { CarsModule } from './cars/cars.module';
import { BookingsModule } from './bookings/bookings.module';

@Module({
  imports: [
    // serve uploads folder
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),

    // โหลด .env
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // rate limit
    ThrottlerModule.forRoot([
      {
        ttl: 60_000,
        limit: 100,
      },
    ]),

    // MongoDB connection
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
    }),

    UsersModule,
    AuthModule,

    CarsModule,

    BookingsModule,
  ],

  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
