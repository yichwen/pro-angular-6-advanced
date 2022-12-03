import { Component, Inject } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Product } from "../model/product.model";
import { Model } from "../model/repository.model"
import { MODES, SharedState, SHARED_STATE } from "./sharedState.model";
import { Observable } from 'rxjs';
import { filter, map, distinctUntilChanged, first, skipWhile } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: "paForm",
  templateUrl: "form.component.html",
  styleUrls: ["form.component.css"]
})
export class FormComponent {

  product: Product = new Product();
  originalProduct = new Product();
  // lastId: number;

  editing: boolean = false;

  constructor(
    private model: Model,
    private activatedRoute: ActivatedRoute,
    private router: Router
    // private state: SharedState
    // @Inject(SHARED_STATE) private stateEvents: Observable<SharedState>
  ) {

    this.activatedRoute.params.subscribe(params => {
      this.editing = params['mode'] == 'edit';
      let id = params['id'];
      if (id != null) {
        Object.assign(this.product, model.getProduct(id) || new Product());
        Object.assign(this.originalProduct, this.product);
      }
    })

    // this.editing = activatedRoute.snapshot.params['mode'] == 'edit';
    // let id = activatedRoute.snapshot.params['id'];
    // if (id != null) {
    //   Object.assign(this.product, model.getProduct(id) || new Product());
    // }

    // demo parameters passing
    // if (id != null) {
    //   let name = activatedRoute.snapshot.params['name'];
    //   let category = activatedRoute.snapshot.params['category'];
    //   let price = activatedRoute.snapshot.params['price'];
    //   if (name != null && category != null && price != null) {
    //     this.product.id = id;
    //     this.product.name = name;
    //     this.product.category = category;
    //     this.product.price = price;
    //   } else {
    //     Object.assign(this.product, model.getProduct(id) || new Product());
    //   }
    // }

    // stateEvents
    //   // .pipe(skipWhile(state => state.mode === MODES.EDIT))  // skip to receive the events, until create product button is clicked
    //   // .pipe(map(state => new SharedState(state.mode, state.id == 5 ? 1 : state.id)))
    //   // .pipe(filter(state => state.id != 3))  // cause id 3 not able to edit, being filter
    //   // .pipe(distinctUntilChanged()) // this will compare object by reference, not value
    //   // .pipe(distinctUntilChanged((firstState, secondState) => {
    //   //   return firstState.mode == secondState.mode && firstState.id == secondState.id;
    //   // })) // to solve it, need to specify how to compare
    //   .subscribe((update) => {
    //     this.product = new Product();
    //     if (update.id != undefined) {
    //       Object.assign(this.product, this.model.getProduct(update.id));
    //     }
    //     this.editing = update.mode == MODES.EDIT;
    //   });

    // transform to id where -1 represents create else represents edit mode
    // stateEvents
    //   .pipe(map(state => state.mode == MODES.EDIT ? state.id : -1))
    //   .pipe(distinctUntilChanged()) // without this, clicking edit will replace current editing value
    //   .pipe(filter(id => id != 3))
    //   .subscribe((id) => {
    //     this.editing = id != -1;
    //     this.product = new Product();
    //     if (id != -1) {
    //       Object.assign(this.product, this.model.getProduct(id))
    //     }
    //   })
  }

  // get editing(): boolean {
  //   return this.state.mode == MODES.EDIT; 
  // }

  submitForm(form: NgForm) {
    if (form.valid) {
      this.model.saveProduct(this.product);
      this.originalProduct = this.product;
      // this.product = new Product();
      // form.reset();
      this.router.navigateByUrl('/');
    }
  }

  // resetForm() {
  //   this.product = new Product();
  // }

  // ngDoCheck() {
  //   if (this.lastId != this.state.id) {
  //     this.product = new Product();
  //     if (this.state.mode == MODES.EDIT) {
  //       Object.assign(this.product, this.model.getProduct(this.state.id));
  //     }
  //     this.lastId = this.state.id;
  //   }
  // }
}