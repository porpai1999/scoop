import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
=======
import {MenuItem} from 'primeng/api';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
>>>>>>> c31389029a2ba02683388c05a4b1ab90cfcfcdfb

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

<<<<<<< HEAD
  constructor() { }

  ngOnInit(): void {
=======
  logout = faSignOutAlt;
  
  constructor() { }
  items: MenuItem[];
  ngOnInit(): void {
    this.items = [
      {
          label: 'File',
          icon: 'pi pi-fw pi-file',
          items: [{
                  label: 'New', 
                  icon: 'pi pi-fw pi-plus',
                  items: [
                      {label: 'Project'},
                      {label: 'Other'},
                  ]
              },
              {label: 'Open'},
              {separator:true},
              {label: 'Quit'}
          ]
      },
      {
          label: 'Edit',
          icon: 'pi pi-fw pi-pencil',
          items: [
              {label: 'Delete', icon: 'pi pi-fw pi-trash'},
              {label: 'Refresh', icon: 'pi pi-fw pi-refresh'}
          ]
      },
      {
          label: 'Help',
          icon: 'pi pi-fw pi-question',
          items: [
              {
                  label: 'Contents'
              },
              {
                  label: 'Search', 
                  icon: 'pi pi-fw pi-search', 
                  items: [
                      {
                          label: 'Text', 
                          items: [
                              {
                                  label: 'Workspace'
                              }
                          ]
                      },
                      {
                          label: 'File'
                      }
              ]}
          ]
      },
      {
          label: 'Actions',
          icon: 'pi pi-fw pi-cog',
          items: [
              {
                  label: 'Edit',
                  icon: 'pi pi-fw pi-pencil',
                  items: [
                      {label: 'Save', icon: 'pi pi-fw pi-save'},
                      {label: 'Update', icon: 'pi pi-fw pi-save'},
                  ]
              },
              {
                  label: 'Other',
                  icon: 'pi pi-fw pi-tags',
                  items: [
                      {label: 'Delete', icon: 'pi pi-fw pi-minus'}
                  ]
              }
          ]
      },
      {
          label: 'Quit', icon: 'pi pi-fw pi-times'
      }
  ];
>>>>>>> c31389029a2ba02683388c05a4b1ab90cfcfcdfb
  }

}
