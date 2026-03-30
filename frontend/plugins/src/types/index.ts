import type { ReactNode } from 'react';

export interface DemoBookingCreate {
  nombre: string;
  apellido?: string;
  email: string;
  empresa?: string;
  producto?: string;
  desafio?: string;
  fecha?: string;
  hora?: string;
  timezone?: string;
  tipo?: string;
}

export interface DemoBooking extends DemoBookingCreate {
  id: string;
  created_at: string;
}

export interface DemoContextValue {
  isOpen: boolean;
  openDemo: () => void;
  closeDemo: () => void;
}

export interface DemoFormState {
  nombre: string;
  apellido: string;
  email: string;
  empresa: string;
  producto: string;
  desafio: string;
}

export interface NavProduct {
  name: string;
  desc: string;
  link: string;
  color: string;
  icon: ReactNode;
}

export interface NavCategory {
  id: string;
  label: string;
  viewAllLink: string;
  viewAllLabel: string;
  products: NavProduct[];
}

export interface QuizOption {
  label: string;
  scores: Record<string, number>;
}

export interface QuizQuestion {
  question: string;
  options: QuizOption[];
}
