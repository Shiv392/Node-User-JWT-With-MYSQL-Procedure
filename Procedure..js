// DELIMITER //
// CREATE PROCEDURE UserSignUp(IN username varchar(100), IN useremail varchar(150), IN userpassword varchar(100))
// BEGIN
// Insert into UserCredential(name,email,password)values(username,useremail,userpassword);
// END //
// DELIMITER ;

// CALL UserSignUp('shivsoni','shiv@leadangel.com','Shiv@3923');

// DELIMITER //
// CREATE PROCEDURE FindUser(IN useremail varchar(150))
// BEGIN
// Select * from UserCredential where email=useremail;
// END //
// DELIMITER ;

// DELIMITER //
// CREATE PROCEDURE ResetPasword(IN useremail varchar(150), IN newpassword varchar(100))
// BEGIN
// UPDATE UserCredential SET password=newpassword where email=useremail;
// END //
// DELIMITER ;