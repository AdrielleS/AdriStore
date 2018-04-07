import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {ProductProvider} from './../../providers/product/product';
import {FormBuilder, FormGroup,Validators} from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-product',
  templateUrl: 'product.html',
})
export class ProductPage {
  title: string;
  form: FormGroup;
  product: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private formBuilder:FormBuilder, private provider:ProductProvider,
    private toast: ToastController) {
      this.product = this.navParams.data.product || {};
      this.createForm();
      this.setupPageTitle();
  }

  private setupPageTitle(){
    this.title = this.navParams.data.product? 'Alterando contato' : 'Novo contato';
  }

  createForm(){
    this.form = this.formBuilder.group({
      key: [this.product.key],
      name:[ this.product.name, Validators.required],
      description: [this.product.description, Validators.required],
      code: [this.product.code, Validators.required],
      quantity: [this.product.quantity, Validators.required],
      price: [this.product.price, Validators.required]
    });

  }

  onSubmit(){
    if(this.form.valid){
      this.provider.save(this.form.value)
        .then(() =>{
          this.toast.create({ message:'Produto salvo com sucesso', duration: 3000}).present();
          this.navCtrl.pop();
        })
        .catch((e) => {
          this.toast.create({ message:'Erro ao salvar o produto', duration: 3000}).present();
          console.error(e);
        } );
    }

  }

}
