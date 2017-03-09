<section ng-controller="formController" ng-init="init()">
    <md-content layout-padding>
        <form novalidate name="pkmForm" ng-submit="save(model)">
            <div layout="row">
                <md-input-container class="md-block">
                    <label>Nombre</label>
                    <!-- ng-pattern="/^[a-zA-Z]{4,24}$/" -->
                    <input ng-model="model.name" name="name" required ng-minlength="4" ng-maxlength="24">
                    <div ng-messages="pkmForm.name.$error" role="alert" md-auto-hide="false">
                        <div ng-message="required">Este campo es requerido.</div>
                        <div ng-message-exp="['ngMinlength', 'ngMaxlength']">Este campo debe contener entre 4 y 24 caracteres.</div>
                    </div>
                </md-input-container>
            </div>
            <div layout="row">
                <md-input-container flex="40">
                    <label>Descripción</label>
                    <textarea ng-model="model.desc" name="desc" required ng-minlength="30" rows="2"></textarea>
                    <div ng-messages="pkmForm.desc.$error" role="alert" md-auto-hide="false">
                        <div ng-message="required">Este campo es requerido.</div>
                        <div ng-message="ngMinlength">Este campo debe contener cómo mínimo 30 caracteres.</div>
                    </div>
                </md-input-container>
                <md-input-container flex="30">
                        <md-autocomplete name="type1" md-selected-item-change="model.type1 = APP.pkmTypes.indexOf(model._type1)" required md-selected-item="model._type1" md-search-text="searchFilterType1" md-items="type in APP.pkmTypes | filter:searchFilterType1" md-item-text="type.name" md-min-length="0" placeholder="Tipo 1">
                            <md-item-template>
                                <div md-highlight-text="searchFilterType1" md-highlight-flags="^i" class="pkm-type pkm-type-{{$index}}">{{type.name}}</div>
                            </md-item-template>
                        </md-autocomplete>
                        <div ng-messages="pkmForm.type1.$error" role="alert" md-auto-hide="false">
                            <div ng-message="required">Este campo es requerido.</div>
                        </div>
                </md-input-container>
                <md-input-container flex="30">
                        <md-autocomplete md-selected-item-change="model.type2 = APP.pkmTypes.indexOf(model._type2)" md-selected-item="model._type2" md-search-text="searchFilterType2" md-items="type in APP.pkmTypes | filter:searchFilterType2" md-item-text="type.name" md-min-length="0" placeholder="Tipo 2">
                            <md-item-template>
                                <div md-highlight-text="searchFilterType2" md-highlight-flags="^i" class="pkm-type pkm-type-{{$index}}">{{type.name}}</div>
                            </md-item-template>
                        </md-autocomplete>
                </md-input-container>
            </div>
            <div layout="row">
                <md-input-container flex="30">
                        <md-autocomplete md-selected-item-change="model.f_ev = APP.pkmList.indexOf(model._fev)" md-selected-item="model._fev" md-search-text="searchEvol" md-items="pkm in APP.pkmList | filter:searchEvol" md-item-text="pkm.name" md-min-length="0" placeholder="Evolución">
                            <md-item-template>
                                <span md-highlight-text="searchEvol" md-highlight-flags="^i" >{{pkm.name}}</span>
                            </md-item-template>
                        </md-autocomplete>
                </md-input-container>
            </div>
            <md-button type="submit" ng-disabled="pkmForm.$invalid">Guardar</md-button>
        </form>
    </md-content>
</section>
