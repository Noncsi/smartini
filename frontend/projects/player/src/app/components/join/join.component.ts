import { Component, inject } from '@angular/core';
import { LobbyService } from '../../services/lobby.service';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { map, tap } from 'rxjs/operators';
import { ICON_MAP } from '../../../../../../libs/constants/icon-map';

@Component({
  selector: 'app-join',
  standalone: true,
  templateUrl: './join.component.html',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
  ],
})
export class JoinComponent {
  lobbyService = inject(LobbyService);
  iconMap = ICON_MAP;
  joinForm = new FormGroup({
    roomCode: new FormControl('', {
      nonNullable: true,
    }),
    name: new FormControl('', {
      nonNullable: true,
    }),
    iconId: new FormControl(0, {
      nonNullable: true,
    }),
  });

  constructor() {
    const roomCodeControl = this.joinForm.controls.roomCode;
    roomCodeControl.valueChanges
      .pipe(
        map((value) => value.toUpperCase()),
        tap((value) => roomCodeControl.setValue(value, { emitEvent: false }))
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
