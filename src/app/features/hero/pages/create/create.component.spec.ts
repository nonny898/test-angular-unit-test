import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Hero } from 'src/app/core/model/hero';
import { FormComponent } from '../../components/form/form.component';
import { CreateComponent } from './create.component';

const INIT_HERO_MODEL = new Hero({
  id: null,
  name: '',
  power: '',
  alterEgo: '',
});

describe('CreateComponent', () => {
  let component: CreateComponent;
  let fixture: ComponentFixture<CreateComponent>;

  let formComponent: FormComponent;
  let formDebugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [CreateComponent, FormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    formDebugElement = fixture.debugElement.query(By.directive(FormComponent));
    formComponent = formDebugElement.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(formComponent).toBeTruthy();
  });

  it('should link model with form component', () => {
    expect(formComponent.model).toEqual(INIT_HERO_MODEL);
  });

  it('should change model name with form component', () => {
    const newHeroName = 'Create Hero: New Hero';
    component.model.name = newHeroName;
    component.model.alterEgo = 'Test alterEgo';
    fixture.detectChanges();

    expect(formComponent.model.name).toEqual(newHeroName);

    const inputElement = fixture.debugElement.query(
      By.css('.form-control[data-test-id=input-form-name]')
    );

    expect(inputElement.attributes['ng-reflect-model']).toEqual(newHeroName);
  });

  it('should submit form', () => {
    component.handleChangeSubmitStatus(true);
    fixture.detectChanges();
    expect(component.isSubmitted).toBeTruthy();
  });
});
