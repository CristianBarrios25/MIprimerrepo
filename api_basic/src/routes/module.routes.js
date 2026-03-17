import {router} from 'express';
import {showModule,showModuleId,addModule,updateModule,deleteModule} from '../controllers/module.controller.js';

const router=Router();
const apiName='/module';

router.route(apiName)
  .get(showModule)  // Get all Module
  .post(addModule); // Add Module

router.route(`${apiName}/:id`)
  .get(showModuleId)  // Get Module by Id
  .put(updateModule)  // Update Module by Id
  .delete(deleteModule); // Delete Module by Id

export default router;  
    