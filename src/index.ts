import express from 'express';
import roleRouter from './routes/role.route';
import userRoutes from './routes/user.route';
import billetRouter from './routes/billet.route';

const app = express();
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.use('/user', userRoutes);
app.use('/role', roleRouter);
app.use('/billet', billetRouter);

const PORT = process.env.PORT || 3000;
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

export default app;
