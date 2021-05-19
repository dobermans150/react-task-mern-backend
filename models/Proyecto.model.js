const mongoose = require('mongoose');




const Proyectoschema = mongoose.Schema({
  nombre: {
    type: String,
    require: true,
    trim: true
  },
  creador:{
    /* De este modo estamos relacionando al usuario creador desde mongoose */
    type: mongoose.Schema.Types.ObjectId,
    ref:'Usuario'
  },
  creado:{
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('Proyecto', Proyectoschema);