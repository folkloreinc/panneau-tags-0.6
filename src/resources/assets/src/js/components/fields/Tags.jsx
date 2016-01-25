var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var _ = require('lodash');
var Panneau = require('panneau');

var TokenField = require('bootstrap-tokenfield');
var Bloodhound = require('typeahead.js');

var TagsField = React.createClass({
    
    propTypes: {
        
    },
    
    tokenfield: null,
    
    render: function()
    {
        var label;
        if(this.props.label)
        {
            label = <label htmlFor={name} className="control-label">{this.props.label}</label>;
        }
        
        var value = this.props.value ? this.props.value.join(','):this.props.value;
        return (
            <div className="form-group form-group-tags">
                { label }
                <input type="hidden" name={this.props.name} value={value} />
                <input type="text" className="form-control" defaultValue={value} ref="input" />
            </div>
        );
    },
    
    componentDidUpdate: function(prevProps)
    {
        var currentValue = this.props.value ? this.props.value.join(','):'';
        var prevValue = prevProps.value ? prevProps.value.join(','):'';
        if(currentValue !== prevValue)
        {
            this.tokenfield.setTokens(this.props.value);
        }
    },
    
    componentDidMount: function()
    {
        var input = ReactDOM.findDOMNode(this.refs.input);
        
        this.bloodhound = new Bloodhound({
            prefetch: {
                url: Panneau.config('tags.url') || '/panneau/tags',
                transform: this.transformResponse
            },
            remote: {
                url: Panneau.config('tags.url') || '/panneau/tags?search=%QUERY',
                wildcard: '%QUERY',
                transform: this.transformResponse
            },
            datumTokenizer: function(d) {
                return Bloodhound.tokenizers.whitespace(d.value);
            },
            queryTokenizer: Bloodhound.tokenizers.whitespace
        });

        this.bloodhound.initialize();
        
        this.tokenfield = new TokenField(input, {
            typeahead: [null, {
                source: this.bloodhound.ttAdapter(),
                templates: {
                    suggestion: _.template('<div><%= label %></div>')
                }
            }]
        });
        
        _.bindAll(this, 'onChange')
        $(input).on('change', this.onChange);
    },
    
    transformResponse: function(response)
    {
        var tags = [];
        for(var i = 0, tl = response.length; i < tl; i++)
        {
            tags.push({
                label: response[i].name,
                value: response[i].id
            });
        }
        console.log(tags);
        return tags;
    },
    
    componentWillUnmount: function()
    {
        var input = ReactDOM.findDOMNode(this.refs.input);
        $(input).off('change', this.onChange);
    },
    
    onChange: function(e)
    {
        var value = $(e.currentTarget).val();
        
        if(this.props.onChange)
        {
            this.props.onChange(value.split(','));
        }
    }
    
    
});

module.exports = TagsField;
