const API = require('call-of-duty-api')({platform: "battle"});

try {
    await API.login(<Tommyb841>, <@Sonyxcube8bz>);
 } catch(Error) {
     //Handle Exception
 }
try {
   let data = await API.MWwz(<gamertag>, <platform>?);
} catch(Error) {
    //Handle Exception
}
console.log(data.lifetime.all);
