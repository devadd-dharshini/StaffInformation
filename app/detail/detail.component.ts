import { Component ,OnInit} from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { ServiceService} from '../service.service';
import { Router ,Data} from '@angular/router';



@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  deva: any;
  displayedColumns:string[]=['Personal Details','ID','DOB','Dept','Design','Salary','Actions','Display'];
  public devaFormGroup=this.formBuilder.group({
    'Staff_name':['',[ Validators.pattern('^[a-zA-Z]+$')]],
    'Staffid': ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
  'DOB': ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
  'department':['',[ Validators.required]],
  'Designation':['',[ Validators.pattern('^[a-zA-Z]+$')]],
  'Salary': ['', [Validators.required, Validators.pattern(/^\d+$/)]],
    '_id':[],
    '_rev':[],
  });
  constructor(private formBuilder:FormBuilder,public detail:ServiceService, private router:Router )
  {

  }
ngOnInit():void{
  this.fetchAction()
}
saveAction(){
  if(this.devaFormGroup.valid){
    let employeeObject:any=this.devaFormGroup.value;
    employeeObject['object_name']='deva'
    if(employeeObject['_id']==null){
      delete employeeObject['_id']
    }
    if(employeeObject['_rev']==null){
      delete employeeObject['_rev']
    }
    let _bulk_docsArray=[];
    _bulk_docsArray.push(employeeObject);
    this.detail.updateDocument(_bulk_docsArray);
    
  }
  else{
    alert("some of fields not valid")
  }
}
fetchAction(){
  this.detail.searchDocument('object_name:deva')
}
editAction(employeeObject: any) {
  this.devaFormGroup.reset()
  this.devaFormGroup.patchValue(employeeObject)
}
deleteAction(employeeObject: any):void {
  this.detail.deleteDocument(employeeObject['_id'], employeeObject['_rev'])
}
resetAction() {
  this.devaFormGroup.reset()
  this.devaFormGroup.markAsUntouched()
}
searchAction(){
}
applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.detail.dataSource.filter = filterValue.trim().toLowerCase();
    
  if (this.detail.dataSource.paginator) {
    this.detail.dataSource.paginator.firstPage();

     this.detail.dataSource.filterPredicate = (data: Data, filter: string) => {
  const date = new Date(data['date']);
  const filterDate = new Date(filter);
  return date.getTime() === filterDate.getTime();
};
this.detail.dataSource.filter = filterValue;
}
}
}


