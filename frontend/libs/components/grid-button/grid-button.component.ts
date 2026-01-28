import { Component, input, output, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { GridButtonItem } from '@models/grid-button-item';
@Component({
  selector: 'app-grid-button',
  standalone: true,
  imports: [CommonModule, ButtonModule, FormsModule],
  templateUrl: './grid-button.component.html',
})
export class GridButtonComponent {
  items = input.required<GridButtonItem[]>();
  required = input(false);
  multiple = input(false);

  selectedValue = output<number>();
  selectedValues = output<number[]>();

  private selected: number[] = [];

  gridCols = computed(() => ({
    'grid-template-columns': `repeat(${Math.ceil(Math.sqrt(this.items().length))}, 1fr)`,
  }));

  constructor() {
    effect(() => {
      if (this.required() && this.items().length > 0) {
        this.selected = [this.items()[0].value];
        this.selectedValue.emit(this.selected[0]);
      }
    });
  }

  onClick(value: number) {
    if (this.multiple()) {
      this.toggleMultiple(value);
      return;
    }

    this.handleSingle(value);
  }

  isSelected(value: number): boolean {
    return this.selected.includes(value);
  }

  private toggleMultiple(value: number) {
    this.selected.includes(value)
      ? (this.selected = this.selected.filter((s) => s !== value))
      : this.selected.push(value);

    this.selectedValues.emit([...this.selected]);
  }

  private handleSingle(value: number) {
    this.required() ? this.selectRequired(value) : this.toggleOptional(value);
  }

  private selectRequired(value: number) {
    if (this.selected.includes(value)) {
      return;
    }

    this.selected = [value];
    this.selectedValue.emit(value);
  }

  private toggleOptional(value: number) {
    this.selected.includes(value) ? this.clearSelection() : this.selectSingle(value);
  }

  private clearSelection() {
    this.selected = [];
    this.selectedValue.emit(0);
  }

  private selectSingle(value: number) {
    this.selected = [value];
    this.selectedValue.emit(value);
  }
}
