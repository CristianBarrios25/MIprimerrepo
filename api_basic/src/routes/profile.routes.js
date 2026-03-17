
import { Router } from 'express';
import ProfileModel from '../models/profile.model.js';

const router=Router();
const apiName='/userStatus';

router.route(apiName)
    .get(showprofile)  // Get all Profile
    .post(addprofile); // Add Profile
    
router.route(`${apiName}/:id`)
    .get(showprofileId)  // Get Profile by Id
    .put(updateprofile)  // Update Profile by Id
    .delete(deleteprofile); // Delete Profile by Id

export default router;