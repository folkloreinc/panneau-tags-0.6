var $ = require('jquery');
var Promise = Promise || require('promise');
var agent = require('superagent-promise')(require('superagent'), Promise);

module.exports = {
    
    'getPages': function()
    {
        return agent
                .get('/panneau/tags')
                .send({
                    
                })
                .set('X-CSRF-TOKEN', $('meta[name="csrf-token"]').attr('content'))
                .set('Accept', 'application/json')
                .end()
                .then(function(response)
                {
                    return response.body;
                });
    }
    
};
