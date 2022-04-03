import express, { Request, Response, NextFunction } from 'express';

const app = express();


app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.send('index page');
});

app.get('/welcome', (req: Request, res: Response, next: NextFunction) => {
    res.send('welcome!');
});
import swaggerUi from 'swagger-ui-express'
// json 파일을 바로 불러오기
import swaggerJson from './swagger.json'

// json으로 된 swagger 연동
app.use('/api-json', swaggerUi.serve, swaggerUi.setup(swaggerJson))



app.listen(555, () => {
  console.log('Server running at: http://localhost:555');
});
