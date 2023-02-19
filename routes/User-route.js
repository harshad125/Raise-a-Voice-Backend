import express from 'express'
import {approveuser,Delete, getbyid, getuser,login,register,updateuser,userprofile } from '../controllers/user-controller';
import { protect } from '../Middleware/authmiddle';


const router=express.Router()

router.get('/',getuser);
router.put('/profile',userprofile)
router.post('/register',register)
router.post('/login',login)
router.get('/:id',protect,getbyid)
router.put('/userup/:id',protect,updateuser)
router.delete('/delete/:id',protect,Delete);
router.put('/approveuser/:id', protect, approveuser);

export default router
