var React = require('react');
var $ = require('jquery');
var _ = require('lodash');

var Requests = require('../../requests/index');

var Modal = Panneau.Components.Modals.Modal;

var PagesList = require('../lists/Pages.react');

var PagesModal = React.createClass({

    getDefaultProps: function()
    {
        return {
            pages: null,
            pagesAdded: []
        };
    },
    
    getInitialState: function()
    {
        return {
            pages: this.props.pages,
            pagesAdded: this.props.pagesAdded
        };
    },

    render: function()
    {
        var list = null;
        if(this.state.pages)
        {
            list = this.renderList();
        }

        return (
            <Modal closeModal={this.props.closeModal} visible={this.props.visible} onClose={this.onClose}>
                <div className="modal-header">
                    <button type="button" className="close" onClick={this.onClickClose} aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <h4 className="modal-title">Sélectionnez une page</h4>
                </div>
                <div className="modal-body">
                    { list }
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-default" onClick={this.onClickClose}>Fermer</button>
                </div>
            </Modal>
        );
    },
    
    renderList: function()
    {
        var columns = [
            {
                'name': 'id',
                'label': 'ID',
                'width': 50,
                'value': 'id'
            },
            {
                'name': 'title',
                'label': 'Titre',
                'value': 'fields.title.'+LOCALE
            },
            {
                'name': 'section',
                'label': 'Section',
                'value': 'fields.section'
            },
            {
                'name': 'add'
            }
        ];
        
        return (
            <PagesList 
                items={this.state.pages} 
                itemsAdded={this.state.pagesAdded} 
                columns={columns} 
                onClickAdd={this.onClickAdd} 
                onClickRemove={this.onClickRemove} />
        );
    },
    
    componentWillMount: function()
    {
        if(!this.state.pages)
        {
            Requests.getPages()
                .then(_.bind(this.onPagesLoaded, this));
        }
    },
    
    onPagesLoaded: function(pages)
    {
        this.setState({
            pages: pages
        });
    },
    
    onClickAdd: function(it)
    {
        var currentValue = Immutable.fromJS(this.state.pagesAdded || []);
        var newValue = currentValue.push(it);
        
        this.setState({
            pagesAdded: newValue.toJS()
        });
        
        if(this.props.onAdd)
        {
            this.props.onAdd(it);
        }
    },
    
    onClickRemove: function(it)
    {
        var index = _.findIndex(this.state.itemsAdded, function(itemAdded)
        {
            return itemAdded.id+'' === it.id+'';
        });
        
        var currentValue = Immutable.fromJS(this.state.pagesAdded || []);
        var newValue = currentValue.delete(index);
        
        this.setState({
            pagesAdded: newValue.toJS()
        });
        
        if(this.props.onRemove)
        {
            this.props.onRemove(it);
        }
    },
    
    onClickClose: function()
    {
        if(this.props.closeModal)
        {
            this.props.closeModal();
        }
        else
        {
            this.close();
        }
    },
    
    onClose: function()
    {
        if(this.props.onClose)
        {
            this.props.onClose();
        }
    }

});

module.exports = PagesModal;
