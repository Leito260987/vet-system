import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { MascotaService } from '../../services/mascota.service';
import { Especie } from '../../models/mascota.model';

function fechaNoFutura(control: AbstractControl): ValidationErrors | null {
  if (!control.value) return null;
  return new Date(control.value) > new Date() ? { fechaFutura: true } : null;
}

function telefonoPeruano(control: AbstractControl): ValidationErrors | null {
  const regex = /^9\d{8}$/;
  return control.value && !regex.test(control.value) ? { telefonoInvalido: true } : null;
}

@Component({
  selector: 'app-mascota-form',
  templateUrl: './mascota-form.component.html',
  styleUrls: ['./mascota-form.component.scss'],
  standalone: false
})
export class MascotaFormComponent implements OnInit {
  @Output() mascotaGuardada = new EventEmitter<void>();

  form!: FormGroup;
  especies = Object.values(Especie);
  guardando = false;
  mensajeExito = '';

  constructor(
    private fb: FormBuilder,
    private mascotaService: MascotaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      duenio: this.fb.group({
        nombre:   ['', [Validators.required, Validators.minLength(4)]],
        dni:      ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
        telefono: ['', [Validators.required, telefonoPeruano]],
        correo:   ['', [Validators.email]]
      }),
      mascota: this.fb.group({
        nombre:          ['', [Validators.required, Validators.minLength(2)]],
        especie:         [Especie.PERRO, Validators.required],
        raza:            ['', Validators.required],
        fechaNacimiento: ['', [Validators.required, fechaNoFutura]],
        observaciones:   ['']
      })
    });
  }

  get duenioGroup(): FormGroup { return this.form.get('duenio') as FormGroup; }
  get mascotaGroup(): FormGroup { return this.form.get('mascota') as FormGroup; }

  campoInvalido(grupo: string, campo: string): boolean {
    const control = this.form.get(`${grupo}.${campo}`);
    return !!(control?.invalid && control?.touched);
  }

  guardar(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.guardando = true;
    const { duenio, mascota } = this.form.value;
    const resultado = this.mascotaService.registrar({
      ...mascota,
      fechaNacimiento: new Date(mascota.fechaNacimiento),
      duenio: { ...duenio, id: `d_${Date.now()}` }
    });
    if (resultado.exitoso) {
      this.mensajeExito = resultado.mensaje;
      this.form.reset({ mascota: { especie: Especie.PERRO } });
      this.mascotaGuardada.emit();
      setTimeout(() => this.router.navigate(['/mascotas']), 1500);
    }
    this.guardando = false;
  }
}
