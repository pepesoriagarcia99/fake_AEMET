import http from 'http'

import configuration from './configuration'
import Express from './services/express'
import api from './api'

const {ip, port, apiRoot, env} = configuration

const express = new Express(apiRoot, api);
const server = http.createServer(express.app);

setImmediate(() => {
  server.listen(port, ip, () => {
    console.log('Express server listening on http://%s:%d, in %s mode', ip, port, env);
  })
})

