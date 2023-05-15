import {AfterContentInit, Component, ViewChild} from '@angular/core';
import {UserService} from "../user.service";
import {MatLegacySnackBar as MatSnackBar} from "@angular/material/legacy-snack-bar";
import {HttpResponse} from "@angular/common/http";
import {IUser} from "../../../shared/model/IUser";
import {MatLegacyPaginator as MatPaginator} from "@angular/material/legacy-paginator";
import {MatSort} from "@angular/material/sort";
import {MatLegacyTableDataSource as MatTableDataSource} from "@angular/material/legacy-table";

@Component({
  selector: 'app-liste-users',
  templateUrl: './liste-users.component.html',
  styleUrls: ['./liste-users.component.css']
})
export class ListeUsersComponent implements AfterContentInit {

  displayedColumns: string[] = ['id', 'username', 'email', 'outils'];
  dataSource: MatTableDataSource<IUser> = new MatTableDataSource<IUser>();

  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;

  constructor(private userService: UserService, private snackbar: MatSnackBar) {
  }

  ngAfterContentInit(): void {
    this.loadUsers()
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (res: HttpResponse<IUser[]>) => {
        if (!res.ok || !res.body) {
          this.snackbar.open("Erreur lors de la lecture des utilisateurs")
          return;
        }
        this.dataSource.data = res.body
      },
      error: (err) => {
        this.snackbar.open("Erreur lors de la lecture des utilisateurs")
        throw new Error(err)
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  delUser(row: IUser) {
    this.userService.deleteUser(row.id).subscribe({
      next: (res) => {
        if (!res.ok) {
          this.snackbar.open("Erreur lors de la suppression")
          return;
        }
        this.loadUsers()
        this.snackbar.open("Utilisateur supprime")
      },
      error: err => {
        this.snackbar.open("Erreur lors de la suppression")
        throw new Error(err)
      }
    })
  }
}
