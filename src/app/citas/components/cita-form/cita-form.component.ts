import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CitaService } from '../../services/cita.service';
import { MascotaService } from '../../../mascotas/services/mascota.service';
import { Mascota } from '../../../mascotas/models/mascota.model';

function fechaNoAnteriorHoy(control: AbstractControl): ValidationErrors | null {
  if (!control.value) return null;
  const seleccionada = new Date(control.value);
  const hoy = new Date(); hoy.setHours(0, 0, 0, 0);
  return seleccionada < hoy ? { fechaPasada: true } : null;
}

@Component({
  selector: 'app-cita-form',
  templateUrl: './cita-form.component.html',
  styleUrls: ['./cita-form.component.scss'],
  standalone: false
})
export class CitaFormComponent implements OnInit {
  form!: FormGroup;
  mascotas$!: Observable<Mascota[]>;
  guardando = false;
  mensajeExito = '';
  veterinarios = ['Dra. García', 'Dr. Rodríguez', 'Dra. Martínez', 'Dr. Torres'];

  constructor(
    private fb: FormBuilder,
    private citaService: CitaService,
    private mascotaService: MascotaService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.mascotas$ = this.mascotaService.getAll();
    const mascotaId = this.route.snapshot.queryParamMap.get('mascotaId') ?? '';
    this.form = this.fb.group({
      mascotaId: [mascotaId, Validators.required],
      nombreMascota: ['', Validators.required],
      nombreDuenio: ['', Validators.required],
      veterinario: ['', Validators.required],
      fecha: ['', [Validators.required, fechaNoAnteriorHoy]],
      hora: ['', Validators.required],
      motivo: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  onMascotaChange(event: Event): void {
    const id = (event.target as HTMLSelectElement).value;
    this.mascotaService.getById(id).subscribe(m => {
      if (m) {
        this.form.patchValue({ nombreMascota: m.nombre, nombreDuenio: m.duenio.nombre });
      }
    });
  }

  campoInvalido(campo: string): boolean {
    const c = this.form.get(campo);
    return !!(c?.invalid && c?.touched);
  }

  guardar(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.guardando = true;
    const v = this.form.value;
    this.citaService.agendar({ ...v, fecha: new Date(v.fecha) });
    this.mensajeExito = 'Cita agendada correctamente';
    setTimeout(() => this.router.navigate(['/citas']), 1500);
    this.guardando = false;
  }
}
