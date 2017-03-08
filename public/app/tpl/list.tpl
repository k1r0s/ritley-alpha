<section ng-controller="listController" ng-init="init()">


    <md-list-item class="md-3-line" ng-repeat="pkm in APP.pkmList">
        <div class="md-list-item-text" layout="column">
            <h3>#{{pkm.id}} - {{ pkm.name }}</h3> <small>Tipo: {{pkm._type1.name}} {{pkm._type2.name}}</small>
            <p>
                {{pkm.desc}}
            </p>
        </div>
        <md-button href="#/pkm/{{pkm.id}}">Editar</md-button>
    </md-list-item>

</section>
