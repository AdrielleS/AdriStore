import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class ProductProvider {

  private PATH ='products/';
  constructor(private db:AngularFireDatabase) {}

  getAll(){
    return this.db.list(this.PATH, ref => ref.orderByChild('name'))
      .snapshotChanges()
      .map(changes => {
        return changes.map(p => ({ key: p.payload.key, ...p.payload.val() }));
      })
  }
  
  get(key:string){
    return this.db.object(this.PATH + key)
      .snapshotChanges() 
      .map(p =>{
        return {key: p.key, ...p.payload.val()};
      })

  }
  

  save(product: any){
    return new Promise((resolve, reject) => {
      if (product.key){
        this.db.list(this.PATH)
        .update(product.key, {name: product.name, description: product.descriptiion,
           code: product.code, quantity: product.quantity, price: product.price})
        .then(() => resolve())
        .catch((e) => reject(e));
      }else{
        this.db.list(this.PATH)
        .push( {name: product.name, description: product.description,
          code: product.code, quantity: product.quantity, price: product.price})
        .then(() => resolve());
      }
    });
  }

  remove(key: string){
    return this.db.list(this.PATH).remove(key);
  }
}




