var Panneau = require('panneau');

//Fields
var Fields = require('./components/fields/index');
Panneau.Components.Fields = _.extend(Panneau.Components.Fields, Fields);

//Lists
var Lists = require('./components/lists/index');
Panneau.Components.Lists = _.extend(Panneau.Components.Lists, Lists);

//Lists items
var Items = require('./components/items/index');
Panneau.Components.Lists.Items = _.extend(Panneau.Components.Lists.Items, Items);

//Modals
var Modals = require('./components/modals/index');
Panneau.Components.Modals = _.extend(Panneau.Components.Modals, Modals);
