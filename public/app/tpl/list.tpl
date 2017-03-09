<section ng-controller="listController" ng-init="init()">

    <md-content layout-padding>
        <div layout="row">
            <md-input-container flex="80">
                <label>Filtrar</label>
                <input ng-model="globalFilter">
            </md-input-container>

            <md-input-container flex="20">
                <md-radio-group ng-model="globalFav">

                      <md-radio-button ng-click="globalFav = undefined">Todos</md-radio-button>
                      <md-radio-button value="true">Favs</md-radio-button>
                    </md-radio-group>
            </md-input-container>

        </div>

        <md-list-item class="md-3-line" ng-repeat="pkm in APP.pkmList | filter: { _fav: globalFav, name: globalFilter }">
            <div class="md-list-item-text" layout="column">
                <h3>#{{pkm.id}}
                    -
                    {{ pkm.name }}</h3>
                <div layout="row" layout-align="left">
                    <div class="pkm-type pkm-type-{{pkm.type1}}">{{pkm._type1.name}}</div>
                    <div class="pkm-type pkm-type-{{pkm.type2}}">{{pkm._type2.name}}</div>
                </div>
                <p>
                    {{pkm.desc}}
                </p>
            </div>
            <md-button href="#/pkm/{{pkm.id}}" class="md-icon-button">
                <md-icon md-menu-align-target>mode_edit</md-icon>
            </md-button>
            <md-button ng-click="delete(pkm.id)" class="md-icon-button">
                <md-icon md-menu-align-target>delete</md-icon>
            </md-button>
            <md-button ng-if="!isFav(pkm)" ng-click="fav(pkm)" class="md-icon-button">
                <md-icon md-menu-align-target>favorite_border</md-icon>
            </md-button>
            <md-button ng-if="isFav(pkm)" ng-click="unfav(pkm)" class="md-icon-button">
                <md-icon md-menu-align-target>favorite</md-icon>
            </md-button>
        </md-list-item>
    </md-content>
</section>
