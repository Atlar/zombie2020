import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';
import StoreComponent from "./common_store/StoreComponent";
//agent to send any object by standart api
//
//create common url for api request site_api/type/id
const urlTypeId = (root, type,id) => `${root}/${type}/${id}`;
const urlAddress = (root, address) => {console.log(`${root}/${address}`);return `${root}/${address}`;} 

const returnResponseBody = res =>{ return res.body;  }
//
export default class SidAgent extends StoreComponent{

    superagent = superagentPromise(_superagent, global.Promise);

    ResponseReceived;//bool
    commands;//pool of get post and so on.
    
    //sends command to putput item, wait and sets waiting over
    //expects item to be prepared beforehand
    //receives answer with updated aggregator and new item
    CreateAndAddToAggregation( aggregation, aggregationField, Entity) {
        this.ResponseReceived=false;
        const CreateInAggregationCommand  = this.parent.agentCommands.CreateInAggregation;
        return CreateInAggregationCommand( aggregation, aggregationField, Entity )
              .then( ()=> this.ResponseReceived = true )
              //.then( (aggregator, item) => {this.UpdateAggregator(aggregator.id), this.UpdateCreateItem(item) } )
    }
    UpdateAggregationByAggregatorId( aggregation, subject, aggregatorId ){
        this.ResponseReceived=false;
        const CreateInAggregationCommand  = this.parent.agentCommands.UpdateAggregationByAggregatorId;
    }
   
    sendCommand = (functionName, args)=>{
    
        console.log("doesfunction exist "+this.commands[functionName] );
        this.ResponseReceived=false;
        return this.commands[functionName](args)
                   .finally( ()=> this.ResponseReceived = true );
      
    } 

    loadById = (type, id ) => this.superagent
    						//send request site/api/objectt_type/object_name
                .get( urlTypeId( this.getRootAPIUrl(), type, id) )
                .accept('json')
    						//return response body parsed by default
                .then( returnResponseBody )

    postObject = (address, object) => this.superagent.post( urlAddress(this.getRootAPIUrl(), address ), object)
               .accept('json')
               .then( returnResponseBody );
            
	  updateById = (type, id, object_data) => this.superagent
			   .put(urlTypeId( this.getRootAPIUrl() ,type, id), object_data)
               .then( returnResponseBody )
              
		getRootAPIUrl = () => this.parent.appStatusStore.APIRootURL;	
}