import { Component, OnInit } from '@angular/core';
import { ConexionService } from 'src/app/services/conexion.service';

@Component({
  selector: 'app-list-add',
  templateUrl: './list-add.component.html',
  styleUrls: ['./list-add.component.css']
})
export class ListAddComponent implements OnInit {

  item: any = {
    name: ''
  }

  constructor( private conexion: ConexionService ) { }

  ngOnInit(): void {
  }

  add( valueInput , $event ){
    $event.preventDefault();
    this.item.name = valueInput;
    this.conexion.addItem(this.item);
    this.item.name = '';
  }

}
