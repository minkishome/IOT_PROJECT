var mqtt=require('mqtt');
var Topic='#';
var Broker_URL= 'mqtt://70.12.229.27';
var Database_URL='70.12.247.91';
var options={
    clientId: 'MyMQTT',
    port:1883,
    username: 'mqtt_user',
    password: 'mqtt_password',
    keepalive: 60
};

var client=mqtt.connect(Broker_URL,options);
client.on('connect',mqtt_connect);
client.on('reconnect',mqtt_reconnect);
client.on('error',mqtt_error);
client.on('message',mqtt_messageReceived);
client.on('close',mqtt_close);

function mqtt_connect(){
    //console.log("Connecting MQTT");
    client.subscribe(Topic,mqtt_subscribe);
}

function mqtt_subscribe(err,granted){
    console.log("Subscribed to "+Topic);
    if (err) {console.log(err);}
}

function mqtt_reconnect(err){
    //console.log("Reconnect MQTT");
    //if (err) {console.log(err);}
    client = mqtt.connect(Broker_URL,options);
}

function mqtt_error(err){
    //console.log("Error");
    //if(err){console.log(err);}
}

function after_publish(){
    //do nothing
}
/*
const createCsvWriter=require('csv-writer').createObjectCsvWriter;
const csvWriter=createCsvWriter({
    path:'temp/savedata.csv',
    header:[
        {id:'time', title: 'Time'},
        {id:'humi', title: 'Humi'},
        {id:'temp', title: 'Temp'},
        {id:'ch4', title: 'Ch4'},
        {id:'objectTemp', title: 'ObjectTemp'},
        //{id:'bpm', title: 'BPM'},
        {id: 'steps',title: 'Steps'}
    ]
});
*/

function mqtt_messageReceived(topic,message_str, packet){
    /*
    var message_arr=extract_string(message_str);
    var humi=message_arr[0];
    var temp=message_arr[1];
    var ch4=message_arr[2];
    var objTemp=message_arr[3];
    var steps=message_arr[4];
    
    for (let index = 0; index < message_arr.length; index++) {
        console.log(message_arr[index]);        
    }
    var records=[{time:Date.now(), humi:humi,temp:temp,ch4:ch4,objectTemp:objTemp,steps:steps}];
    csvWriter.writeRecords(records)
    .then(()=>{
        console.log('...Done');
    });
    */
   insert_message(topic,message_str,packet);

}

function mqtt_close(){
    //console.log("Close MQTT");
}

//////////////////////////////////////////////////
//////////////////// MYSQL ///////////////////////
//////////////////////////////////////////////////
var mysql=require('mysql');

var connection = mysql.createConnection({
    host: Database_URL,
    user: 'root',
    password : 'mysql',
    database : 'ptj_sub1'
});

connection.connect(function(err){
    if (err) throw err;
    //console.log("Database Connected!");
});

//insert a row into the tbl_messages table
function insert_message(topic,message_str,packet){
    if(topic=="barn"){
        var message_arr=extract_string(message_str);
        var humi=message_arr[0];
        var temp=message_arr[1];
        var ch4=message_arr[2]; 
        var sql="INSERT INTO BARNS(??,??,??,??,??) VALUES(?,?,?,?,?)";
        var params=['b_id','m_id','humidity', 'temperature', 'ch4',1,1,humi,temp,ch4];
        sql=mysql.format(sql,params);
        connection.query(sql,function(error,results){
            if(error) throw error;
            console.log("1 barns record inserted");
        });      
    };
    if(topic=="cow"){
        var message_arr=extract_string(message_str);
        var objTemp=message_arr[0];
        var steps=message_arr[1];
        var sql = "INSERT INTO livestock(??,??, ??,??,??) VALUES (?,?,?,?,?)";
        var params=['ls_id','m_id','b_id','body_temperature', 'step_count',1,1,1,objTemp,steps];
        sql=mysql.format(sql,params);
        connection.query(sql,function(error,results){
            if(error) throw error;
            console.log("1 livestock record inserted");
        });
    };
    


   };

function extract_string(message_str){
    var message_arr=message_str.toString().split(" ");
    return message_arr;
};


function countInstances(message_str){
    var substrings=message_str.split(" ");
    return substrings.length-1;
};