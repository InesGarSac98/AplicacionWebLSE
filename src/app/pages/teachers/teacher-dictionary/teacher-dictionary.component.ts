import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ClassroomWord } from 'src/api/models/classroomWord.model';
import { Word } from 'src/api/models/word.model';
import { ClassroomWordsService } from 'src/api/services/classroomWords-service/classroomWords.service';
import { WordsService } from 'src/api/services/words-service/words.service';
import { WordDetailsDialogComponent } from 'src/app/shared/dialog/word-details-dialog/word-details-dialog.component';
import { CellDefinition, SelectableItem } from 'src/app/shared/multi-select-list/multi-select-list.component';

@Component({
  selector: 'app-teacher-dictionary',
  templateUrl: './teacher-dictionary.component.html',
  styleUrls: ['./teacher-dictionary.component.scss']
})

export class TeacherDictionaryComponent implements OnInit {
    public classroomId: number;
    public dataLoaded: boolean = false;
    public wordsAssociation: WordItemList[] = [];
    private fullWordsList: Word[];
    private existingClassroomWords: ClassroomWord[];
    public dictionaryCellDefinitions: CellDefinition[];

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
                },
                {
                    header: 'Creado por',
                    itemKey: 'owner',
                    isImage: false
                }
            ];
        }

    public ngOnInit() {
        this.classroomId = this.route.snapshot.params['classroomId'];


        this.wordsService.getWordsList()
            .subscribe((words: Word[]) => {
                let mappedWords = words.map(w => {
                    let result = new WordItemList();
                    result.id = w.id;
                    result.viewName = w.name;
                    result.owner = (w.teacherId == null ? 'App' : 'Yo');
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

        let dialogRef = this.dialog.open(
            WordDetailsDialogComponent,
            {
                data: {
                    word: this.fullWordsList.find(x => x.id === id)
                }
            }
        );

        dialogRef.afterClosed().subscribe(result =>{
            console.log('The dialog was closed')
        });
    }

    public showWordFromArasaac(id: number): void {

        let dialogRef = this.dialog.open(
            WordDetailsDialogComponent,
            {
                data: {
                    word: this.fullWordsList.find(x => x.id === id)
                }
            }
        );

        dialogRef.afterClosed().subscribe(result =>{
            console.log('The dialog was closed')
        });
    }


    public returnWordsSelection():void{
        this.router.navigate(['/students/profile/']);
    }
}

export class WordItemList {
    id: number;
    viewName: string;
    owner: string;
    isChecked: boolean;
}
