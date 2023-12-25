import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {
  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  users: Array<User> = [];
  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Options de configuration DataTables
    this.dtOptions = {
      pagingType: 'full_numbers',
    };

    // Récupération de tous les utilisateurs au chargement
    this.getAllUsers();
  }

  ngOnDestroy(): void {
    // Désabonnement pour éviter les fuites mémoire
    this.destroy$.next();
    this.destroy$.complete();
  }

  // Fonction pour récupérer tous les utilisateurs
  getAllUsers() {
    this.userService.getAllUsers()
      .pipe(takeUntil(this.destroy$))  // Se désabonner lorsque le composant est détruit
      .subscribe({
        next: (data) => {
          console.log(data);
          this.users = data;

          // Détruire DataTable avant de le réinitialiser
          if (this.dtElement.dtInstance) {
            this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
              dtInstance.destroy();  // Destruction du DataTable existant
              this.dtTrigger.next(null);  // Déclenchement de la réinitialisation du DataTable
            });
          } else {
            this.dtTrigger.next(null);  // Déclenchement de la réinitialisation du DataTable
          }
        }
      });
  }

  // Fonction pour mettre à jour l'état de l'utilisateur (actif/inactif)
  updateUserState(id: number, active: boolean) {
    console.log("here id: ", id);
    console.log("here active: ", active);

    Swal.fire({
      title: 'Confirm !',
      text: `Would you really want to ${active ? 'disable' : 'enable'} this account ?`,
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel',
      cancelButtonColor: "#FF0000",
      confirmButtonColor: "#008000",
    }).then((result) => {
      if (result.isConfirmed) {
        if (active) {
          this.userService.invalidateUser(id)
            .pipe(takeUntil(this.destroy$))  // Se désabonner lorsque le composant est détruit
            .subscribe({
              next: () => {
                this.getAllUsers();  // Mettre à jour la liste des utilisateurs après la désactivation
                Swal.fire('Success', 'Account disabled', 'success');
              }
            });
        } else {
          this.userService.validateUser(id)
            .pipe(takeUntil(this.destroy$))  // Se désabonner lorsque le composant est détruit
            .subscribe({
              next: () => {
                this.getAllUsers();  // Mettre à jour la liste des utilisateurs après l'activation
                Swal.fire('Success', 'Account enabled', 'success');
              }
            });
        }
      }
    });
  }

  // Rediriger vers la page de modification d'utilisateur
  edit(id: number) {
    this.router.navigate([`edit-user/${id}`]);
  }
}
