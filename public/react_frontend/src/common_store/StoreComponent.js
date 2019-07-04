//base store with lifecycle functions and events

export default class StoreComponent {

   //properties
   parent;
   settings;
 
 //methods
 //lifecycle
 onCreated = () => {};
 onSettingUpdate = ( oldSettings ) => {};
 //Settings control
 setSettings(settingsNew){
   this.settings = settingsNew;
   this.onSettingUpdate({});
 } 
 updateSettings( settingsToUpdate ){
   var oldSettings = this.settings;
   this.settings = {...this.settings, ...settingsToUpdate };
   this.onSettingUpdate( oldSettings );
} 
 //composition
 CreateComponent( componentClass ){
    var properties = { parent: this };
    alert("creating component");
    alert(componentClass);
 	var NewComponennt = new componentClass(properties);
 	alert(NewComponennt);
 	return NewComponennt;
}
 addComponent( nameComponent, componentInstance ){
 
 	this[ nameComponent ] = componentInstance;
 	this[ nameComponent ].parent = this;
 
 } 
 //creating
 constructor( properties ){
   //alert("component constructor" );
   this.parent = properties.parent;
   alert("component construction finishing" );
 } 
 
} 
alert(StoreComponent);
