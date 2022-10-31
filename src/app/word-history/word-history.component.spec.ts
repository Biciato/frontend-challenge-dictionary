import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordHistoryComponent } from './word-history.component';

describe('WordHistoryComponent', () => {
  let component: WordHistoryComponent;
  let fixture: ComponentFixture<WordHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WordHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WordHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
