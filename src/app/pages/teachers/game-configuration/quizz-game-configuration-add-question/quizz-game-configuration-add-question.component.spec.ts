/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizzGameConfigurationAddQuestionComponent } from './quizz-game-configuration-add-question.component';

describe('QuizGameConfigurationAddQuestionComponent', () => {
  let component: QuizzGameConfigurationAddQuestionComponent;
  let fixture: ComponentFixture<QuizzGameConfigurationAddQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizzGameConfigurationAddQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizzGameConfigurationAddQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
