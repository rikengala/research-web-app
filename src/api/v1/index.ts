import { Router } from 'express';
import auth from './auth/auth.route';
import users from './users/user.route';
import datasets from './dataset/dataset.route';
import * as cors from "cors";


const router: Router = Router();

const options:cors.CorsOptions = {
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
    methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
    preflightContinue: false
  };

router.use(cors(options));
router.use('/', auth);
router.use('/users', users);
router.use('/datasets', datasets)

export default router;
