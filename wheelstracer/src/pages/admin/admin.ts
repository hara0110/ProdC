import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { Upload } from '../../providers/Upload';
import { UploadServiceProvider } from '../../providers/upload-service';
// import * as _ from "lodash";
import { CartService } from '../../providers/cart.service';


/**
 * Generated class for the AdminPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin',
  templateUrl: 'admin.html',
})
export class AdminPage {
  
  fileName:string;
  dateobj :String;    
  selectedFiles: FileList;

  currentUpload: Upload;
  foodItem = {  available: true,
                category: '',  
                description: '',    
                image: '',   
                name:  '',
                price: '',              
                stock: '',
                thaliItems:'',
              };
  
  
  eatTypes() : string[]{
    return ["veg", "nonveg"];
  } 

  foodTypes(): string[]{
    return ["staples","curry"];
  }

  uploadCategory():string[]{
    return ["thali","individual"];
  }

  thaliTypes(): string[]{
    return ["North_Indian","South_Indian","Odisha","Kerela"];
  }
  eatType: string ;
  foodType: string ;
  uploadsCategory: string;
  thaliUploadType:any ;
  
  
  constructor(private upSvc: UploadServiceProvider,private cartServe:CartService) { 
    this.eatType="veg";
    this.foodType="staples";
    this.uploadsCategory=null;
    this.thaliUploadType=null;
    this.fileName=null;
    this.dateobj=new Date().getTime().toString();
  }
  onFoodChange(newFood)
  {
      this.foodType=newFood;
  }

  onthaliTypesChange(thaliUploadType){
    this.thaliUploadType=thaliUploadType;
  }

  onUploadTypeChange(uploadsCategory)
  {
    this.uploadsCategory=uploadsCategory;

  }
  onEatChange(newEat)
  {
      this.eatType=newEat;
  }

  detectFiles(event) {
      this.selectedFiles = event.target.files;
  }
  logForm()
  {   
     
     
    this.fileName= this.eatType+this.uploadsCategory+this.dateobj;
    if(this.uploadsCategory=="thali")
    {
      this.eatType= this.eatType+"/Regional";
      this.foodType= this.thaliUploadType;
    }

    this.foodItem.image= this.fileName;
    this.foodItem.available=true;
    this.foodItem.stock="10";
    this.uploadSingle();
    console.log(this.foodType);
    this.foodItem.category=this.eatType+this.foodType;
    this.cartServe.addFoodItem(this.foodItem,this.eatType,this.foodType);
    console.log(this.foodItem);
  }
  uploadSingle() {
    let file = this.selectedFiles.item(0)
    this.currentUpload = new Upload(file);
    this.upSvc.pushUpload(this.currentUpload,this.fileName);
   
  }

  // uploadMulti() {
  //   let files = this.selectedFiles
  //   let filesIndex = _.range(files.length)
  //   _.each(filesIndex, (idx) => {
  //     this.currentUpload = new Upload(files[idx]);
  //     this.upSvc.pushUpload(this.currentUpload,this.eatType)}
  //   )
  // }

}
