import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/posts (GET)', () => {
    return request(app.getHttpServer())
      .get('/posts')
      .expect(200)
      .expect((response) => {
        // Verificar que la respuesta sea una matriz
        expect(Array.isArray(response.body)).toBe(true);

        // Verificar que al menos un post esté presente
        expect(response.body.length).toBeGreaterThan(0);

        // Verificar que cada post tenga propiedades esperadas
        const post = response.body[0];
        expect(post).toHaveProperty('title');
        expect(post).toHaveProperty('content');
      });
  });
});
