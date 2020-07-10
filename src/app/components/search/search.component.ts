import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { DataExtractionService } from 'src/app/services/data-extraction.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  parameterForm: FormGroup;
  receivedQueryArray = [];

  constructor(private formBuilder: FormBuilder,
              private dataExtractionService: DataExtractionService) { }

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
    this.dataExtractionService.advancedSearch(this.parameterForm.value).subscribe(
      (data) => {
        console.log(data);
        this.receivedQueryArray = data.items;
      }
    );
  }

  resetQuery() {
    this.parameterForm.reset({
      order: 'asc',
      sort: 'activity',
    });
  }

  ngOnInit() {
    this.parameterForm = this.formBuilder.group({
      order: ['asc'],
      sort: ['activity'],

    });
  }

}
