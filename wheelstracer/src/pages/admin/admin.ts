import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { Upload } from '../../providers/Upload';
import { UploadServiceProvider } from '../../providers/upload-service';
import * as _ from "lodash";


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

  selectedFiles: FileList;
  currentUpload: Upload;
  foodItem = {  available: '',
                category: '',  
                description: '',    
                image: '',   
                name:  '',
                price: '',              
                stock: ''};
  eatTypes() : string[]{
    return ["veg", "nonveg"];
  } 

  foodTypes(): string[]{
    return ["staple","curry"];
  }
  eatType: string ;
  foodType: string ;
  
  constructor(private upSvc: UploadServiceProvider) { 
    this.eatType="veg";
    this.foodType="staple";
  }
  onFoodChange(newFood)
  {
      this.foodType=newFood;
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
    this.foodItem.image= this.uploadSingle();
    this.foodItem.available="true";
    this.foodItem.stock="10";
    console.log(this.foodType);
    this.foodItem.category=this.eatType+this.foodType;
    console.log(this.foodItem);
  }
  uploadSingle():string {
    let file = this.selectedFiles.item(0)
    this.currentUpload = new Upload(file);
    this.upSvc.pushUpload(this.currentUpload)
    return this.currentUpload.file.name.toString();
  }

  uploadMulti() {
    let files = this.selectedFiles
    let filesIndex = _.range(files.length)
    _.each(filesIndex, (idx) => {
      this.currentUpload = new Upload(files[idx]);
      this.upSvc.pushUpload(this.currentUpload)}
    )
  }

}
