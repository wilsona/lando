'use strict';
const chai = require('chai');
chai.should();
const CliTest = require('command-line-test');
const expect = chai.expect;
const path = require('path');
const docker = require('dockerode')();

describe('elastic search', () => {
  it('sets the appropriate mmap counts', function() {
    this.timeout(500000);
    const cliTest = new CliTest();
    const pathToEntryPoint = path.resolve('bin', 'lando.js');
    const pathToExample = path.resolve('examples', 'elasticsearch') + path.sep;

    // Start the example project
    return cliTest.execFile(pathToEntryPoint, ['start'], {cwd: pathToExample})
    // The container should have started up healthy.
    .then((res) => {
      const esContainer = docker.getContainer('elasticsearch_search_1');
      return esContainer.inspect()
        .then((data, err) => data.State.Health
          .should.have.property('Status', 'healthy'));
    });
  });
});
