import User from '../models/user.model';
import extend from 'lodash/extend';
import errorHandler from '../helpers/db.ErrorHandler';


const create = async(req, res, next) =>{
    const user = new User(req.body);
    try{
        await user.save()
        return res.status(200).json({
            message: "Cadastro efectuado com sucesso"
        })

    }catch(err){
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)

        })
    }
}

const list = async (req, res) => {
    try {
      let users = await User.find()
      res.json(users)
    } catch (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
  }

const userByID = async (req, res, next, id) => {

    try{
        let user = await User.findById(id);
        if(!user)
        return res.status('400').json({ 
                error: "Usuario nao encontrado"
        })
        req.profile = user
        next()
    }catch(err){
        res.status('400').json({
            error: "Nao foi possivel recuperar o usuario"
        })
    }
}

const read = (req, res) =>{
    req.profile.hashed_password = undefined
    req.profile.salt = undefined
    return res.json(req.profile)
}

const update = async (req, res) =>{
      try {
          let user = req.profile
          user = extend(user, req.body)
          user.updated = Date.now()
          await user.save()
          user.hashed_password = undefined
          user.salt = undefined
          res.json(user);
      } catch (err) {
         return res.status('400').json({
             error: errorHandler.getErrorMessage(err)
         })
      }
}
const remove = async (req, res, next) =>{
    try {
        
        let user = req.profile
        let deletedUser = await user.remove();
        deletedUser.hashed_password = undefined
        deletedUser.salt = undefined
        res.json(deletedUser)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
        
    }
}

export default {create, list, userByID, read, update, remove}