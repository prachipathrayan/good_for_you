import { Router } from 'express';
import UserRouter from './Users';

// Init router and path
const router = Router();

// Add sub-routes
router.use('/channels', UserRouter);

// Export the base-router
export default router;
