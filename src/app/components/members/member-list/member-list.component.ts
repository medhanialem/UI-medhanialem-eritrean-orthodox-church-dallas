import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit, Input } from '@angular/core';
import { MemberService } from '../shared/member.service';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, MatDialogConfig } from '@angular/material';
import { MemberComponent } from '../member/member.component';
import { MessageComponent } from '../../message/message.component';
import { NotificationService } from '../shared/notification.service';
import { DialogService } from '../shared/dialog.service';
import { Member, Tier } from '../member';
import { Subscription, of, Observable } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import { DatePipe } from '@angular/common';
import { AuthenticationService } from 'src/app/shared/authentication.service';
import { MembersAuthorizationGuard } from 'src/app/shared/members-authorization-guard';
import { UserAuthorizationComponent } from 'src/app/users/user-authorization/user-authorization.component';
import { AlertifyService } from 'src/app/shared/alertify.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { MoveMemberComponent } from '../move-member/move-member.component';
import { TierService } from 'src/app/tiers/tier.service';
import { CdkDetailRowDirective } from '../shared/cdk-detail-row.directive';

@Component({
  selector: 'app-member-list',
  // templateUrl: './member-list.component.html',
  templateUrl: './member-list-old.component.html',
  styleUrls: ['./member-list.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class MemberListComponent implements OnInit, OnDestroy, AfterViewInit {


  constructor(private service: MemberService,
              private dialog: MatDialog,
              private notifiationService: NotificationService,
              private dialogService: DialogService,
              private datePipe: DatePipe,
              private authenticationService: AuthenticationService,
              private alertify: AlertifyService,
              private tierService: TierService) { }

  private subscriptions: Subscription[] = [];
  selection = new SelectionModel<Member>(true, []);
  sundaySchool = false;
  sebekaGubae = false;
  memberListData = new MatTableDataSource<Member>();
  memberList: Member[];
  filteredList: Member[];
  selectedParent: Member;

  displayedColumns: string[] = [];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  isLoading = false;
  searchKey: string;
  expandedElement;
  dependents: Member[] = null;
  parentId: number;

  activeInactiveStatus = 'Active';
  memberStatuses: any[] = [
    {value: 'Active', displayValue: 'Active'},
    {value: 'Inactive', displayValue: 'Inactive'},
    {value: 'All', displayValue: 'All'}
  ];

  selectedTierId = 0;
  tiersDropdownJSON: TiersDropdownJSONFormat[] = [];
  tierList: Tier[];

  private openedRow: CdkDetailRowDirective;
  @Input() singleChildRowDetail: boolean;
  dependents$: Observable<Member[]>;

  ngOnInit() {
    const showMemberActions = this.showAddEditDeleteMemberButtons();
    if (showMemberActions) {
      this.displayedColumns = [
        'churchId', 'oldChurchId', 'name', 'gender',
        'homePhoneNo', 'address', 'email', 'registrationDate', 'actions'];
    } else {
      this.displayedColumns = [
        'churchId', 'oldChurchId', 'name', 'gender',
        'homePhoneNo', 'address', 'email', 'registrationDate'];

    }
    this.getMemberList();
    this.memberListData.paginator = this.paginator;
    this.getTierList();
  }

  ngAfterViewInit(): void {
    this.memberListData.sort = this.sort;
  }

  getMemberList() {
    this.memberListData.data = [];
    this.isLoading = true;
    this.subscriptions.push(this.service.getMemberList().subscribe(
        (
          response => {
            if (response != null) {
              this.memberListData.data = response as Member[];
              this.memberList = response as Member[];
              this.filterMembersWithStatusTier();
            } else {
              this.memberListData.data = null;
            }
          }),
        (
          error => {
            console.log(error.message);
            this.isLoading = false;
          }),
          () => {
            this.isLoading = false;
          }

      ));
   }

   filterMembersWithStatusTier() {
    this.filteredList = [];
    if (this.selectedTierId === 0) {
      if (this.activeInactiveStatus === 'All') {
        this.filteredList = this.memberList;
      } else {
          this.memberList.forEach(member => {
            if (member.status === this.activeInactiveStatus.toUpperCase()) {
              this.filteredList.push(member);
            }
          });
      }
    } else {
      if (this.activeInactiveStatus === 'All') {
        this.memberList.forEach(member => {
          if (member.tier.id === this.selectedTierId) {
            this.filteredList.push(member);
          }
        });
      } else {
          this.memberList.forEach(member => {
            if (member.status === this.activeInactiveStatus.toUpperCase() && member.tier.id === this.selectedTierId) {
              this.filteredList.push(member);
            }
          });
      }
    }
    this.memberListData.data = this.filteredList;
   }

   onActiveInactiveDropDownChange(event) {
    this.activeInactiveStatus = event.value;
    this.filterMembersWithStatusTier();
   }
  /** Whether the number of selected elements matches the total number of rows. */
  // isAllSelected() {
  //   if (this.memberListData != null && this.memberListData.data != null) {
  //     const numSelected = this.selection.selected.length;
  //     const numRows = this.memberListData.data.length;
  //     return numSelected === numRows;
  //   } else {
  //     return false;
  //   }
  // }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  // masterToggle() {
  //   if (this.memberListData != null && this.memberListData.data != null) {
  //     this.isAllSelected()
  //       ? this.selection.clear()
  //       : this.memberListData.data.forEach(row => this.selection.select(row));
  //   }
  // }

  /** The label for the checkbox on the passed row */
  // checkboxLabel(row?: Member): string {
  //   if (!row) {
  //     return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
  //   }
  //   return `${
  //     this.selection.isSelected(row) ? 'deselect' : 'select'
  //     } row ${row.memberId + 1}`;
  // }

  toShortDate(value) {
    return this.datePipe.transform(value, 'MM-dd-yyyy');
  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter() {
    this.memberListData.filter = this.searchKey.trim().toLowerCase();
    // this.filteredList = [];
    // this.filteredList = this.memberListData.data;
  }

  // changeMatTableDataSource() {
  //   // resets selected rows on sebekaGubae or sundaySchool selection
  //   this.selection.clear();
  //   this.filteredList = [];
  //   if (!this.sebekaGubae && !this.sundaySchool) {
  //       this.filteredList = this.memberList;
  //     } else {
  //       this.memberList.forEach(member => {
  //         if ((this.sundaySchool && this.sebekaGubae) && (member.sundaySchool && member.sebekaGubae)) {
  //           this.filteredList.push(member);
  //         } else if ((this.sundaySchool && !this.sebekaGubae) && (member.sundaySchool)) {
  //           this.filteredList.push(member);
  //         } else if ((!this.sundaySchool && this.sebekaGubae) && (member.sebekaGubae)) {
  //           this.filteredList.push(member);
  //         }

  //       });
  //     }
  //   this.memberListData.data = this.filteredList;
  //  }

   onAddPrimaryMember(primaryOrDependentIdentifier: string) {
    // this.service.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '55%';
    dialogConfig.height = '85%';
    dialogConfig.data = {member: new Member(new Tier()), action: 'save', primaryOrDependent: primaryOrDependentIdentifier};
    const dialogRef = this.dialog.open(MemberComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      () => {
        this.getMemberList();
      }
    );
  }

  onAddDependentMember(primaryOrDependentIdentifier: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '55%';
    dialogConfig.height = '85%';
    dialogConfig.data = { 
      member: new Member(new Tier()),
      action: 'save', parentId: this.parentId,
      primaryOrDependent: primaryOrDependentIdentifier,
      selectedParent: this.selectedParent
    };
    const dialogRef = this.dialog.open(MemberComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      () => {
        this.getMemberList();
      }
    );
  }

  onEdit(row: Member, action: string, primaryOrDependentIdentifier: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '55%';
    dialogConfig.height = '85%';
    dialogConfig.data = {member: row, action: 'update', primaryOrDependent: primaryOrDependentIdentifier};
    const dialogRef = this.dialog.open(MemberComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      () => {
        this.getMemberList();
      }
    );
  }

  onMoveMember(row: Member) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';
    dialogConfig.height = '45%';
    dialogConfig.data = {
      memberToBeMovedId: row.memberId,
      memberToBeMovedFullName: row.firstName + ' ' + row.middleName + ' ' + row.lastName
    };
    const dialogRef = this.dialog.open(MoveMemberComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      () => {
        this.getMemberList();
      }
    );
  }

  onUpgrade(row: Member) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '30%';
    dialogConfig.height = '47%';
    dialogConfig.data = {
      displayWarning: 'Are you sure you want to Upgrade?',
      subject: 'Member',
      subjectName: row.firstName + ' ' + row.middleName + ' ' + row.lastName,
      btnActionLabel: 'Upgrade Member'
    };
    const dialogRef = this.dialog.open(UserAuthorizationComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
          console.log('Upgrading member');
          this.alertify.success(
            'Church member \' ' + row.firstName + ' ' +
            row.middleName + ' ' + row.lastName +
            ' \' upgraded successfully.'
          );

          this.service.moveMember(row.memberId, 'upgrade', row.memberId).subscribe(
            () => {
              this.getMemberList();
              console.log('Upgraded member: ' + row);
            },
            (error) => {
              console.log(error);
            }
          );

      } else if (result === false) {
        this.getMemberList();
        console.log('DIDN\'T upgrade member');
        this.alertify.error(
          'Invalid password and hence can\'t upgrade church member \'' +
          row.firstName + ' ' +
          row.middleName + ' ' +
          row.lastName + '\''
        );
      }
      });
  }

  onDelete(row: Member) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '30%';
    dialogConfig.height = '47%';
    dialogConfig.data = {
      displayWarning: 'Are you sure you want to delete?',
      subject: 'Member',
      subjectName: row.firstName + ' ' + row.middleName + ' ' + row.lastName,
      btnActionLabel: 'Delete Member'
    };
    const dialogRef = this.dialog.open(UserAuthorizationComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
          console.log('Deactivating member');
          this.service.moveMember(row.memberId, 'deactivate', row.memberId).subscribe(
            () => {
              this.getMemberList();
              this.alertify.success(
                'Church member \' ' + row.firstName + ' ' +
                row.middleName + ' ' + row.lastName +
                ' \' deleted successfully.'
              );
              console.log('Deactivated member: ' + row);
            },
            (error) => {
              this.getMemberList();
              console.log(error);
            }
          );

      } else if (result === false) {
        this.getMemberList();
        console.log('DIDN\'T deactivate member');
        this.alertify.error(
          'Invalid password and hence can\'t delete church member \'' +
          row.firstName + ' ' +
          row.middleName + ' ' +
          row.lastName + '\''
        );
      }
      });
  }

  onReactivate(row: Member) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '30%';
    dialogConfig.height = '47%';
    dialogConfig.data = {
      displayWarning: 'Are you sure you want to reactivate?',
      subject: 'Member',
      subjectName: row.firstName + ' ' + row.middleName + ' ' + row.lastName,
      btnActionLabel: 'Reactive Member'
    };
    const dialogRef = this.dialog.open(UserAuthorizationComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
          console.log('Reactivating member');
          this.service.moveMember(row.memberId, 'reactivate', row.memberId).subscribe(
            () => {
              this.getMemberList();
              this.alertify.success(
                'Church member \' ' + row.firstName + ' ' +
                row.middleName + ' ' + row.lastName +
                ' \' reactivated successfully.'
              );
              console.log('Reactivated member: ' + row);
            },
            (error) => {
              this.getMemberList();
              console.log(error);
            }
          );

      } else if (result === false) {
        this.getMemberList();
        console.log('DIDN\'T reactivate member');
        this.alertify.error(
          'Invalid password and hence can\'t reactivate church member \'' +
          row.firstName + ' ' +
          row.middleName + ' ' +
          row.lastName + '\''
        );
      }
      });
  }

  // TO BE COPIED TO SEND SMS COMPONENT
  // onSendSMS() {
  //   const dialogConfig = new MatDialogConfig();
  //   dialogConfig.disableClose = true;
  //   dialogConfig.autoFocus = true;
  //   dialogConfig.width = '60%';
  //   dialogConfig.data = this.selection.selected;
  //   this.dialog.open(MessageComponent, dialogConfig);
  // }

  showAddEditDeleteMemberButtons(): boolean {
    return this.authenticationService.userHasPermission(new MembersAuthorizationGuard(this.authenticationService));
  }

  fetchDependents(row) {
    this.selectedParent = row;
    this.dependents = null;
    this.isLoading = true;
    this.parentId = row.memberId;
    this.subscriptions.push(this.service.getDependentsList(row.memberId).subscribe(
        (
          response => {
            if (response != null) {
              this.dependents = response as Member[];
            } else {
              this.dependents = null;
            }
          }),
        (
          error => {
            console.log(error.message);
            this.isLoading = false;
          }),
          () => {
            this.isLoading = false;
          }

      ));
  }

  isExpansionDetailRow = (index, row) => row.hasOwnProperty('detailRow');
  onToggleChange(cdkDetailRow: CdkDetailRowDirective, row): void {
    if (
      this.singleChildRowDetail &&
      this.openedRow &&
      this.openedRow.expanded
    ) {
      this.openedRow.toggle();
    }
    if (!row.close) {
      row.close = true;
    } else {
      row.close = false;
    }
    if (cdkDetailRow.expanded) {
      this.fetchDependents(row);
    }
    this.openedRow = cdkDetailRow.expanded ? cdkDetailRow : undefined;
  }

  onTierSelected(event) {
    this.selectedTierId = event.value;
    this.filterMembersWithStatusTier();
  }

  getTierList() {

    this.subscriptions.push(this.tierService.getTierList().subscribe(
      (
        response => {
          if (response != null) {
            this.tierList = response as Tier[];
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

  refreshMemberListPage(): void {
    this.selectedTierId = 0;
    this.activeInactiveStatus = 'Active';
    this.getMemberList();
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