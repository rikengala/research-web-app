import { Router } from 'express';
import verifyToken from '../../../helpers/verifyToken';
import Controller from './dataset.controller';

const dataset: Router = Router();
const controller = new Controller();

//get list of all papers, search papers by title, list of papers published on a particular date or in a range of dates.

// Retrieve all Papers
dataset.get('/', verifyToken, controller.findAll);

// Search Paper By Title
dataset.get('/:paperTitle', verifyToken, controller.findOne);

//Retrieve papers withing range of dates
dataset.get('/:startDate/:endDate', verifyToken, controller.findByDate);

export default dataset;
