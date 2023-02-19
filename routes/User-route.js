import express from 'express'
import {approveuser,Delete, getbyid, getuser,login,updateuser,userprofile } from '../controllers/user-controller';
import { protect } from '../Middleware/authmiddle';


const router=express.Router()

router.get('/',getuser);
router.post('/profile',userprofile)
router.post('/login',login)
router.get('/:id',protect,getbyid)
router.put('/userup/:id',protect,updateuser)
router.delete('/delete/:id',protect,Delete);
router.put('/approveuser/:id', protect, approveuser);

export default router
