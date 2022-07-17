import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ClassroomGame } from 'src/api/models/classroomGame';
import { Game } from 'src/api/models/game.model';
import { ClassroomGamesService } from 'src/api/services/classroomGames-service/classroomGames.service';
import { ClassroomsService } from 'src/api/services/classrooms-service/classrooms.service';
import { GamesService } from 'src/api/services/games-service/games.service';
import { AppComponent } from 'src/app/app.component';
import { CellDefinition, SelectableItem } from 'src/app/shared/multi-select-list/multi-select-list.component';
import { NotificationComponent } from 'src/app/shared/notification/notification.component';

@Component({
  selector: 'app-add-games',
  templateUrl: './add-games.component.html',
  styleUrls: ['./add-games.component.scss']
})
export class AddGamesComponent implements OnInit {

    public classroomId: number;
    public dataLoaded: boolean = false;
    public gamesAssociation: GameSelectableItem[] = [];
    private fullGamesList: Game[];
    private existingClassroomGames: ClassroomGame[];
    public gameCellDefinitions: CellDefinition[];
    private notifications: NotificationComponent;

    constructor(
        app: AppComponent,
        private classroomService: ClassroomsService,
        private classroomGamesService: ClassroomGamesService,
        private gamesService: GamesService,
        private route: ActivatedRoute,
        private router: Router,
        public dialog: MatDialog
        ) {
            this.notifications = app.getNotificationsComponent();
            this.gameCellDefinitions = [
                {
                    header: '',
                    itemKey: 'image',
                    isImage: true
                },
                {
                    header: 'Juego',
                    itemKey: 'viewName',
                    isImage: false
                }
            ];
        }

    public ngOnInit() {
        this.classroomId = this.route.snapshot.params['classroomId'];

        this.classroomService.getGamesListClassroom(this.classroomId)
            .subscribe((games: ClassroomGame[]) => {
                this.existingClassroomGames = games;
                this.gamesAssociation = games.map(g => {
                    let result = new GameSelectableItem();
                    result.id = g.game.id;
                    result.viewName = g.game.name;
                    result.isChecked = true;
                    return result;
                });

                this.gamesService.getGamesList()
                    .subscribe((games: Game[]) => {
                        let mappedGames = games.map(g => {
                            let result = new GameSelectableItem();
                            result.id = g.id;
                            result.viewName = g.name;
                            result.image = g.image;
                            result.isChecked = false;
                            return result;
                        });

                        this.fullGamesList = games;
                        this.gamesAssociation.forEach(g => g.image = mappedGames.find(x => x.id === g.id)?.image ?? '');
                        this.gamesAssociation = this.gamesAssociation.concat(mappedGames.filter(x => !this.gamesAssociation.some(y => y.id === x.id)));
                        this.dataLoaded = true;
                    });
            });
    }


    public editSelectedGameConfiguration(id: number): void {
        this.router.navigate(['/teachers/classrooms/' + this.classroomId + '/add-games/' + id]);
    }

    public async saveGamesSelection(id: number): Promise<void> {

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

        this.notifications.pushNotification('Se han asociado los juegos a la clase correctamente', 'success');
    }

    public playGameButtonClicked(id: number): void {
        this.router.navigate(['/teachers/classrooms', this.classroomId, 'games', id]);
    }
}

class GameSelectableItem extends SelectableItem {
    image: string;
}
