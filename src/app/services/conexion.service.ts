import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


export interface Item { name: string }

@Injectable()
export class ConexionService {

  private itemsCollection: AngularFirestoreCollection<Item>;
  items: Observable<Item[]>;
  private itemDoc: AngularFirestoreDocument<Item>;

  constructor(private afs: AngularFirestore) {
    this.itemsCollection = afs.collection<Item>('items');
    this.items = this.itemsCollection.snapshotChanges().pipe(
      map(
          changes => { return changes.map(a => {
          const data = a.payload.doc.data() as Item;
          const id = a.payload.doc.id;
          console.log('data >>>: ', data)
          return { id, ...data };
        });
        }
      ))
   }

   listItem() {
     return this.items;
   }

   addItem(item: Item) {
    this.itemsCollection.add(item);
  }

  deleteItem(id: string) {
    this.itemDoc = this.afs.doc<Item>(`items/${id}`);
    this.itemDoc.delete();
  }

  editItem(text: string, id: string) {
    this.itemDoc = this.afs.doc<Item>(`items/${id}`);
    this.itemDoc.update({name: text});
  }
}
