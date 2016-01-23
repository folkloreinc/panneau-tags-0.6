var React = require('react');

var TagsList = React.createClass({
    
    mixins: [Panneau.Mixins.Table],
    
    getDefaultProps: function() {
        return {
            itemsAdded: []
        };
    },

    render: function()
    {
        
        var table = this.renderTable(this.props.columns, this.props.items);
        
        return (
            <div className="table-responsive">
                { table }
            </div>
        );

    }

});

module.exports = TagsList;
