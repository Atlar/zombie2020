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


 	var NewComponennt = new componentClass(properties);

 	return NewComponennt;
}
 addComponent( nameComponent, componentInstance ){
   
    //alert("adding component " + nameComponent + "" + JSON.stringify(componentInstance ) + " is defined? " + componentInstance);
    
 	this[ nameComponent ] = componentInstance;
 	//alert("added member" + JSON.stringify(this));
 	
 	this[ nameComponent ].parent = this;
 	
 	//componentInstance.parent = this;
 	//mb circular 
    //alert( "result cm " + JSON.stringify(this) );
 } 
 
}