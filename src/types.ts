export const COURSES = ['Starter', 'Main', 'Dessert', 'Drink'] as const;
export type Course = (typeof COURSES)[number];
export type CourseFilter = Course | 'All';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  course: Course;
  price: number;
  ingredients: string[];
  prepTime: number;
  isAvailable: boolean;
  image?: string;
  dateCreated: string;
  lastModified: string;
}

export type MenuItemInput = Omit<MenuItem, 'id' | 'dateCreated' | 'lastModified'>;

export type Screen =
  | { name: 'home' }
  | { name: 'detail'; id: string }
  | { name: 'manage' }
  | { name: 'add' }
  | { name: 'edit'; id: string }
  | { name: 'stats' };

export type ToastKind = 'success' | 'error';
export interface ToastState {
  message: string;
  kind: ToastKind;
  action?: { label: string; onClick: () => void };
}
