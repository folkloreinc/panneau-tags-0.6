var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var _ = require('lodash');
var Panneau = require('panneau');

var TokenField = require('bootstrap-tokenfield');
var Bloodhound = require('typeahead.js');

var TagsField = React.createClass({
    
    propTypes: {
        label: React.PropTypes.string,
        name: React.PropTypes.string,
        value: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.array
        ]),
        urlPrefetch: React.PropTypes.string,
        url: React.PropTypes.string,
        placeholder: React.PropTypes.string,
        queryWildcard: React.PropTypes.string,
        suggestionTemplate: React.PropTypes.string,
        helpText: React.PropTypes.string,
        transformResponse: React.PropTypes.func,
        onChange: React.PropTypes.func
    },
    
    tokenfield: null,
    
    getDefaultProps: function()
    {
        return {
            placeholder: 'Entrez des tags...',
            urlPrefetch: null,
            url: null,
            queryWildcard: '%QUERY',
            suggestionTemplate: '<div><%= label %></div>',
            transformResponse: null,
            helpText: null
        };
    },
    
    render: function()
    {
        var label;
        if(this.props.label)
        {
            label = <label htmlFor={name} className="control-label">{this.props.label}</label>;
        }
        
        var helpBlock;
        if(this.props.helpText && this.props.helpText.length)
        {
            helpBlock = (
                <div class="help-block">{ this.props.helpText }</div>
            );
        }
        
        var value = _.isArray(this.props.value) ? this.props.value.join(','):this.props.value;
        return (
            <div className="form-group form-group-tags">
                { label }
                <input type="hidden" name={this.props.name} value={value} />
                <input type="text" className="form-control" defaultValue={value} ref="input" placeholder={this.props.placeholder} />
                { helpBlock }
            </div>
        );
    },
    
    componentDidMount: function()
    {
        var input = ReactDOM.findDOMNode(this.refs.input);
        
        this.bloodhound = new Bloodhound({
            prefetch: {
                url: this.props.urlPrefetch || Panneau.config('tags.urlPrefetch') || Panneau.config('tags.url') || '/panneau/tags',
                transform: this.transformResponse
            },
            remote: {
                url: this.props.url || Panneau.config('tags.url') || '/panneau/tags?search='+this.props.queryWildcard,
                wildcard: this.props.queryWildcard,
                transform: this.transformResponse
            },
            datumTokenizer: function(d)
            {
                return Bloodhound.tokenizers.whitespace(d.value);
            },
            queryTokenizer: Bloodhound.tokenizers.whitespace
        });

        this.bloodhound.initialize();
        
        this.tokenfield = new TokenField(input, {
            typeahead: [null, {
                source: this.bloodhound.ttAdapter(),
                templates: {
                    suggestion: _.template(this.props.suggestionTemplate)
                }
            }]
        });
        
        _.bindAll(this, 'onChange');
        $(input).on('change', this.onChange);
    },
    
    componentWillUnmount: function()
    {
        var input = ReactDOM.findDOMNode(this.refs.input);
        $(input).off('change', this.onChange);
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
    
    transformResponse: function(response)
    {
        if(this.props.transformResponse && _.isFunction(this.props.transformResponse))
        {
            return this.props.transformResponse(response);
        }
        
        var tags = [];
        for(var i = 0, tl = response.length; i < tl; i++)
        {
            tags.push({
                label: response[i].name,
                value: response[i].name
            });
        }
        return tags;
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
