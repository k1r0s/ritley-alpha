module.exports = function(){
    function set(favsArr){
        var store = JSON.stringify(favsArr || []);
        sessionStorage.setItem("favs", store);
    }

    function get(){
        var store = sessionStorage.getItem("favs");
        return JSON.parse(store || "[]");
    }

    return {
        add: function(pkmid){
            var favs = get();
            if(favs.length > 10) return;
            favs.push(pkmid);
            set(favs);
            return true;
        },
        remove: function(pkmid){
            var favs = get();
            var index = favs.indexOf(pkmid);
            favs.splice(index, 1);
            set(favs);
        },
        has: function(pkmid){
            var favs = get();
            return favs.indexOf(pkmid) > -1;
        }
    };
};
