/*
 * Copyright 2015 IBM Corp.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var protocol = require('../kernel.js');
var Utils = require('../utils.js');

var DataFrame = require('./DataFrame.js');

/**
 * @constructor
 * @classdec A set of methods for aggregations on a DataFrame, created by DataFrame.groupBy.
 */
function GroupedData(kernelP, refIdP) {
  this.kernelP = kernelP;
  this.refIdP = refIdP;
}

/**
 * Compute the avg value for each numeric columns for each group.
 * @param {string[]} cols
 * @returns {DataFrame}
 */
GroupedData.prototype.avg = function() {
  var args = Array.prototype.slice.call(arguments);
  console.log('args: ',args);
  var refId = protocol.genVariable('dataFrame');
  var self = this;

  var cols = [];
  args.forEach(function(arg) {
    cols.push('"'+arg+'"');
  });

  //cols = cols || [];
  console.log('colNames: ',cols);

  return new DataFrame(this.kernelP, new Promise(function(resolve, reject) {
    Promise.all([self.kernelP, self.refIdP]).then(function(values) {
      var kernel = values[0];
      var dataFrameId = values[1];

      var templateStr = 'var {{refId}} = {{inRefId}}.avg({{cols}});';

      var code = Utils.processTemplate(templateStr, {refId: refId, inRefId: dataFrameId, cols: cols.join(',')});

      protocol.verifyAssign(kernel.execute({code: code, silent: false}),
        resolve,
        reject,
        refId);
    }).catch(reject);
  }));
};

/**
 * Count the number of rows for each group.
 * @returns {DataFrame}
 */
GroupedData.prototype.count = function() {
  var refId = protocol.genVariable('dataFrame');
  var self = this;

  return new DataFrame(this.kernelP, new Promise(function(resolve, reject) {
    Promise.all([self.kernelP, self.refIdP]).then(function(values) {
      var kernel = values[0];
      var dataFrameId = values[1];

      var templateStr = 'var {{refId}} = {{inRefId}}.count();';

      var code = Utils.processTemplate(templateStr, {refId: refId, inRefId: dataFrameId});

      protocol.verifyAssign(kernel.execute({code: code, silent: false}),
        resolve,
        reject,
        refId);
    }).catch(reject);
  }));
};
/**
 * Compute the max value for each numeric columns for each group.
 * @param {string[]} cols
 * @returns {DataFrame}
 */
GroupedData.prototype.max = function() {
  var args = Array.prototype.slice.call(arguments);
  var refId = protocol.genVariable('dataFrame');
  var self = this;

  var cols = [];
  args.forEach(function(arg) {
    cols.push('"'+arg+'"');
  });

  return new DataFrame(this.kernelP, new Promise(function(resolve, reject) {
    Promise.all([self.kernelP, self.refIdP]).then(function(values) {
      var kernel = values[0];
      var dataFrameId = values[1];

      var templateStr = 'var {{refId}} = {{inRefId}}.max({{cols}});';

      var code = Utils.processTemplate(templateStr, {refId: refId, inRefId: dataFrameId, cols: cols.join(',')});

      protocol.verifyAssign(kernel.execute({code: code, silent: false}),
        resolve,
        reject,
        refId);
    }).catch(reject);
  }));
};

/**
 * Compute the mean value for each numeric columns for each group.
 * @param {string[]} cols
 * @returns {DataFrame}
 */
GroupedData.prototype.mean = function() {
  var args = Array.prototype.slice.call(arguments);
  var refId = protocol.genVariable('dataFrame');
  var self = this;

  var cols = [];
  args.forEach(function(arg) {
    cols.push('"'+arg+'"');
  });

  return new DataFrame(this.kernelP, new Promise(function(resolve, reject) {
    Promise.all([self.kernelP, self.refIdP]).then(function(values) {
      var kernel = values[0];
      var dataFrameId = values[1];

      var templateStr = 'var {{refId}} = {{inRefId}}.mean({{cols}});';

      var code = Utils.processTemplate(templateStr, {refId: refId, inRefId: dataFrameId, cols: cols.join(',')});
      console.log('mean code: ',code);

      protocol.verifyAssign(kernel.execute({code: code, silent: false}),
        resolve,
        reject,
        refId);
    }).catch(reject);
  }));
}

/**
 * Compute the min value for each numeric columns for each group.
 * @param {string[]} cols
 * @returns {DataFrame}
 */
GroupedData.prototype.min = function() {
  var args = Array.prototype.slice.call(arguments);
  var refId = protocol.genVariable('dataFrame');
  var self = this;

  var cols = [];
  args.forEach(function(arg) {
    cols.push('"'+arg+'"');
  });

  return new DataFrame(this.kernelP, new Promise(function(resolve, reject) {
    Promise.all([self.kernelP, self.refIdP]).then(function(values) {
      var kernel = values[0];
      var dataFrameId = values[1];

      var templateStr = 'var {{refId}} = {{inRefId}}.min({{cols}});';

      var code = Utils.processTemplate(templateStr, {refId: refId, inRefId: dataFrameId, cols: cols.join(',')});

      protocol.verifyAssign(kernel.execute({code: code, silent: false}),
        resolve,
        reject,
        refId);
    }).catch(reject);
  }));
}

/**
 * Compute the sum value for each numeric columns for each group.
 * @param {string[]} cols
 * @returns {DataFrame}
 */
GroupedData.prototype.sum = function() {
  var args = Array.prototype.slice.call(arguments);
  var refId = protocol.genVariable('dataFrame');
  var self = this;

  var cols = [];
  args.forEach(function(arg) {
    cols.push('"'+arg+'"');
  });

  return new DataFrame(this.kernelP, new Promise(function(resolve, reject) {
    Promise.all([self.kernelP, self.refIdP]).then(function(values) {
      var kernel = values[0];
      var dataFrameId = values[1];

      var templateStr = 'var {{refId}} = {{inRefId}}.sum({{cols}});';

      var code = Utils.processTemplate(templateStr, {refId: refId, inRefId: dataFrameId, cols: cols.join(',')});

      protocol.verifyAssign(kernel.execute({code: code, silent: false}),
        resolve,
        reject,
        refId);
    }).catch(reject);
  }));
}


module.exports = GroupedData;