jest.mock('../src/middleware/authenticateToken', () => ({
    authenticateToken: (req: any, res: any, next: any) => {
      console.log('mock chamado');
      
      return next();
    }
  }));