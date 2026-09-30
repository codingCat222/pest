import { Request, Response } from 'express';
import { AuthService } from './auth.service';

export const AuthController = {
  async register(req: Request, res: Response) {
    try {
      const result = await AuthService.register(req.body);
      res.status(201).json(result);
    } catch (err: any) {
      res.status(err.status || 500).json({ error: err.message || 'Registration failed' });
    }
  },

  async login(req: Request, res: Response) {
    try {
      const result = await AuthService.login(req.body);
      res.json(result);
    } catch (err: any) {
      res.status(err.status || 500).json({ error: err.message || 'Login failed' });
    }
  },

  async logout(_req: Request, res: Response) {
    // Stateless JWT — logout is handled client-side by discarding the token.
    res.json({ message: 'Logged out' });
  },

  async updateMe(req: Request, res: Response) {
    try {
      const userId = (req as any).user.userId;
      const user = await AuthService.updateProfile(userId, req.body);
      res.json(user);
    } catch (err: any) {
      res.status(err.status || 500).json({ error: err.message || 'Unable to update profile' });
    }
  },

  async me(req: Request, res: Response) {
    try {
      const userId = (req as any).user.userId;
      const user = await AuthService.me(userId);
      res.json(user);
    } catch (err: any) {
      res.status(err.status || 500).json({ error: err.message || 'Unable to fetch user' });
    }
  },
};