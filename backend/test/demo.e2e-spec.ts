import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe, HttpStatus, HttpException } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('DemoController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        exceptionFactory: (errors) => {
          const messages = errors.map((err) =>
            Object.values(err.constraints || {}).join(', '),
          );
          return new HttpException(
            { detail: messages },
            HttpStatus.UNPROCESSABLE_ENTITY,
          );
        },
      }),
    );
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET /api/ returns Nomed API v2', () => {
    return request(app.getHttpServer())
      .get('/api/')
      .expect(200)
      .expect({ message: 'Nomed API v2' });
  });

  it('POST /api/demo creates a booking', async () => {
    const payload = {
      nombre: 'Juan',
      apellido: 'Pérez',
      email: 'juan@example.com',
      empresa: 'Acme',
      producto: 'Botbee',
      desafio: 'Automatizar soporte',
      fecha: '15/06/2025',
      hora: '10:00',
      timezone: 'America/Santiago',
      tipo: 'calendario',
    };

    const res = await request(app.getHttpServer())
      .post('/api/demo')
      .send(payload)
      .expect(200);

    expect(res.body.nombre).toBe(payload.nombre);
    expect(res.body.email).toBe(payload.email);
    expect(res.body.id).toBeDefined();
    expect(res.body.created_at).toBeDefined();
    expect(res.body._id).toBeUndefined();
  });

  it('POST /api/demo works with minimal fields', async () => {
    const res = await request(app.getHttpServer())
      .post('/api/demo')
      .send({ nombre: 'Ana', email: 'ana@example.com' })
      .expect(200);

    expect(res.body.nombre).toBe('Ana');
    expect(res.body.apellido).toBe('');
    expect(res.body.timezone).toBe('America/Santiago');
    expect(res.body.tipo).toBe('formulario');
  });

  it('GET /api/demo returns list', async () => {
    const res = await request(app.getHttpServer())
      .get('/api/demo')
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
  });

  it('POST /api/demo returns 422 on missing required fields', () => {
    return request(app.getHttpServer())
      .post('/api/demo')
      .send({ apellido: 'Sin nombre ni email' })
      .expect(422);
  });
});
