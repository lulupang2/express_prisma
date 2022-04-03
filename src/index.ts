import express, { Request, Response, NextFunction } from 'express';
import { Prisma, PrismaClient } from '@prisma/client';
import swaggerUi from 'swagger-ui-express';
import swaggerJson from './swagger.json';
import bcrypt from 'bcrypt';
const app = express();
app.use(express.json());

const prisma = new PrismaClient();
app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('index page');
});

app.get('/welcome', (req: Request, res: Response, next: NextFunction) => {
  res.send('welcome!');
});

// json으로 된 swagger 연동
app.use('/api-json', swaggerUi.serve, swaggerUi.setup(swaggerJson));

// 가입 post 요청
app.use(function (req: Request, res: Response, next: NextFunction, err?: any) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.post(`/signup`, async (req: Request, res: Response) => {
  const { name, email, password, posts } = req.body;
  const saltRound = 10;
  const salt = await bcrypt.genSalt(saltRound);
  const hashedPW = await bcrypt.hash(password, salt);

  const postData = posts?.map((post: Prisma.PostCreateInput) => {
    return { title: post?.title, content: post?.content };
  });

  const result = await prisma.user.create({
    data: {
      name,
      email,
      password,
      posts: {
        create: postData,
      },
    },
  });
  res.json(result);
});

// 가입 목록 get 요청
app.get('/userlist', async (req: Request, res: Response) => {
  const result = await prisma.user.findMany();
  res.json(result);
});

//내가 쓰는 포트
app.listen(555, () => {
  console.log('Server running at: http://localhost:555');
});
