const oracledb = require("oracledb");
// Set database connection details
const dbConfig = {
  user: "system",
  password: "manager",
  connectString: "localhost:/orcl",
};

const Query = async (sql) => {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(sql);
    await connection.commit();
    return result;
  } catch (error) {
    return (error);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (error) {
        console.error(error);
      }
    }
  }
};

const Result = async (...Parameters) => {
  
  let Sql;
  console.log(typeof (Parameters[2]));
  Details = Parameters[2];
    try{
      Details = eval(`(${Parameters[2]})`);
    } catch(err){}
 switch (Parameters[1]) {
    case "Insert":
      if(Parameters[0]=="Rental"){
        Sql = `insert into ${Parameters[0]} values('${Details.Name}','${Details.Gender}','${Details.Email}','${Details.Category}','${Details.Address}','${Details.City}','${Details.State}','${Details.Mobile}')`;
        break;
      }
      else if(Parameters[0]=="vip"){
        Sql = `insert into ${Parameters[0]} values('${Details.password}','${Details.email}','${Details.roll}')`;
        break; }

      else if(Parameters[0]=="contact"){
        Sql = `insert into ${Parameters[0]} values('${Details.Name}','${Details.Email}','${Details.Subject}','${Details.Message}')`;
        break; }
      
    case "Update":
      Sql = `update ${Parameters[0]} set  Name='${Parameters[3].Name}',Gender ='${Parameters[3].Gender}' ,Email ='${Parameters[3].Email}', Category='${Parameters[3].Category}',Address ='${Parameters[3].Address}',State='${Parameters[3].State}',City ='${Parameters[3].City}',Mobile='${Parameters[3].Mobile}' where Category = '${Details}'`;
      break;
    case "Delete":
      Sql = `delete from ${Parameters[0]} where Name = '${Details}'`;
      break;
    case  "ulogin":
      Sql= `select email,password from ${Parameters[0]} where email='${Details}' `;
      break;
    case "Read":
        Sql = `select * from ${Parameters[0]}`;
        if(Details != "All"){
          Sql = `select * from ${Parameters[0]} where Category= '${Details}'`;
        }
      break;
    default:
      console.error("Invalid Parameters");
      break;
  }
  console.log(Sql);
  var result = await Query(Sql);
  return result;
};
module.exports = Result;