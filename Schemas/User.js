var UserSchema = {
    email: { 
    	type: String, 
    	unique : true, 
    	required: true 
    },
    password: { 
    	type: String, 
    	required: true 
    },
    firstname: { 
    	type: String 
    },
    lastname: { 
    	type: String 
    },
    modified: { 
    	type: Date, 
    	default: Date.now 
    }  
};

module.exports.UserSchema = UserSchema;