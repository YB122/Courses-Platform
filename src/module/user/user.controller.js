import { Router } from "express";
import { auth } from "../../common/middleware/auth.js";
import { banUser, deleteUser, getAllUsers, getUserById, unBanUser } from "./user.service.js";




let router = Router();

router.get('/',auth,getAllUsers);
router.get('/:id',auth,getUserById);
router.patch('/:id/ban',auth,banUser);
router.patch('/:id/unban',auth,unBanUser);
router.delete('/:id',auth,deleteUser);

export default router;
