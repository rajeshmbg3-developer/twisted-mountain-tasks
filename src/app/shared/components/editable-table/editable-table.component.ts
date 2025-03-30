import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { APP_PATHS } from '@app/app.paths';

@Component({
  selector: 'app-editable-table',
  templateUrl: './editable-table.component.html',
  styleUrls: ['./editable-table.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class EditableTableComponent implements OnInit, OnChanges {
  @Input() data: any[] = [];
  @Input() columns: string[] = [];
  @Output() rowEdit = new EventEmitter<any>();

  editState: { [key: string]: boolean } = {};
  editableData: { [key: string]: any } = {};

  constructor(private router: Router) { }

  ngOnInit(): void { };

  ngOnChanges(changes: SimpleChanges): void {
    // Re-initialize editable data when input data changes
    if (changes['data'] && !changes['data'].firstChange) {
      this.initializeEditableData();
    }
  }

  // Initialize the editable data from the input data
  initializeEditableData(): void {
    if (this.data && this.data.length > 0) {
      this.data.forEach(row => {
        if (row && row.id) {
          this.columns.forEach(column => {
            const key = `${row.id}-${column}`;
            this.editableData[key] = row[column];
          });
        }
      });
    }
  }


  // Start editing a cell
  startEdit(rowId: number, column: string, value: any): void {
    const key = `${rowId}-${column}`;
    this.editState[key] = true;
    this.editableData[key] = value;
  }

  // Save the edited value
  saveEdit(row: any, column: string): void {
    const key = `${row.id}-${column}`;
    const updatedRow = { ...row, [column]: this.editableData[key] };
    this.rowEdit.emit(updatedRow);
    this.editState[key] = false;
  }

  // Cancel editing
  cancelEdit(rowId: number, column: string): void {
    const key = `${rowId}-${column}`;
    this.editState[key] = false;
  }

  // Navigate to detail view when row is clicked
  onRowClick(row: any, event: MouseEvent): void {
    // Don't navigate if clicking on an input field, button, or if we're already editing
    const target = event.target as HTMLElement;
    const isEditingElement = target.tagName.toLowerCase() === 'input' ||
      target.tagName.toLowerCase() === 'button' ||
      target.closest('.input-group') !== null;

    // Also check if we're editing any cell in this row
    const isEditingRow = Object.keys(this.editState).some(key =>
      key.startsWith(`${row.id}-`) && this.editState[key]);

    if (!isEditingElement && !isEditingRow) {
      this.router.navigate([`${APP_PATHS.PAGES}/${APP_PATHS.USERS}`, row.id]);
    }
  }

  // Check if cell is being edited
  isEditing(rowId: number, column: string): boolean {
    return this.editState[`${rowId}-${column}`] || false;
  }

  // Format the cell value for display
  formatValue(value: any): string {
    if (value === null || value === undefined) {
      return '';
    }

    if (typeof value === 'object') {
      return JSON.stringify(value);
    }

    return String(value);
  }
}