var uuid = require('node-uuid');

module.exports.verifyAssign = function(handle, resolve, reject, refId) {
  handle.handleMsg = msg => {
    //console.log(msg);
    if(msg.msg_type === 'status' &&
       msg.content.execution_state === 'idle') {
      resolve(refId);
    }
  }
}


module.exports.verifyResult = function(handle, resolve, reject) {
  handle.handleMsg = msg => {
    if(msg.msg_type === 'execute_result') {
      resolve(msg.content.data['text/plain']);
    }
  }
}


var variableCounter = {};

module.exports.genVariable = function(name) {
  if (!variableCounter[name]) {
    variableCounter[name] = 1;
  } else {
    variableCounter[name]++;
  }

  //return "rdd"+uuid.v4().replace(/-/g, '');
  return name + variableCounter[name];
}