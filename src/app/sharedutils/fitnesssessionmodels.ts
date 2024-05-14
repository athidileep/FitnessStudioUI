import { environment } from "../../environments/environment"

export class  fitnesssessionmodels {
    //Variables
    userName: string="";    

    //Getter & Setter Methods    
    SetUsername(val: string) { this.userName = val }

    GetUserName() { return this.userName }
}