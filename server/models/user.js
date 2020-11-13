const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userShema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profileImageUrl: {
        type: String
    },
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Message"
        }
    ]
});


userShema.pre("save", async function (next) {
    try {
        if (!this.isModified("password")) {
            return next();
        }
        let hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;
        return next();
    } catch (err) { 
        return next(err);
    }
});



userShema.methods.comparePassword = async function (candidatePassword, next) {
    try {

        let isMatch = await bcrypt.compare( candidatePassword , this.password )
        return isMatch;
    }
    catch(err) {
        next(err);
    }
}

const User = mongoose.model("User", userShema);

module.exports = User;