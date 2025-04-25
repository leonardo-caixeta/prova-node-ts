import express from 'express';
//import userRoutes from './routes/user.route';
//import roleRoutes from './routes/role.route';

const app = express();
app.use(express.json());

//app.use('/users', userRoutes);
//app.use('/roles', roleRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
