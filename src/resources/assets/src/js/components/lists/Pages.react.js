var React = require('react');

var PagesList = React.createClass({
    
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

    },
    
    getTableBodyAddColumn: function(it, column, rowIndex, colIndex)
    {
        var added = _.find(this.props.itemsAdded, function(itemAdded)
        {
            return itemAdded.id+'' === it.id+'';
        }) ? true:false;
        
        var id = _.get(it, 'id', rowIndex);
        var key = 'row_'+id+'_col_add';
        var className = 'btn btn-default';
        var label = added ? 'Enlever la page':'Ajouter une page';
        
        var onClick = _.bind(function()
        {
            if(added)
            {
                if(this.props.onClickRemove)
                {
                    this.props.onClickRemove(it);
                }
            }
            else
            {
                if(this.props.onClickAdd)
                {
                    this.props.onClickAdd(it);
                }
            }
        }, this);
        
        return (
            <td key={ key } className="text-right">
                <button type="button" className={className} onClick={onClick}>{label}</button>
            </td>
        );
    }

});

module.exports = PagesList;
