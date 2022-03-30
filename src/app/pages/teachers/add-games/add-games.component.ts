import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ClassroomGame } from 'src/api/models/classroomGame';
import { Game } from 'src/api/models/game.model';
import { ClassroomGamesService } from 'src/api/services/classroomGames-service/classroomGames.service';
import { ClassroomsService } from 'src/api/services/classrooms-service/classrooms.service';
import { GamesService } from 'src/api/services/games-service/games.service';
import { GameDetailDialogComponent } from 'src/app/shared/dialog/game-detail-dialog/game-detail-dialog.component';
import { SelectableItem } from 'src/app/shared/two-side-multi-select/two-side-multi-select/two-side-multi-select.component';

@Component({
  selector: 'app-add-games',
  templateUrl: './add-games.component.html',
  styleUrls: ['./add-games.component.scss']
})
export class AddGamesComponent implements OnInit {

    public classroomId: number;
    public dataLoaded: boolean = false;
    public gamesAssociation: SelectableItem[] = [];
    private fullGamesList: Game[];
    private existingClassroomGames: ClassroomGame[];

    constructor(
        private classroomService: ClassroomsService,
        private classroomGamesService: ClassroomGamesService,
        private gamesService: GamesService,
        private route: ActivatedRoute,
        private router: Router,
        public dialog: MatDialog
        ) { }

    public ngOnInit() {
        this.classroomId = this.route.snapshot.params['classroomId'];

        this.classroomService.getGamesListClassroom(this.classroomId)
            .subscribe((games: ClassroomGame[]) => {
                this.existingClassroomGames = games;
                this.gamesAssociation = games.map(g => {
                    let result = new SelectableItem();
                    result.id = g.game.id;
                    result.viewName = g.game.name;
                    result.isChecked = true;
                    return result;
                });

                this.gamesService.getGamesList()
                    .subscribe((games: Game[]) => {
                        let mappedGames = games.map(g => {
                            let result = new SelectableItem();
                            result.id = g.id;
                            result.viewName = g.name;
                            result.isChecked = false;
                            return result;
                        });

                        this.fullGamesList = games;
                        this.gamesAssociation = this.gamesAssociation.concat(mappedGames.filter(x => !this.gamesAssociation.some(y => y.id === x.id)));
                        this.dataLoaded = true;
                    });
            });
    }

    public showSelectedGame(id: number): void {
        let dialogRef = this.dialog.open(
            GameDetailDialogComponent,
            {
                data: {
                    game: this.fullGamesList.find(x => x.id === id)
                }
            }
        );

        dialogRef.afterClosed().subscribe(result =>{
            console.log('The dialog was closed')
        });
    }

    public async saveGamesSelection(): Promise<void> {

        const gameIdsToDelete = this.existingClassroomGames
            .filter(x => !this.gamesAssociation.find(y => y.id === x.gameId)?.isChecked)
            .map(x => x.id);

        for(const id of gameIdsToDelete){
            await this.classroomGamesService.deleteClassroomGame(id).toPromise();
        }

        const wordIdsToCreate = this.gamesAssociation
            .filter(x => !this.existingClassroomGames.some(y => y.gameId === x.id) && x.isChecked)
            .map(x => x.id);

        for(const wordId of wordIdsToCreate){
            await this.classroomGamesService.createClassroomGame(wordId, this.classroomId).toPromise();
        }

        this.router.navigate(['/teachers/classrooms/', this.classroomId]);
    }

    public returnGamesSelection():void{
        this.router.navigate(['/teachers/classrooms/', this.classroomId]);
    }

}