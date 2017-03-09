
/**
 * module - servicio que maneja los estados de favoritos y los almacena en el sessionStorage,
 * cada usuario (sesión) tendrá acceso a determinados pkm favoritos
 *
 * @return {type}  description
 */
module.exports = function(){

    /**
     * set - guarda la representación de los favoritos en sessionStorage
     *
     * @param  {type} favsArr description
     * @return {type}         description
     */
    function set(favsArr){
        var store = JSON.stringify(favsArr || []);
        sessionStorage.setItem("favs", store);
    }


    /**
     * get - devuelve un array con la representación de los favoritos a partir del sessionStorage
     *
     * @return {type}  description
     */
    function get(){
        var store = sessionStorage.getItem("favs");
        return JSON.parse(store || "[]");
    }

    return {

        /**
         * add - método público para añadir un pkm (su id) a los favoritos
         *
         * @param  {type} pkmid description
         * @return {type}       description
         */
        add: function(pkmid){
            var favs = get();
            if(favs.length > 10) return;
            favs.push(pkmid);
            set(favs);
            return true;
        },

        /**
         * remove - método público para eliminar un pkm de los favoritos
         *
         * @param  {type} pkmid description
         * @return {type}       description
         */
        remove: function(pkmid){
            var favs = get();
            var index = favs.indexOf(pkmid);
            favs.splice(index, 1);
            set(favs);
        },

        /**
         * has - método público para saber si un pkm es favorito o no    
         *
         * @param  {type} pkmid description
         * @return {boolean} isPkmFab
         */
        has: function(pkmid){
            var favs = get();
            return favs.indexOf(pkmid) > -1;
        }
    };
};
