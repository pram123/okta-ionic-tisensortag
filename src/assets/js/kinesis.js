// Configure Credentials to use Cognito
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: 'us-east-1:a689c534-a11b-4fdc-ac07-0edaf1f0d6f4'
});

AWS.config.region = 'us-east-1';
var kinesis;

// We're going to partition Amazon Kinesis records based on an identity.
// We need to get credentials first, then attach our event listeners.
AWS.config.credentials.get(function(err) {
  // attach event listener
  if (err) {
    alert('Error retrieving credentials.');
    console.error(err);
    return;
  }

  // create kinesis service object
   kinesis = new AWS.Kinesis({
    apiVersion: '2013-12-02'
  });
});

var recordData = [];


function saveInfo(info){

}
function saveToK(info) {
  console.log("Saving to K", info);
  var record = {
    Data: JSON.stringify({
      token: info,
      time: new Date()
    }),
    PartitionKey: 'partition-' + AWS.config.credentials.identityId
  };
  recordData.push(record);
  console.log("Record = ", record);
  console.log("Kinesis =", kinesis);
/*
  kinesis.putRecords({
    Records: recordData,
    StreamName: 'TISensor'
  }, function (err, data) {
    if (err) {
      console.error(err);
    }
  }); */
}
