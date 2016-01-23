var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var _ = require('lodash');
var Immutable = require('immutable');

var Bloodhound = require('typeahead.js');

var Page = React.createClass({
    
    getDefaultProps: function()
    {
        return {
            placeholder: 'Rechercher une page...',
            url: '/panneau/pages'
        };
    },
    
    render: function()
    {
        var label;
        if(this.props.label)
        {
            label = <label htmlFor={name} className="control-label">{this.props.label}</label>;
        }
        
        var inputStyle = {};
        var itemStyle = {
            display: 'none'
        };
        if(this.props.value)
        {
            itemStyle.display = 'block';
            inputStyle.display = 'none';
        }
        
        var title = _.get(this.props, 'value.snippet.title', '');
        var link = _.get(this.props, 'value.snippet.link', '');
        
        var valueInput = null;
        if(this.props.value)
        {
            valueInput = <input type="hidden" name={this.props.name} value={this.props.value.id} />
        }
        
        return (
            <div className="form-group form-group-page">
                { label }
                <div className="form-group-page-item" style={itemStyle}>
                    <div className="row">
                        <div className="title col-sm-8">
                            <span className="glyphicon glyphicon-file"></span> { title } - <span className="small">{ link }</span>
                        </div>
                        <div className="col-sm-4 text-right">
                            <button type="button" className="btn btn-xs btn-default glyphicon glyphicon-remove" onClick={ this.onClickRemove }></button>
                        </div>
                    </div>
                </div>
                <div style={inputStyle}>
                    <input ref="input" type="text" className="form-control" placeholder={ this.props.placeholder } />
                </div>
                {valueInput}
            </div>
        );
    },
    
    componentDidMount: function()
    {
        var $input = $(ReactDOM.findDOMNode(this.refs.input));
        
        var pages = new Bloodhound({
            datumTokenizer: Bloodhound.tokenizers.whitespace,
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            remote: {
                url: this.props.url+'?search=%QUERY',
                wildcard: '%QUERY'
            }
        });
        
        $input.typeahead({
            hint: true,
            highlight: true,
            minLength: 1
        },
        {
            name: 'pages',
            source: pages,
            display: function(suggestion)
            {
                return '';
            },
            templates: {
                empty: [
                  '<div class="empty-message">',
                    'Aucune page trouvée',
                  '</div>'
                ].join('\n'),
                suggestion: _.template([
                  '<div>',
                    '<h4><%= _.get(snippet, "title") %></h4>',
                    '<p class="quiet"><%= _.get(snippet, "link") %></p>',
                  '</div>'
                ].join('\n'))
            }
        });
        
        $input.on('typeahead:select', this.onTypeaheadSelect);
    },
    
    componentWillUnmount: function()
    {
        var $input = $(ReactDOM.findDOMNode(this.refs.input));
        
        $input.off('typeahead:select');
        $input.typeahead('destroy');
    },
    
    onTypeaheadSelect: function(e, suggestion)
    {
        e.preventDefault();
        
        if(this.props.onChange)
        {
            this.props.onChange(suggestion);
        }
    },
    
    onClickRemove: function(e)
    {
        e.preventDefault();
        
        if(this.props.onChange)
        {
            this.props.onChange(null);
        }
    }
    
});

module.exports = Page;
