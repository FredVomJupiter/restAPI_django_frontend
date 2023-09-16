import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { OverlayService } from 'src/app/services/overlay.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent {

  newCategory: string = '';
  newColor: string = '';

  categoryForm = new FormGroup({
    newCategory: new FormControl(''),
    newColor: new FormControl('')
  });

  constructor(
    private dataService: DataService,
    public oS: OverlayService
    ) { }


  async createCategory() {
    this.dataService.createCategory(this.newCategory, this.newColor);
    this.closeCategoryForm();
  }


  closeCategoryForm() {
    this.newCategory = '';
    this.newColor = '';
    this.oS.categoryOverlayVisible = false;
  }

}
