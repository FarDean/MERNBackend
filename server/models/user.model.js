import mongoose from 'mongoose'
import crypto from 'crypto'
const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required: 'Name is required!'
    },
    email: {
        type:String,
        trim:true,
        unique: 'Email already exists!',
        match: [/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, 'Please fill a valid email address'],
        required: 'Email is required!'
    },
    hashed_password:{
        type:String,
        required: 'Password is required!'
    },
    salt: String
},{
    timestamps:true
})



UserSchema.virtual('password')
    .set(function(password){
        this._password = password
        this.salt =this.makeSalt()
        this.hashed_password = this.encryptPassword(password)
    }).get(function(){
        return this._password
})

UserSchema.path('hashed_password').validate(function(v){
    if(this._password && this._password.length < 6){
        this.invalidate('password','password must be at least 6 characters.')
    }
    if(this.isNew && !this._password){
        this.invalidate('password', 'password is required.')
    }
},null)

UserSchema.methods = {
    authenticate: function(plainText){
        return this.encryptPassword(plainText) === this.hashed_password
    },
    encryptPassword: function(password){
        if(!password) return ''
        try {
            return crypto.createHmac('sha256',this.salt).update(password).digest('hex')
        } catch (err) {
            console.log(err)
        }
    },
    makeSalt: function(){
        return Math.round((new Date().valueOf() * Math.random())) + ''
    }
}

const User = mongoose.model('User',UserSchema)
export default User