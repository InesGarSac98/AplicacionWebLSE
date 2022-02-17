import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Word } from 'src/api/models/word.model';
import { ClassroomsService } from 'src/api/services/classrooms-service/classrooms.service';
import { WordsService } from 'src/api/services/words-service/words.service';
import { SelectableItem } from 'src/app/shared/two-side-multi-select/two-side-multi-select/two-side-multi-select.component';

@Component({
  selector: 'app-add-words',
  templateUrl: './add-words.component.html',
  styleUrls: ['./add-words.component.scss']
})
export class AddWordsComponent implements OnInit {

    public classroomId: number;
    public unassociatedWords: SelectableItem[] = [];
    public associatedWords: SelectableItem[] = [];


    constructor(
        private classroomService: ClassroomsService,
        private wordsService: WordsService,
        private route: ActivatedRoute,
        ) { }

    public ngOnInit() {
        this.classroomId = this.route.snapshot.params['classroomId'];

        this.classroomService.getWordsListClassroom(this.classroomId)
            .subscribe((words: Word[]) => {
                this.associatedWords = words.map(w => {
                    let result = new SelectableItem();
                    result.id = w.id;
                    result.viewName = w.name;
                    return result;
                });

                this.wordsService.getWordsList()
                    .subscribe((words: Word[]) => {
                        let mappedWords = words.map(w => {
                            let result = new SelectableItem();
                            result.id = w.id;
                            result.viewName = w.name;
                            return result;
                        });

                        this.unassociatedWords = mappedWords.filter(x => !this.associatedWords.includes(x));
                    });
            });
    }

}
