import EventEmitter from 'events'

const init = new EventEmitter()
init.setMaxListeners(0)

export default init
