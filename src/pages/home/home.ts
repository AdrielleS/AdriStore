import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import {Observable} from 'rxjs/Observable';
import {ProductProvider} from './../../providers/product/product';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  products: Observable<any>;


  constructor(public navCtrl: NavController, 
    private provider:ProductProvider,
    private toast: ToastController) {

      this.products = this.provider.getAll();
  }

  newProduct() {
    this.navCtrl.push('ProductPage');
  }

  editProduct(product: any){
    this.navCtrl.push('ProductPage',{product: product });

  }

  removeProduct(key: string){
    this.provider.remove(key)
    .then(() => {
      this.toast.create({message: 'Produto removido com sucesso.', duration:3000 }).present();

    })
    .catch((e)=>{
      this.toast.create({message: 'Erro ao remover o Produto', duration:3000 }).present();
    })
  }

}
