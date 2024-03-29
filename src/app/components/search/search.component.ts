import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { DataExtractionService } from 'src/app/services/data-extraction.service';
import { PageEvent, MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  parameterForm: FormGroup;
  receivedQueryArray = [];
  currentPageIndex = 0;
  pageSize = 10;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private formBuilder: FormBuilder,
              private dataExtractionService: DataExtractionService) { }

  // Form Initilization
  sortingOrders = [
    {
      name: 'Ascending',
      value: 'asc'
    },
    {
      name: 'Descending',
      value: 'desc'
    }
  ];

  sortingCriteria = [
    {
      name: 'Activity',
      value: 'activity'
    },
    {
      name: 'Votes',
      value: 'votes'
    },    {
      name: 'Creation',
      value: 'creation'
    },
    {
      name: 'Relevance',
      value: 'relevance'
    }
  ];


  newQuery() {
    console.log(this.parameterForm);
    this.currentPageIndex = 0;
    if (this.paginator) {
      this.paginator.pageIndex = this.currentPageIndex;
    }
    this.dataExtractionService.advancedSearch(this.parameterForm.value, this.currentPageIndex, this.pageSize).subscribe(
      (data) => {
        console.log(data);
        this.receivedQueryArray = data.items;
      }
    );
  }

  resetQuery() {
    this.parameterForm.reset({
      q: '',
      order: 'asc',
      sort: 'activity',
      accepted: false,
      closed: false,
      migrated: false,
      notice: false,
      tagged: '',
      untagged: '',
      title: '',
      body: '',
      user: '',
      url: '',
      wiki: false,
      answers: 0,
      views: 0,
      fromdate: '',
      todate: '',
      min: '',
      max: ''
    });
  }

  getUserData(params) {
    if (params.user_type === 'does_not_exist')
      {
        return false;
      }
    else
    {
      return true;
    }
  }

  openLink(url) {
    window.open(url, '_blank');
  }

  pageEvent(event) {
    this.currentPageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.dataExtractionService.advancedSearch(this.parameterForm.value, this.currentPageIndex, this.pageSize).subscribe(
      (data) => {
        console.log(data);
        this.receivedQueryArray = data.items;
      }
    );
  }

  convertToTimestamp(event, formControlName) {
    if (event.value != null) {
      formControlName.setValue(event.value.valueOf() / 1000);
    }
    else {
      formControlName.setValue('');
    }
  }

  searchTag(tag) {
    this.parameterForm.controls.tagged.setValue(tag);
    this.newQuery();
  }


  ngOnInit() {
    this.parameterForm = this.formBuilder.group({
      q: [''],
      order: ['asc'],
      sort: ['activity'],
      accepted: [false],
      closed: [false],
      migrated: [false],
      notice: [false],
      tagged: [''],
      untagged: [''],
      title: [''],
      body: [''],
      user: [''],
      url: [''],
      wiki: [false],
      answers: [0],
      views: [0],
      fromdate: [''],
      todate: [''],
      min: [''],
      max: ['']
    });
    this.newQuery();
  }

}
