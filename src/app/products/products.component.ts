import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { Product, Products } from './products.interface';
import { ProductsService } from './products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent implements OnInit{
  products: Product[] = [];
  loading: boolean = true;
  visibleAdd: boolean = false;
  visibleShow: boolean = false;
  visibleEdit: boolean = false;
  position: any = "center" || "left" || "top" || "bottom" || "right" || "topleft" || "topright" || "bottomleft" || "bottomright";
  dialogPosition: string = this.position;
  modalAdd: string = "Add Product";
  modalEdit: string = "Update Product";
  modalShow: string = "Detail Product";
  selectedProduct: any = null;
  selectedProductEdit: any = null;

  @Output() clickClose: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() clickAdd: EventEmitter<any> = new EventEmitter<any>();
  @Output() clickEdit: EventEmitter<any> = new EventEmitter<any>();

  productForm = this.formBuilder.group({
    title: ["", Validators.required],
    price: [0, Validators.required],
    description: [""],
    category: ["", Validators.required],
    image: ["", Validators.required]
  });

  @ViewChild("dt1") table: any;

  constructor(
    private productsService: ProductsService,
    private confirmationService: ConfirmationService, 
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    ) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  onInputChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    console.log(value);
    this.table.filterGlobal(value, 'contains');
  }

   loadProducts() {
    this.loading = true;
    return this.productsService.GetProducts().subscribe((data: any) => {
      this.products = data.data;
      this.loading = false;
    })
  }

  closeModal() {
    this.productForm.reset();
    this.clickClose.emit(true);
  }

  showDialogAdd(dialogPosition: string) {
    this.position = dialogPosition;
    this.visibleAdd = true;
  }

  showDialogShow(dialogPosition: string, id: string) {
    this.position = dialogPosition;
    this.visibleShow = true;
    this.productsService.GetProductById(id).subscribe((data: any) => {
      this.selectedProduct = data;
    })
  }
  
  showDialogEdit(dialogPosition: string, product: any) {
    this.position = dialogPosition;
    this.visibleEdit = true;
    this.selectedProductEdit = product;
    this.productForm.patchValue(this.selectedProductEdit)
  }

  addProduct() {
    this.productsService.CreateProduct(this.productForm.value).subscribe(
      (response: any) => {
        this.clickAdd.emit(response);
        this.closeModal();
        this.messageService.add({ severity: 'success', summary: 'Success', detail: "Success add product" });

        this.loadProducts();
        this.products.push(response.data);

        if (this.table) {
          this.table.reset();
        }
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error });
        console.log('Errror occured');
      }
    )
  }

  editProduct() {
    this.productsService.UpdateProduct(this.selectedProductEdit, this.productForm.patchValue(this.selectedProductEdit)).subscribe(
      response => {
        this.clickEdit.emit(response);
        this.closeModal();
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Success update product' });

        if (this.table) {
          this.table.reset();
        }
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error });
        console.log('Errror occured');
      }
    )
  }

  deleteProduct(product: string) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this product?',
      accept: () => {
        this.productsService.DeleteProduct(product).subscribe(
          response => {
            this.products = this.products.filter((p: any) => p.ID !== product);
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Deleted Successfully' });
          },
          error => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: error });
          }
        )
      }
    });
  }
}
