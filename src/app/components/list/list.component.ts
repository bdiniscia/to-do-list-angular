import { Component, OnInit } from '@angular/core';
import { ConexionService } from '../../services/conexion.service';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  items: any; 
  editItem: any = {
    name: ''
  }

  constructor(private conexion: ConexionService ) { 
    this.conexion.listItem().subscribe(item => {
      this.items = item;
      console.log('En list component >>',this.items);
    })
   }

  ngOnInit(): void {
  }

  delete(id: string) {
    this.conexion.deleteItem(id);
  }

  editModal(item: any) {
    this.editItem = item;
  }

  addEditItem(editText: string, id: string, $event) {
    $event.preventDefault();
    this.conexion.editItem(editText, id);
  }

}
