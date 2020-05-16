import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatDialog, MatTableDataSource, MatSort, MatPaginator, MatDialogConfig } from '@angular/material';
import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs';
import { TierModel } from './tier.model';
import { SelectionModel } from '@angular/cdk/collections';
import { TierService } from './tier.service';
import { TierComponent } from './tier/tier.component';
import { AlertifyService } from '../shared/alertify.service';
import { UserAuthorizationComponent } from '../users/user-authorization/user-authorization.component';

@Component({
  selector: 'app-tiers',
  templateUrl: './tiers.component.html',
  styleUrls: ['./tiers.component.css']
})
export class TiersComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription [] = [];
  selection = new SelectionModel<TierModel>(true, []);
  tierListData = new MatTableDataSource<TierModel>();
  tierList: TierModel[];
  showAll = false;

  displayedColumns: string[] = [ 'tierId', 'tierDescription', 'tierType', 'createdBy', 'updatedBy', 'createdOn', 'updatedOn', 'actions'];

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  isLoading = false;
  searchKey: string;

  constructor(private tierService: TierService,
              private dialog: MatDialog,
              private datePipe: DatePipe,
              private alertify: AlertifyService) { }

  ngOnInit() {
    this.getTierList();
    this.tierListData.paginator = this.paginator;
  }

  getTierList() {
    this.isLoading = true;
    this.subscriptions.push(
        this.tierService.getTierList().subscribe(
          response => {
            if (response != null) {
              this.tierListData.data = response as TierModel[];
              this.tierList = response as TierModel[];
            } else {
              this.tierList = [];
              this.tierListData.data = [];
            }
          },
          (error) => {
            this.isLoading = false;
            console.log(error);
          },
          () => {
            this.isLoading = false;
          }
        )
    );

  }

  toShortDate(value) {
    return this.datePipe.transform(value, 'MM-dd-yyyy hh:mm:ss');
  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter() {
    this.tierListData.filter = this.searchKey.trim().toLowerCase();
  }

  onAddTier() {
    this.onSearchClear();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = '33%';
    dialogConfig.height = '35%';

    const dialogRef = this.dialog.open(TierComponent, dialogConfig);
    this.subscriptions.push(
      dialogRef.afterClosed().subscribe((result) => {
        if (result === true) {
          console.log('Adding a new tier');
          this.getTierList();
          this.alertify.success('Tier added successfully.');
        } else {
          this.getTierList();
        }
      },
      (error) => {

      },
      () => {}
    ));
  }

  onEditTier(tier: TierModel) {
    this.onSearchClear();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = '33%';
    dialogConfig.height = '33%';
    dialogConfig.data = {tier: tier, action: 'update'};

    const dialogRef = this.dialog.open(TierComponent, dialogConfig);
    this.subscriptions.push(
      dialogRef.afterClosed().subscribe((result) => {
        if (result === true) {
          console.log('Updating tier ->' + tier);
          this.getTierList();
          this.alertify.success('Tier updated successfully.');
        } else {
          this.getTierList();
        }
      },
      (error) => {

      },
      () => {}
    ));

  }

  onDeleteTier(tier: TierModel) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '30%';
    dialogConfig.height = '47%';
    dialogConfig.data = {
      displayWarning: 'Are you sure you want to delete?',
      subject: 'Tier',
      subjectName: tier.description,
      btnActionLabel: 'Delete Tier'
    };
    const dialogRef = this.dialog.open(UserAuthorizationComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
          console.log('Deleting tier');
          this.tierService.deleteTier(tier.id);
          //this.getTierList();
          // this.tierService.deleteTier(tier.id).subscribe(
          //   () => {
          //     this.getTierList();
          //     this.alertify.success(
          //       'Tier \' ' + tier.id + ' ' +
          //       tier.description + ' ' + tier.tierType +
          //       ' \' deleted successfully.'
          //     );
          //     console.log('Deleted tier: ' + tier);
          //   },
          //   (error) => {
          //     this.getTierList();
          //     console.log(error);
          //   }
          // );

      } else if (result === false) {
        this.getTierList();
        console.log('Didn\'t delete tier');
        this.alertify.error('Invalid password and hence can\'t delete tier \'' + tier.description + ' ' + '\'');
      }
      });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }

}
