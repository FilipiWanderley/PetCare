
export interface Appointment {
  id: string;
  petName: string;
  ownerName: string;
  status: string;
}

export function filterAppointments(
  appointments: Appointment[],
  searchTerm: string,
  statusFilter: string
): Appointment[] {
  return appointments.filter((apt) => {
    const matchesSearch =
      (apt.petName?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (apt.ownerName?.toLowerCase() || '').includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || apt.status === statusFilter;

    return matchesSearch && matchesStatus;
  });
}
