import * as bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import * as jwt from 'jwt-then';
import config from '../../../config/config';
import DataSet from './dataset.model';

export default class DataSetController {
  public findAll = async (req: Request, res: Response): Promise<any> => {
    try {
      const dataset = await DataSet.find();
      if (!dataset) {
        return res.status(404).send({
          success: false,
          message: 'No journals found',
          data: null
        });
      }
      console.log(dataset.length)
      res.status(200).send({
        success: true,
        data: dataset
      });
    } catch (err) {
      res.status(500).send({
        success: false,
        message: err.toString(),
        data: null
      });
    }
  };

  public findOne = async (req: Request, res: Response): Promise<any> => {
    try {
      const dataset = await DataSet.find({paperTitle: req.params.paperTitle});
      console.log("Inside find")
      if (!dataset) {
        return res.status(404).send({
          success: false,
          message: 'Journal not found',
          data: null
        });
      }

      res.status(200).send({
        success: true,
        data: dataset
      });
    } catch (err) {
      res.status(500).send({
        success: false,
        message: err.toString(),
        data: null
      });
    }
  };
  public findByDate = async (req: Request, res: Response): Promise<any> => {
    try {
      console.log("Inside find");
      const startDate = req.params.startDate.trim();
      const endDate = req.params.endDate.trim();
      console.log(startDate)
      console.log(endDate)
      const dataset = await DataSet.find({
        publicationDate:  { $lte: endDate, $gte: startDate}
      })
      console.log(dataset)
      if (!dataset) {
        return res.status(404).send({
          success: false,
          message: 'Journal not found',
          data: null
        });
      }
      console.log("Dataset",dataset.length);
      res.status(200).send({
        success: true,
        data: dataset
      });
    } catch (err) {
      res.status(500).send({
        success: false,
        message: err.toString(),
        data: null
      });
    }
  };
}
  // public update = async (req: Request, res: Response): Promise<any> => {
  //   const { name, lastName, email, password } = req.body;
  //   try {
  //     const userUpdated = await User.findByIdAndUpdate(
  //       req.params.id,
  //       {
  //         $set: {
  //           name,
  //           lastName,
  //           email,
  //           password
  //         }
  //       },
  //       { new: true }
  //     );
  //     if (!userUpdated) {
  //       return res.status(404).send({
  //         success: false,
  //         message: 'User not found',
  //         data: null
  //       });
  //     }
  //     res.status(200).send({
  //       success: true,
  //       data: userUpdated
  //     });
  //   } catch (err) {
  //     res.status(500).send({
  //       success: false,
  //       message: err.toString(),
  //       data: null
  //     });
  //   }
  // };
