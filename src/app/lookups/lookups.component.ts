import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatDialog, MatTableDataSource, MatSort, MatPaginator, MatDialogConfig, MatSelectChange, MatOption } from '@angular/material';
import { DatePipe } from '@angular/common';
import { Subscription, Observable } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import { AlertifyService } from '../shared/alertify.service';
import { UserAuthorizationComponent } from '../users/user-authorization/user-authorization.component';
import { LookupsService } from './lookups.service';
import { LookupModel } from './lookups.model';
import { Tier } from '../components/members/member';
import { TierService } from '../tiers/tier.service';
import { LookupComponent } from './lookup/lookup.component';

@Component({
  selector: 'app-tiers',
  templateUrl: './lookups.component.html',
  styleUrls: ['./lookups.component.css']
})
export class LookupsComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription [] = [];
  selection = new SelectionModel<LookupModel>(true, []);
  lookupsListData = new MatTableDataSource<LookupModel>();
  lookupList: LookupModel[] = [];

  year: number = new Date().getFullYear();
  minimumYear = 2020;
  maximumYear: number = new Date().getFullYear() + 1;
  minusBtnClass = 'notMinimumYear';
  plusBtnClass = 'notMaximumYear';

  tierIndex = 0;
  tierSize = 0;
  minusTierBtnClass = 'notMinimumTier';
  plusBtnTierClass = 'notMaximumTier';

  tierList: Tier[];
  selectedTier: Tier = new Tier();
  selectedTierId = 0;
  tiersDropdownJSON: TiersDropdownJSONFormat[] = [];
  addBtnDisableFlag = true;
  editBtnDisableFlag = true;

  selectedTierDescription;

  displayedColumns: string[] =
    [ 'id', 'month', 'amount', 'revision', 'createdBy', 'updatedBy', 'createdAt', 'updatedAt'];

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  isLoading = false;

  constructor(private lookupsService: LookupsService,
              public tierService: TierService,
              private dialog: MatDialog,
              private datePipe: DatePipe,
              private alertify: AlertifyService) { }

  ngOnInit() {
    this.getTierList();
    this.lookupsListData.paginator = this.paginator;
  }

  getLookUpList() {
    this.isLoading = true;
    this.subscriptions.push(
        this.lookupsService.getLookUpList(this.selectedTierId, this.year).subscribe(
          response => {
            if (response != null) {
              this.lookupsListData.data = response as LookupModel[];
              this.lookupList = response as LookupModel[];
              this.checkLookUpListSize();
            } else {
              this.lookupList = [];
              this.lookupsListData.data = [];
              this.checkLookUpListSize();
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

  checkLookUpListSize() {
    if (this.lookupList.length > 0) {
      if (this.year < new Date().getFullYear()) {
        this.editBtnDisableFlag = true;
      } else {
        this.editBtnDisableFlag = false;
      }
      this.addBtnDisableFlag = true;
    } else {
      if (this.selectedTierId > -1) {
        this.addBtnDisableFlag = false;
      } else {
        this.addBtnDisableFlag = true;
      }
      this.editBtnDisableFlag = true;
    }
  }

  onAddLookups(action: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = '38%';
    dialogConfig.height = '85%';
    dialogConfig.data = {
      tierId: this.selectedTierId,
      action: 'save',
      selectedTierDescription: this.selectedTierDescription,
      selectedYear: this.year
    };

    const dialogRef = this.dialog.open(LookupComponent, dialogConfig);
    this.subscriptions.push(
      dialogRef.afterClosed().subscribe((result) => {
        if (result === true) {
          console.log('Adding a new lookups');
          this.getLookUpList();
          this.alertify.success('Lookups added successfully.');
        } else {
          this.getLookUpList();
        }
      },
      (error) => {

      },
      () => {}
    ));
  }

  onEditLookups(tier: LookupModel) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = '38%';
    dialogConfig.height = '85%';
    dialogConfig.data = {
      lookups: this.lookupList,
      tierId: this.selectedTierId,
      action: 'update',
      selectedTierDescription: this.selectedTierDescription,
      selectedYear: this.year
    };

    const dialogRef = this.dialog.open(LookupComponent, dialogConfig);
    this.subscriptions.push(
      dialogRef.afterClosed().subscribe((result) => {
        if (result === true) {
          console.log('Updating lookups');
          this.getLookUpList();
          this.alertify.success('Lookups updated successfully.');
        } else {
          this.getLookUpList();
        }
      },
      (error) => {

      },
      () => {}
    ));
  }

  getTierList() {

    this.subscriptions.push(this.tierService.getTierList().subscribe(
      (
        response => {
          if (response != null) {
            this.tierList = response as Tier[];
            this.tierSize = this.tierList.length;
          } else {
            this.tierList = [];
          }
          this.populateTiersDropdownJSON();
        }),
      (
        error => {
          console.log(error.message);
        }),
        () => {
        }

    ));

  }

  populateTiersDropdownJSON() {
    this.tiersDropdownJSON = [];
    for(let i = 0; i < this.tierList.length; i++) {
      this.tiersDropdownJSON.push(
        {
          value: this.tierList[i].id,
          displayValue: this.tierList[i].description
        });
    }
  }

  onTierSelected(event) {
    this.selectedTierId = event.value;
    this.getSelectedTierDescription();
    this.updateTierIndexNavigation();
    this.getLookUpList();
  }

  updateTierIndexNavigation(): void {
    for(let i = 0; i < this.tierList.length; i++) {
      if (this.tierList[i].id === this.selectedTierId) {
        this.tierIndex = i + 1;
        break;
      }
  }
  }

  getSelectedTierDescription() {
    for(let i = 0; i < this.tiersDropdownJSON.length; i++) {
        if (this.tiersDropdownJSON[i].value === this.selectedTierId) {
          this.selectedTierDescription = this.tiersDropdownJSON[i].displayValue;
          break;
        }
    }
  }

  minusYearClicked(): void {
    this.year--;
    this.determineMinusPlusYearBtnColor();
    this.getLookUpList();
  }

  plusYearClicked(): void {
    this.year++;
    this.determineMinusPlusYearBtnColor();
    this.getLookUpList();
  }

  currentYearClicked(): void {
    this.year = new Date().getFullYear();
    this.determineMinusPlusYearBtnColor();
    this.getTierList();
    this.selectedTierId = -1;
    this.tierIndex = 0;
    this.lookupList = [];
    this.lookupsListData.data = [];
    this.checkLookUpListSize();
  }

  minusTierClicked(): void {
    this.tierIndex--;
    this.updateSelectedTierId();
    this.getLookUpList();
    this.getSelectedTierDescription();
  }

  plusTierClicked(): void {
    this.tierIndex++;
    this.updateSelectedTierId();
    this.getLookUpList();
    this.getSelectedTierDescription();
  }

  determineMinusPlusYearBtnColor(): void {
    if (this.year <= this.minimumYear) {
      this.minusBtnClass = 'minimumYear';
    } else {
      this.minusBtnClass = 'notMinimumYear';
    }

    if (this.year >= this.maximumYear) {
      this.plusBtnClass = 'maximumYear';
    } else {
      this.plusBtnClass = 'notMaximumYear';
    }
  }

  updateSelectedTierId(): void {
    if (this.tierIndex > 0) {
      this.selectedTierId = this.tierList[this.tierIndex - 1].id;
    } else {
      this.selectedTierId = -1;
    }
  }

  convertToAlphabetMonth(monthNumber: number) {
    switch (monthNumber) {
      case 1: return 'Jan';
      case 2: return 'Feb';
      case 3: return 'Mar';
      case 4: return 'Apr';
      case 5: return 'May';
      case 6: return 'Jun';
      case 7: return 'Jul';
      case 8: return 'Aug';
      case 9: return 'Sep';
      case 10: return 'Oct';
      case 11: return 'Nov';
      case 12: return 'Dec';
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }

}

interface TiersDropdownJSONFormat {
  value: number;
  displayValue: string;
}
