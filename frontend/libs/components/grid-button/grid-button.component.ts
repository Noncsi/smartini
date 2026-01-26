import { Component, input, output, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-grid-button',
  standalone: true,
  imports: [CommonModule, ButtonModule, FormsModule],
  templateUrl: './grid-button.component.html',
})
export class GridButtonComponent {
  items = input.required<string[]>();
  required = input(false);
  multiple = input(false);

  selectedValue = output<string | string[]>();

  private selected: string[] = [];

  gridCols = computed(() => ({
    'grid-template-columns': `repeat(${Math.ceil(Math.sqrt(this.items().length))}, 1fr)`,
  }));

  constructor() {
    effect(() => {
      if (
        this.required() &&
        this.items().length > 0
      ) {
        this.selected = [this.items()[0]];
        this.selectedValue.emit(this.selected[0]);
      }
    });
  }

  onSelect(item: string) {
    if (this.multiple()) {
      if (this.selected.includes(item)) {
        this.selected = this.selected.filter((s) => s !== item);
      } else {
        this.selected.push(item);
      }
      this.selectedValue.emit([...this.selected]);
    } else {
      if (this.required()) {
        if (!this.selected.includes(item)) {
          this.selected = [item];
          this.selectedValue.emit(item);
        }
      } else {
        if (this.selected.includes(item)) {
          this.selected = [];
          this.selectedValue.emit('');
        } else {
          this.selected = [item];
          this.selectedValue.emit(item);
        }
      }
    }
  }

  isSelected(item: string): boolean {
    return this.selected.includes(item);
  }
}
