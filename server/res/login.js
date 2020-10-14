function checkPwd(pwd){
    //need to check if password is the same of the user pwd
    return pwd === "root";
}

function userExist(user){
    // need to check if user already exist in DB
    return user === "admin";
}

module.exports =
    function login(user, pwd){
        if (userExist(user)){
            if (checkPwd(pwd)){
                // TODO connect user
                console.log("Connection for user : " + user);
                return {
                    exitCode: 0,
                    rep: true
                };
            }else{
                // TODO display a message (invalid password)
                console.log("Bad password");
                return {
                    exitCode: 1,
                    rep: false
                };
            }
        }else{
            // TODO display a message (user not registered)
            console.log("User not registered");
            return {
                exitCode: 2,
                rep: false
            };
        }
    };