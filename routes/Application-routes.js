import express from 'express'
import { protect } from '../Middleware/authmiddle';
import { getapplications, submitapplication, getbyid, updateapplication, Delete} from '../controllers/applicationcontroller';


const applicationrouter=express.Router()

applicationrouter.get('/all',protect,getapplications);
applicationrouter.post('/submit', protect, submitapplication);
applicationrouter.get('/:id',protect,getbyid);
applicationrouter.put('/update/:id',protect,updateapplication);
applicationrouter.delete('/delete/:id',protect,Delete);

export default applicationrouter
