import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListSocketComponent } from './product-list-socket.component';

describe('ProductListSocketComponent', () => {
  let component: ProductListSocketComponent;
  let fixture: ComponentFixture<ProductListSocketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductListSocketComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductListSocketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
