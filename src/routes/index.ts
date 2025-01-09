import { Router } from 'express'
import authRouter from './auth';
import profileRouter from './profile';
import { authentication } from '../middlewares/authentication';
import bookRouter from './book';
import cartRouter from './cart';
import transactionRouter from './transaction';
import profileTestRouter from './profileTest';

const router = Router();

router.get('/', (req, res) => {
    res.send('ROOT ROUTER Express APP')
});

router.use("/auth", authRouter);
router.use("/profile", authentication, profileRouter)
router.use("/book", authentication, bookRouter)
router.use("/cart", authentication, cartRouter)
router.use("/transaction", authentication, transactionRouter)
router.use("/profile-test", profileTestRouter)
export default router