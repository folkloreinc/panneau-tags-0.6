var React = require('react');
var Immutable = require('immutable');

var ModalActions = Panneau.Actions.Modal;

var SortableMixin = Panneau.Mixins.Sortable;

var PageField = require('./Page.react');

var Pages = React.createClass({
    
    mixins: [SortableMixin],
    
    sortableOptions: {
        ref: 'list',
		model: 'value',
        onUpdate: 'onSortableUpdate'
    },
    
    render: function()
    {
        var pages = this.renderPages(this.props.value || []);
        
        var label;
        if(this.props.label)
        {
            label = <label htmlFor={name} className="control-label">{this.props.label}</label>;
        }
        
        
        var className = 'form-group form-group-pages';
        
        var addIndex = (this.props.value || []).length;
        var onAddChange = _.bind(function(value)
        {
            this.onPageChange(value,addIndex);
        }, this);
        var addPageName = this.props.name+'['+addIndex+']';
        
        return (
            <div className={className}>
                { label }
                <div ref="list" className="list">
                    {pages}
                </div>
                <PageField name={addPageName} placeholder="Ajouter une page..." onChange={onAddChange} />
            </div>
        );
    },
    
    renderPages: function(pages)
    {
        return pages.map(_.bind(this.renderPage, this));
    },
    
    renderPage: function(page, index)
    {
        var key = 'page_'+index+'_'+page.id;
        
        var onChange = _.bind(function(value)
        {
            this.onPageChange(value,index);
        }, this);
        
        var title = _.get(page, 'snippet.title', '');
        var inputName = this.props.name+'['+index+']';
        
        return (
            <PageField key={key} name={inputName} value={page} onChange={onChange} />
        );
    },
    
    onPageChange: function(value, index)
    {
        var currentValue = Immutable.fromJS(this.props.value || []);
        var newValue = !value ? currentValue.delete(index):currentValue.set(index, value);
        
        if(currentValue !== newValue)
        {
            value = newValue.toJS();
            
            if(this.props.onChange)
            {
                this.props.onChange(value);
            }
        }
    },
    
    onSortableUpdate: function(e)
    {
        if(this.props.onChange)
        {
            this.props.onChange(this.state.value);
        }
    }
    
});

module.exports = Pages;
