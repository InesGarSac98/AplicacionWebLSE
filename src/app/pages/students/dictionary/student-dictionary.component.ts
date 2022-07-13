import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ClassroomWord } from 'src/api/models/classroomWord.model';
import { Word } from 'src/api/models/word.model';
import { ClassroomsService } from 'src/api/services/classrooms-service/classrooms.service';
import { ClassroomWordsService } from 'src/api/services/classroomWords-service/classroomWords.service';
import { WordsService } from 'src/api/services/words-service/words.service';
import { DialogTemplateComponent } from 'src/app/shared/dialog/dialog-template/dialog-template.component';
import { CellDefinition, SelectableItem } from 'src/app/shared/multi-select-list/multi-select-list.component';

@Component({
  selector: 'app-student-dictionary',
  templateUrl: './student-dictionary.component.html',
  styleUrls: ['./student-dictionary.component.scss']
})
export class StudentDictionaryComponent implements OnInit {

    public classroomId: number;
    public dataLoaded: boolean = false;
    public wordsAssociation: SelectableItem[] = [];
    private fullWordsList: Word[];
    public wordToShowDetails: Word;
    private existingClassroomWords: ClassroomWord[];
    public dictionaryCellDefinitions: CellDefinition[];
    @ViewChild('wordDetailsDialogTemplate') public wordDetailsDialogTemplate: TemplateRef<any>;

    constructor(
        private classroomWordsService: ClassroomWordsService,
        private wordsService: WordsService,
        private route: ActivatedRoute,
        private router: Router,
        public dialog: MatDialog
        ) {
            this.dictionaryCellDefinitions = [
                {
                    header: 'Palabra',
                    itemKey: 'viewName',
                    isImage: false
                }
            ];
        }

    public ngOnInit() {
        this.classroomId = this.route.snapshot.params['classroomId'];


        this.wordsService.getWordsList()
            .subscribe((words: Word[]) => {
                let mappedWords = words.map(w => {
                    let result = new SelectableItem();
                    result.id = w.id;
                    result.viewName = w.name;
                    result.isChecked = false;
                    return result;
                });

                this.fullWordsList = words;
                this.wordsAssociation = this.wordsAssociation.concat(mappedWords.filter(x => !this.wordsAssociation.some(y => y.id === x.id)));
                this.dataLoaded = true;
            });
    }

    public showSelectedWord(id: number): void {
        //this.wordsService.getWord(name)
        const word = this.fullWordsList.find(x => x.id === id);

        if (!word) return;

        this.wordToShowDetails = word;

        this.dialog.open(
            DialogTemplateComponent,
            {
                data: {
                    template: this.wordDetailsDialogTemplate,
                    dialogButtons: [],
                    dialogTitle: word.name
                }
            }
        );
    }


    public returnWordsSelection():void{
        this.router.navigate(['/students/profile/']);
    }
}
