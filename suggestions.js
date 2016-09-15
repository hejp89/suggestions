var Suggestions = function(suggestionItems){
    if(!Array.isArray(suggestionItems)){
        throw 'suggestionItems must be an array';
    }

    if(suggestionItems.length > 0 && (!suggestionItems[0].id || !suggestionItems[0].items || !suggestionItems[0].formatter || typeof f != 'function')){
        throw 'Expected format: [{id: \'...\', items: [\'...\', ...], formatter: (item) => {...}, ...}, ...]';
    }

    this.suggestionItems = suggestionItems;

    this.suggest = function(input){
        var suggestions = [];
        input = input.toLowerCase();

        for(var si = 0; si < this.suggestionItems.length; si++){
            var id = this.suggestionItems[si].id;
            var items = this.suggestionItems[si].items;
            var formatter = this.suggestionItems[si].formatter;

            for(var ii = 0; ii < items.length; ii++){
                if(items[ii].toLowerCase().indexOf(input) != -1){
                    suggestions.push({'id': id, 'item': items[ii], 'text': formatter(input, items[ii])});
                }
            }
        }

        return suggestions;
    }
}

var createFormatter = function(format){
    return function(input, item){
        return format.replace('{{item}}', item);
    }
}

var suggestions = {
    'Suggestions': Suggestions,
    'createFormatter': createFormatter
}
