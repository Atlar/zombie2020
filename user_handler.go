package main

type ID int

type UserAbstraction struct{

    ProjectParticipation
    GroupParticipation
   
    InfoUser
    ScoreInfoUser

}
type InfoUser struct{

    Name     string
    Id       ID
    email    string

}
type ScoreInfoUser struct{

    Score    int

}
type Participation struct{
 
    Participants []ID

}
func (self *Participation) Contains (id ID) bool {
   
   for _, v:= range self.Participants{
 
        if ( v == id){
        
           return true
           
       } 

   }
   return false
}
type ProjectParticipation struct{}
type GroupParticipation struct{}

func GetParticipated( participantId ID, projects []Participation, answer *[]ID){
    
     AnswerId:= []ID{} 
   
     for _, v := range projects{
        
       result := v.Contains( participantId )
       if( result!= false ) {
      
           append( AnswerId, v)
      
       } 
       
     }
     return &AnswerId
     
}
type HistoryStamps struct{

     CreatedOn int64
     LastModifiedOn int64
     DeleteRequestOn int64
    
}