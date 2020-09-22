const User          = require('../models/userModel')
const bcryptjs      = require('bcryptjs');
const jsonwebtoken  = require('jsonwebtoken')
const {kirimEmail } = require('../helpers');

exports.DaftarUser = async (req, res) => {
    const { username, email, password } = req.body;

    let emailUser = await User.findOne({email: email})
    let usernameUser = await User.findOne({username: username})

    if(usernameUser) {
        return res.status(404).json({
            status: false,
            message: "User telah terdaftar"
        })
    }

    if(emailUser) {
        return res.status(404).json({
            status: false,
            message: "Email telah terdaftar"
        })
    }

    try {
        const hashPassword = await bcryptjs.hash(password, 10);
        const user = new User({
            username: username,
            email: email,
            password:hashPassword
        })
        await user.save();
        return res.status(201).json({
            message: "User Berhasil daftar"
        })
    } catch (error) {
        console.log(error)
    }
}

exports.LoginUser = async (req, res) => {
    const {username, password} = req.body;

    const DataUser = await User.findOne({$or : [{username : username}, {email : username}]})
    if(DataUser){
        const passwordUser = await bcryptjs.compare(password, DataUser.password)
        
        if(passwordUser) {

            const data = {
                id: DataUser._id
            }

            const token = await jsonwebtoken.sign(data, process.env.JWT_SECRET)
            return res.status(200).json({
                message: "Berhasil Login",
                token: token
            })
        } else {
            return res.status(404).json({
                message: "Password Salah"
            })
        }
    } else {
        return res.status(404).json({
            message: "Username dan email salah"
        })
    }
}

exports.GetUser = async (req, res) => {
    
    const user = await User.findOne({_id: req.id})
    return res.status(200).json({
        message: "Berhasil di panggil",
        data : user
    })
}

exports.forgotPassword = async (req, res) => {
    const {email} = req.body
    const user = await User.findOne({email: email})
    if(!user) {
        return res.status(404).json({
            status: false,
            message: "Email Not Found"
        })
    }
    const token = jsonwebtoken.sign({
        idUser: user._id
    }, process.env.JWT_SECRET)
    
    await user.updateOne({
        resetPassword: token
    })

    const templateEmail = {
        from: 'Belajar Coding',
        to: email,
        subject: 'Link Reset Password',
        html : `<p>Silahkan klik link dibawah untuk reset password anda</p> 
                <br>
                <p>${process.env.CLIENT_URL}/resetpassword/${token}</p>`
    }
    kirimEmail(templateEmail);
    return res.status(200).json({
        status: true,
        message: 'Link reset password berhasil terkirim'
    })
    
}

exports.resetPassword = async (req,res) => {
    const { token, password } = req.body
    const user = await User.findOne({resetPassword: token})
    try {
        const hashPassword = await bcryptjs.hash(password, 10);
        user.password = hashPassword
        await user.save();
        return res.status(201).json({
            message: "Password berhasil diubah"
        })
    } catch (error) {
        console.log(error)
    }
}