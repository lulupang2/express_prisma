import express, { Request, Response, NextFunction } from 'express';
import { Prisma, PrismaClient } from '@prisma/client';
import cors from 'cors';
import morgan from 'morgan';
const app = express();
const prisma = new PrismaClient();

//JSON Request Body Parse
app.use(express.json());
const router = express.Router()
//cors 허용
app.use(cors());
app.post(`/signup`, async (요청:Request, 응답:Response) => {
  const { name, email, posts } = 요청.body;

  // const postData = posts?.map((post: Prisma.PostCreateInput) => {
  //   return { title: post?.title, content: post?.content };
  // });

  const result = await prisma.user.create({
    data: {
      name,
      email,
      // posts: {
      //   create: postData,
      // },
    },
  });
  응답.json(result);
});

app.get('/', (요청: Request, 응답: Response, next: NextFunction) => {
  응답.send('index page');
});

app.get('/users', async (요청: Request, 응답: Response, next: NextFunction) => {
  const users = await prisma.post.findMany();
  응답.json(users);
});

router.get('/log', (요청:Request,응답:Response) => {
  console.log('로그');
  응답.writeHead(404, {'Content-type': 'text/html'});
  응답.end('404 에러')
})
app.get('/skip', (요청:Request,응답:Response) => {
console.log('success');
응답.writeHead(200, {'Content-type': 'text/html'});
응답.end('success!!')

});

// Create new Morgan 
const myMorgan = morgan('combined', {
  skip: (요청:Request,응답:Response) => 응답.statusCode < 400
});
app.use(myMorgan)

//내가 쓰는 포트
app.listen(555, () => {
  console.log('Server running at: http://localhost:555');
});
