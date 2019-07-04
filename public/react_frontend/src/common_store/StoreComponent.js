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
    var properties = { parent: parent
    };
    alert("creating component");
 	var NewComponennt = new componentClass(properties);
 	alert(NewComponennt);
 	return NewComponennt;
} 
 
 //creating
 constructor( properties ){
   alert("component constructor" );
   this.parent = properties.parent;
   alert("component construction finishing" );
 } 
 
} 

