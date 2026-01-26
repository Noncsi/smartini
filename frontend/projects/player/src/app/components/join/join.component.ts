import { Component, inject } from '@angular/core';
import { LobbyService } from '../../services/lobby.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { map, tap } from 'rxjs/operators';
import { ICON_MAP, ICONS } from '../../../../../../libs/constants/icon-map';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { SelectButtonModule } from 'primeng/selectbutton';
import { GridButtonComponent } from "@libs/components/grid-button/grid-button.component";

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
    GridButtonComponent
],
})
export class JoinComponent {
  lobbyService = inject(LobbyService);
  icons = ICONS;
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
