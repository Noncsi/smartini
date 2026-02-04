import { Component, inject } from '@angular/core';
import { LobbyService } from '../../services/lobby.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { map, tap } from 'rxjs/operators';
import { ICON_MAP, ICONS } from '../../../../../../libs/constants/icon-map';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { SelectButtonModule } from 'primeng/selectbutton';
import { GridButtonItem } from '@models/grid-button-item';
import { GridButtonComponent } from '@libs/components/grid-button/grid-button.component';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-join',
  standalone: true,
  templateUrl: './join.component.html',
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    FloatLabelModule,
    ButtonModule,
    SelectButtonModule,
    GridButtonComponent,
    MessageModule,
    ToastModule,
  ],
})
export class JoinComponent {
  lobbyService = inject(LobbyService);

  icons: GridButtonItem[] = Array.from(ICON_MAP.entries()).map(([id, icon]) => ({
    text: icon,
    value: id,
  }));
  joinForm = new FormGroup({
    roomCode: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(4), Validators.maxLength(4)],
    }),
    name: new FormControl('', {
      nonNullable: true,
      validators: Validators.required,
    }),
    iconId: new FormControl(0, {
      nonNullable: true,
      validators: Validators.required,
    }),
  });

  constructor() {
    const roomCodeControl = this.joinForm.controls.roomCode;
    roomCodeControl.valueChanges
      .pipe(
        map(value => value.toUpperCase()),
        tap(value => roomCodeControl.setValue(value, { emitEvent: false })),
      )
      .subscribe();
  }

  setIconId(id: number) {
    this.joinForm.patchValue({
      iconId: id,
    });
  }

  onSubmit() {
    this.lobbyService.join(this.joinForm.value);
  }
}
