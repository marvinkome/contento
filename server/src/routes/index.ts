import { Router } from 'express';
import authRouter from './auth';
import cdnRouter from './cdn';

const router = Router();

router.get('/', (req, res) => {
    res.send({
        message: 'Hello friend!! You have reached the api for contento'
    });
});

router.use('/auth', authRouter);
router.use('/cdn', cdnRouter);

export default router;
