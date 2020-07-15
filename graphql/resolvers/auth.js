const bcrypt=require('bcrypt')
const User = require("../../models/user");
const jwt=require('jsonwebtoken');
const user = require('../../models/user');

module.exports = {
    createUser: async (args) => {
        // to avoid having user with same email address
        try {
            const existingUser = await User.findOne({
                email: args.userInput.email,
            });
            if (existingUser) {
                throw new Error("User exists already.");
            }

            // 12 rounds of hashing is considered safe
            const hashedPassword = await bcrypt.hash(
                args.userInput.password,
                12
            );

            const user = new User({
                email: args.userInput.email,
                password: hashedPassword,
            }); 

            const result = await user.save();

            return { ...result._doc, password: null, _id: result.id };
        } catch (err) {
            throw err;
        }
    },
    login:async({email,password})=>{
        const user=await User.findOne({email:email});
        if(!user){
            throw new Error('User does not exist!')
        }
        // stored password and incoming password
        const isEqual =await bcrypt.compare(password, user.password);
        if(!isEqual){
            throw new Error('Password is incorrect');
        }
        // second argument is the string used to hash the token
        // privte key, used for validation later on
        const token=await jwt.sign({userId:user.id, email:user.email},
               'somesupersecretkey',
               { expiresIn:'1h'}
        );
        return {userId:user.id, token:token, tokenExpiration:1}
    }
};
