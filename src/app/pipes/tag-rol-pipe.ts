import { Pipe, PipeTransform } from '@angular/core';

type RoleDescriptor = {
  label: string;
  classes: string;
};

const ROLE_MAP: Record<string, RoleDescriptor> = {
  admin: {
    label: 'ADMIN',
    classes: 'bg-red-300 text-red-600'
  },
  user: {
    label: 'USER',
    classes: 'bg-blue-200 text-blue-600'
  }
};

const FALLBACK_DESCRIPTOR: RoleDescriptor = ROLE_MAP['user'];

@Pipe({
  name: 'tagRol',
  standalone: true
})
export class TagRolPipe implements PipeTransform {

  transform(value: string | null | undefined): RoleDescriptor {
    if (!value) {
      return FALLBACK_DESCRIPTOR;
    }

    const normalized = value.toLowerCase();
    return ROLE_MAP[normalized] ?? {
      label: this.capitalize(normalized),
      classes: 'bg-neutral-200 text-neutral-700'
    };
  }

  private capitalize(value: string): string {
    if (!value) {
      return 'Desconocido';
    }
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

}
