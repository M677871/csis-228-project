const moment =require ('moment');
class User {
    constructor(userId,email,passwordHash,userType,createdAt){
        this.userId = userId;
        this.email = email; 
        this.passwordHash = passwordHash;
        this.userType = userType;
        this.createdAt = createdAt;
    }
        static fromRow(row){
            return new User(
                row.user_id,
                row.email,
                row.password_hash,
                row.user_type,
                moment(row.create_at).format("YYYY-MMM-DD HH:mm:ss")
            );
        }
}
module.exports = User;