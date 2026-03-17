import { Router } from "express";
import { showRoleModules, showRoleModulesId, addRoleModules, updateRoleModules, deleteRoleModules } from "../controllers/roleModules.controller.js";

const router = Router();
const apiName = '/roleModules';

router.route(apiName)
  .get(showRoleModules)  // Get all RoleModules
  .post(addRoleModules); // Add RoleModules

router.route(`${apiName}/:id`)
  .get(showRoleModulesId)  // Get RoleModules by Id
  .put(updateRoleModules)  // Update RoleModules by Id
  .delete(deleteRoleModules); // Delete RoleModules by Id

export default router;